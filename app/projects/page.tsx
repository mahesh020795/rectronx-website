import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "FYP Projects Portfolio Malaysia | Rectronx",
  },
  description:
    "Browse FYP examples delivered by Rectronx across Malaysia: IoT, Arduino, ESP32, Raspberry Pi, software and robotics projects.",
  keywords: ["FYP portfolio malaysia", "final year project examples", "arduino FYP examples", "IoT project malaysia", "ESP32 FYP portfolio", "raspberry pi project examples"],
  alternates: { canonical: "/projects", languages: { "en-MY": "https://rectronx.com/projects" } },
  openGraph: {
    title: "400+ FYP Projects Delivered — Arduino, IoT, Software | Rectronx Circuits",
    description:
      "Browse 400+ Final Year Projects delivered across Malaysia — IoT, Arduino, ESP32, Raspberry Pi, Software & Robotics.",
    url: "https://rectronx.com/projects",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Rectronx FYP Projects Portfolio" }],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://rectronx.com" },
          { name: "Projects", url: "https://rectronx.com/projects" },
        ])}
      />
      <JsonLd
        schema={serviceSchema({
          name: "Final Year Project (FYP) Development",
          description:
            "Custom Final Year Project development for Malaysian university students — IoT, Arduino, ESP32, Raspberry Pi, software and robotics, with full documentation.",
        })}
      />
      <ProjectsClient />
    </>
  );
}
