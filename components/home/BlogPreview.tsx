"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    slug: "how-to-choose-fyp-topic",
    title: "How to Choose the Right Final Year Project Topic",
    excerpt:
      "Choosing your FYP topic is the most important decision of your final year. Here's a practical framework to pick a topic that impresses your supervisor and is actually doable.",
    category: "FYP Guide",
    readTime: "5 min read",
    date: "Coming Soon",
  },
  {
    slug: "arduino-vs-raspberry-pi",
    title: "Arduino vs Raspberry Pi: Which Should You Use for Your FYP?",
    excerpt:
      "Two of the most popular platforms for engineering FYPs — but they're very different. We break down which one fits your project type.",
    category: "Tutorial",
    readTime: "7 min read",
    date: "Coming Soon",
  },
  {
    slug: "iot-project-ideas-2025",
    title: "10 IoT Final Year Project Ideas That Will Impress Your Examiner",
    excerpt:
      "A curated list of IoT project ideas with real impact, achievable scope, and the technical depth examiners are looking for in 2025.",
    category: "Ideas",
    readTime: "6 min read",
    date: "Coming Soon",
  },
];

const categoryColors: Record<string, string> = {
  "FYP Guide": "bg-brand-blue-light text-brand-blue",
  Tutorial: "bg-violet-50 text-violet-600",
  Ideas: "bg-amber-50 text-amber-600",
};

export default function BlogPreview() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="section-label">Knowledge Base</span>
            <h2 className="mt-3 text-4xl font-bold text-brand-navy tracking-tight">
              Guides &amp; Tutorials
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl">
              Free resources to help students plan, build, and present their
              Final Year Projects successfully.
            </p>
          </div>
          <Link href="/blog" className="btn-secondary shrink-0">
            All Articles <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="card p-6 flex flex-col h-full group block"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      categoryColors[post.category] || "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-brand-navy leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-brand-blue text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  Read more <ArrowUpRight size={13} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
