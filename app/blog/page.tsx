import { Metadata } from "next";
import { Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Tutorials",
  description:
    "Free guides, tutorials and tips for engineering students doing their Final Year Projects in Malaysia.",
};

const categoryColors: Record<string, string> = {
  "FYP Guide": "bg-brand-blue-light text-brand-blue",
  Tutorial: "bg-violet-50 text-violet-600",
  Ideas: "bg-amber-50 text-amber-600",
};

const comingSoon = [
  {
    slug: "arduino-vs-raspberry-pi",
    title: "Arduino vs Raspberry Pi: Which Should You Use for Your FYP?",
    excerpt: "Two of the most popular platforms for engineering FYPs — but they serve very different purposes. We break down which one fits your project.",
    category: "Tutorial",
    readTime: "7 min read",
    date: "Coming Soon",
  },
  {
    slug: "iot-project-ideas-2025",
    title: "10 IoT Final Year Project Ideas That Will Impress Your Examiner",
    excerpt: "A curated list of IoT project ideas with real impact, achievable scope, and the technical depth examiners look for.",
    category: "Ideas",
    readTime: "6 min read",
    date: "Coming Soon",
  },
  {
    slug: "fyp-documentation-guide",
    title: "The Complete FYP Documentation Guide: What to Write and How",
    excerpt: "Most students fail not because of bad projects but because of poor documentation. Here's exactly what your report needs to include.",
    category: "FYP Guide",
    readTime: "10 min read",
    date: "Coming Soon",
  },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <span className="section-label">Knowledge Base</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-navy tracking-tight">
            Blog &amp; Tutorials
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
            Free, practical guides to help engineering students plan, build,
            and present their Final Year Projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card p-6 flex flex-col group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-slate-100 text-slate-500"}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-semibold text-brand-navy leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-5">
                <span className="text-xs text-slate-400">{post.date}</span>
                <span className="flex items-center gap-1 text-brand-blue text-sm font-medium group-hover:gap-2 transition-all">
                  Read <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}

          {comingSoon.map((post) => (
            <div key={post.slug} className="card p-6 flex flex-col opacity-60">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-slate-100 text-slate-500"}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-semibold text-brand-navy leading-snug mb-3">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-5">
                <span className="text-xs text-slate-400 font-medium">{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
