"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    slug: "how-to-choose-fyp-topic",
    title: "How to choose the right final year project topic",
    excerpt:
      "Choosing your FYP topic is the most important decision of your final year. Here's a practical framework to pick a topic that impresses your supervisor and is actually doable.",
    category: "FYP Guide",
    readTime: "5 min",
    date: "Jun 2025",
  },
  {
    slug: "arduino-vs-raspberry-pi",
    title: "Arduino vs Raspberry Pi: which should you use for your FYP?",
    excerpt:
      "Two of the most popular platforms for engineering FYPs — but they're very different. We break down which one fits your project type.",
    category: "Tutorial",
    readTime: "7 min",
    date: "May 2025",
  },
  {
    slug: "iot-project-ideas-2025",
    title: "10 IoT project ideas that will impress your examiner",
    excerpt:
      "A curated list of IoT ideas with real impact, achievable scope, and the technical depth examiners look for.",
    category: "Ideas",
    readTime: "6 min",
    date: "Apr 2025",
  },
];

const categoryStyle: Record<string, { bg: string; color: string }> = {
  "FYP Guide": { bg: "rgba(43,127,212,0.1)", color: "#2B7FD4" },
  Tutorial: { bg: "rgba(124,58,237,0.1)", color: "#7c3aed" },
  Ideas: { bg: "rgba(217,119,6,0.1)", color: "#d97706" },
};

export default function BlogPreview() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-5">
          <div>
            <span className="section-label-pill mb-4 inline-flex">Knowledge base</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-mid tracking-[-0.02em]">
              Guides & tutorials
            </h2>
          </div>
          <Link
            href="/blog"
            className="btn-secondary shrink-0 text-sm"
          >
            All articles <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => {
            const style = categoryStyle[post.category] || { bg: "rgba(100,100,100,0.1)", color: "#666" };
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl p-6 border border-slate-100 hover-lift"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-lg tracking-wide uppercase"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Clock size={11} />
                      {post.readTime} read
                    </div>
                  </div>

                  <h3 className="font-bold text-brand-navy-mid leading-snug mb-3 group-hover:text-brand-blue transition-colors text-[0.95rem]">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-brand-blue text-xs font-semibold group-hover:gap-1.5 transition-all">
                      Read <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
