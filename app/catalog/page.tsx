import { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "500+ FYP Project Titles Malaysia | Rectronx",
  },
  description:
    "Search 500+ FYP project titles for Malaysia: IoT, Arduino, ESP32, electronics, software and AI. Pick a topic and get a free quote.",
  keywords: ["FYP project ideas malaysia", "final year project titles", "arduino project ideas", "ESP32 project ideas", "IoT FYP ideas", "FYP catalog malaysia", "projek akhir tahun ideas"],
  alternates: { canonical: "/catalog", languages: { "en-MY": "https://rectronx.com/catalog" } },
  openGraph: {
    title: "500+ FYP Project Titles — Arduino, ESP32, IoT, Software | Rectronx Circuits",
    description:
      "Search 500+ Final Year Project titles in IoT, Arduino, ESP32, Software & AI. Find your FYP topic.",
    url: "https://rectronx.com/catalog",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "FYP Project Catalog — 500+ Titles" }],
  },
};

export default function CatalogPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://rectronx.com" },
          { name: "Catalog", url: "https://rectronx.com/catalog" },
        ])}
      />
      <CatalogClient />
    </>
  );
}
