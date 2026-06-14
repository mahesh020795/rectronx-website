import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Rectronx Circuits — Penang's FYP Projects & Engineering & Technology Company",
  description:
    "Custom Final Year Projects in IoT, Arduino, ESP32, Raspberry Pi & Software. Penang's trusted engineering & technology company. Free quote via WhatsApp. Projek Akhir Tahun Malaysia.",
};

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
