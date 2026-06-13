import Hero from "@/components/home/Hero";
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
