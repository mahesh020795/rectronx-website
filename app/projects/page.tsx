import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "FYP Projects Portfolio | Arduino, IoT & Software — Rectronx Malaysia",
  description:
    "Browse 400+ Final Year Projects delivered across Malaysia. IoT, Arduino, ESP32, Raspberry Pi, Software & Robotics FYP solutions with full documentation.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
