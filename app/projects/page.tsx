import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FYP Projects Portfolio | Arduino, IoT & Software — Rectronx Malaysia",
  description:
    "Browse 400+ Final Year Projects delivered across Malaysia. IoT, Arduino, ESP32, Raspberry Pi, Software & Robotics FYP solutions with full documentation.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "FYP Projects Portfolio — Rectronx Circuits",
    description:
      "400+ Final Year Projects delivered across Malaysia — IoT, Arduino, ESP32, Raspberry Pi, Software & Robotics.",
    url: "https://rectronx.com/projects",
    type: "website",
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
