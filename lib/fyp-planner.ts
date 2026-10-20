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
  description: string;
  href: string;
  type: "Tool" | "Guide" | "Comparison" | "Planning";
};

export type PlannerProject = PlannerSourceProject & {
  slug: string;
  difficulty: PlannerDifficulty;
  duration: PlannerDuration;
  timeRequired: string;
  outcomes: PlannerOutcome[];
  testingPriorities: string[];
  learningLinks: PlannerLearningLink[];
};

export type PlannerRecommendation = {
  project: PlannerProject;
  score: number;
  reasons: string[];
};

export type PlannerResult = {
  recommendations: PlannerRecommendation[];
  broadened: boolean;
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

  const ranked = categoryCandidates
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

  if (recommendations.length < limit) {
    for (const candidate of ranked) {
      if (recommendations.some((selected) => selected.project.id === candidate.project.id)) continue;
      recommendations.push(candidate);
      if (recommendations.length === limit) break;
    }
  }

  const hasOptionalPreference =
    preferences.technology !== "any" ||
    preferences.difficulty !== "any" ||
    preferences.duration !== "any" ||
    preferences.outcome !== "any";
  const positiveMatches = ranked.filter((candidate) => candidate.score > 0).length;

  return {
    recommendations,
    broadened: hasOptionalPreference && positiveMatches < Math.min(limit, categoryCandidates.length),
  };
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
  addWhen(/management|booking|portal|inventory|workflow|application|website|app/, "application-workflow");

  if (outcomes.size === 0) {
    outcomes.add(project.category === "iot" ? "monitoring" : "application-workflow");
  }

  return [...outcomes];
}
