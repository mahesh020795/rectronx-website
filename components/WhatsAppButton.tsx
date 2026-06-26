"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsAppLead } from "@/lib/analytics";

interface Props {
  label?: string;
  message?: string;
  className?: string;
  trackingSource?: string;
}

export default function WhatsAppButton({
  label = "Chat on WhatsApp",
  message = "Hi Rectronx, I'd like to know more.",
  className = "",
  trackingSource = "whatsapp_button",
}: Props) {
  const number = "601172792500";
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppLead(trackingSource)}
      className={`inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 ${className}`}
    >
      <MessageCircle size={16} />
      {label}
    </a>
  );
}
