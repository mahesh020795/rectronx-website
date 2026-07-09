import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllComponents } from "@/lib/components";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rectronx.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date("2026-06-18"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/catalog`, lastModified: new Date("2026-06-18"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/components`, lastModified: new Date("2026-07-10"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/projects`, lastModified: new Date("2026-06-18"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/products`, lastModified: new Date("2026-06-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date("2026-06-18"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date("2026-06-18"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date("2026-06-18"), changeFrequency: "monthly", priority: 0.7 },
  ];

  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const componentPages: MetadataRoute.Sitemap = getAllComponents().map((component) => ({
    url: `${base}/components/${component.slug}`,
    lastModified: new Date(component.updatedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...blogPages, ...componentPages];
}
