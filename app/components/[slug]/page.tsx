import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  FileText,
  MessageCircle,
  X,
  Zap,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, componentTechArticleSchema, faqSchema } from "@/lib/schema";
import {
  componentMetaDescription,
  componentMetaTitle,
  componentImagePath,
  componentWhatsAppLink,
  getAllComponents,
  getAlternativeComponents,
  getComponentBySlug,
  getRelatedProjects,
} from "@/lib/components";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllComponents().map((component) => ({ slug: component.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const component = getComponentBySlug(params.slug);

  if (!component) {
    return {};
  }

  return {
    title: {
      absolute: componentMetaTitle(component),
    },
    description: componentMetaDescription(component),
    keywords: [
      component.shortName,
      component.name,
      `${component.shortName} Malaysia`,
      `${component.shortName} FYP`,
      `${component.shortName} pinout`,
      `${component.shortName} wiring`,
      ...component.compatibleWith.map((item) => `${component.shortName} ${item}`),
    ],
    alternates: {
      canonical: `/components/${component.slug}`,
      languages: { "en-MY": `https://rectronx.com/components/${component.slug}` },
    },
    openGraph: {
      title: componentMetaTitle(component),
      description: componentMetaDescription(component),
      url: `https://rectronx.com/components/${component.slug}`,
      type: "article",
      images: [
        {
          url: "https://rectronx.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `${component.name} guide by Rectronx`,
        },
      ],
    },
  };
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {eyebrow && <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-blue">{eyebrow}</p>}
      <h2 className="text-xl font-extrabold text-brand-navy">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function ComponentDetailPage({ params }: PageProps) {
  const component = getComponentBySlug(params.slug);

  if (!component) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(component);
  const alternatives = getAlternativeComponents(component);
  const waHref = componentWhatsAppLink(component);

  return (
    <main className="min-h-screen bg-slate-50 pt-16 text-slate-900">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "https://rectronx.com" },
            { name: "Components", url: "https://rectronx.com/components" },
            { name: component.shortName, url: `https://rectronx.com/components/${component.slug}` },
          ]),
          componentTechArticleSchema(component),
          faqSchema(component.faqs),
        ]}
      />

      <section className="bg-[#080E1A] px-4 pb-12 pt-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Link href="/components" className="text-sm font-bold text-brand-blue hover:text-white">
              Components
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{component.name}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">{component.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">
                {component.categoryLabel}
              </span>
              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-bold text-amber-300">
                {component.rating.toFixed(1)}/5
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">
                {component.priceRange}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">
                {component.difficulty}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {component.compatibleWith.map((item) => (
                <span key={item} className="rounded-full bg-brand-blue/20 px-3 py-1 text-sm font-semibold text-blue-100">
                  {item} ✓
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1ebe5d]"
              >
                <MessageCircle size={18} />
                Use {component.shortName} in my FYP
              </a>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                View related FYP titles
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-center">
              <Image
                src={componentImagePath(component)}
                alt={component.imageHint}
                width={640}
                height={420}
                priority
                className="h-full max-h-[320px] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_0.4fr]">
        <div className="space-y-6">
          <Section title={`What is ${component.shortName}?`} eyebrow="Overview">
            <p className="text-base leading-8 text-slate-600">{component.description}</p>
          </Section>

          <Section title="Quick Specs" eyebrow="Engineering Reference">
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  {component.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-slate-100 last:border-0">
                      <th className="w-1/3 bg-slate-50 px-4 py-3 font-bold text-slate-700">{spec.label}</th>
                      <td className="px-4 py-3 text-slate-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Suitable / Not Suitable" eyebrow="Real Usage Notes">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                <h3 className="mb-3 flex items-center gap-2 font-extrabold text-emerald-800">
                  <CheckCircle2 size={18} />
                  Suitable for
                </h3>
                <ul className="space-y-2 text-sm text-emerald-800">
                  {component.suitableFor.map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-rose-100 bg-rose-50 p-4">
                <h3 className="mb-3 flex items-center gap-2 font-extrabold text-rose-800">
                  <X size={18} />
                  Not suitable for
                </h3>
                <ul className="space-y-2 text-sm text-rose-800">
                  {component.notSuitableFor.map((item) => (
                    <li key={item}>✕ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Pinout" eyebrow="Connections">
            <div className="grid gap-3 sm:grid-cols-2">
              {component.pins.map((pin) => (
                <div key={pin.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-mono text-sm font-extrabold text-brand-blue">{pin.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{pin.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Wiring Guides" eyebrow="Platform Notes">
            <div className="space-y-5">
              {component.wiring.map((guide) => (
                <div key={guide.platform} className="rounded-lg border border-slate-200 p-4">
                  <h3 className="text-lg font-extrabold text-brand-navy">{component.shortName} with {guide.platform}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{guide.notes}</p>
                  <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-left text-sm">
                      <tbody>
                        {guide.connections.map((connection) => (
                          <tr key={connection.label} className="border-b border-slate-100 last:border-0">
                            <th className="w-1/3 bg-slate-50 px-4 py-3 font-bold text-slate-700">{connection.label}</th>
                            <td className="px-4 py-3 text-slate-600">{connection.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {guide.code && (
                    <div className="mt-4">
                      <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        <Code2 size={16} />
                        Example code
                      </p>
                      <pre className="overflow-x-auto rounded-lg bg-[#080E1A] p-4 text-xs leading-6 text-slate-100">
                        <code>{guide.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Common Mistakes" eyebrow="Troubleshooting">
            <div className="grid gap-3 sm:grid-cols-2">
              {component.commonMistakes.map((mistake) => (
                <div key={mistake} className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
                  <AlertTriangle className="mt-0.5 shrink-0" size={17} />
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title={`Projects Using ${component.shortName}`} eyebrow="FYP Ideas">
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedProjects.map((project) => (
                <div key={project.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-bold leading-6 text-brand-navy">{project.title}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/catalog" className="mt-5 inline-flex text-sm font-bold text-brand-blue hover:text-brand-navy">
              Browse all FYP titles →
            </Link>
          </Section>

          {alternatives.length > 0 && (
            <Section title="Alternative Components" eyebrow="Compare Options">
              <div className="grid gap-3 sm:grid-cols-2">
                {alternatives.map((alternative) => (
                  <Link
                    key={alternative.slug}
                    href={`/components/${alternative.slug}`}
                    className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-brand-blue hover:bg-blue-50"
                  >
                    <p className="font-extrabold text-brand-navy">{alternative.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{alternative.reason}</p>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          <Section title="FAQ" eyebrow="Student Questions">
            <div className="space-y-4">
              {component.faqs.map((faq) => (
                <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-extrabold text-brand-navy">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-extrabold text-brand-navy">Need this in your FYP?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Rectronx can help you choose the right components, wiring, code, documentation and demo flow.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#1ebe5d]"
              >
                <MessageCircle size={17} />
                Ask Rectronx
              </a>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
                <FileText size={18} />
                Libraries
              </h2>
              <div className="space-y-3">
                {component.libraries.map((library) => (
                  <div key={library.label} className="rounded-lg bg-slate-50 p-3">
                    <p className="text-sm font-bold text-slate-700">{library.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{library.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
                <Zap size={18} />
                Price / Buy Notes
              </h2>
              <p className="text-sm font-bold text-slate-700">Average Malaysia price: {component.priceRange}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{component.buyNotes}</p>
              <p className="mt-3 text-xs leading-5 text-slate-400">
                Marketplace links can be added later for Shopee, Lazada, AliExpress or Rectronx stock.
              </p>
            </section>

            {component.relatedBlogSlugs.length > 0 && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-extrabold text-brand-navy">Related Blogs</h2>
                <div className="space-y-2">
                  {component.relatedBlogSlugs.map((slug) => (
                    <Link
                      key={slug}
                      href={`/blog/${slug}`}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-brand-blue"
                    >
                      <span>{slug.replace(/-/g, " ")}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
