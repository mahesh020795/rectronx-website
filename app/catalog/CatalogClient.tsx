"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";
import { allCatalogProjects, iotProjects, softwareProjects, totalCount } from "@/data/projects";
import { trackWhatsAppLead } from "@/lib/analytics";
import { getComponentByTag } from "@/lib/components";
import { getCatalogProjectSlug } from "@/lib/catalog";
import { topicHubs } from "@/data/topics";

type Category = "all" | "iot" | "software";

const categoryLabels: Record<Category, string> = {
  all: "All",
  iot: "IoT & Embedded",
  software: "Software",
};

const techFilters: Record<Category, string[]> = {
  all: ["Arduino", "ESP32", "Raspberry Pi", "Python", "PHP", "AI/ML", "RFID", "GSM", "GPS"],
  iot: ["Arduino", "ESP32", "Raspberry Pi", "RFID", "GSM", "GPS"],
  software: ["Python", "PHP", "AI/ML"],
};

const techFilterAliases: Record<string, string[]> = {
  "AI/ML": ["AI", "ML", "NLP", "OpenCV", "Chatbot", "Machine Learning"],
  "Raspberry Pi": ["Raspberry Pi", "Raspberry"],
};

const categoryColors: Record<string, string> = {
  iot: "bg-blue-100 text-blue-700",
  software: "bg-violet-100 text-violet-700",
};

const WA_NUMBER = "601172792500";

function waLink(title: string) {
  const msg = encodeURIComponent(
    `Hi Rectronx! I'm interested in the FYP title: "${title}". Can you help?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export default function CatalogClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let results = allCatalogProjects;

    // Filter by category
    if (activeCategory !== "all") {
      results = results.filter((p) => p.category === activeCategory);
    }

    // Filter by tech pill
    if (activeTech) {
      const techTerms = (techFilterAliases[activeTech] ?? [activeTech]).map((term) =>
        term.toLowerCase()
      );
      results = results.filter((p) =>
        p.tags.some((t) => techTerms.some((term) => t.toLowerCase().includes(term))) ||
        techTerms.some((term) => p.title.toLowerCase().includes(term))
      );
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return results;
  }, [searchQuery, activeCategory, activeTech]);

  const techPills = techFilters[activeCategory];

  function handleTechClick(tech: string) {
    setActiveTech((prev) => (prev === tech ? null : tech));
  }

  function handleCategoryChange(cat: Category) {
    setActiveCategory(cat);
    setActiveTech(null);
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      {/* Page Header */}
      <section className="bg-brand-navy pt-14 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-blue mb-3">
            Project Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            500+ FYP Project Titles
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Browse our full catalog of Final Year Project titles. Find your topic, then contact us to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">{totalCount}</span>
              <span className="text-slate-400">Titles</span>
            </div>
            <div className="w-px bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">{iotProjects.length}</span>
              <span className="text-slate-400">IoT &amp; Embedded</span>
            </div>
            <div className="w-px bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">{softwareProjects.length}</span>
              <span className="text-slate-400">Software &amp; AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, technology, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "iot", "software"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Tech filter pills */}
          <div className="flex gap-2 flex-wrap">
            {techPills.map((tech) => (
              <button
                key={tech}
                onClick={() => handleTechClick(tech)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTech === tech
                    ? "bg-brand-navy text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {topicHubs.slice(0, 8).map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 hover:border-brand-blue hover:text-brand-blue"
              >
                {topic.title.replace(" Malaysia", "")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Count */}
        <p className="text-sm text-slate-500 mb-6">
          Showing{" "}
          <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{totalCount}</span>{" "}
          titles
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 mb-4">
              No projects found. Try a different search or contact us on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead("catalog_no_results")}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                {/* Category badge */}
                <span
                  className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    categoryColors[project.category]
                  }`}
                >
                  {project.category === "iot" ? "IoT & Embedded" : "Software"}
                </span>

                {/* Title */}
                <h3 className="text-sm font-semibold leading-snug line-clamp-2 flex-1">
                  <Link
                    href={`/catalog/${getCatalogProjectSlug(project)}`}
                    className="text-brand-navy hover:text-brand-blue transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => {
                    const component = getComponentByTag(tag);
                    const className =
                      "text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full";

                    return component ? (
                      <Link
                        key={tag}
                        href={`/components/${component.slug}`}
                        className={`${className} hover:bg-blue-100 hover:text-brand-blue`}
                      >
                        {tag}
                      </Link>
                    ) : (
                      <span key={tag} className={className}>
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                  <Link
                    href={`/catalog/${getCatalogProjectSlug(project)}`}
                    className="text-sm font-semibold text-brand-blue hover:text-brand-navy transition-colors"
                  >
                    View Details
                  </Link>
                  <a
                    href={waLink(project.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppLead("catalog_project_card")}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#25D366] hover:text-[#1ebe5d] transition-colors"
                  >
                    <MessageCircle size={14} />
                    Get This
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-brand-navy text-center px-6 py-12">
          <p className="text-white text-lg font-semibold mb-2">
            Can&apos;t find your title? We build custom FYPs too.
          </p>
          <p className="text-slate-400 text-sm mb-6">
            Tell us your requirements and we&apos;ll propose a unique project for you.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hi Rectronx! I need a custom FYP. Can you help?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead("catalog_bottom_cta")}
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#1ebe5d] transition-colors shadow-sm"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
