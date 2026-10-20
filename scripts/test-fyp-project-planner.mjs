import assert from "node:assert/strict";
import {
  buildPlannerCatalog,
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
}

{
  const result = recommendProjects(catalog, { ...anyPreferences, category: "iot", outcome: "monitoring" }, 4);
  const ids = result.recommendations.map((item) => item.project.id);
  assert.equal(ids.includes(1) && ids.includes(2), false, "near-identical titles should not both be selected");
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

console.log("FYP project planner tests passed.");
