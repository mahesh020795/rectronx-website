import { Metadata } from "next";
import ComponentsClient from "./ComponentsClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getAllComponents } from "@/lib/components";

export const metadata: Metadata = {
  title: {
    absolute: "Electronics Components Database Malaysia | Rectronx Components",
  },
  description:
    "Search electronics components for Malaysian FYP projects: ESP32, Arduino, MQ135, RFID, GSM, sensors, displays, wiring notes, common mistakes and project ideas.",
  keywords: [
    "electronics components malaysia",
    "FYP components",
    "ESP32 Malaysia",
    "Arduino sensors Malaysia",
    "IoT components FYP",
    "MQ135 ESP32 wiring",
    "RFID Arduino project",
  ],
  alternates: {
    canonical: "/components",
    languages: { "en-MY": "https://rectronx.com/components" },
  },
  openGraph: {
    title: "Rectronx Components - Electronics Component Database for FYP",
    description:
      "Find specs, pinouts, wiring notes, mistakes and project ideas for electronics components used in Malaysian FYP projects.",
    url: "https://rectronx.com/components",
    type: "website",
    images: [
      {
        url: "https://rectronx.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rectronx Components electronics database",
      },
    ],
  },
};

export default function ComponentsPage() {
  const components = getAllComponents();

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "https://rectronx.com" },
            { name: "Components", url: "https://rectronx.com/components" },
          ]),
          itemListSchema(
            components.map((component, index) => ({
              name: component.name,
              url: `https://rectronx.com/components/${component.slug}`,
              position: index + 1,
            }))
          ),
        ]}
      />
      <ComponentsClient components={components} />
    </>
  );
}
