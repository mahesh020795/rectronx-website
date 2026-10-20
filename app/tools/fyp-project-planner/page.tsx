import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Gauge, Search } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { allCatalogProjects } from "@/data/projects";
import {
  getCatalogProjectSeo,
  getCatalogProjectSlug,
  getProjectLearningLinks,
} from "@/lib/catalog";
import {
  buildPlannerCatalog,
  classifyPlannerOutcomes,
  type PlannerDuration,
} from "@/lib/fyp-planner";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import FypProjectPlanner from "./FypProjectPlanner";

const BASE = "https://rectronx.com";

export const metadata: Metadata = {
  title: {
    absolute: "FYP Project Planner Malaysia | Find a Realistic Project Scope",
  },
  description:
    "Use the free Rectronx FYP Project Planner to match Malaysian final year project titles by category, technology, difficulty, duration and demo outcome.",
  alternates: { canonical: "/tools/fyp-project-planner" },
  openGraph: {
    title: "FYP Project Planner Malaysia",
    description:
      "Match existing IoT, embedded, software and AI project titles to your preferred scope and available time.",
    url: `${BASE}/tools/fyp-project-planner`,
    type: "website",
    siteName: "Rectronx Circuits",
  },
  twitter: {
    card: "summary_large_image",
    title: "FYP Project Planner Malaysia",
    description: "Find a realistic final year project direction from the Rectronx catalog.",
  },
};

const plannerFaqs = [
  {
    q: "Does the planner guarantee that a project will be accepted by my supervisor?",
    a: "No. The planner narrows the existing Rectronx catalog using your selected scope. Your supervisor and institution still decide whether a title and methodology meet programme requirements.",
  },
  {
    q: "Does the planner provide a fixed project price?",
    a: "No. Hardware and software cost depends on the selected components, features, casing, deployment, deadline and documentation scope. Rectronx reviews those details before providing a quotation.",
  },
  {
    q: "What happens when very few projects match my preferences?",
    a: "The planner keeps your required category and broadens optional preferences such as platform or outcome. It clearly marks the result as broadened instead of returning an empty list.",
  },
  {
    q: "Can I use the recommendations without contacting Rectronx?",
    a: "Yes. Every result links to its project guide and related learning resources. The WhatsApp action is optional and is provided only when you want help reviewing the scope.",
  },
];

const plannerCatalog = buildPlannerCatalog(allCatalogProjects, (project) => {
  const seo = getCatalogProjectSeo(project);
  return {
    slug: getCatalogProjectSlug(project),
    difficulty: seo.difficulty,
    duration: durationFromDifficulty(seo.difficulty),
    timeRequired: seo.timeRequired,
    outcomes: classifyPlannerOutcomes(project),
    testingPriorities: seo.testingPlan.slice(0, 3),
    learningLinks: getProjectLearningLinks(project, 3),
  };
});

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Rectronx FYP Project Planner",
  url: `${BASE}/tools/fyp-project-planner`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript for interactive recommendations",
  description:
    "A deterministic project-planning tool that matches existing Rectronx FYP titles to selected category, technology, difficulty, duration and outcome preferences.",
  isAccessibleForFree: true,
  provider: { "@id": `${BASE}/#organization` },
  inLanguage: "en-MY",
};

export default function FypProjectPlannerPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: BASE },
          { name: "Tools & Learning", url: `${BASE}/topics` },
          { name: "FYP Project Planner", url: `${BASE}/tools/fyp-project-planner` },
        ])}
      />
      <JsonLd schema={webApplicationSchema} />
      <JsonLd schema={faqSchema(plannerFaqs)} />

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Tools & Learning", href: "/topics" },
              { name: "FYP Project Planner" },
            ]}
          />

          <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,127,212,0.34),transparent_38%)]" />
            <div className="relative max-w-4xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-blue-light">
                Free planning tool
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                FYP Project Planner for Malaysian Students
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                Match real Rectronx catalog titles to your platform, experience, available time and preferred demo outcome. The recommendations are deterministic and never invent project prices or guarantee grades.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1.5">IoT & embedded</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">Software & AI</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">781 existing titles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FypProjectPlanner projects={plannerCatalog} />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoBlock icon={<Search size={20} />} title="Quick Summary">
            Choose controlled preferences and receive three varied project directions. The tool uses existing catalog tags and scope guidance; it does not generate new titles at runtime.
          </InfoBlock>
          <InfoBlock icon={<Gauge size={20} />} title="What It Evaluates">
            Category, platform, estimated difficulty, realistic build window and the outcome you want to demonstrate, such as monitoring, tracking or computer vision.
          </InfoBlock>
          <InfoBlock icon={<FileText size={20} />} title="What To Validate Next">
            Confirm your problem statement, component availability, dataset, test method, safety constraints and institutional requirements before committing to a title.
          </InfoBlock>
        </div>

        <div className="mt-10 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">Scope and cost limitations</h2>
            <p className="mt-4 leading-7 text-slate-600">
              No fixed price is shown because a title does not define the final bill of materials or software workload. Controller choice, sensors, communication modules, enclosure, dashboard features, deployment and documentation all change the scope.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Treat the result as a shortlist. Open each project guide, compare the testing plan, then discuss the final objective and methodology with your supervisor.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Keep one primary problem and measurable outcome.",
              "Test normal, error and recovery conditions.",
              "Use component datasheets and primary documentation.",
              "Plan the report evidence before adding features.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-brand-navy">FYP Project Planner FAQ</h2>
          <div className="mt-6 space-y-3">
            {plannerFaqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-slate-200 p-5">
                <summary className="cursor-pointer font-semibold text-brand-navy">{faq.q}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog" className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-dark">
              Browse all project titles <ArrowRight size={16} />
            </Link>
            <Link href="/tools/esp32-pinout" className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-dark">
              Open ESP32 Pinout Tool <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function durationFromDifficulty(difficulty: "Beginner" | "Intermediate" | "Advanced"): PlannerDuration {
  if (difficulty === "Advanced") return "8-12";
  if (difficulty === "Intermediate") return "4-8";
  return "2-4";
}

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
        {icon}
      </div>
      <h2 className="mt-4 text-lg font-bold text-brand-navy">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">{children}</p>
    </div>
  );
}
