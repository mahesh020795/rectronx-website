import { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getAllTopicHubs, getTopicCatalogProjects } from "@/lib/topics";

const BASE = "https://rectronx.com";

export const metadata: Metadata = {
  title: {
    absolute: "Engineering Topic Hubs | ESP32, Arduino, IoT, AI & Raspberry Pi",
  },
  description:
    "Explore Rectronx engineering topic hubs for ESP32, Arduino, Raspberry Pi, IoT, AI/ML, software FYP, Firebase, Blynk, LoRa, MQTT, STM32 and PCB design.",
  alternates: { canonical: "/topics" },
};

export default function TopicsPage() {
  const topics = getAllTopicHubs();

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: BASE },
          { name: "Topics", url: `${BASE}/topics` },
        ])}
      />
      <JsonLd
        schema={itemListSchema(
          topics.map((topic, index) => ({
            name: topic.title,
            url: `${BASE}/topics/${topic.slug}`,
            position: index + 1,
          }))
        )}
      />

      <section className="bg-brand-navy px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Topic Hubs
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Engineering FYP Topics, Components and Project Ideas
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Browse focused clusters for high-value engineering searches. Each hub connects
            catalog titles, component guides, blog articles and practical scope notes.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {topics.map((topic) => {
          const count = getTopicCatalogProjects(topic, 1000).length;
          return (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-blue hover:shadow-md"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
                {topic.eyebrow}
              </p>
              <h2 className="text-xl font-bold text-brand-navy">{topic.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{topic.description}</p>
              <p className="mt-5 text-sm font-semibold text-slate-500">
                {count} related catalog titles
              </p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
