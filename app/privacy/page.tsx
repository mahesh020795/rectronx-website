import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Rectronx Circuits" },
  description: "How Rectronx Circuits handles contact details, enquiry information and website analytics data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-28 text-slate-700 sm:px-6">
      <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-blue">Legal</p>
        <h1 className="mt-3 text-3xl font-extrabold text-brand-navy">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: 5 October 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-7">
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Information we receive</h2>
            <p className="mt-2">When you contact Rectronx, we may receive your name, email address, phone number, project requirements and any information you choose to include in your message.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">How we use it</h2>
            <p className="mt-2">We use enquiry information to respond, prepare a quotation, discuss project scope and provide requested support. We do not sell personal information.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Website analytics</h2>
            <p className="mt-2">The website uses Google Analytics to understand aggregate traffic and page usage. Analytics services may process device, browser, approximate location and interaction information according to their own policies.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Service providers and retention</h2>
            <p className="mt-2">We use service providers such as Vercel for hosting and Resend for contact-form email delivery. We retain enquiry information only for as long as reasonably needed for communication, records, security and applicable legal obligations.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Your choices</h2>
            <p className="mt-2">You may ask us to correct or delete enquiry information we hold, subject to legal and operational record requirements. Contact <a className="font-semibold text-brand-blue" href="mailto:rectronx@gmail.com">rectronx@gmail.com</a>.</p>
          </section>
        </div>

        <Link href="/contact" className="mt-10 inline-flex font-bold text-brand-blue hover:text-brand-navy">Contact Rectronx</Link>
      </article>
    </main>
  );
}
