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

export function trackPlannerStarted() {
  trackEvent("planner_started", { tool: "fyp_project_planner" });
}

export function trackPlannerCompleted(preferenceCount: number, broadened: boolean) {
  trackEvent("planner_completed", {
    tool: "fyp_project_planner",
    preference_count: preferenceCount,
    broadened,
  });
}

export function trackPlannerRecommendationOpened(projectId: number) {
  trackEvent("recommendation_opened", {
    tool: "fyp_project_planner",
    project_id: projectId,
  });
}

export function trackPlannerLearningLinkOpened(projectId: number, linkType: string) {
  trackEvent("learning_link_opened", {
    tool: "fyp_project_planner",
    project_id: projectId,
    link_type: linkType,
  });
}

export function trackPlannerWhatsAppEnquiry(projectId: number) {
  trackEvent("whatsapp_enquiry_opened", {
    tool: "fyp_project_planner",
    project_id: projectId,
  });
  trackWhatsAppLead("fyp_project_planner");
}
