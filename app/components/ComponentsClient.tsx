"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Cpu,
  Gauge,
  MessageCircle,
  Search,
  Shield,
  Tag,
} from "lucide-react";
import { componentCategories, ComponentCategory, ComponentGuide } from "@/data/components";
import { trackWhatsAppLead } from "@/lib/analytics";
import { componentImagePath } from "@/lib/components";

type CategoryFilter = "all" | ComponentCategory;

const categoryColors: Record<ComponentCategory, string> = {
  microcontrollers: "bg-blue-100 text-blue-700",
  sensors: "bg-emerald-100 text-emerald-700",
  displays: "bg-violet-100 text-violet-700",
  wireless: "bg-sky-100 text-sky-700",
  power: "bg-amber-100 text-amber-700",
  drivers: "bg-rose-100 text-rose-700",
  actuators: "bg-orange-100 text-orange-700",
};

const interfaceFilters = ["Analog", "I2C", "SPI", "UART", "GPIO", "WiFi"];

function waLink() {
  const msg = encodeURIComponent(
    "Hi Rectronx! I found the Components section and need help choosing parts for my FYP."
  );
  return `https://wa.me/601172792500?text=${msg}`;
}

export default function ComponentsClient({ components }: { components: ComponentGuide[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [activeInterface, setActiveInterface] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return components.filter((component) => {
      const matchesCategory = category === "all" || component.category === category;
      const matchesInterface =
        !activeInterface ||
        component.interfaces.some((item) => item.toLowerCase().includes(activeInterface.toLowerCase()));
      const haystack = [
        component.name,
        component.shortName,
        component.categoryLabel,
        component.tagline,
        component.description,
        ...component.interfaces,
        ...component.compatibleWith,
        ...component.suitableFor,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && matchesInterface && (!q || haystack.includes(q));
    });
  }, [activeInterface, category, components, searchQuery]);

  const categoryCounts = componentCategories.map((item) => ({
    ...item,
    count: components.filter((component) => component.category === item.slug).length,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pt-16 text-slate-900">
      <section className="bg-[#080E1A] px-4 pb-16 pt-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="eyebrow">Rectronx Components</span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Electronics component database for Malaysian FYP projects
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              Search practical guides for ESP32, Arduino, sensors, GSM, RFID, displays and modules. Get specs,
              wiring notes, common mistakes, alternatives and project ideas in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppLead("components_hero")}
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1ebe5d]"
              >
                <MessageCircle size={18} />
                Ask for FYP component advice
              </a>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                Browse FYP titles
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <Cpu className="mb-3 text-brand-blue" size={22} />
              <p className="text-2xl font-extrabold text-white">{components.length}</p>
              <p className="text-sm text-slate-400">starter component guides</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <Shield className="mb-3 text-brand-blue" size={22} />
              <p className="text-2xl font-extrabold text-white">Mistakes</p>
              <p className="text-sm text-slate-400">real engineering notes, not brochure copy</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <Gauge className="mb-3 text-brand-blue" size={22} />
              <p className="text-2xl font-extrabold text-white">FYP linked</p>
              <p className="text-sm text-slate-400">components connect to project ideas and blogs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search ESP32, MQ135, RFID, gas sensor, I2C, GSM..."
              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category === "all"
                  ? "bg-brand-blue text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            {categoryCounts.map((item) => (
              <button
                key={item.slug}
                onClick={() => setCategory(item.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  category === item.slug
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Tag size={14} />
              Interface
            </span>
            {interfaceFilters.map((item) => (
              <button
                key={item}
                onClick={() => setActiveInterface((current) => (current === item ? null : item))}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  activeInterface === item
                    ? "bg-brand-navy text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="mb-6 text-sm text-slate-500">
          Showing <span className="font-bold text-slate-700">{filtered.length}</span> of{" "}
          <span className="font-bold text-slate-700">{components.length}</span> components
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600">No component found. Ask Rectronx and we can recommend a part for your FYP.</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead("components_no_results")}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe5d]"
            >
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((component) => (
              <Link
                key={component.slug}
                href={`/components/${component.slug}`}
                className="group flex min-h-[280px] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[component.category]}`}>
                    {component.categoryLabel}
                  </span>
                  <span className="text-sm font-bold text-amber-500">{component.rating.toFixed(1)}/5</span>
                </div>

                <div className="mt-5 flex h-36 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 text-center">
                  <Image
                    src={componentImagePath(component)}
                    alt={component.imageHint}
                    width={640}
                    height={420}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h2 className="mt-5 text-lg font-extrabold text-brand-navy group-hover:text-brand-blue">
                  {component.name}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{component.tagline}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {component.compatibleWith.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-sm font-bold text-slate-700">{component.priceRange}</span>
                  <span className="text-sm font-bold text-brand-blue">View guide</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
