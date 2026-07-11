"use client";

import { useState } from "react";
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
};

const categoryColors: Record<string, { pill: string; bar: string }> = {
  "FYP Guide": { pill: "bg-blue-50 text-blue-700", bar: "bg-[#2B7FD4]" },
  Tutorial: { pill: "bg-violet-50 text-violet-700", bar: "bg-violet-500" },
  "Tutorial Projek Akhir Tahun": { pill: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" },
  "Panduan Projek Akhir Tahun": { pill: "bg-cyan-50 text-cyan-700", bar: "bg-cyan-500" },
  Ideas: { pill: "bg-amber-50 text-amber-700", bar: "bg-amber-500" },
};

const CATEGORY_ORDER = [
  "FYP Guide",
  "Panduan Projek Akhir Tahun",
  "Tutorial Projek Akhir Tahun",
  "Tutorial",
  "Ideas",
];

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState("All");

  const featured = posts[0];
  const rest = posts.slice(1);
  const filterTabs = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))).sort((a, b) => {
      const aIndex = CATEGORY_ORDER.indexOf(a);
      const bIndex = CATEGORY_ORDER.indexOf(b);
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }),
  ];
  const gridPosts = rest.filter(
    (p) => active === "All" || p.category === active
  );

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Page header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2B7FD4] bg-blue-50 px-3 py-1 rounded-full mb-3">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] tracking-tight">
            FYP Blog &amp; Tutorials
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
            Free, practical guides to help Malaysian engineering students plan,
            build, and present their Final Year Projects — Arduino, ESP32, IoT,
            and software.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="block mb-14 group">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col md:flex-row border-l-4 border-l-[#2B7FD4] hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-48 md:hidden overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80"
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 w-fit ${
                    categoryColors[featured.category]?.pill ??
                    "bg-slate-100 text-slate-500"
                  }`}
                >
                  {featured.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E] leading-tight mb-4 group-hover:text-[#2B7FD4] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6 max-w-xl">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {featured.readTime}
                  </span>
                  <span>{featured.date}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#2B7FD4] text-white text-sm font-semibold px-5 py-2.5 rounded-lg w-fit group-hover:bg-[#1a6abf] transition-colors">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
              <div className="hidden md:block md:w-[40%] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80"
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Filter bar */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 flex-nowrap sm:flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap shrink-0 ${
                active === tab
                  ? "bg-[#2B7FD4] text-white border-[#2B7FD4]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#2B7FD4] hover:text-[#2B7FD4]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gridPosts.map((post) => {
            const colors = categoryColors[post.category];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-200"
              >
                <div className={`h-1 w-full ${colors?.bar ?? "bg-[#2B7FD4]"}`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        colors?.pill ?? "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] text-[17px] leading-snug mb-3 line-clamp-2 group-hover:text-[#2B7FD4] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-xs text-slate-400">{post.date}</span>
                    <span className="flex items-center gap-1 text-[#2B7FD4] text-sm font-medium group-hover:gap-2 transition-all">
                      Read <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
