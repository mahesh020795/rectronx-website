import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://rectronx.com"),
  title: {
    default: "Rectronx Circuits — Engineering & Technology Company | FYP Projects & Commercial Software",
    template: "%s | Rectronx Circuits",
  },
  description:
    "Rectronx Circuits is Penang's engineering & technology company for Final Year Projects and commercial software products. Custom IoT, Arduino, ESP32, Raspberry Pi FYP solutions. Get your FYP done right.",
  keywords: [
    "final year project malaysia",
    "FYP malaysia",
    "projek akhir tahun",
    "IoT project malaysia",
    "arduino project malaysia",
    "engineering & technology company penang",
    "Rectronx Circuits",
    "esp32 project",
    "raspberry pi project malaysia",
    "software development penang",
    "commercial software malaysia",
  ],
  authors: [{ name: "Rectronx Circuits" }],
  creator: "Rectronx Circuits",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://rectronx.com",
    siteName: "Rectronx Circuits",
    title: "Rectronx Circuits — Engineering & Technology Company | FYP Projects & Commercial Software",
    description:
      "We build commercial software products and deliver custom Final Year Projects in IoT, Arduino, Raspberry Pi, and more. Based in Penang, Malaysia.",
    images: [
      {
        url: "https://rectronx.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rectronx Circuits — Penang Engineering & Technology Company for FYP & Commercial Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rectronx Circuits — Engineering & Technology Company",
    description: "FYP Projects & Commercial Software from Penang, Malaysia",
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
  name: "Rectronx Circuits",
  url: "https://rectronx.com",
  logo: "https://rectronx.com/logo.png",
  description:
    "Penang engineering & technology company for Final Year Projects and commercial software products",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1-3-8, BL Business Centre, Solok Thean Tek",
    addressLocality: "Ayer Itam",
    postalCode: "11500",
    addressRegion: "Pulau Pinang",
    addressCountry: "MY",
  },
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
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
