import { allCatalogProjects, CatalogProject } from "@/data/projects";
import { getComponentByTag } from "@/lib/components";

export type CatalogSeo = {
  metaTitle: string;
  metaDescription: string;
  categoryLabel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  quickSummary: string;
  timeRequired: string;
  costGuidance: string;
  outcome: string;
  howItWorks: string[];
  demoOutcomes: string[];
  testingPlan: string[];
  troubleshooting: string[];
  buildLevels: { level: string; description: string }[];
  limitations: string[];
  commonMistakes: string[];
  reportSections: string[];
  upgrades: string[];
  faqs: { q: string; a: string }[];
};

type ProjectProfile = {
  domain: string;
  input: string;
  processing: string;
  output: string;
  data: string;
  testFocus: string;
  scopeAdvice: string;
  coreModules: string[];
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
  const profile = getProjectProfile(project);

  return {
    metaTitle: `${title} | FYP Project Guide Malaysia`,
    metaDescription: `${title} guide for Malaysian FYP students: realistic scope, suggested technologies, demo outcome, testing plan, limitations and report sections.`,
    categoryLabel,
    difficulty,
    quickSummary: getQuickSummary(project, profile),
    timeRequired: getTimeRequired(difficulty, project.category),
    costGuidance: getCostGuidance(project.category),
    outcome: getOutcome(project, profile),
    howItWorks: getHowItWorks(project, profile),
    demoOutcomes: getDemoOutcomes(profile),
    testingPlan: getTestingPlan(project, profile),
    troubleshooting: getTroubleshooting(project, profile),
    buildLevels: getBuildLevels(project, profile),
    limitations: getLimitations(tags, project.category, profile),
    commonMistakes: getCommonMistakes(tags, project.category, profile),
    reportSections: getReportSections(profile, mainTechnologies),
    upgrades: getUpgrades(tags, project.category, profile),
    faqs: getFaqs(project, difficulty, profile),
  };
}

function getQuickSummary(project: CatalogProject, profile: ProjectProfile) {
  const stack = profile.coreModules.slice(0, 3).join(", ");
  return `${project.title} is a ${profile.domain} idea for students who need a working demo with ${profile.input}. A good version focuses on ${profile.output} using ${stack}, with testing evidence for ${profile.testFocus}.`;
}

function getTimeRequired(difficulty: CatalogSeo["difficulty"], category: CatalogProject["category"]) {
  if (difficulty === "Advanced") {
    return category === "software"
      ? "8-12 weeks for planning, development, testing and report evidence"
      : "8-12 weeks including component testing, integration, calibration and demo preparation";
  }

  if (difficulty === "Intermediate") {
    return category === "software"
      ? "4-8 weeks for core workflow, database, testing and presentation screens"
      : "4-8 weeks for wiring, coding, dashboard/app integration and repeated testing";
  }

  return category === "software"
    ? "2-4 weeks for a focused prototype with simple database workflow"
    : "2-4 weeks for a basic prototype with one reliable input-output workflow";
}

function getCostGuidance(category: CatalogProject["category"]) {
  return category === "software"
    ? "No fixed price. Cost depends on screens, database complexity, user roles, AI/API use, deployment and documentation scope."
    : "No fixed price. Cost depends on selected controller, sensors, communication modules, casing, dashboard/app features and documentation scope.";
}

function getDifficulty(project: CatalogProject): CatalogSeo["difficulty"] {
  const haystack = `${project.title} ${project.tags.join(" ")}`.toLowerCase();
  if (/ai|ml|opencv|camera|payment|biometric|face|license|prediction|optimization/.test(haystack)) {
    return "Advanced";
  }
  if (/gps|gsm|firebase|database|rfid|iot|android|telegram|blynk|mysql|raspberry/.test(haystack)) {
    return "Intermediate";
  }
  return "Beginner";
}

function getProjectProfile(project: CatalogProject): ProjectProfile {
  const haystack = `${project.title} ${project.tags.join(" ")}`.toLowerCase();

  if (project.category === "software") {
    if (hasAny(haystack, ["ai", "ml", "machine learning", "prediction", "classification", "opencv", "nlp", "chatbot", "recognition", "sentiment"])) {
      const visual = hasAny(haystack, ["camera", "opencv", "image", "face", "plate", "ppe", "skin"]);
      const text = hasAny(haystack, ["nlp", "chatbot", "sentiment", "plagiarism", "faq"]);
      return {
        domain: "AI / machine learning software",
        input: visual
          ? "uploaded images, camera frames, or labelled image samples"
          : text
            ? "text records such as questions, documents, reviews, or assignment content"
            : "structured dataset records such as student, customer, finance, or operation data",
        processing: visual
          ? "image preprocessing, feature extraction, and model prediction"
          : text
            ? "intent matching, text cleaning, similarity scoring, or NLP response selection"
            : "data cleaning, feature selection, model training, and prediction",
        output: "prediction result, confidence score, report table, and admin dashboard",
        data: "training samples, test samples, prediction logs, and evaluation results",
        testFocus: "sample quality, accuracy, false positives, false negatives, and explainable testing metrics",
        scopeAdvice: "Keep the first version focused on one dataset and one prediction task before adding dashboard polish.",
        coreModules: ["Python", "Dataset", "Model training", "Evaluation dashboard"],
      };
    }

    if (hasAny(haystack, ["mobile", "app", "android", "firebase"])) {
      return {
        domain: "mobile application",
        input: "user registration, form submission, QR scan, booking request, or location update",
        processing: "Firebase or backend logic that validates input, stores records, and updates user status",
        output: "mobile screens, status feedback, history records, and admin review",
        data: "users, requests, transactions, status history, and notification records",
        testFocus: "login flow, create/update records, weak-network behaviour, and role access",
        scopeAdvice: "Start with the main user flow and admin records before adding advanced notification or payment features.",
        coreModules: ["Android", "Firebase", "Authentication", "Realtime database"],
      };
    }

    return {
      domain: "web application",
      input: "user forms, admin updates, uploaded documents, booking records, or search filters",
      processing: "server-side validation, database storage, approval workflow, and report generation",
      output: "user dashboard, admin dashboard, searchable records, status updates, and printable reports",
      data: "user accounts, transaction records, statuses, timestamps, and uploaded evidence where needed",
      testFocus: "CRUD workflow, user roles, validation errors, search accuracy, and report output",
      scopeAdvice: "Build the core database workflow first, then add dashboards, exports, QR, or payment evidence.",
      coreModules: ["PHP", "MySQL", "Admin dashboard", "User roles"],
    };
  }

  if (hasAny(haystack, ["raspberry pi"])) {
    const camera = hasAny(haystack, ["camera", "opencv", "face", "plate", "image"]);
    return {
      domain: "Raspberry Pi prototype",
      input: camera ? "camera frames or image captures" : "sensor readings, button input, display content, or local web requests",
      processing: camera ? "Python image processing or OpenCV-based detection" : "Python service logic running on the Raspberry Pi",
      output: "local dashboard, display screen, stored records, snapshot evidence, or notification alert",
      data: "captured images, event logs, sensor readings, timestamps, and dashboard records",
      testFocus: "camera position, lighting, script reliability, boot behaviour, and local network access",
      scopeAdvice: "Keep the demo local-first with clear screenshots and logs before adding cloud features.",
      coreModules: ["Raspberry Pi", "Python", camera ? "Camera" : "Display/sensor", "Local database or web server"],
    };
  }

  if (hasAny(haystack, ["rfid", "fingerprint", "biometric", "access", "attendance", "locker", "library", "tool", "check-in"])) {
    return {
      domain: "identity and access-control prototype",
      input: "RFID card, fingerprint, keypad, QR code, or authorised user input",
      processing: "the controller checks the user ID against stored access rules and records the event",
      output: "unlock action, attendance record, access status, buzzer/display feedback, or database log",
      data: "user ID, access time, access result, item/room/locker reference, and admin records",
      testFocus: "authorised users, unauthorised users, duplicate scans, wrong cards, and access-log accuracy",
      scopeAdvice: "Use a small registered-user list first; add cloud database or reporting after the access flow is stable.",
      coreModules: ["RFID/fingerprint", "ESP32 or Arduino", "Database", "Display or lock output"],
    };
  }

  if (hasAny(haystack, ["gps", "gsm", "tracking", "panic", "crash", "fall", "helmet", "vehicle", "bike", "location"])) {
    return {
      domain: "tracking and emergency-alert prototype",
      input: "GPS location, button press, accelerometer movement, crash/fall trigger, or safety sensor reading",
      processing: "the controller filters the trigger condition and prepares a location or alert message",
      output: "SMS/Telegram alert, map link, buzzer alarm, dashboard record, or emergency notification",
      data: "timestamp, location coordinate, alert type, device ID, and acknowledgement status",
      testFocus: "outdoor GPS lock, GSM signal, false-trigger control, alert delay, and readable map links",
      scopeAdvice: "Test the alert workflow outdoors early because indoor GPS and weak telco signal can break the demo.",
      coreModules: ["GPS", "GSM/Telegram", "Arduino or ESP32", "Battery/power module"],
    };
  }

  if (hasAny(haystack, ["water", "ph", "tds", "turbidity", "aquarium", "fish", "pond", "flood", "tank", "leak", "pump", "hydroponic"])) {
    return {
      domain: "water monitoring and control prototype",
      input: "water level, pH, TDS, turbidity, temperature, flow, or leak sensor reading",
      processing: "the controller compares readings against safe thresholds and decides whether to alert or activate a pump/valve",
      output: "dashboard reading, warning alert, pump/valve control, LCD status, or testing log",
      data: "sensor readings, threshold values, calibration notes, alert events, and control status",
      testFocus: "sensor calibration, wet-environment protection, threshold response, and repeat readings",
      scopeAdvice: "Use controlled water samples and labelled test scenarios instead of claiming laboratory-grade accuracy.",
      coreModules: ["Water sensor", "ESP32/Arduino", "Relay/pump", "Dashboard or display"],
    };
  }

  if (hasAny(haystack, ["temperature", "humidity", "weather", "greenhouse", "incubator", "cold storage", "refrigerator", "poultry", "fan"])) {
    return {
      domain: "environment monitoring and automation prototype",
      input: "temperature, humidity, air-quality, occupancy, or light reading",
      processing: "the controller compares readings with target limits and decides alert or actuator response",
      output: "fan/relay control, dashboard chart, LCD status, or Telegram/Blynk notification",
      data: "environment readings, threshold settings, actuator state, timestamps, and alert history",
      testFocus: "sensor placement, response time, threshold tuning, airflow, and stable power during demo",
      scopeAdvice: "Make the threshold response visible first; add cloud charts after the local control loop works.",
      coreModules: ["DHT22/BME280", "ESP32/Arduino", "Relay", "Display or dashboard"],
    };
  }

  if (hasAny(haystack, ["energy", "current", "voltage", "solar", "battery", "meter", "transformer", "charging", "appliance"])) {
    return {
      domain: "energy and power monitoring prototype",
      input: "voltage, current, energy usage, battery level, or appliance runtime reading",
      processing: "the controller calculates usage trends, detects abnormal load, and compares values with safe limits",
      output: "energy dashboard, warning alert, usage report, relay action, or battery-status display",
      data: "voltage/current readings, calculated power, runtime, threshold events, and daily summaries",
      testFocus: "safe wiring, sensor range, calibration against a reference meter, and load-change response",
      scopeAdvice: "Use low-risk demo loads and clear isolation; avoid unsafe mains wiring unless supervised.",
      coreModules: ["Current/voltage sensor", "ESP32", "Dashboard", "Relay or alert output"],
    };
  }

  if (hasAny(haystack, ["camera", "opencv", "image", "face", "plate", "detection", "recognition", "monitoring"])) {
    return {
      domain: "camera and visual-monitoring prototype",
      input: "camera image, video frame, snapshot, or detected motion event",
      processing: "the controller or Raspberry Pi captures images and applies simple image processing or event detection",
      output: "captured evidence, recognition result, alert notification, or dashboard image log",
      data: "image samples, detection result, timestamp, confidence/condition notes, and event history",
      testFocus: "lighting, camera angle, dataset examples, false detections, and repeatable demo scenes",
      scopeAdvice: "Limit the first version to one visual task and controlled lighting before adding advanced AI claims.",
      coreModules: ["Camera", "ESP32-CAM/Raspberry Pi", "OpenCV or dashboard", "Storage/alert"],
    };
  }

  return {
    domain: "IoT automation prototype",
    input: "sensor reading, user input, module signal, or device status",
    processing: "the microcontroller logic checks the condition, applies thresholds, and triggers the selected output",
    output: "display status, buzzer/relay action, app notification, database record, or dashboard update",
    data: "input readings, output state, event timestamps, and test evidence",
    testFocus: "input response, output reliability, wiring stability, and demo repeatability",
    scopeAdvice: "Build one reliable main workflow before adding app, dashboard, casing, or cloud features.",
    coreModules: ["Arduino/ESP32", "Sensor/module", "Output device", "Power supply"],
  };
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function withArticle(phrase: string) {
  return /^[aeiou]/i.test(phrase) ? `an ${phrase}` : `a ${phrase}`;
}

function getOutcome(project: CatalogProject, profile: ProjectProfile) {
  if (project.category === "software") {
    return `${project.title} is ${withArticle(profile.domain)} concept built around ${profile.input}. A realistic FYP outcome is a working system that performs ${profile.processing}, then shows ${profile.output}. The scope should capture ${profile.data} as evidence for the report.`;
  }

  return `${project.title} is ${withArticle(profile.domain)} that can be demonstrated with ${profile.input}. A realistic FYP outcome is a working prototype where ${profile.processing}, then produces ${profile.output}. The important proof is repeatable ${profile.data}, not just a device that powers on.`;
}

function getHowItWorks(project: CatalogProject, profile: ProjectProfile) {
  if (project.category === "software") {
    return [
      `The user enters ${profile.input} through a focused web or mobile interface.`,
      `The system performs ${profile.processing} and stores ${profile.data}.`,
      `The user or admin sees ${profile.output} with clear status feedback.`,
      `Testing checks ${profile.testFocus} using realistic sample records.`,
    ];
  }

  return [
    `The prototype collects ${profile.input} using the selected modules.`,
    `The controller performs ${profile.processing}.`,
    `The result is shown through ${profile.output}.`,
    `Testing records ${profile.testFocus} so the demo can be explained during viva.`,
  ];
}

function getBuildLevels(project: CatalogProject, profile: ProjectProfile) {
  const core = profile.coreModules.join(", ");
  if (project.category === "software") {
    return [
      { level: "Basic prototype", description: `Main user flow with ${core}, simple forms, core records, and one admin view.` },
      { level: "Intermediate prototype", description: "Adds search, status tracking, validation, dashboards, and better sample data for report testing." },
      { level: "Advanced prototype", description: "Adds notifications, analytics, exports, AI/payment/QR features, or stronger role-based access where relevant." },
    ];
  }

  return [
    { level: "Basic prototype", description: `Core demo using ${core} with visible input and output response.` },
    { level: "Intermediate prototype", description: "Adds dashboard/database logging, alerts, calibration notes, and cleaner wiring for reliable demonstration." },
    { level: "Advanced prototype", description: "Adds casing, mobile/cloud features, multi-node setup, image processing, maps, or reporting depending on scope." },
  ];
}

function getDemoOutcomes(profile: ProjectProfile) {
  return [
    `Shows ${profile.output} from real or realistic ${profile.input}.`,
    `Stores or displays ${profile.data} as report evidence.`,
    `Demonstrates the main ${profile.domain} workflow end to end.`,
    `Includes a clear test scenario for ${profile.testFocus}.`,
  ];
}

function getTestingPlan(project: CatalogProject, profile: ProjectProfile) {
  if (project.category === "software") {
    return [
      "Prepare 10-20 realistic sample records for normal, invalid, and edge-case workflows.",
      `Test whether the system correctly handles ${profile.testFocus}.`,
      "Capture screenshots of the main user flow, admin flow, database records, and final output.",
      "Document which features are prototype-level and which features are future improvements.",
    ];
  }

  return [
    "Run repeated tests under controlled demo conditions and record readings or status changes.",
    `Verify ${profile.testFocus} before adding extra features.`,
    "Capture photos, dashboard screenshots, serial logs, or database entries as testing evidence.",
    "Document sensor/module limits honestly so the report does not overclaim industrial accuracy.",
  ];
}

function getTroubleshooting(project: CatalogProject, profile: ProjectProfile) {
  if (project.category === "software") {
    return [
      "If login or role access fails, test with one admin account and one normal user before adding more roles.",
      "If records do not appear correctly, check form validation, database table relationships, and status update logic.",
      "If the demo feels weak, reduce extra features and make the main user-to-admin workflow complete and testable.",
      `If results are inconsistent, prepare clearer sample data for ${profile.testFocus}.`,
    ];
  }

  return [
    "If readings are unstable, test the sensor separately before connecting the dashboard or app.",
    "If the module resets, check power supply, common ground, loose jumper wires, and current requirements.",
    "If alerts or cloud updates fail, test WiFi, hotspot, SIM balance, API token, and internet connection early.",
    `If the demo is hard to explain, focus on one repeatable workflow for ${profile.output}.`,
  ];
}

function getReportSections(profile: ProjectProfile, mainTechnologies: string) {
  return [
    "Problem statement and project background",
    `Objectives focused on ${profile.domain} and achievable prototype scope`,
    `System block diagram showing ${profile.input} -> processing -> ${profile.output}`,
    `Methodology using ${mainTechnologies} with data flow and user/prototype workflow`,
    `Testing results for ${profile.testFocus}`,
    "Limitations, discussion, and future improvements",
  ];
}

function getLimitations(tags: string[], category: CatalogProject["category"], profile: ProjectProfile) {
  const limitations = new Set<string>();

  if (category === "software") {
    limitations.add(`This is a prototype plan for ${profile.domain}, not a finished commercial production system.`);
    limitations.add("Software accuracy and reliability depend on validation rules, database design, and realistic test data.");
    limitations.add("Authentication, role access, and input sanitisation should be included if the system stores sensitive records.");
  } else {
    limitations.add(`This is realistic for FYP when the scope stays controlled: ${profile.scopeAdvice}`);
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
  if (tags.includes("ph") || tags.includes("tds") || tags.includes("turbidity")) {
    limitations.add("Water-quality sensors need calibration and proper probe handling for meaningful test results.");
  }
  if (tags.includes("iot") || tags.includes("blynk") || tags.includes("telegram") || tags.includes("firebase")) {
    limitations.add("IoT demos depend on stable WiFi, hotspot, or internet access unless an offline backup mode is prepared.");
  }

  return Array.from(limitations).slice(0, 6);
}

function getCommonMistakes(tags: string[], category: CatalogProject["category"], profile: ProjectProfile) {
  const mistakes = new Set<string>();

  mistakes.add("Choosing a scope that is too large for the available FYP timeline.");
  mistakes.add(profile.scopeAdvice);
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

function getUpgrades(tags: string[], category: CatalogProject["category"], profile: ProjectProfile) {
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
  if (profile.domain.includes("Raspberry Pi")) upgrades.add("Auto-start service and local kiosk mode");
  if (profile.domain.includes("water")) upgrades.add("Calibration screen and threshold presets");
  if (profile.domain.includes("energy")) upgrades.add("Daily usage summary and anomaly alerts");

  return Array.from(upgrades).slice(0, 7);
}

function getFaqs(project: CatalogProject, difficulty: CatalogSeo["difficulty"], profile: ProjectProfile) {
  const platform =
    project.category === "iot"
      ? "Arduino, ESP32, Raspberry Pi, or another controller depending on the required features"
      : "PHP/MySQL, Python, Firebase, Android, or another stack depending on the required workflow";

  return [
    {
      q: `Is "${project.title}" suitable for FYP?`,
      a: `Yes. This title can be suitable for FYP or Projek Akhir Tahun when the scope is controlled. The recommended scope is ${profile.scopeAdvice.toLowerCase()}`,
    },
    {
      q: "What difficulty level is this project?",
      a: `The suggested difficulty is ${difficulty}. The actual difficulty depends on whether you choose a basic, intermediate, or advanced prototype scope.`,
    },
    {
      q: "What platform can this project use?",
      a: `This project can be planned using ${profile.coreModules.join(", ")}. The final platform can be adjusted based on supervisor requirements and the chosen scope; common alternatives include ${platform}.`,
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
