import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Cpu, FileText, Package, Search } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";
import { getCatalogProjectSlug } from "@/lib/catalog";
import {
  getAllTopicHubs,
  getTopicCatalogProjects,
  getTopicComponents,
  getTopicHubBySlug,
  getTopicPosts,
} from "@/lib/topics";

const BASE = "https://rectronx.com";

export function generateStaticParams() {
  return getAllTopicHubs().map((topic) => ({ slug: topic.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const topic = getTopicHubBySlug(params.slug);
  if (!topic) return {};

  return {
    title: {
      absolute: `${topic.title} | Rectronx Engineering Hub`,
    },
    description: topic.description,
    keywords: topic.keywords,
    alternates: { canonical: `/topics/${topic.slug}` },
    openGraph: {
      title: `${topic.title} | Rectronx`,
      description: topic.description,
      url: `${BASE}/topics/${topic.slug}`,
      type: "website",
    },
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicHubBySlug(params.slug);
  if (!topic) notFound();

  const projects = getTopicCatalogProjects(topic, 18);
  const components = getTopicComponents(topic, 8);
  const posts = getTopicPosts(topic, 6);
  const faqs = [
    {
      q: `What is included in the ${topic.title} hub?`,
      a: `This hub connects related Rectronx catalog titles, electronics components, blog guides and project scope notes for ${topic.title}.`,
    },
    {
      q: "Are these project ideas fixed-price packages?",
      a: "No. They are project guide and scope references. Actual quotation depends on selected features, deadline, hardware, software and documentation requirements.",
    },
    {
      q: "Can Rectronx help choose the safest FYP scope?",
      a: "Yes. Rectronx can help choose a realistic scope, suitable components, testing method, report structure and demo plan.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: BASE },
          { name: "Topics", url: `${BASE}/topics` },
          { name: topic.title, url: `${BASE}/topics/${topic.slug}` },
        ])}
      />
      <JsonLd schema={faqSchema(faqs)} />
      <JsonLd
        schema={itemListSchema(
          projects.slice(0, 10).map((project, index) => ({
            name: project.title,
            url: `${BASE}/catalog/${getCatalogProjectSlug(project)}`,
            position: index + 1,
          }))
        )}
      />

      <section className="bg-brand-navy px-4 pb-16 pt-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/topics"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <ArrowLeft size={15} />
            All topic hubs
          </Link>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
            {topic.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {topic.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            {topic.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {topic.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <HubSection title="Related Project Titles" icon={<Search size={20} />}>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/catalog/${getCatalogProjectSlug(project)}`}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-blue hover:shadow-sm"
                >
                  <p className="text-sm font-bold leading-6 text-brand-navy">{project.title}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </HubSection>

          {components.length > 0 && (
            <HubSection title="Related Components" icon={<Cpu size={20} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                {components.map((component) => (
                  <Link
                    key={component.slug}
                    href={`/components/${component.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-blue hover:shadow-sm"
                  >
                    <p className="text-sm font-bold text-brand-navy">{component.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{component.tagline}</p>
                  </Link>
                ))}
              </div>
            </HubSection>
          )}

          {posts.length > 0 && (
            <HubSection title="Related Guides" icon={<FileText size={20} />}>
              <div className="space-y-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-blue hover:shadow-sm"
                  >
                    <p className="font-bold text-brand-navy">{post.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </HubSection>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-lg font-bold text-brand-navy">Why This Hub Matters</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                "Connects related project titles, components and guides.",
                "Helps students choose a realistic scope.",
                "Improves topical authority for Malaysian engineering searches.",
                "Supports AI search with structured Q&A and internal links.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Other Hubs
            </p>
            <div className="space-y-2">
              {getAllTopicHubs()
                .filter((item) => item.slug !== topic.slug)
                .slice(0, 8)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/topics/${item.slug}`}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-brand-blue"
                  >
                    {item.title}
                    <Package size={14} />
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function HubSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
          {icon}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}
