import { Metadata } from "next";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Rectronx — Malaysia's FYP Projects & Tech Studio",
  description:
    "Custom Final Year Projects in IoT, Arduino, ESP32, Raspberry Pi & Software. Malaysia's trusted tech studio. Free quote via WhatsApp. Projek Akhir Tahun Malaysia.",
};
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import BlogPreview from "@/components/home/BlogPreview";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <FeaturedProjects />
      <BlogPreview />
      <CallToAction />
    </>
  );
}
