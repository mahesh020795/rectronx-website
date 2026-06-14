import { Metadata } from "next";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Rectronx Circuits — Penang's FYP Projects & Engineering & Technology Company",
  description:
    "Custom Final Year Projects in IoT, Arduino, ESP32, Raspberry Pi & Software. Penang's trusted engineering & technology company. Free quote via WhatsApp. Projek Akhir Tahun Malaysia.",
};
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HowItWorks from "@/components/home/HowItWorks";
import WhatsIncluded from "@/components/home/WhatsIncluded";
import FAQ from "@/components/home/FAQ";
import BlogPreview from "@/components/home/BlogPreview";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
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
