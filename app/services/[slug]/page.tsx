import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  FileText,
  MapPin,
  MessageCircle,
  Shield,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  serviceSchema,
} from "@/lib/schema";
import {
  getAllServicePages,
  getRelatedServiceComponents,
  getRelatedServiceProjects,
  getRelatedServiceTopics,
  getServicePageBySlug,
} from "@/lib/services";
import { getCatalogProjectSlug } from "@/lib/catalog";

const BASE = "https://rectronx.com";

export function generateStaticParams() {
  return getAllServicePages().map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getServicePageBySlug(params.slug);
  if (!page) return {};

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${BASE}/services/${page.slug}`,
      type: "website",
      images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: page.title }],
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getServicePageBySlug(params.slug);
  if (!page) notFound();

  const projects = getRelatedServiceProjects(page);
  const topics = getRelatedServiceTopics(page);
  const components = getRelatedServiceComponents(page);
  const whatsappUrl = `https://wa.me/601172792500?text=${encodeURIComponent(page.whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: BASE },
            { name: "Services", url: `${BASE}/services` },
            { name: page.title, url: `${BASE}/services/${page.slug}` },
          ]),
          serviceSchema({
            name: page.title,
            description: page.description,
            url: `${BASE}/services/${page.slug}`,
            areaServed: page.areaServed,
          }),
          faqSchema(page.faqs),
          itemListSchema(
            projects.map((project, index) => ({
              name: project.title,
              url: `${BASE}/catalog/${getCatalogProjectSlug(project)}`,
              position: index + 1,
            }))
          ),
        ]}
      />

      <section className="bg-brand-navy px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Services
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
                {page.eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
                {page.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Discuss on WhatsApp <MessageCircle size={14} />
                </a>
                <Link href="/catalog" className="btn-secondary">
                  Browse Project Ideas <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <MapPin size={16} className="text-brand-blue" />
                Area served
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {page.areaServed.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {page.heroPoints.map((point) => (
                  <div key={point} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <p className="text-sm leading-6 text-slate-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
        <InfoPanel title="Who This Helps" items={page.whoFor} icon="audience" />
        <InfoPanel title="What We Clarify" items={page.deliverables} icon="deliverable" />
        <InfoPanel title="Quality Checks" items={page.qualityChecks} icon="quality" />
      </section>

      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
                Process
              </p>
              <h2 className="text-3xl font-bold text-brand-navy">How the service is scoped</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              The goal is to make the project explainable and buildable, not to overpromise
              features that cannot be tested before presentation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {page.process.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
                Related Project Titles
              </p>
              <h2 className="text-2xl font-bold text-brand-navy">Good starting points</h2>
            </div>
            <Link href="/catalog" className="text-sm font-bold text-brand-blue hover:text-brand-blue-dark">
              View all
            </Link>
          </div>
          <div className="grid gap-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/catalog/${getCatalogProjectSlug(project)}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-blue hover:shadow-sm"
              >
                <h3 className="text-sm font-bold text-brand-navy">{project.title}</h3>
                <p className="mt-2 text-xs text-slate-500">{project.tags.join(" / ")}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SideList title="Related Topic Hubs" items={topics.map((topic) => ({
            name: topic.title,
            description: topic.description,
            href: `/topics/${topic.slug}`,
          }))} />
          <SideList title="Useful Components" items={components.map((component) => ({
            name: component.name,
            description: component.description,
            href: `/components/${component.slug}`,
          }))} />
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-brand-navy">Common questions</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {page.faqs.map((faq) => (
              <div key={faq.q} className="p-6">
                <h3 className="text-base font-bold text-brand-navy">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
              Next Step
            </p>
            <h2 className="text-3xl font-bold text-white">Share your title, deadline and current progress.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Rectronx can review whether the scope is realistic and point you toward
              the right project structure before you commit too much time.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            Message Rectronx <MessageCircle size={14} />
          </a>
        </div>
      </section>
    </main>
  );
}

function InfoPanel({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: "audience" | "deliverable" | "quality";
}) {
  const Icon = icon === "audience" ? Cpu : icon === "deliverable" ? FileText : Shield;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
          <Icon size={19} />
        </div>
        <h2 className="text-lg font-bold text-brand-navy">{title}</h2>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SideList({
  title,
  items,
}: {
  title: string;
  items: { name: string; description: string; href: string }[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold text-brand-navy">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl border border-slate-100 p-4 transition-colors hover:border-brand-blue"
          >
            <h3 className="text-sm font-bold text-brand-navy">{item.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
