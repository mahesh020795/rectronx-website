import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Rectronx | Get a Free FYP Quote",
  description:
    "Contact Rectronx for your Final Year Project or software needs. Get a free quote via WhatsApp within 24 hours. Based in Penang, Malaysia.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Rectronx Circuits — Free FYP Quote",
    description:
      "Get a free quote for your Final Year Project or software via WhatsApp within 24 hours. Based in Penang, Malaysia.",
    url: "https://rectronx.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
