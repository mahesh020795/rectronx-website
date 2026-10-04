import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Rectronx Circuits" },
  description: "Terms governing Rectronx Circuits enquiries, project guidance, prototypes and software services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-28 text-slate-700 sm:px-6">
      <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-blue">Legal</p>
        <h1 className="mt-3 text-3xl font-extrabold text-brand-navy">Terms of Service</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: 5 October 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-7">
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Quotations and scope</h2>
            <p className="mt-2">A service begins only after the scope, deliverables, timeline and price are agreed. Requirements added later may require a revised quotation and delivery date.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Academic responsibility</h2>
            <p className="mt-2">Project guidance, prototypes, examples and documentation must be used in accordance with your institution&apos;s academic-integrity rules. Students remain responsible for understanding, testing, explaining and submitting their own work. Rectronx does not guarantee marks, approval or academic outcomes.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Engineering limitations and safety</h2>
            <p className="mt-2">Unless expressly agreed otherwise, student projects are educational prototypes rather than certified medical, safety, industrial or commercial products. Users must follow component datasheets, electrical-safety requirements and appropriate supervision, especially for mains voltage, batteries, moving machinery and health-related measurements.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Third-party services</h2>
            <p className="mt-2">Projects may depend on third-party hardware, libraries, cloud platforms, mobile networks or APIs. Their availability, pricing and terms can change independently of Rectronx.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy">Support and acceptance</h2>
            <p className="mt-2">Support and change periods follow the agreed quotation. Customers should inspect and test deliverables promptly and report any difference from the agreed scope with reproducible details.</p>
          </section>
        </div>

        <Link href="/contact" className="mt-10 inline-flex font-bold text-brand-blue hover:text-brand-navy">Discuss your requirements</Link>
      </article>
    </main>
  );
}
