import type { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  FileText,
  MessageCircle,
  Package,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { allCatalogProjects } from "@/data/projects";
import {
  catalogWhatsAppLink,
  getCatalogProjectBySlug,
  getCatalogProjectSeo,
  getCatalogProjectSlug,
  getProjectTechnologies,
  getRelatedCatalogProjects,
} from "@/lib/catalog";
import {
  breadcrumbSchema,
  catalogProjectTechArticleSchema,
  faqSchema,
} from "@/lib/schema";
import { getRelatedTopicHubsForProject } from "@/lib/topics";

const BASE = "https://rectronx.com";

export async function generateStaticParams() {
  return allCatalogProjects.map((project) => ({
    slug: getCatalogProjectSlug(project),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getCatalogProjectBySlug(params.slug);
  if (!project) return {};

  const seo = getCatalogProjectSeo(project);
  const url = `${BASE}/catalog/${getCatalogProjectSlug(project)}`;

  return {
    title: {
      absolute: seo.metaTitle,
    },
    description: seo.metaDescription,
    alternates: { canonical: `/catalog/${getCatalogProjectSlug(project)}` },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url,
      type: "article",
      siteName: "Rectronx Circuits",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

export default function CatalogProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getCatalogProjectBySlug(params.slug);
  if (!project) notFound();

  const slug = getCatalogProjectSlug(project);
  const seo = getCatalogProjectSeo(project);
  const technologies = getProjectTechnologies(project);
  const related = getRelatedCatalogProjects(project);
  const relatedTopics = getRelatedTopicHubsForProject(project);
  const whatsappUrl = catalogWhatsAppLink(project);

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: BASE },
          { name: "Catalog", url: `${BASE}/catalog` },
          { name: project.title, url: `${BASE}/catalog/${slug}` },
        ])}
      />
      <JsonLd
        schema={catalogProjectTechArticleSchema({
          title: project.title,
          slug,
          description: seo.metaDescription,
        })}
      />
      <JsonLd schema={faqSchema(seo.faqs)} />

      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Catalog", href: "/catalog" },
              { name: project.title },
            ]}
          />

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-blue transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to Catalog
          </Link>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
            <div className="rounded-2xl bg-brand-navy text-white p-6 sm:p-8 lg:p-10 overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,127,212,0.35),transparent_38%)]" />
              <div className="relative">
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                    {seo.categoryLabel}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                    {seo.difficulty}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                    FYP / Projek Akhir Tahun Ready
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5">
                  {project.title}
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                  {seo.outcome}
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
                  >
                    <MessageCircle size={17} />
                    Ask About This Project
                  </a>
                  <a
                    href="#report-guide"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                  >
                    <FileText size={17} />
                    View Report Guide
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">
                Project Snapshot
              </p>
              <div className="space-y-4">
                <SnapshotRow label="Category" value={seo.categoryLabel} />
                <SnapshotRow label="Difficulty" value={seo.difficulty} />
                <SnapshotRow label="Time Required" value={seo.timeRequired} />
                <SnapshotRow label="Cost" value={seo.costGuidance} />
                <SnapshotRow label="Suitable for" value="Diploma, Degree, FYP, Projek Akhir Tahun" />
                <SnapshotRow
                  label="Components"
                  value={project.tags.slice(0, 4).join(", ")}
                />
                <SnapshotRow
                  label="Expected output"
                  value={
                    project.category === "iot"
                      ? "Prototype demo, alerts, dashboard, app, or database"
                      : "Working software flow, database records, reports, and user screens"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="space-y-8">
          <Section title="Quick Summary" icon={<FileText size={20} />}>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-base leading-8 text-slate-600">{seo.quickSummary}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <AiSummaryCard label="Difficulty" value={seo.difficulty} />
                <AiSummaryCard label="Time Required" value={seo.timeRequired} />
                <AiSummaryCard label="Cost" value={seo.costGuidance} />
                <AiSummaryCard label="Components" value={project.tags.slice(0, 4).join(", ")} />
              </div>
            </div>
          </Section>

          <Section title="How This Project Works" icon={<Cpu size={20} />}>
            <div className="grid gap-3">
              {seo.howItWorks.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-brand-blue">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Components" icon={<Package size={20} />}>
            <div className="grid sm:grid-cols-2 gap-3">
              {technologies.map(({ tag, component }) =>
                component ? (
                  <Link
                    key={tag}
                    href={`/components/${component.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-blue hover:shadow-sm transition-all"
                  >
                    <p className="font-semibold text-brand-navy">{tag}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      View {component.shortName} component guide
                    </p>
                  </Link>
                ) : (
                  <div key={tag} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold text-brand-navy">{tag}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Technology or project feature
                    </p>
                  </div>
                )
              )}
            </div>
          </Section>

          <Section title="Build Scope Options" icon={<Zap size={20} />}>
            <div className="grid md:grid-cols-3 gap-4">
              {seo.buildLevels.map((item) => (
                <div key={item.level} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-bold text-brand-navy mb-2">{item.level}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Expected Demo Outcome" icon={<CheckCircle2 size={20} />}>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {seo.demoOutcomes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Accuracy & Limitations" icon={<Shield size={20} />}>
            <div className="grid gap-3">
              {seo.limitations.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Validation & Testing Plan" icon={<CheckCircle2 size={20} />}>
            <div className="grid gap-3">
              {seo.testingPlan.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Troubleshooting" icon={<AlertTriangle size={20} />}>
            <div className="grid gap-3">
              {seo.troubleshooting.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Common Mistakes" icon={<AlertTriangle size={20} />}>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <ul className="space-y-3 text-sm text-slate-700">
                {seo.commonMistakes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="report-guide" title="Suggested Report Sections" icon={<FileText size={20} />}>
            <div className="grid sm:grid-cols-2 gap-3">
              {seo.reportSections.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Alternatives" icon={<Star size={20} />}>
            <div className="flex flex-wrap gap-2">
              {seo.upgrades.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-brand-blue"
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>

          {related.length > 0 && (
            <Section title="Related Projects" icon={<Cpu size={20} />}>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/catalog/${getCatalogProjectSlug(item)}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-blue hover:shadow-sm transition-all"
                  >
                    <p className="text-sm font-bold leading-6 text-brand-navy">{item.title}</p>
                    <p className="mt-2 text-xs text-slate-500">{item.tags.slice(0, 3).join(", ")}</p>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          <Section title="FAQ" icon={<MessageCircle size={20} />}>
            <div className="space-y-3">
              {seo.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-slate-200 bg-white p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-brand-navy">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-24 space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-lg font-bold text-brand-navy mb-2">Need this FYP title?</p>
            <p className="text-sm leading-relaxed text-slate-600 mb-5">
              Share your supervisor requirements and Rectronx can advise the safest
              scope, platform, timeline, and demo plan.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={17} />
              WhatsApp Rectronx
            </a>
          </div>

          {related.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Related Titles
              </p>
              <div className="space-y-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/catalog/${getCatalogProjectSlug(item)}`}
                    className="block rounded-lg border border-slate-100 p-3 hover:border-brand-blue hover:bg-blue-50 transition-colors"
                  >
                    <p className="text-sm font-semibold leading-snug text-brand-navy">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.tags.slice(0, 3).join(", ")}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedTopics.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Topic Hubs
              </p>
              <div className="space-y-2">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="block rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-brand-blue"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function SnapshotRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="max-w-[64%] text-right text-sm font-semibold text-brand-navy">
        {value}
      </span>
    </div>
  );
}

function AiSummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-brand-navy">{value}</p>
    </div>
  );
}

function Section({
  id,
  title,
  icon,
  children,
}: {
  id?: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
          {icon}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}
