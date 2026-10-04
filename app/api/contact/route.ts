import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  escapeHtml,
  isRateLimited,
  normalizeContactSubmission,
  validateContactSubmission,
} from "@/lib/contact-security";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 16_384) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const origin = req.headers.get("origin");
  const requestOrigin = new URL(req.url).origin;
  if (origin && origin !== requestOrigin && origin !== "https://rectronx.com") {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || req.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const submission = normalizeContactSubmission(payload);
  const validation = validateContactSubmission(submission);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Contact service is temporarily unavailable." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const name = escapeHtml(submission.name);
  const email = escapeHtml(submission.email);
  const phone = escapeHtml(submission.phone);
  const message = escapeHtml(submission.message);
  const subjectName = submission.name.replace(/[\r\n]+/g, " ");

  try {
    // 1. Notify Rectronx
    const notification = await resend.emails.send({
      from: "Rectronx Website <hello@rectronx.com>",
      to: "rectronx@gmail.com",
      replyTo: submission.email,
      subject: `New Enquiry from ${subjectName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <div style="background:#0F1C2E;padding:20px 24px;border-radius:8px 8px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">New Contact Form Submission</h1>
            <p style="color:#2B7FD4;margin:4px 0 0;font-size:13px">Rectronx Circuits Website</p>
          </div>
          <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;padding:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:100px">Name</td><td style="padding:8px 0;font-weight:600;color:#0F1C2E">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Email</td><td style="padding:8px 0;color:#2B7FD4"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:8px 0;color:#0F1C2E">${phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;vertical-align:top">Message</td><td style="padding:8px 0;color:#0F1C2E;line-height:1.6">${message.replace(/\n/g, "<br>")}</td></tr>
            </table>
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid #f1f5f9">
              <a href="https://wa.me/60148600454?text=${encodeURIComponent(`Hi ${submission.name}, thanks for reaching out!`)}" style="background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">Reply via WhatsApp</a>
            </div>
          </div>
        </div>
      `,
    });

    if (notification.error) {
      throw notification.error;
    }

    // 2. Auto-reply to customer
    try {
      const autoReply = await resend.emails.send({
        from: "Rectronx Circuits <hello@rectronx.com>",
        to: submission.email,
        subject: "We received your message — Rectronx Circuits",
        html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <div style="background:#0F1C2E;padding:20px 24px;border-radius:8px 8px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">Thanks for reaching out, ${name}!</h1>
            <p style="color:#2B7FD4;margin:4px 0 0;font-size:13px">Rectronx Circuits — Malaysia's Engineering & Technology Company</p>
          </div>
          <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;padding:24px">
            <p style="color:#374151;line-height:1.7">We've received your message and normally respond within <strong>one business day</strong> (Mon–Fri, 9am–10pm MYT).</p>
            <p style="color:#374151;line-height:1.7">For faster response, you can also reach us directly on WhatsApp:</p>
            <div style="margin:20px 0">
              <a href="https://wa.me/60148600454" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">Chat on WhatsApp →</a>
            </div>
            <hr style="border:none;border-top:1px solid #f1f5f9;margin:20px 0">
            <p style="color:#94a3b8;font-size:12px;margin:0">Rectronx Circuits<br>1-3-8, BL Business Centre, Solok Thean Tek, 11500 Ayer Itam, Pulau Pinang<br>+60 14-860 0454 · rectronx@gmail.com</p>
          </div>
        </div>
        `,
      });
      if (autoReply.error) console.error("Contact auto-reply failed", autoReply.error);
    } catch (autoReplyError) {
      console.error("Contact auto-reply failed", autoReplyError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
