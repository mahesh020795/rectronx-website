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
    { match: /2026|ideas|30|idea-projek|projek-akhir/, url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80", alt: "Engineering students brainstorming final year project ideas" },
    { match: /2-weeks|2minggu|running|deadline|cara-siapkan/, url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80", alt: "Student working under deadline pressure on a laptop" },
    { match: /documentation|mistakes|budget|cost|topic|guide|malaysia/, url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80", alt: "Engineering student planning a final year project" },
    { match: /jatuh|fall-detection|orang-tua/, url: "https://images.unsplash.com/photo-1576765608622-067973a79f53?w=1200&q=80", alt: "Wearable IoT fall detection device for elderly care" },
    { match: /tong-sampah|sampah|waste/, url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80", alt: "Smart waste bin sensor monitoring system" },
    { match: /kebocoran-air|water-leak|solenoid/, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", alt: "Water pipe leak detection and solenoid valve control system" },
    { match: /pendingin-hawa|aircond|hvac|predictive/, url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80", alt: "Air conditioner predictive maintenance IoT sensor system" },
    { match: /lpg|kebakaran|flame|mq-2/, url: "https://images.unsplash.com/photo-1558618047-f0b7cfa3fc04?w=1200&q=80", alt: "LPG gas and fire detection safety system" },
    { match: /banjir|flood|paras-air/, url: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=1200&q=80", alt: "Flood early warning water level monitoring system" },
    { match: /bilik-darjah|tenaga|automasi-tenaga/, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", alt: "Smart classroom energy management automation system" },
    { match: /pencahayaan-jalan|trafik|street/, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", alt: "Smart street lighting and traffic monitoring system" },
    { match: /pertanian|farming|pengairan/, url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80", alt: "Smart farming soil moisture and irrigation automation" },
    { match: /udara|kualiti-udara|pm25|pencemaran/, url: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1200&q=80", alt: "Air quality monitoring sensor system for pollution detection" },
    { match: /pesakit|healthcare|vital|spo2|max30102/, url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80", alt: "IoT patient health monitoring vital signs system" },
    { match: /kualiti-air|sungai|tasik|water-quality|ph-sensor/, url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80", alt: "River water quality monitoring IoT sensor buoy" },
    { match: /transformer|lorawan|lora|power-engineering/, url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80", alt: "Electrical transformer monitoring with LoRa IoT system" },
    { match: /makanan|food|kerosakan-makanan/, url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80", alt: "Food spoilage detection sensor monitoring system" },
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
