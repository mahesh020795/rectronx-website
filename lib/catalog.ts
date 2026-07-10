import { allCatalogProjects, CatalogProject } from "@/data/projects";
import { getComponentByTag } from "@/lib/components";

export type CatalogSeo = {
  metaTitle: string;
  metaDescription: string;
  categoryLabel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  outcome: string;
  howItWorks: string[];
  buildLevels: { level: string; description: string }[];
  limitations: string[];
  commonMistakes: string[];
  reportSections: string[];
  upgrades: string[];
  faqs: { q: string; a: string }[];
};

const WA_NUMBER = "601172792500";

export function getCatalogProjectSlug(project: CatalogProject) {
  return project.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCatalogProjectBySlug(slug: string) {
  return allCatalogProjects.find((project) => getCatalogProjectSlug(project) === slug);
}

export function catalogWhatsAppLink(project: CatalogProject, source = "catalog_detail") {
  const msg = encodeURIComponent(
    `Hi Rectronx! I'm interested in this FYP title: "${project.title}". Can you advise the suitable scope?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}&utm_source=${source}`;
}

export function getProjectTechnologies(project: CatalogProject) {
  return project.tags.map((tag) => ({
    tag,
    component: getComponentByTag(tag),
  }));
}

export function getRelatedCatalogProjects(project: CatalogProject, limit = 6) {
  const ownSlug = getCatalogProjectSlug(project);
  const ownTags = project.tags.map((tag) => tag.toLowerCase());
  const ownWords = project.title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3);

  return allCatalogProjects
    .filter((candidate) => getCatalogProjectSlug(candidate) !== ownSlug)
    .map((candidate) => {
      const tags = candidate.tags.map((tag) => tag.toLowerCase());
      const haystack = `${candidate.title} ${candidate.tags.join(" ")}`.toLowerCase();
      const tagScore = tags.filter((tag) => ownTags.includes(tag)).length * 3;
      const wordScore = ownWords.filter((word) => haystack.includes(word)).length;
      const categoryScore = candidate.category === project.category ? 1 : 0;
      return { candidate, score: tagScore + wordScore + categoryScore };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.id - b.candidate.id)
    .slice(0, limit)
    .map((item) => item.candidate);
}

export function getCatalogProjectSeo(project: CatalogProject): CatalogSeo {
  const tags = project.tags.map((tag) => tag.toLowerCase());
  const title = project.title;
  const categoryLabel = project.category === "iot" ? "IoT & Embedded" : "Software & AI";
  const difficulty = getDifficulty(project);
  const mainTechnologies = project.tags.slice(0, 4).join(", ");

  return {
    metaTitle: `${title} | FYP Project Guide Malaysia`,
    metaDescription: `${title} guide for Malaysian FYP students: project outcome, technologies, build scope, limitations, report sections and Rectronx consultation.`,
    categoryLabel,
    difficulty,
    outcome: getOutcome(project),
    howItWorks: getHowItWorks(project),
    buildLevels: [
      {
        level: "Basic prototype",
        description:
          "Core function, simple interface, and a working demo flow suitable for proving the main idea.",
      },
      {
        level: "Intermediate prototype",
        description:
          "Adds database, dashboard, app notification, cleaner interface, or stronger testing depending on the selected scope.",
      },
      {
        level: "Advanced prototype",
        description:
          "Adds cloud integration, AI/camera features, payment flow, custom enclosure, or multi-user workflows where relevant.",
      },
    ],
    limitations: getLimitations(tags, project.category),
    commonMistakes: getCommonMistakes(tags, project.category),
    reportSections: [
      "Problem statement and project background",
      "Objectives and project scope",
      "System block diagram and flowchart",
      `Hardware/software methodology using ${mainTechnologies}`,
      "Testing results with screenshots, readings, or sample records",
      "Limitations, discussion, and future improvements",
    ],
    upgrades: getUpgrades(tags, project.category),
    faqs: getFaqs(project, difficulty),
  };
}

function getDifficulty(project: CatalogProject): CatalogSeo["difficulty"] {
  const haystack = `${project.title} ${project.tags.join(" ")}`.toLowerCase();
  if (/ai|ml|opencv|camera|payment|biometric|face|license|prediction|optimization/.test(haystack)) {
    return "Advanced";
  }
  if (/gps|gsm|firebase|database|rfid|iot|android|telegram|blynk|mysql/.test(haystack)) {
    return "Intermediate";
  }
  return "Beginner";
}

function getOutcome(project: CatalogProject) {
  if (project.category === "software") {
    return `This project is a software-based FYP concept for building a working ${project.title.toLowerCase()} with user roles, records, search or reporting features, and a clear demo workflow. The final scope can be adjusted to match diploma, degree, or supervisor requirements.`;
  }

  return `This project is an IoT and embedded-system FYP concept for building a working ${project.title.toLowerCase()} prototype. The expected outcome is a demonstrable system that reads real inputs, processes them through a controller, and shows the result through an alert, display, app, dashboard, or database depending on the selected scope.`;
}

function getHowItWorks(project: CatalogProject) {
  if (project.category === "software") {
    return [
      "User submits, searches, updates, or approves information through a web or mobile interface.",
      "The application validates the input and stores records in a database.",
      "Admin or user dashboards show the current status, history, reports, or notifications.",
      "Testing confirms that the main workflow, access roles, and data records behave as expected.",
    ];
  }

  return [
    "Sensors, modules, or user inputs collect real-world data.",
    "A microcontroller such as Arduino or ESP32 processes the input and applies the project logic.",
    "The system sends results to an output such as LCD, buzzer, relay, GSM SMS, Telegram, Blynk, Firebase, or a dashboard.",
    "Testing compares the expected response with the actual prototype behavior during demo conditions.",
  ];
}

function getLimitations(tags: string[], category: CatalogProject["category"]) {
  const limitations = new Set<string>();

  if (category === "software") {
    limitations.add("Software accuracy and reliability depend on validation rules, database design, and realistic test data.");
    limitations.add("Authentication, role access, and input sanitisation should be included if the system stores sensitive records.");
  } else {
    limitations.add("Prototype reliability depends on correct wiring, stable power supply, and proper module selection.");
    limitations.add("Sensor readings can vary with placement, calibration, environment, and demo conditions.");
  }

  if (tags.includes("gsm")) limitations.add("GSM and SMS features depend on SIM balance, signal coverage, and telco network availability.");
  if (tags.includes("gps")) limitations.add("GPS readings may be weak indoors or near tall buildings, so outdoor testing is recommended.");
  if (tags.includes("camera") || tags.includes("opencv") || tags.includes("ai")) {
    limitations.add("Camera and AI results depend on lighting, image quality, training data, and the chosen model.");
  }
  if (tags.includes("rfid")) limitations.add("RFID range and reliability depend on tag type, reader placement, and interference.");
  if (tags.includes("gas sensor") || tags.includes("air quality")) {
    limitations.add("Low-cost gas sensors are suitable for relative detection and alerts, not laboratory-grade gas concentration measurement.");
  }
  if (tags.includes("pH".toLowerCase()) || tags.includes("tds") || tags.includes("turbidity")) {
    limitations.add("Water-quality sensors need calibration and proper probe handling for meaningful test results.");
  }
  if (tags.includes("iot") || tags.includes("blynk") || tags.includes("telegram") || tags.includes("firebase")) {
    limitations.add("IoT demos depend on stable WiFi, hotspot, or internet access unless an offline backup mode is prepared.");
  }

  return Array.from(limitations).slice(0, 6);
}

function getCommonMistakes(tags: string[], category: CatalogProject["category"]) {
  const mistakes = new Set<string>();

  mistakes.add("Choosing a scope that is too large for the available FYP timeline.");
  mistakes.add("Writing objectives that do not match the actual prototype or software demo.");
  mistakes.add("Preparing no backup demo flow for viva day.");

  if (category === "iot") {
    mistakes.add("Using weak power supply, loose jumper wires, or unprotected sensors during demonstration.");
    mistakes.add("Skipping calibration or test readings before presenting results.");
  } else {
    mistakes.add("Building screens without proper database relationships, validation, and user-role flow.");
    mistakes.add("Using sample data that does not prove the main system workflow.");
  }

  if (tags.includes("ai") || tags.includes("ml") || tags.includes("opencv")) {
    mistakes.add("Claiming high AI accuracy without dataset explanation, test images, or confusion-matrix style results.");
  }
  if (tags.includes("gsm") || tags.includes("gps")) {
    mistakes.add("Testing GSM/GPS only indoors and discovering signal issues during final demo.");
  }

  return Array.from(mistakes).slice(0, 7);
}

function getUpgrades(tags: string[], category: CatalogProject["category"]) {
  const upgrades = new Set<string>();

  if (category === "iot") {
    upgrades.add("Mobile app or Blynk dashboard");
    upgrades.add("Firebase or cloud database");
    upgrades.add("Telegram, WhatsApp, or SMS alerting");
    upgrades.add("Custom enclosure and cleaner wiring");
  } else {
    upgrades.add("Admin dashboard with charts and reports");
    upgrades.add("Role-based login and audit history");
    upgrades.add("Email, SMS, or WhatsApp notification flow");
    upgrades.add("Export to PDF or Excel for documentation");
  }

  if (tags.includes("rfid")) upgrades.add("RFID access logs and user management");
  if (tags.includes("gps")) upgrades.add("Map view with location history");
  if (tags.includes("camera") || tags.includes("opencv")) upgrades.add("Image capture, recognition, or evidence storage");
  if (tags.includes("payment") || tags.includes("qr code")) upgrades.add("QR code payment or receipt workflow");
  if (tags.includes("solar")) upgrades.add("Solar charging and battery percentage monitoring");
  if (tags.includes("ai") || tags.includes("ml")) upgrades.add("Prediction model with testing metrics");

  return Array.from(upgrades).slice(0, 7);
}

function getFaqs(project: CatalogProject, difficulty: CatalogSeo["difficulty"]) {
  const platform =
    project.category === "iot"
      ? "Arduino, ESP32, Raspberry Pi, or another controller depending on the required features"
      : "PHP/MySQL, Python, Firebase, Android, or another stack depending on the required workflow";

  return [
    {
      q: `Is "${project.title}" suitable for FYP?`,
      a: `Yes. This title can be suitable for FYP or PAT when the scope is controlled, the objectives are clear, and the demo proves the main workflow.`,
    },
    {
      q: "What difficulty level is this project?",
      a: `The suggested difficulty is ${difficulty}. The actual difficulty depends on whether you choose a basic, intermediate, or advanced prototype scope.`,
    },
    {
      q: "What platform can this project use?",
      a: `This project can be planned using ${platform}. Rectronx can help choose the stack based on your supervisor requirements.`,
    },
    {
      q: "Is there a fixed project price?",
      a: "No fixed price is published because the final quotation depends on project scope, features, timeline, hardware, software, and documentation requirements.",
    },
    {
      q: "Can Rectronx help with documentation and demo preparation?",
      a: "Yes. Rectronx can help with project planning, prototype development, coding explanation, report structure, testing evidence, and demo preparation.",
    },
  ];
}
