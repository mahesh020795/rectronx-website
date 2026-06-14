import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { Clock, ArrowLeft, Tag, Twitter } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `https://rectronx.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.date,
      authors: ["Rectronx Circuits"],
      siteName: "Rectronx Circuits",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

const categoryColors: Record<string, string> = {
  "FYP Guide": "bg-blue-50 text-blue-700",
  Tutorial: "bg-violet-50 text-violet-700",
  Ideas: "bg-amber-50 text-amber-700",
};

// Related posts shown at the bottom (static stubs)
const relatedStubs = [
  {
    slug: "arduino-vs-raspberry-pi",
    title: "Arduino vs Raspberry Pi: Which Should You Use for Your FYP?",
    category: "Tutorial",
    readTime: "7 min read",
    date: "Coming Soon",
  },
  {
    slug: "fyp-documentation-guide",
    title: "The Complete FYP Documentation Guide: What to Write and How",
    category: "FYP Guide",
    readTime: "10 min read",
    date: "Coming Soon",
  },
];

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);
  const relatedPosts =
    related.length >= 2
      ? related
      : [
          ...related,
          ...relatedStubs.slice(0, 2 - related.length),
        ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      <JsonLd schema={articleSchema(post)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://rectronx.com" },
          { name: "Blog", url: "https://rectronx.com/blog" },
          {
            name: post.title,
            url: `https://rectronx.com/blog/${post.slug}`,
          },
        ])}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#2B7FD4] transition-colors mb-10 py-2"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <div className="flex gap-10 items-start">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 lg:p-10 mb-6">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    categoryColors[post.category] ?? "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Tag size={10} />
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={11} />
                  {post.readTime}
                </span>
                <span className="text-xs text-slate-400">{post.date}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] leading-tight tracking-tight mb-4">
                {post.title}
              </h1>

              {/* Excerpt / subheader */}
              <p className="text-xl text-slate-500 leading-relaxed mb-7">
                {post.excerpt}
              </p>

              {/* Author row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#0F1C2E] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    R
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F1C2E]">Rectronx</p>
                    <p className="text-xs text-slate-400">{post.date}</p>
                  </div>
                </div>
                {/* Share buttons (visual only) */}
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Share on Twitter"
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#2B7FD4] hover:border-[#2B7FD4] transition-colors"
                  >
                    <Twitter size={14} />
                  </button>
                  {/* WhatsApp icon as SVG */}
                  <button
                    aria-label="Share on WhatsApp"
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-500 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden mb-8 h-48 sm:h-[380px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
                alt="Blog post hero"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Prose content */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 lg:p-10">
              <div
                className="prose prose-slate prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-[#0F1C2E] prose-headings:tracking-tight
                  prose-a:text-[#2B7FD4] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#0F1C2E]
                  prose-code:text-[#2B7FD4] prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                  prose-table:text-sm
                  prose-th:text-[#0F1C2E] prose-th:font-semibold
                  prose-li:text-slate-600
                  prose-p:text-slate-600 prose-p:leading-relaxed"
              >
                <MDXRemote source={post.content} />
              </div>
            </div>

            {/* Related posts */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-[#0F1C2E] mb-5">More Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group"
                  >
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${
                        categoryColors[rp.category] ?? "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {rp.category}
                    </span>
                    <h3 className="font-semibold text-[#0F1C2E] text-sm leading-snug mb-2 group-hover:text-[#2B7FD4] transition-colors">
                      {rp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock size={11} /> {rp.readTime}
                      <span>·</span>
                      <span>{rp.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-5">
              {/* Table of Contents */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  In This Article
                </p>
                <nav className="space-y-2 text-sm">
                  {extractHeadings(post.content).map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-slate-500 hover:text-[#2B7FD4] transition-colors leading-snug ${
                        h.level === 3 ? "pl-3 text-xs" : ""
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>

              {/* CTA card */}
              <div className="bg-[#0F1C2E] rounded-xl p-5 text-center">
                <p className="text-white font-bold text-base mb-2">Need Help With Your FYP?</p>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                  We've helped hundreds of students finish on time. Get a free quote now.
                </p>
                <WhatsAppButton
                  label="Chat with Rectronx"
                  message="Hi Rectronx! I read your blog and need help with my FYP."
                />
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 lg:hidden bg-slate-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">Need Help With Your FYP?</h2>
          <p className="text-slate-500 text-sm mb-5 max-w-md mx-auto">
            We've helped hundreds of students complete their projects on time. Get a free quote today.
          </p>
          <WhatsAppButton
            label="Chat with Rectronx"
            message="Hi Rectronx! I read your blog and need help with my FYP."
          />
        </div>
      </div>
    </div>
  );
}

// Extract h2/h3 headings from MDX content for the ToC
function extractHeadings(content: string) {
  const lines = content.split("\n");
  const headings: { id: string; text: string; level: number }[] = [];
  for (const line of lines) {
    const m2 = line.match(/^## (.+)/);
    const m3 = line.match(/^### (.+)/);
    if (m2) {
      const text = m2[1].trim();
      headings.push({ text, id: slugify(text), level: 2 });
    } else if (m3) {
      const text = m3[1].trim();
      headings.push({ text, id: slugify(text), level: 3 });
    }
  }
  return headings;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
