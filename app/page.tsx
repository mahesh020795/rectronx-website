import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "Rectronx Circuits | FYP Projects Malaysia",
  },
  description:
    "Custom FYP projects in Malaysia: IoT, Arduino, ESP32, Raspberry Pi and software. 400+ delivered from Penang. Free WhatsApp quote in 2 hours.",
  keywords: [
    "final year project malaysia",
    "FYP malaysia",
    "projek akhir tahun",
    "FYP penang",
    "final year project penang",
    "IoT final year project",
    "arduino project malaysia",
    "ESP32 project malaysia",
    "raspberry pi project malaysia",
    "projek FYP",
    "engineering project malaysia",
    "Rectronx Circuits",
  ],
  alternates: {
    canonical: "https://rectronx.com",
    languages: { "en-MY": "https://rectronx.com" },
  },
};

const faqs = [
  { q: "How does it work?", a: "WhatsApp us your FYP title, university requirements, and deadline. We send a free quote within 2 hours. Once confirmed, we build and send progress updates throughout." },
  { q: "Is my project information kept private?", a: "Yes — full confidentiality. We don't share your project details, requirements, or personal information with anyone." },
  { q: "How long does it take?", a: "Most IoT and Arduino projects take 1–2 weeks. Software-heavy or complex systems may take 2–4 weeks. Tell us your deadline and we'll plan accordingly." },
  { q: "What if I need changes after delivery?", a: "Before we start, we lock in the full scope together. If something isn't working as agreed, we'll fix it. New requirements added after the build starts are quoted separately." },
  { q: "Do I get source code and documentation?", a: "Yes. Every project comes with full source code, circuit diagrams (if applicable), and a documentation report you can use as the base of your FYP write-up." },
  { q: "What types of projects do you handle?", a: "IoT (ESP32, NodeMCU, Arduino), Raspberry Pi, Python/Flask, React/Next.js web apps, mobile apps, and more. If unsure, just ask." },
  { q: "How much does it cost?", a: "Depends on complexity, components, and timeline. Simple Arduino projects start lower; full IoT systems with web dashboards are higher. WhatsApp us for an honest quote with no hidden costs." },
  { q: "Do you provide support after delivery?", a: "Yes. We explain how everything works — circuit logic, sensor setup, and code flow — so you fully understand what was built." },
];

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const WhatsIncluded = dynamic(() => import("@/components/home/WhatsIncluded"));
const Services = dynamic(() => import("@/components/home/Services"));
const Products = dynamic(() => import("@/components/home/Products"));
const FeaturedProjects = dynamic(() => import("@/components/home/FeaturedProjects"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const BlogPreview = dynamic(() => import("@/components/home/BlogPreview"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));

export default function HomePage() {
  return (
    <>
      {/* Server-side structured data for Google rich results */}
      <JsonLd schema={faqSchema(faqs)} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: "https://rectronx.com" }])} />
      <Hero />
      <HowItWorks />
      <WhatsIncluded />
      <Services />
      <Products />
      <FeaturedProjects />
      <FAQ />
      <Testimonials />
      <BlogPreview />
      <CallToAction />
    </>
  );
}
