"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    slug: "how-to-choose-fyp-topic",
    title: "How to choose the right final year project topic",
    excerpt: "A practical framework to pick a topic that impresses your supervisor and is actually doable.",
    category: "FYP Guide",
    readTime: "5 min",
    date: "Jun 2025",
  },
  {
    slug: "arduino-vs-raspberry-pi",
    title: "Arduino vs Raspberry Pi: which should you use?",
    excerpt: "Two popular FYP platforms, very different use cases. We break down which one fits your project.",
    category: "Tutorial",
    readTime: "7 min",
    date: "May 2025",
  },
  {
    slug: "iot-project-ideas-2025",
    title: "10 IoT project ideas that will impress your examiner",
    excerpt: "Curated ideas with real impact, achievable scope, and the technical depth examiners look for.",
    category: "Ideas",
    readTime: "6 min",
    date: "Apr 2025",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 sm:py-32 bg-[#080E1A] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="eyebrow mb-3">Knowledge base</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-[-0.03em] text-white">
              Guides & tutorials.
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/40 hover:text-white transition-colors shrink-0">
            All articles <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-[#080E1A] p-8 hover:bg-white/[0.03] transition-colors duration-200 min-h-[280px]">
                <div className="flex items-center justify-between mb-8">
                  <span className="eyebrow">{post.category}</span>
                  <span className="text-white/20 text-xs font-medium">{post.date}</span>
                </div>
                <h3 className="text-lg font-extrabold text-white uppercase tracking-[-0.01em] leading-snug mb-3 group-hover:text-brand-blue transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <span className="text-white/20 text-xs">{post.readTime} read</span>
                  <span className="inline-flex items-center gap-1 text-brand-blue text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    Read <ArrowUpRight size={11} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
