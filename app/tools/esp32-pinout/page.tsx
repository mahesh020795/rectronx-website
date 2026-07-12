import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import Esp32PinoutTool from "./Esp32PinoutTool";

const faqs = [
  {
    q: "Which ESP32 GPIO pins are safest for beginner projects?",
    a: "GPIO21, GPIO22, GPIO23, GPIO19, GPIO18, GPIO16, GPIO17, GPIO32 and GPIO33 are common choices for many ESP32 DevKit V1 projects, depending on the peripheral used.",
  },
  {
    q: "Which ESP32 pins should I be careful with during boot?",
    a: "GPIO0, GPIO2, GPIO5, GPIO12 and GPIO15 are strapping pins. External circuits on these pins can affect boot mode if they force the wrong level at startup.",
  },
  {
    q: "Can I use ESP32 ADC2 pins while WiFi is running?",
    a: "ADC2 pins can conflict with the WiFi driver on ESP32. For analog readings in WiFi projects, ADC1 pins are usually the safer choice.",
  },
  {
    q: "Are GPIO34 to GPIO39 output pins?",
    a: "No. GPIO34, GPIO35, GPIO36 and GPIO39 are input-only pins on ESP32 and should not be used to drive outputs.",
  },
];

export const metadata: Metadata = {
  title: "ESP32 Pinout Tool - Interactive GPIO Reference",
  description:
    "Interactive ESP32 DevKit V1 GPIO pinout tool with searchable pins, ADC, PWM, DAC, touch, boot strapping cautions, and practical notes for student IoT projects.",
  keywords: [
    "ESP32 pinout",
    "ESP32 GPIO tool",
    "ESP32 DevKit V1 pinout",
    "ESP32 ADC pins",
    "ESP32 boot pins",
    "ESP32 Malaysia",
    "IoT project Malaysia",
  ],
  alternates: { canonical: "/tools/esp32-pinout" },
  openGraph: {
    title: "ESP32 Pinout Tool - Interactive GPIO Reference",
    description:
      "Search and inspect ESP32 DevKit V1 GPIO pins, ADC channels, PWM, DAC, touch pins, and boot cautions.",
    url: "https://rectronx.com/tools/esp32-pinout",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ESP32 Pinout Tool",
  url: "https://rectronx.com/tools/esp32-pinout",
  applicationCategory: "EngineeringApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  description:
    "Interactive ESP32 DevKit V1 GPIO pinout reference for makers, students, and embedded systems projects.",
  publisher: {
    "@type": "Organization",
    name: "Rectronx Circuits",
    url: "https://rectronx.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MYR",
  },
};

export default function Esp32PinoutPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://rectronx.com" },
          { name: "Tools & Learning", url: "https://rectronx.com/topics" },
          { name: "ESP32 Pinout Tool", url: "https://rectronx.com/tools/esp32-pinout" },
        ])}
      />
      <JsonLd schema={webApplicationSchema} />
      <JsonLd schema={faqSchema(faqs)} />

      <Esp32PinoutTool />

      <section className="bg-[#050A14] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">Validated notes</p>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white">
            ESP32 pinout cautions that matter during real projects
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "GPIO0, GPIO2, GPIO5, GPIO12 and GPIO15 are boot strapping pins. Use them carefully.",
              "GPIO34, GPIO35, GPIO36 and GPIO39 are input-only. They cannot drive relays, LEDs, motors, or buzzers.",
              "ADC2 pins can conflict with WiFi. For WiFi sensor projects, prefer ADC1 pins for analog readings.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-white/70">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-6">
            <h3 className="text-xl font-bold text-white">Official references used</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              The caution notes are aligned with Espressif GPIO and ADC documentation. Always check the exact module and board clone before final PCB or hardware submission.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/components/esp32" className="btn-outline">ESP32 component page</Link>
              <Link href="/blog/esp32-getting-started" className="btn-outline">ESP32 guide</Link>
              <Link href="/contact" className="btn-primary">Ask Rectronx</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
