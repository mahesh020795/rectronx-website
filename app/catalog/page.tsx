import { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FYP Project Catalog — 500+ Titles | Arduino, ESP32, IoT, Software",
  description:
    "Search 500+ Final Year Project titles in IoT, Arduino, ESP32, Electronics, Software & AI. Find your perfect FYP topic, then get it built by Rectronx Circuits in Penang.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    title: "FYP Project Catalog — 500+ Titles | Rectronx Circuits",
    description:
      "Search 500+ Final Year Project titles in IoT, Arduino, ESP32, Software & AI. Find your FYP topic.",
    url: "https://rectronx.com/catalog",
    type: "website",
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
