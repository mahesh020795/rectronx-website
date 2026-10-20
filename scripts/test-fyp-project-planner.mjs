import assert from "node:assert/strict";
import {
  buildPlannerCatalog,
  classifyPlannerOutcomes,
  recommendProjects,
} from "../lib/fyp-planner.ts";

const projects = [
  { id: 1, title: "ESP32 Smart Water Level Monitor", category: "iot", tags: ["ESP32", "Water Level", "IoT"] },
  { id: 2, title: "ESP32 Water Level Monitoring System", category: "iot", tags: ["ESP32", "Water Level", "Dashboard"] },
  { id: 3, title: "Arduino RFID Door Access Controller", category: "iot", tags: ["Arduino", "RFID", "Access Control"] },
  { id: 4, title: "GPS Vehicle Tracking and Alert System", category: "iot", tags: ["GPS", "GSM", "Alert"] },
  { id: 5, title: "Raspberry Pi Camera Safety Monitor", category: "iot", tags: ["Raspberry Pi", "Camera", "AI"] },
  { id: 6, title: "Python Clinic Appointment Web Application", category: "software", tags: ["Python", "Web", "Booking"] },
  { id: 7, title: "PHP Inventory Workflow and Reporting System", category: "software", tags: ["PHP", "Database", "Inventory"] },
  { id: 8, title: "AI Plant Image Classification Application", category: "software", tags: ["AI/ML", "Python", "Computer Vision"] },
];

const details = new Map([
  [1, ["Beginner", "2-4", ["monitoring", "dashboard"]]],
  [2, ["Intermediate", "4-8", ["monitoring", "dashboard"]]],
  [3, ["Beginner", "2-4", ["access-control"]]],
  [4, ["Intermediate", "4-8", ["tracking", "alerting"]]],
  [5, ["Advanced", "8-12", ["computer-vision", "monitoring"]]],
  [6, ["Intermediate", "4-8", ["application-workflow"]]],
  [7, ["Beginner", "2-4", ["application-workflow", "dashboard"]]],
  [8, ["Advanced", "8-12", ["computer-vision"]]],
]);

const catalog = buildPlannerCatalog(projects, (project) => {
  const [difficulty, duration, outcomes] = details.get(project.id);
  return {
    slug: `project-${project.id}`,
    difficulty,
    duration,
    timeRequired: `${duration} weeks`,
    outcomes,
    testingPriorities: ["normal case", "error case", "recovery case"],
    learningLinks: [{ title: "Guide", description: "Relevant guide", href: "/blog/guide", type: "Guide" }],
  };
});

const anyPreferences = {
  category: "either",
  technology: "any",
  difficulty: "any",
  duration: "any",
  outcome: "any",
};

{
  const result = recommendProjects(catalog, anyPreferences);
  assert.equal(result.recommendations.length, 3, "starter set should contain three projects");
  assert.equal(new Set(result.recommendations.map((item) => item.project.category)).size, 2, "starter set should cover both categories");
  assert.ok(new Set(result.recommendations.map((item) => item.project.difficulty)).size >= 2, "starter set should vary difficulty");
  assert.equal(result.broadened, false);
}

{
  const result = recommendProjects(catalog, { ...anyPreferences, category: "software" });
  assert.equal(result.recommendations.length, 3);
  assert.ok(result.recommendations.every((item) => item.project.category === "software"), "required category must never leak");
}

{
  const result = recommendProjects(catalog, {
    category: "iot",
    technology: "Raspberry Pi",
    difficulty: "Advanced",
    duration: "8-12",
    outcome: "computer-vision",
  });
  assert.equal(result.recommendations[0].project.id, 5, "all matching preferences should rank first");
  assert.ok(result.recommendations[0].reasons.some((reason) => reason.includes("Raspberry Pi")));
}

{
  const result = recommendProjects(catalog, { ...anyPreferences, category: "iot", technology: "LoRa" });
  assert.equal(result.recommendations.length, 3, "sparse optional preferences should broaden rather than empty");
  assert.equal(result.broadened, true);
  assert.equal(result.relaxation, "scope", "missing technology requires explicit scope relaxation");
}

{
  const result = recommendProjects(catalog, {
    category: "iot",
    technology: "ESP32",
    difficulty: "Beginner",
    duration: "8-12",
    outcome: "computer-vision",
  });
  assert.equal(result.recommendations.length, 3, "contradictory optional preferences should still return a useful shortlist");
  assert.equal(result.broadened, true, "partial matches must be disclosed as broadened");
  assert.equal(result.relaxation, "scope", "contradictory difficulty and duration require explicit scope relaxation");
}

{
  const result = recommendProjects(catalog, {
    category: "iot",
    technology: "any",
    difficulty: "Intermediate",
    duration: "4-8",
    outcome: "computer-vision",
  }, 2);
  assert.equal(result.relaxation, "outcome", "outcome should be the only relaxed preference when other filters have enough matches");
  assert.ok(
    result.recommendations.every((item) => item.project.difficulty === "Intermediate" && item.project.duration === "4-8"),
    "outcome relaxation must preserve difficulty and duration",
  );
}

{
  const result = recommendProjects(catalog, { ...anyPreferences, category: "iot", outcome: "monitoring" }, 4);
  const ids = result.recommendations.map((item) => item.project.id);
  assert.equal(ids.includes(1) && ids.includes(2), false, "near-identical titles should not both be selected");
}

{
  const duplicatesOnly = catalog.filter((project) => project.id === 1 || project.id === 2);
  const result = recommendProjects(duplicatesOnly, anyPreferences, 2);
  assert.equal(result.recommendations.length, 1, "duplicate suppression must remain active during fallback filling");
}

{
  const first = recommendProjects(catalog, { ...anyPreferences, technology: "Python" });
  const second = recommendProjects(catalog, { ...anyPreferences, technology: "Python" });
  assert.deepEqual(
    first.recommendations.map((item) => item.project.id),
    second.recommendations.map((item) => item.project.id),
    "same preferences must produce stable ordering",
  );
}

{
  const outcomes = classifyPlannerOutcomes({
    id: 99,
    title: "ESP32 WiFi Signal Mapping Tool",
    category: "iot",
    tags: ["ESP32", "WiFi"],
  });
  assert.equal(outcomes.includes("application-workflow"), false, "mapping must not be mistaken for the word app");
}

{
  const outcomeCompetition = [
    { id: 1, title: "Clinic Booking Portal", category: "software", tags: ["Web"], slug: "clinic", difficulty: "Advanced", duration: "8-12", outcomes: ["application-workflow"] },
    { id: 10, title: "River Level Monitor", category: "iot", tags: ["Sensor"], slug: "river", difficulty: "Beginner", duration: "2-4", outcomes: ["monitoring"] },
    { id: 11, title: "Greenhouse Climate Meter", category: "iot", tags: ["Climate"], slug: "greenhouse", difficulty: "Beginner", duration: "2-4", outcomes: ["monitoring"] },
    { id: 12, title: "Factory Vibration Logger", category: "iot", tags: ["Vibration"], slug: "factory", difficulty: "Beginner", duration: "2-4", outcomes: ["monitoring"] },
  ];
  const result = recommendProjects(outcomeCompetition, { ...anyPreferences, outcome: "monitoring" });
  assert.equal(result.relaxation, "none");
  assert.ok(
    result.recommendations.every((item) => item.project.outcomes.includes("monitoring")),
    "exact outcome matches must not be displaced when enough exist",
  );
}

console.log("FYP project planner tests passed.");
