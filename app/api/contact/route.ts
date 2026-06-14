import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // 1. Notify Rectronx
    await resend.emails.send({
      from: "Rectronx Website <hello@rectronx.com>",
      to: "rectronx@gmail.com",
      subject: `New Enquiry from ${name}`,
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
              <a href="https://wa.me/601172792500?text=Hi%20${encodeURIComponent(name)}%2C%20thanks%20for%20reaching%20out!" style="background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">Reply via WhatsApp</a>
            </div>
          </div>
        </div>
      `,
    });

    // 2. Auto-reply to customer
    await resend.emails.send({
      from: "Rectronx Circuits <hello@rectronx.com>",
      to: email,
      subject: "We received your message — Rectronx Circuits",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <div style="background:#0F1C2E;padding:20px 24px;border-radius:8px 8px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">Thanks for reaching out, ${name}!</h1>
            <p style="color:#2B7FD4;margin:4px 0 0;font-size:13px">Rectronx Circuits — Malaysia's Engineering & Technology Company</p>
          </div>
          <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;padding:24px">
            <p style="color:#374151;line-height:1.7">We've received your message and will get back to you within <strong>2 hours</strong> (Mon–Fri, 9am–10pm MYT).</p>
            <p style="color:#374151;line-height:1.7">For faster response, you can also reach us directly on WhatsApp:</p>
            <div style="margin:20px 0">
              <a href="https://wa.me/601172792500" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">Chat on WhatsApp →</a>
            </div>
            <hr style="border:none;border-top:1px solid #f1f5f9;margin:20px 0">
            <p style="color:#94a3b8;font-size:12px;margin:0">Rectronx Circuits<br>1-3-8, BL Business Centre, Solok Thean Tek, 11500 Ayer Itam, Pulau Pinang<br>+60 11-7279 2500 · rectronx@gmail.com</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
