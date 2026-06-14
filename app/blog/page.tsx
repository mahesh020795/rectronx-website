import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogClient from "./BlogClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FYP Blog & Tutorials | Arduino, ESP32, IoT Guides — Rectronx Malaysia",
  description:
    "Free Final Year Project guides and tutorials for Malaysian students. Arduino, ESP32, Raspberry Pi, IoT project ideas, FYP topic selection, documentation tips and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "FYP Blog & Tutorials | Rectronx Circuits",
    description:
      "Free Final Year Project guides and tutorials for Malaysian students — Arduino, ESP32, IoT, and software.",
    url: "https://rectronx.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://rectronx.com" },
          { name: "Blog", url: "https://rectronx.com/blog" },
        ])}
      />
      <BlogClient posts={posts} />
    </>
  );
}
