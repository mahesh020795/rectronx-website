export type PlannerCategory = "iot" | "software" | "either";
export type PlannerDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type PlannerDuration = "2-4" | "4-8" | "8-12";
export type PlannerOutcome =
  | "monitoring"
  | "alerting"
  | "automation"
  | "tracking"
  | "access-control"
  | "dashboard"
  | "computer-vision"
  | "application-workflow";

export type PlannerPreferences = {
  category: PlannerCategory;
  technology: string | "any";
  difficulty: PlannerDifficulty | "any";
  duration: PlannerDuration | "any";
  outcome: PlannerOutcome | "any";
};

export type PlannerSourceProject = {
  id: number;
  title: string;
  category: "iot" | "software";
  tags: string[];
};

export type PlannerLearningLink = {
  title: string;
  href: string;
  type: "Tool" | "Guide" | "Comparison" | "Planning";
};

export type PlannerProject = PlannerSourceProject & {
  slug: string;
  difficulty: PlannerDifficulty;
  duration: PlannerDuration;
  outcomes: PlannerOutcome[];
};

export type PlannerRecommendation = {
  project: PlannerProject;
  score: number;
  reasons: string[];
};

export type PlannerResult = {
  recommendations: PlannerRecommendation[];
  broadened: boolean;
  relaxation: "none" | "outcome" | "scope";
};

type PlannerEnrichment = Omit<
  PlannerProject,
  "id" | "title" | "category" | "tags"
>;

export function buildPlannerCatalog(
  projects: PlannerSourceProject[],
  enrich: (project: PlannerSourceProject) => PlannerEnrichment,
): PlannerProject[] {
  return projects.map((project) => ({ ...project, ...enrich(project) }));
}

export function recommendProjects(
  projects: PlannerProject[],
  preferences: PlannerPreferences,
  limit = 3,
): PlannerResult {
  const categoryCandidates = projects.filter(
    (project) => preferences.category === "either" || project.category === preferences.category,
  );

  const targetCount = Math.min(limit, categoryCandidates.length);
  const scopeMatches = categoryCandidates.filter((project) => matchesScopePreferences(project, preferences));
  const hasScopePreference =
    preferences.technology !== "any" ||
    preferences.difficulty !== "any" ||
    preferences.duration !== "any";
  const relaxation: PlannerResult["relaxation"] =
    hasScopePreference && scopeMatches.length < targetCount
      ? "scope"
      : preferences.outcome !== "any" &&
          scopeMatches.filter((project) => project.outcomes.includes(preferences.outcome as PlannerOutcome)).length < targetCount
        ? "outcome"
        : "none";
  const candidatePool = relaxation === "scope" ? categoryCandidates : scopeMatches;

  const ranked = candidatePool
    .map((project) => scoreProject(project, preferences))
    .sort((a, b) => b.score - a.score || a.project.id - b.project.id);

  const recommendations: PlannerRecommendation[] = [];
  const usedCategories = new Set<PlannerProject["category"]>();
  const usedDifficulties = new Set<PlannerDifficulty>();

  while (recommendations.length < limit) {
    const available = ranked.filter(
      (candidate) =>
        !recommendations.some((selected) => selected.project.id === candidate.project.id) &&
        !recommendations.some((selected) => titlesAreNearDuplicates(selected.project.title, candidate.project.title)),
    );

    if (available.length === 0) break;

    available.sort((a, b) => {
      const aDiversity = diversityBonus(a.project, usedCategories, usedDifficulties);
      const bDiversity = diversityBonus(b.project, usedCategories, usedDifficulties);
      return b.score + bDiversity - (a.score + aDiversity) || a.project.id - b.project.id;
    });

    const selected = available[0];
    recommendations.push(selected);
    usedCategories.add(selected.project.category);
    usedDifficulties.add(selected.project.difficulty);
  }

  return {
    recommendations,
    broadened: relaxation !== "none",
    relaxation,
  };
}

function matchesScopePreferences(project: PlannerProject, preferences: PlannerPreferences) {
  const haystack = normalize(`${project.title} ${project.tags.join(" ")}`);
  return (
    (preferences.technology === "any" || haystack.includes(normalize(preferences.technology))) &&
    (preferences.difficulty === "any" || project.difficulty === preferences.difficulty) &&
    (preferences.duration === "any" || project.duration === preferences.duration)
  );
}

function scoreProject(project: PlannerProject, preferences: PlannerPreferences): PlannerRecommendation {
  let score = 0;
  const reasons: string[] = [];
  const haystack = normalize(`${project.title} ${project.tags.join(" ")}`);

  if (preferences.technology !== "any" && haystack.includes(normalize(preferences.technology))) {
    score += 8;
    reasons.push(`Uses ${preferences.technology}`);
  }

  if (preferences.difficulty !== "any" && project.difficulty === preferences.difficulty) {
    score += 5;
    reasons.push(`${project.difficulty} difficulty match`);
  }

  if (preferences.duration !== "any" && project.duration === preferences.duration) {
    score += 4;
    reasons.push(`Fits a ${preferences.duration} week window`);
  }

  if (preferences.outcome !== "any" && project.outcomes.includes(preferences.outcome)) {
    score += 6;
    reasons.push(`${outcomeLabel(preferences.outcome)} outcome match`);
  }

  if (reasons.length === 0) {
    reasons.push("Balanced starting point from the selected category");
  }

  return { project, score, reasons: reasons.slice(0, 3) };
}

function diversityBonus(
  project: PlannerProject,
  usedCategories: Set<PlannerProject["category"]>,
  usedDifficulties: Set<PlannerDifficulty>,
) {
  let bonus = 0;
  if (!usedCategories.has(project.category)) bonus += 4;
  if (!usedDifficulties.has(project.difficulty)) bonus += 2;
  return bonus;
}

function titlesAreNearDuplicates(a: string, b: string) {
  const aTokens = titleTokens(a);
  const bTokens = titleTokens(b);
  const intersection = [...aTokens].filter((token) => bTokens.has(token)).length;
  const union = new Set([...aTokens, ...bTokens]).size;
  return union > 0 && intersection / union >= 0.62;
}

const titleStopWords = new Set([
  "a",
  "an",
  "and",
  "based",
  "esp32",
  "for",
  "iot",
  "project",
  "smart",
  "system",
  "the",
  "using",
  "with",
]);

function titleTokens(title: string) {
  return new Set(
    normalize(title)
      .split(" ")
      .filter((token) => token.length > 1 && !titleStopWords.has(token))
      .map((token) => token.replace(/ing$/, "")),
  );
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function outcomeLabel(outcome: PlannerOutcome) {
  const labels: Record<PlannerOutcome, string> = {
    monitoring: "Monitoring",
    alerting: "Alerting",
    automation: "Automation",
    tracking: "Tracking",
    "access-control": "Access control",
    dashboard: "Dashboard",
    "computer-vision": "Computer vision",
    "application-workflow": "Application workflow",
  };
  return labels[outcome];
}

export function classifyPlannerOutcomes(project: PlannerSourceProject): PlannerOutcome[] {
  const haystack = normalize(`${project.title} ${project.tags.join(" ")}`);
  const outcomes = new Set<PlannerOutcome>();
  const addWhen = (pattern: RegExp, outcome: PlannerOutcome) => {
    if (pattern.test(haystack)) outcomes.add(outcome);
  };

  addWhen(/monitor|sensor|weather|temperature|humidity|quality|level|meter/, "monitoring");
  addWhen(/alert|alarm|emergency|warning|notification|sms|telegram/, "alerting");
  addWhen(/automat|control|relay|actuator|irrigation|feeder|robot/, "automation");
  addWhen(/gps|track|location|fleet|route/, "tracking");
  addWhen(/access|attendance|rfid|fingerprint|locker|biometric|otp/, "access-control");
  addWhen(/dashboard|blynk|firebase|report|analytics|visual/, "dashboard");
  addWhen(/camera|vision|image|face|opencv|recognition|classif/, "computer-vision");
  addWhen(/management|booking|portal|inventory|workflow|application|website|(?:^| )app(?: |$)/, "application-workflow");

  if (outcomes.size === 0) {
    outcomes.add(project.category === "iot" ? "monitoring" : "application-workflow");
  }

  return [...outcomes];
}

export function getPlannerTimeRequired(project: PlannerProject) {
  if (project.difficulty === "Advanced") {
    return project.category === "software"
      ? "8-12 weeks for planning, development, testing and report evidence"
      : "8-12 weeks including component testing, integration, calibration and demo preparation";
  }
  if (project.difficulty === "Intermediate") {
    return project.category === "software"
      ? "4-8 weeks for core workflow, database, testing and presentation screens"
      : "4-8 weeks for wiring, coding, dashboard or app integration and repeated testing";
  }
  return project.category === "software"
    ? "2-4 weeks for a focused prototype with a simple database workflow"
    : "2-4 weeks for a basic prototype with one reliable input-output workflow";
}

export function getPlannerTestingPriorities(project: PlannerProject) {
  const outcome = project.outcomes[0] ?? (project.category === "iot" ? "monitoring" : "application-workflow");
  const focused: Record<PlannerOutcome, string> = {
    monitoring: "Compare readings or status changes against controlled reference conditions.",
    alerting: "Measure alert delivery, missed alerts, duplicate alerts and recovery after a connection loss.",
    automation: "Verify trigger thresholds, output response, manual override and safe recovery behavior.",
    tracking: "Test location or movement updates in open, obstructed and disconnected conditions.",
    "access-control": "Test valid, invalid, duplicate and revoked credentials without exposing personal data.",
    dashboard: "Verify stored records, timestamps, filtering and behavior when data is missing or delayed.",
    "computer-vision": "Separate training and test examples, then record false positives and false negatives under repeatable scenes.",
    "application-workflow": "Test each user role through normal, invalid and recovery paths with traceable records.",
  };
  return [
    focused[outcome],
    "Test the smallest end-to-end workflow before adding optional features.",
    "Capture logs, screenshots, readings or database records as report evidence.",
  ];
}

export function getPlannerLearningLinks(project: PlannerProject): PlannerLearningLink[] {
  const haystack = normalize(`${project.title} ${project.tags.join(" ")}`);
  const links: PlannerLearningLink[] = [
    { title: "How to choose a strong FYP topic", href: "/blog/how-to-choose-fyp-topic", type: "Planning" },
    { title: "FYP proposal: title, objectives and scope", href: "/blog/final-year-project-proposal-title-objectives-scope", type: "Planning" },
  ];

  if (haystack.includes("esp32")) {
    links.push({ title: "ESP32 Pinout Tool", href: "/tools/esp32-pinout", type: "Tool" });
  } else if (/arduino|uno/.test(haystack)) {
    links.push({ title: "Arduino Uno vs ESP32 for electronics FYP", href: "/blog/arduino-uno-vs-esp32-for-electronics-fyp", type: "Comparison" });
  } else if (/camera|opencv|face|recognition| ai | ml /.test(` ${haystack} `)) {
    links.push({ title: "AI final year project without a large dataset", href: "/blog/ai-final-year-project-without-large-dataset", type: "Guide" });
  } else if (/gps|gsm|tracking|vehicle|location/.test(haystack)) {
    links.push({ title: "GPS vehicle tracking system FYP guide", href: "/blog/gps-vehicle-tracking-system-fyp", type: "Guide" });
  } else if (project.category === "software") {
    links.push({ title: "Software FYP admin panel features", href: "/blog/software-fyp-admin-panel-features-that-score", type: "Guide" });
  } else {
    links.push({ title: "Electronics troubleshooting checklist", href: "/blog/fyp-electronics-troubleshooting-checklist", type: "Guide" });
  }

  return links;
}
