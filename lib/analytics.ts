"use client";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: EventParams
    ) => void;
  }
}

function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackWhatsAppLead(source: string) {
  trackEvent("generate_lead", {
    method: "whatsapp",
    source,
  });
  trackEvent("whatsapp_click", {
    source,
  });
}

export function trackContactFormLead() {
  trackEvent("generate_lead", {
    method: "contact_form",
    source: "contact_page",
  });
  trackEvent("contact_form_submit", {
    source: "contact_page",
  });
}
