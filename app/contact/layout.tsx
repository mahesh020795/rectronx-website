import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Rectronx | Free FYP Quote via WhatsApp — Penang Malaysia",
  description:
    "Contact Rectronx Circuits for your Final Year Project or commercial software. Get a free quote via WhatsApp within 2 hours. Based in Penang, Malaysia. Open Mon–Fri 9am–10pm MYT.",
  keywords: ["contact rectronx", "FYP quote malaysia", "whatsapp FYP help", "final year project quote penang"],
  alternates: { canonical: "/contact", languages: { "en-MY": "https://rectronx.com/contact" } },
  openGraph: {
    title: "Contact Rectronx Circuits — Free FYP Quote in 2 Hours",
    description:
      "Get a free quote for your Final Year Project or software via WhatsApp within 2 hours. Based in Penang, Malaysia.",
    url: "https://rectronx.com/contact",
    type: "website",
    images: [{ url: "https://rectronx.com/og-image.png", width: 1200, height: 630, alt: "Contact Rectronx Circuits" }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: "https://rectronx.com" },
        { name: "Contact", url: "https://rectronx.com/contact" },
      ])} />
      <JsonLd schema={contactPageSchema()} />
      {children}
    </>
  );
}
