import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Rectronx — Tech Studio | FYP Projects & Software Products",
    template: "%s | Rectronx",
  },
  description:
    "Rectronx is a tech studio based in Malaysia. We build software products and deliver custom Final Year Projects in IoT, Arduino, Raspberry Pi, and more.",
  keywords: [
    "final year project malaysia",
    "projek akhir tahun",
    "FYP malaysia",
    "IoT project malaysia",
    "arduino project",
    "raspberry pi project",
    "tech studio malaysia",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
