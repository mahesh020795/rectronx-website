import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://rectronx.com/blog/${post.slug}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  "FYP Guide": "bg-brand-blue-light text-brand-blue",
  Tutorial: "bg-violet-50 text-violet-600",
  Ideas: "bg-amber-50 text-amber-600",
};

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-blue transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                categoryColors[post.category] || "bg-slate-100 text-slate-500"
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

          <h1 className="text-4xl font-bold text-brand-navy leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-10 prose prose-slate prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-brand-navy prose-headings:tracking-tight
          prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
          prose-strong:text-brand-navy
          prose-code:text-brand-blue prose-code:bg-brand-blue-light prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
          prose-table:text-sm
          prose-th:text-brand-navy prose-th:font-semibold
          prose-li:text-slate-600
          prose-p:text-slate-600 prose-p:leading-relaxed">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-brand-navy mb-2">
            Need Help With Your FYP?
          </h2>
          <p className="text-slate-500 text-sm mb-5 max-w-md mx-auto">
            We've helped hundreds of students complete their projects on time.
            Get a free quote from us today.
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
