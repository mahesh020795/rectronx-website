import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema, serviceSchema } from "@/lib/schema";
import { getAllServicePages } from "@/lib/services";

const BASE = "https://rectronx.com";

export const metadata: Metadata = {
  title: {
    absolute: "FYP Project Services Malaysia | Rectronx",
  },
  description:
    "Rectronx services for FYP project support in Malaysia and Penang: IoT, ESP32, Arduino, software, website, app and AI/ML project planning.",
  keywords: [
    "fyp project services malaysia",
    "fyp project penang",
    "iot project malaysia",
    "esp32 project malaysia",
    "arduino project malaysia",
    "software fyp malaysia",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "FYP Project Services Malaysia | Rectronx",
    description:
      "Clean service hub for Rectronx FYP support: Malaysia, Penang, IoT, ESP32, Arduino, software, website, app and AI/ML projects.",
    url: `${BASE}/services`,
    type: "website",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Rectronx FYP Project Services" }],
  },
};

export default function ServicesPage() {
  const services = getAllServicePages();

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: BASE },
            { name: "Services", url: `${BASE}/services` },
          ]),
          itemListSchema(
            services.map((service, index) => ({
              name: service.title,
              url: `${BASE}/services/${service.slug}`,
              position: index + 1,
            }))
          ),
          serviceSchema({
            name: "FYP Project Services Malaysia",
            description:
              "Final year project support for Malaysian students across IoT, embedded systems, software, apps and AI/ML.",
            url: `${BASE}/services`,
            areaServed: ["Malaysia", "Penang"],
          }),
        ]}
      />

      <section className="bg-brand-navy px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Services
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            FYP Project Support for Malaysia Students
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            A cleaner home for Rectronx services: local FYP guidance, IoT builds,
            ESP32 and Arduino projects, software systems, apps and AI/ML prototypes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary">
              Browse Project Ideas <ArrowUpRight size={14} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Discuss a Project <MessageCircle size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-blue hover:shadow-md"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
                {service.eyebrow}
              </p>
              <h2 className="text-xl font-bold text-brand-navy">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <MapPin size={15} className="text-brand-blue" />
                {service.location}
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-blue">
                View service page
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            "Pages stay inside /services, so the structure stays clean.",
            "Catalog remains the project database and continues to hold the 500+ titles.",
            "Each service page links back to related topics, components and project ideas.",
          ].map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <p className="text-sm leading-6 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
