"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, FileText, MessageCircle, X, Zap } from "lucide-react";
import clsx from "clsx";
import {
  getPlannerLearningLinks,
  getPlannerTestingPriorities,
  getPlannerTimeRequired,
  recommendProjects,
  type PlannerPreferences,
  type PlannerProject,
} from "@/lib/fyp-planner";
import {
  trackPlannerCompleted,
  trackPlannerLearningLinkOpened,
  trackPlannerRecommendationOpened,
  trackPlannerStarted,
  trackPlannerWhatsAppEnquiry,
} from "@/lib/analytics";

const defaultPreferences: PlannerPreferences = {
  category: "either",
  technology: "any",
  difficulty: "any",
  duration: "any",
  outcome: "any",
};

const technologies = ["any", "ESP32", "Arduino", "Raspberry Pi", "Python", "PHP", "AI/ML", "RFID", "GSM", "GPS"];
const difficulties = ["any", "Beginner", "Intermediate", "Advanced"] as const;
const durations = ["any", "2-4", "4-8", "8-12"] as const;
const outcomes = [
  ["any", "No preference"],
  ["monitoring", "Monitoring"],
  ["alerting", "Alerting"],
  ["automation", "Automation"],
  ["tracking", "Tracking"],
  ["access-control", "Access control"],
  ["dashboard", "Dashboard"],
  ["computer-vision", "Computer vision"],
  ["application-workflow", "Application workflow"],
] as const;

export default function FypProjectPlanner({ projects }: { projects: PlannerProject[] }) {
  const [draft, setDraft] = useState<PlannerPreferences>(defaultPreferences);
  const [active, setActive] = useState<PlannerPreferences>(defaultPreferences);
  const started = useRef(false);
  const result = useMemo(() => recommendProjects(projects, active), [active, projects]);

  const update = <K extends keyof PlannerPreferences>(key: K, value: PlannerPreferences[K]) => {
    if (!started.current) {
      trackPlannerStarted();
      started.current = true;
    }
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = recommendProjects(projects, draft);
    setActive(draft);
    trackPlannerCompleted(preferenceCount(draft), next.broadened);
  };

  const reset = () => {
    setDraft(defaultPreferences);
    setActive(defaultPreferences);
  };

  return (
    <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:sticky lg:top-24"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-blue">Your preferences</p>
                <h2 className="mt-2 text-xl font-bold text-brand-navy">Define a workable scope</h2>
              </div>
              <Zap size={20} className="mt-1 text-brand-blue" aria-hidden="true" />
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-brand-navy">Category</legend>
              <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-slate-200 p-1">
                {[
                  ["either", "Either"],
                  ["iot", "IoT"],
                  ["software", "Software"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={draft.category === value}
                    onClick={() => update("category", value as PlannerPreferences["category"])}
                    className={clsx(
                      "rounded-md px-2 py-2 text-xs font-bold transition-colors",
                      draft.category === value
                        ? "bg-white text-brand-blue shadow-sm"
                        : "text-slate-500 hover:text-brand-navy",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 space-y-4">
              <SelectField
                label="Technology"
                value={draft.technology}
                onChange={(value) => update("technology", value)}
                options={technologies.map((value) => ({ value, label: value === "any" ? "No preference" : value }))}
              />
              <SelectField
                label="Difficulty"
                value={draft.difficulty}
                onChange={(value) => update("difficulty", value as PlannerPreferences["difficulty"])}
                options={difficulties.map((value) => ({ value, label: value === "any" ? "No preference" : value }))}
              />
              <SelectField
                label="Available duration"
                value={draft.duration}
                onChange={(value) => update("duration", value as PlannerPreferences["duration"])}
                options={durations.map((value) => ({ value, label: value === "any" ? "No preference" : `${value} weeks` }))}
              />
              <SelectField
                label="Preferred outcome"
                value={draft.outcome}
                onChange={(value) => update("outcome", value as PlannerPreferences["outcome"])}
                options={outcomes.map(([value, label]) => ({ value, label }))}
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-3 text-sm font-bold text-white hover:bg-brand-blue-dark"
            >
              <Zap size={17} />
              Find my projects
            </button>
            <button
              type="button"
              onClick={reset}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-200 hover:text-brand-navy"
            >
              <X size={15} />
              Reset
            </button>
          </form>

          <div aria-live="polite" aria-atomic="false">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-blue">Recommended directions</p>
                <h2 className="mt-2 text-2xl font-bold text-brand-navy">Three projects to investigate</h2>
              </div>
              <p className="text-sm text-slate-500">{projects.length} catalog titles evaluated</p>
            </div>

            {result.relaxation === "outcome" && (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                Few titles matched your preferred outcome. Technology, difficulty and duration remain unchanged; the outcome was broadened to complete the shortlist.
              </p>
            )}

            {result.relaxation === "scope" && (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                Fewer than three titles matched the selected technology, difficulty and duration together. These alternatives keep your category; change one of those selections for a closer shortlist.
              </p>
            )}

            <div className="mt-6 grid gap-5">
              {result.recommendations.map(({ project, reasons }, index) => (
                <article key={project.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-brand-blue">
                          Match {index + 1}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {project.category === "iot" ? "IoT & Embedded" : "Software & AI"}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {project.difficulty}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold leading-7 text-brand-navy">{project.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-500">{getPlannerTimeRequired(project)}</p>
                    </div>
                    <Link
                      href={`/catalog/${project.slug}`}
                      onClick={() => trackPlannerRecommendationOpened(project.id)}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-blue px-4 py-2.5 text-sm font-bold text-brand-blue hover:bg-blue-50"
                    >
                      View project <ArrowUpRight size={15} />
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-5 border-t border-slate-100 pt-5 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Why it matches</p>
                      <ul className="mt-3 space-y-2">
                        {reasons.map((reason) => (
                          <li key={reason} className="flex gap-2 text-sm text-slate-700">
                            <Check size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Expected outcome</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {project.outcomes.map(formatOutcome).join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">First testing priorities</p>
                      <ol className="mt-3 space-y-2">
                        {getPlannerTestingPriorities(project).map((priority, priorityIndex) => (
                          <li key={priority} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <span className="font-bold text-brand-blue">{priorityIndex + 1}.</span>
                            <span>{priority}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
                    {getPlannerLearningLinks(project).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => trackPlannerLearningLinkOpened(project.id, link.type)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-brand-blue"
                      >
                        <FileText size={13} />
                        {link.title}
                      </Link>
                    ))}
                    <a
                      href={plannerWhatsAppLink(project, active)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackPlannerWhatsAppEnquiry(project.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-white hover:bg-[#1ebe5d] sm:ml-auto"
                    >
                      <MessageCircle size={14} />
                      Ask about this scope
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const id = `planner-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <label htmlFor={id} className="block text-sm font-semibold text-brand-navy">
      {label}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function preferenceCount(preferences: PlannerPreferences) {
  return [
    preferences.category !== "either",
    preferences.technology !== "any",
    preferences.difficulty !== "any",
    preferences.duration !== "any",
    preferences.outcome !== "any",
  ].filter(Boolean).length;
}

function plannerWhatsAppLink(project: PlannerProject, preferences: PlannerPreferences) {
  const context = [
    preferences.category !== "either" ? `category ${preferences.category}` : null,
    preferences.technology !== "any" ? preferences.technology : null,
    preferences.difficulty !== "any" ? preferences.difficulty : null,
    preferences.duration !== "any" ? `${preferences.duration} weeks` : null,
    preferences.outcome !== "any" ? formatOutcome(preferences.outcome) : null,
  ].filter(Boolean);
  const message = encodeURIComponent(
    `Hi Rectronx! The FYP Project Planner recommended "${project.title}"${context.length ? ` for my preferences: ${context.join(", ")}` : ""}. Can you help me review a realistic scope?`,
  );
  return `https://wa.me/60148600454?text=${message}&utm_source=fyp_project_planner`;
}

function formatOutcome(outcome: string) {
  return outcome
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
