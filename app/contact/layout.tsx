import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Rectronx | Get a Free FYP Quote",
  description:
    "Contact Rectronx for your Final Year Project or software needs. Get a free quote via WhatsApp within 24 hours. Based in Malaysia.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
