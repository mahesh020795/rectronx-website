import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        date: data.date,
        readTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Maps a post to a relevant hero image + descriptive alt text based on its
// slug keywords. Descriptive, unique images improve image SEO and relevance.
export function getPostImage(slug: string): { url: string; alt: string } {
  const map: { match: RegExp; url: string; alt: string }[] = [
    { match: /esp32/, url: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&q=80", alt: "ESP32 microcontroller development board for IoT projects" },
    { match: /arduino/, url: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=1200&q=80", alt: "Arduino board with wires and electronic components" },
    { match: /raspberry-pi/, url: "https://images.unsplash.com/photo-1610548822783-c4e2e7a93f9f?w=1200&q=80", alt: "Raspberry Pi single-board computer for engineering projects" },
    { match: /parking/, url: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80", alt: "Smart parking system with sensors and indicators" },
    { match: /attendance|rfid/, url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80", alt: "RFID attendance system access control terminal" },
    { match: /gas|detector/, url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80", alt: "Gas sensor and electronic detection circuit" },
    { match: /home-automation|blynk/, url: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80", alt: "Smart home automation control dashboard" },
    { match: /flask|python|web/, url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80", alt: "Python Flask web application code on a screen" },
    { match: /documentation|mistakes|budget|cost|topic|guide|malaysia/, url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80", alt: "Engineering student planning a final year project" },
    { match: /iot|projek/, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", alt: "IoT electronics and connected devices" },
  ];
  const found = map.find((m) => m.match.test(slug));
  return (
    found ?? {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
      alt: "Rectronx Circuits final year project",
    }
  );
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    date: data.date,
    readTime: readingTime(content).text,
    content,
  };
}
