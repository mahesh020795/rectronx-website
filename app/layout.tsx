import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://rectronx.com"),
  title: {
    default: "Rectronx — Tech Studio | FYP Projects & Software Products",
    template: "%s | Rectronx",
  },
  description:
    "Rectronx is Malaysia's tech studio for Final Year Projects and software products. Custom IoT, Arduino, ESP32, Raspberry Pi FYP solutions. Get your FYP done right.",
  keywords: [
    "final year project malaysia",
    "FYP malaysia",
    "projek akhir tahun",
    "IoT project malaysia",
    "arduino project malaysia",
    "tech studio malaysia",
    "Rectronx",
    "esp32 project",
    "raspberry pi project malaysia",
    "software development malaysia",
  ],
  authors: [{ name: "Rectronx" }],
  creator: "Rectronx",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://rectronx.com",
    siteName: "Rectronx",
    title: "Rectronx — Tech Studio | FYP Projects & Software Products",
    description:
      "We build software products and deliver custom Final Year Projects in IoT, Arduino, Raspberry Pi, and more.",
    images: [
      {
        url: "https://rectronx.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rectronx — Malaysia's Tech Studio for FYP & Software Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rectronx — Tech Studio",
    description: "FYP Projects & Software Products from Malaysia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rectronx",
  url: "https://rectronx.com",
  logo: "https://rectronx.com/logo.png",
  description:
    "Malaysia tech studio for Final Year Projects and software products",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+60-11-72792500",
    contactType: "customer service",
    availableLanguage: ["English", "Malay"],
  },
  sameAs: [
    "https://www.facebook.com/rectronx.circuits",
    "https://www.instagram.com/rectronx.circuits",
    "https://www.tiktok.com/@rectronxcircuits",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
