import assert from "node:assert/strict";
import { allCatalogProjects } from "../data/projects.ts";
import { getProjectEngineering } from "../lib/project-engineering.ts";

const forbiddenComponentNames = new Set([
  "alert",
  "app",
  "database",
  "iot",
  "sensor",
  "software",
  "system",
  "web",
]);

const failures = [];
const profileCounts = new Map();

for (const project of allCatalogProjects) {
  try {
    const engineering = getProjectEngineering(project);
    profileCounts.set(
      engineering.profile,
      (profileCounts.get(engineering.profile) ?? 0) + 1,
    );

    assert.ok(engineering.profile, "missing engineering profile");
    assert.ok(engineering.components.length >= 4, "needs at least four specific BOM entries");
    assert.ok(
      engineering.components.some((item) => item.category === "controller"),
      "needs a controller or application platform",
    );
    assert.ok(
      engineering.components.some((item) => item.category === "input"),
      "needs a defined input",
    );
    assert.ok(
      engineering.components.some((item) => item.category === "output"),
      "needs a defined output",
    );
    assert.ok(
      engineering.components.some((item) => item.category === "power" || item.category === "deployment"),
      "needs power or deployment requirements",
    );

    const componentNames = engineering.components.map((item) => item.name.toLowerCase());
    assert.equal(new Set(componentNames).size, componentNames.length, "duplicate BOM entry");
    for (const name of componentNames) {
      assert.equal(forbiddenComponentNames.has(name), false, `generic component name: ${name}`);
      assert.equal(name.includes("project-specific"), false, `placeholder component name: ${name}`);
    }

    assert.ok(engineering.diagram.nodes.length >= 4, "block diagram needs at least four nodes");
    assert.ok(engineering.diagram.edges.length >= 3, "block diagram needs at least three connections");
    const nodeIds = new Set(engineering.diagram.nodes.map((node) => node.id));
    assert.equal(nodeIds.size, engineering.diagram.nodes.length, "duplicate diagram node ID");
    for (const edge of engineering.diagram.edges) {
      assert.ok(nodeIds.has(edge.from), `unknown diagram source: ${edge.from}`);
      assert.ok(nodeIds.has(edge.to), `unknown diagram destination: ${edge.to}`);
      assert.notEqual(edge.from, edge.to, "diagram cannot connect a node to itself");
    }

    assert.ok(engineering.functionFlow.length >= 5, "function flow needs at least five stages");
    assert.ok(
      engineering.functionFlow.every((step, index) => step.step === index + 1),
      "function-flow numbering must be sequential",
    );
    assert.ok(engineering.validationNotes.length >= 2, "needs engineering validation notes");
    if (project.title.toLowerCase().includes("elcb")) {
      assert.ok(
        engineering.validationNotes.some((note) => note.toLowerCase().includes("must not automatically re-energise")),
        "ELCB project must prohibit automatic mains re-energisation",
      );
      assert.equal(
        engineering.components.some((item) => /relay|motor|solenoid/i.test(item.name)),
        false,
        "ELCB project must not include an automatic reset actuator",
      );
    }
    if (/symptom checker|heart rate|vital monitoring|patient health/i.test(project.title)) {
      assert.ok(
        engineering.validationNotes.some((note) => /educational|not.*diagnos|not.*medical/i.test(note)),
        "health project needs a non-diagnostic limitation",
      );
    }
    if (/medical record|mental health|patient health|patient room|patient bed/i.test(project.title)) {
      assert.ok(
        engineering.validationNotes.some((note) => /privacy|personal|sensitive/i.test(note)),
        "healthcare software needs a privacy limitation",
      );
    }
  } catch (error) {
    failures.push(`${project.id} ${project.title}: ${error.message}`);
  }
}

assert.equal(
  failures.length,
  0,
  `Engineering audit failed for ${failures.length} projects:\n${failures.slice(0, 30).join("\n")}`,
);
assert.ok(profileCounts.size >= 12, "project classification is too generic");

console.log(
  `PASS: ${allCatalogProjects.length} project pages have validated BOMs, block diagrams, function flows and engineering notes across ${profileCounts.size} profiles.`,
);
