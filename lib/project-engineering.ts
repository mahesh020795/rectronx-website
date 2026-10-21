import type { CatalogProject } from "../data/projects.ts";

export type EngineeringComponentCategory =
  | "controller"
  | "input"
  | "communication"
  | "data"
  | "output"
  | "power"
  | "deployment";

export type EngineeringComponent = {
  name: string;
  category: EngineeringComponentCategory;
  role: string;
  required: boolean;
};

export type DiagramNode = {
  id: string;
  label: string;
  detail: string;
  kind: "input" | "process" | "data" | "communication" | "output";
};

export type DiagramEdge = {
  from: string;
  to: string;
  label: string;
};

export type ProjectEngineering = {
  profile: string;
  components: EngineeringComponent[];
  diagram: { nodes: DiagramNode[]; edges: DiagramEdge[] };
  functionFlow: { step: number; title: string; description: string }[];
  validationNotes: string[];
};

type MatchRule = { terms: string[]; component: EngineeringComponent };

const component = (
  name: string,
  category: EngineeringComponentCategory,
  role: string,
  required = true,
): EngineeringComponent => ({ name, category, role, required });

const inputRules: MatchRule[] = [
  { terms: ["rfid"], component: component("RC522 RFID reader and cards", "input", "Reads the registered card identifier") },
  { terms: ["fingerprint", "biometric"], component: component("Optical fingerprint sensor", "input", "Captures and matches enrolled fingerprints") },
  { terms: ["qr code", "qr scan", "barcode"], component: component("Camera or barcode scanner", "input", "Captures the QR code or barcode identifier") },
  { terms: ["nfc"], component: component("PN532 NFC reader and tags", "input", "Reads the nearby NFC tag identifier") },
  { terms: ["ble asset", "bluetooth visitor", "bluetooth tag"], component: component("BLE beacon tags", "input", "Broadcast identifiers for nearby ESP32 scanning") },
  { terms: ["gps", "location tracking", "location monitor"], component: component("NEO-6M GPS receiver", "input", "Provides outdoor latitude, longitude and time") },
  { terms: ["crash", "fall", "tilt", "pothole", "vibration", "seismic", "accelerometer", "mpu6050", "imu", "hand-gesture"], component: component("MPU6050 accelerometer/gyroscope", "input", "Measures motion, tilt or impact for event detection") },
  { terms: ["temperature", "humidity", "weather", "climate", "incubator", "cold storage", "refrigerator", "dht22", "bme280", "comfort monitor"], component: component("BME280 environmental sensor", "input", "Measures temperature, humidity and pressure for trend monitoring") },
  { terms: ["water temperature", "aquarium", "fish pond", "aquaculture"], component: component("DS18B20 waterproof temperature probe", "input", "Measures water temperature") },
  { terms: ["soil moisture", "irrigation", "plant", "agriculture", "greenhouse", "farm"], component: component("Capacitive soil-moisture sensor", "input", "Estimates soil moisture after dry/wet calibration") },
  { terms: ["water level", "flood", "tank", "drainage", "river level"], component: component("Water-level or waterproof ultrasonic sensor", "input", "Measures level without claiming laboratory accuracy") },
  { terms: ["water leak", "leakage", "wet floor", "moisture sensor", "rain sensor", "rain detection"], component: component("Water/rain detection sensor", "input", "Detects surface water or rain after threshold testing") },
  { terms: ["flow sensor", "water usage", "flow tracking", "bottle filling"], component: component("Hall-effect liquid flow sensor", "input", "Counts calibrated pulses to estimate liquid flow and volume") },
  { terms: ["ph"], component: component("pH probe with interface board", "input", "Measures calibrated acidity/alkalinity") },
  { terms: ["tds", "nutrient"], component: component("TDS sensor module", "input", "Estimates dissolved-solids trend after calibration") },
  { terms: ["turbidity", "water quality", "pollution"], component: component("Turbidity sensor module", "input", "Measures relative water clarity") },
  { terms: ["gas", "lpg", "smoke", "alcohol", "air quality", "emission", "odor", "ammonia"], component: component("Task-appropriate MQ-series gas sensor", "input", "Detects a relative gas/smoke response after warm-up and baseline testing") },
  { terms: ["co2"], component: component("SCD41 NDIR CO2 sensor", "input", "Measures carbon-dioxide concentration for ventilation guidance") },
  { terms: ["flame", "fire"], component: component("Flame sensor", "input", "Detects a nearby flame signature in a controlled prototype") },
  { terms: ["current", "energy", "power monitoring", "appliance", "battery health", "solar battery", "ina219", "runtime estimator"], component: component("INA219 voltage/current monitor", "input", "Measures low-voltage bus current and voltage") },
  { terms: ["voltage", "battery voltage", "sag", "swell"], component: component("Isolated or scaled voltage-sensing circuit", "input", "Measures voltage within the designed and safely isolated range") },
  { terms: ["occupancy", "motion", "security", "intrusion", "elderly monitoring", "pir"], component: component("PIR motion sensor", "input", "Detects changes in human motion within its field of view") },
  { terms: ["distance", "parking", "blind stick", "bin", "obstacle", "ultrasonic"], component: component("HC-SR04 ultrasonic distance sensor", "input", "Measures short-range distance for presence or fill-level logic") },
  { terms: ["door", "window", "cabinet", "parcel box", "magnetic sensor"], component: component("Magnetic reed switch", "input", "Reports open and closed state") },
  { terms: ["heart rate", "vital", "pulse", "health monitoring"], component: component("MAX30102 pulse-oximeter module", "input", "Provides educational pulse and optical readings, not diagnosis") },
  { terms: ["weight", "weigh", "load"], component: component("Load cell with HX711 amplifier", "input", "Measures calibrated weight") },
  { terms: ["noise", "sound"], component: component("MAX9814 microphone amplifier", "input", "Captures relative audio amplitude for trend or threshold analysis") },
  { terms: ["light", "brightness", "solar tracking", "ldr", "dust detection"], component: component("BH1750 or paired LDR light sensors", "input", "Measures ambient or differential light level after calibration") },
  { terms: ["pressure sensor", "tyre pressure", "cylinder pressure"], component: component("Pressure transducer with signal conditioning", "input", "Measures pressure within the selected transducer range") },
  { terms: ["airflow sensor", "fume hood"], component: component("Airflow sensor or differential-pressure switch", "input", "Indicates whether ventilation flow meets the prototype threshold") },
  { terms: ["radar sensor", "speed awareness"], component: component("Doppler radar speed sensor", "input", "Estimates approaching-object speed after calibration") },
  { terms: ["ir sensor", "item counter", "visitor counter", "passenger counting", "usage counter", "edge detection"], component: component("IR break-beam or proximity sensor", "input", "Detects an object crossing or occupying the defined sensing point") },
  { terms: ["rtc", "schedule", "school bell", "pill dispenser", "fish feeder"], component: component("DS3231 real-time clock", "input", "Provides battery-backed schedule time") },
  { terms: ["voice", "google assistant"], component: component("Voice-assistant command interface", "input", "Converts an authorised spoken command into a defined control request") },
  { terms: ["web control", "web update", "admin web", "notice board"], component: component("Authenticated web control form", "input", "Accepts authorised content or control commands") },
  { terms: ["app control", "mobile application"], component: component("Authenticated mobile-app command", "input", "Provides the authorised user command to the controller") },
  { terms: ["local web server", "sensor monitoring"], component: component("BME280 demonstration sensor", "input", "Supplies repeatable environmental readings to the local server") },
  { terms: ["classroom kiosk", "admin web dashboard"], component: component("Authenticated timetable and announcement form", "input", "Accepts authorised kiosk content") },
  { terms: ["queue token"], component: component("Token-call button or authorised web form", "input", "Advances the queue after an authorised operator action") },
  { terms: ["elcb"], component: component("Isolated breaker-status simulator", "input", "Represents trip status without automatically re-energising a mains circuit") },
  { terms: ["home monitoring and automation"], component: component("PIR motion sensor and BME280", "input", "Provides defined occupancy and room-condition inputs") },
  { terms: ["papan tanda jalan", "road sign"], component: component("INA219 solar supply monitor", "input", "Measures the low-voltage sign supply and charging current") },
  { terms: ["mqtt sensor gateway", "sensor nodes", "iot gateway"], component: component("Configured sensor-node telemetry", "input", "Supplies structured MQTT or local-network measurements") },
  { terms: ["wifi signal strength", "network monitoring"], component: component("WiFi/network telemetry", "input", "Collects RSSI or authorised network-health measurements") },
  { terms: ["fuel theft"], component: component("Fuel-level sensor or protected float switch", "input", "Detects an unexpected fuel-level change in a bench prototype") },
  { terms: ["reverse vending"], component: component("IR object sensor and load cell", "input", "Detects an inserted container and verifies a basic acceptance condition") },
  { terms: ["camera", "face", "image", "plate", "visual", "ppe", "object detection"], component: component("Camera module", "input", "Captures controlled images or video frames") },
  { terms: ["button", "panic", "emergency"], component: component("Momentary push button", "input", "Provides a deliberate manual trigger") },
  { terms: ["keypad", "otp", "pin access"], component: component("4x4 matrix keypad", "input", "Accepts a PIN, OTP or menu input") },
];

const outputRules: MatchRule[] = [
  { terms: ["lock", "locker", "door access", "cabinet"], component: component("Solenoid lock with driver", "output", "Locks or releases the prototype enclosure") },
  { terms: ["pump", "irrigation", "sprinkler", "water heating"], component: component("Relay or MOSFET driver and low-voltage pump", "output", "Switches the demo pump or heater load safely") },
  { terms: ["fan", "dryer", "climate control", "incubator", "ventilation"], component: component("Relay or MOSFET driver and DC fan", "output", "Controls airflow from threshold logic") },
  { terms: ["robot", "vehicle", "conveyor", "sorting", "collector"], component: component("Motor driver and geared DC motors", "output", "Drives the prototype mechanism with a separate motor supply") },
  { terms: ["feeder", "shading", "window", "cradle", "gate", "barrier"], component: component("Servo motor", "output", "Moves the small mechanical actuator to a commanded position") },
  { terms: ["display", "sign", "queue", "score", "status", "monitoring", "meter", "oled", "lcd", "notice board"], component: component("OLED, LCD or LED display", "output", "Shows local readings and system state") },
  { terms: ["alarm", "alert", "warning", "emergency", "leak", "fire", "theft", "safety"], component: component("Active buzzer and status LEDs", "output", "Provides immediate local warning and state indication") },
  { terms: ["printer", "receipt", "ticket", "thermal printer"], component: component("Thermal receipt printer", "output", "Prints the prototype receipt or queue ticket") },
  { terms: ["relay", "automation", "appliance", "lighting", "light control", "solenoid valve"], component: component("Opto-isolated relay module", "output", "Switches the selected demonstration load") },
  { terms: ["servo"], component: component("Servo motor", "output", "Moves the small mechanical actuator to a commanded position") },
  { terms: ["motor"], component: component("Motor driver and geared DC motor", "output", "Drives the mechanism from a separate motor supply") },
  { terms: ["buzzer", "bell", "announcement trigger"], component: component("Active buzzer or amplified audio output", "output", "Provides the local audible indication") },
  { terms: ["led", "road stud", "indicator"], component: component("Current-limited LED indicators", "output", "Shows the commanded visual state") },
  { terms: ["dashboard", "app control", "web control", "web update", "database"], component: component("Web or mobile dashboard", "output", "Shows records, status and authorised controls") },
];

function haystack(project: CatalogProject) {
  return `${project.title} ${project.tags.join(" ")}`.toLowerCase();
}

function has(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function unique(items: EngineeringComponent[]) {
  return items.filter(
    (item, index) => items.findIndex((candidate) => candidate.name === item.name) === index,
  );
}

function profileFor(project: CatalogProject, text: string) {
  if (project.category === "software") {
    if (has(text, ["ai", "machine learning", "prediction", "classification", "opencv", "nlp", "chatbot", "sentiment", "ocr", "recognition"])) return "AI and machine-learning application";
    if (has(text, ["mobile app", "android", "firebase"])) return "Mobile application workflow";
    if (has(text, ["booking", "appointment", "reservation", "calendar", "scheduling"])) return "Booking and scheduling system";
    if (has(text, ["inventory", "asset", "warehouse", "stock", "equipment loan", "tool reservation"])) return "Inventory and asset workflow";
    if (has(text, ["approval", "claim", "complaint", "request", "ticket", "submission", "tracking"])) return "Request and approval workflow";
    return "Database-backed web application";
  }
  if (has(text, ["rfid", "fingerprint", "biometric", "access", "attendance", "locker", "check-in"])) return "Identity and access-control prototype";
  if (has(text, ["gps", "tracking", "panic", "crash", "fall", "vehicle", "helmet", "location"])) return "Tracking and emergency-alert prototype";
  if (has(text, ["water", "ph", "tds", "turbidity", "aquarium", "pond", "flood", "tank", "hydroponic"])) return "Water monitoring and control prototype";
  if (has(text, ["temperature", "humidity", "weather", "greenhouse", "incubator", "cold storage", "refrigerator", "air quality"])) return "Environmental monitoring and automation prototype";
  if (has(text, ["energy", "current", "voltage", "solar", "battery", "meter", "charging", "appliance"])) return "Energy and power monitoring prototype";
  if (has(text, ["camera", "opencv", "image", "face", "plate", "visual", "recognition"])) return "Camera and visual-monitoring prototype";
  if (has(text, ["robot", "motor", "conveyor", "sorting", "feeder", "mechanism"])) return "Mechatronic control prototype";
  if (has(text, ["health", "heart", "pulse", "medicine", "elderly", "patient"])) return "Educational health-monitoring prototype";
  if (has(text, ["gas", "flame", "fire", "smoke", "theft", "security", "safety"])) return "Safety detection and alert prototype";
  if (has(text, ["agriculture", "farm", "plant", "soil", "irrigation", "poultry"])) return "Smart agriculture prototype";
  if (has(text, ["parking", "traffic", "bus", "transport", "road"])) return "Smart transport prototype";
  return "IoT monitoring and automation prototype";
}

function getSoftwareEngineering(project: CatalogProject, text: string): ProjectEngineering {
  const profile = profileFor(project, text);
  const isAi = profile.startsWith("AI");
  const isMobile = profile.startsWith("Mobile");
  const platform = isAi
    ? component("Python and a task-appropriate ML library", "controller", "Runs preprocessing, training/inference and evaluation")
    : isMobile
      ? component("Android or Flutter application", "controller", "Implements the user-facing mobile workflow")
      : component("PHP/Laravel or Next.js application", "controller", "Implements validation, business rules and role-based workflow");
  const input = isAi
    ? component(has(text, ["image", "face", "opencv", "ocr", "recognition"]) ? "Labelled image dataset" : "Cleaned and labelled dataset", "input", "Supplies separate training, validation and test samples")
    : component(has(text, ["qr", "barcode"]) ? "Device camera for QR/barcode scan" : "Validated user forms", "input", "Captures the main transaction and rejects incomplete data");
  const database = component(
    has(text, ["firebase"]) ? "Firebase Authentication and Firestore" : "MySQL or PostgreSQL database",
    "data",
    "Stores users, records, status history and timestamps",
  );
  const output = component(
    isAi ? "Prediction and evaluation dashboard" : "User and administrator dashboards",
    "output",
    isAi ? "Shows predictions with measured evaluation results" : "Shows status, searchable records, reports and feedback",
  );
  const deploy = component(
    isMobile ? "Android test device and backend hosting" : "HTTPS web hosting and environment configuration",
    "deployment",
    "Provides a reproducible test and demonstration environment",
  );
  const optional = has(text, ["notification", "reminder", "alert", "whatsapp"])
    ? [component("Email, push or WhatsApp notification service", "communication", "Sends status notifications after a successful database event", false)]
    : [];
  const components = unique([platform, input, database, output, deploy, ...optional]);
  const nodes: DiagramNode[] = [
    { id: "input", label: input.name, detail: input.role, kind: "input" },
    { id: "application", label: platform.name, detail: platform.role, kind: "process" },
    { id: "database", label: database.name, detail: database.role, kind: "data" },
    { id: "output", label: output.name, detail: output.role, kind: "output" },
  ];
  const edges: DiagramEdge[] = [
    { from: "input", to: "application", label: "validated input" },
    { from: "application", to: "database", label: isAi ? "samples and results" : "create/read/update" },
    { from: "database", to: "application", label: "authorised records" },
    { from: "application", to: "output", label: isAi ? "prediction and metrics" : "status and report" },
  ];
  if (optional.length) {
    nodes.push({ id: "notification", label: optional[0].name, detail: optional[0].role, kind: "communication" });
    edges.push({ from: "application", to: "notification", label: "confirmed event" });
  }
  const validationNotes = isAi
    ? ["Keep training and test samples separate; report class-wise metrics and limitations rather than a single unsupported accuracy claim.", "Use only data you are permitted to collect, anonymise personal records, and document the dataset source and labelling method."]
    : ["Test each role with allowed and forbidden actions, not only the administrator account.", "Use database constraints or transactions for bookings, stock, payments and approvals where simultaneous updates could conflict."];
  if (has(text, ["clinic", "patient", "medical record", "mental health", "healthcare"])) {
    validationNotes.push("Use synthetic or properly authorised data, minimise sensitive personal information, and test privacy and role permissions before any demonstration.");
  }
  if (isAi && has(text, ["symptom", "medical", "health prediction", "diagnosis"])) {
    validationNotes.push("Present the result as an educational decision-support prototype, not medical diagnosis or professional clinical advice.");
  }

  return {
    profile,
    components,
    diagram: { nodes, edges },
    functionFlow: [
      { step: 1, title: "Authenticate and capture", description: `The user signs in where required and supplies ${input.name.toLowerCase()}.` },
      { step: 2, title: "Validate", description: "The application checks required fields, formats, permissions and duplicate conditions before processing." },
      { step: 3, title: isAi ? "Run the model pipeline" : "Apply business rules", description: isAi ? "The system preprocesses the sample and runs only the documented prediction task." : "The server applies the project-specific booking, approval, inventory or transaction rules." },
      { step: 4, title: "Persist an auditable record", description: `The ${database.name} stores the record, status, responsible user and timestamp.` },
      { step: 5, title: "Present the outcome", description: `${output.name} shows the result and enough evidence to verify the complete workflow.` },
      { step: 6, title: "Handle exceptions", description: "Invalid, unauthorised, conflicting and missing-data cases return clear feedback without corrupting records." },
    ],
    validationNotes,
  };
}

function controllerFor(text: string) {
  if (text.includes("raspberry pi")) return component("Raspberry Pi", "controller", "Runs Linux, Python and local camera or dashboard services");
  if (text.includes("arduino") && !has(text, ["wifi", "iot", "blynk", "firebase", "telegram"])) return component("Arduino Uno", "controller", "Reads modules and runs the local control logic");
  return component("ESP32 development board", "controller", "Reads sensors, applies control logic and provides WiFi/Bluetooth when required");
}

function getHardwareEngineering(project: CatalogProject, text: string): ProjectEngineering {
  const profile = profileFor(project, text);
  const controller = controllerFor(text);
  let inputs = inputRules.filter((rule) => has(text, rule.terms)).map((rule) => rule.component);
  if (!inputs.length) inputs = [component("Debounced push button or selector switch", "input", "Provides a defined manual test input for the core prototype workflow")];
  inputs = unique(inputs).slice(0, 3);

  let outputs = outputRules.filter((rule) => has(text, rule.terms)).map((rule) => rule.component);
  if (!outputs.length) outputs = [component("OLED display and status indicator", "output", "Shows the measured state and local decision")];
  outputs = unique(outputs).slice(0, 2);
  if (text.includes("elcb")) {
    outputs = [component("Status LEDs and buzzer", "output", "Reports detected trip status without resetting or energising the circuit")];
  }

  const communications: EngineeringComponent[] = [];
  if (has(text, ["gsm", "sms"])) communications.push(component("SIM800L/SIM7600 cellular module", "communication", "Sends SMS or data using a powered SIM connection"));
  if (has(text, ["lora"])) communications.push(component("SX127x LoRa transceiver pair", "communication", "Transfers low-rate packets between configured local nodes"));
  if (has(text, ["iot", "wifi", "blynk", "firebase", "telegram", "dashboard", "app"])) communications.push(component("WiFi router/hotspot and dashboard service", "communication", "Transfers readings and events to the selected application service"));
  const power = component(
    has(text, ["solar", "battery", "wearable", "vehicle"]) ? "Regulated battery supply with protection" : "Regulated 5 V supply with common ground",
    "power",
    has(text, ["solar", "battery", "wearable", "vehicle"]) ? "Powers the prototype within the controller and module current limits" : "Provides stable power while keeping higher-current loads on suitable drivers",
  );
  const data = has(text, ["database", "firebase", "dashboard", "logging", "history", "iot"])
    ? [component("Time-stamped database or data logger", "data", "Stores readings, events and output states for report evidence")]
    : [];
  const components = unique([controller, ...inputs, ...communications, ...data, ...outputs, power]);

  const inputLabel = inputs.map((item) => item.name).join(" + ");
  const outputLabel = outputs.map((item) => item.name).join(" + ");
  const nodes: DiagramNode[] = [
    { id: "input", label: inputLabel, detail: inputs.map((item) => item.role).join("; "), kind: "input" },
    { id: "controller", label: controller.name, detail: controller.role, kind: "process" },
    { id: "decision", label: "Filtering and decision logic", detail: "Converts readings into a documented state, threshold or event", kind: "process" },
    { id: "output", label: outputLabel, detail: outputs.map((item) => item.role).join("; "), kind: "output" },
  ];
  const edges: DiagramEdge[] = [
    { from: "input", to: "controller", label: "measured signal" },
    { from: "controller", to: "decision", label: "calibrated value/event" },
    { from: "decision", to: "output", label: "status/control command" },
  ];
  if (communications.length) {
    nodes.push({ id: "network", label: communications.map((item) => item.name).join(" + "), detail: communications.map((item) => item.role).join("; "), kind: "communication" });
    edges.push({ from: "decision", to: "network", label: "alert/telemetry" });
  }
  if (data.length) {
    nodes.push({ id: "data", label: data[0].name, detail: data[0].role, kind: "data" });
    edges.push({ from: communications.length ? "network" : "controller", to: "data", label: "timestamped record" });
  }

  const validationNotes = [
    "Verify every module voltage, logic level, current draw and driver requirement against the exact purchased board datasheet before wiring.",
    profile.includes("health")
      ? "Treat readings as educational measurements only; do not present the prototype as a diagnostic or certified medical device."
      : profile.includes("Safety")
        ? "Use controlled test sources and present this as an educational prototype, not a certified life-safety system."
        : "Calibrate or baseline the input with known test conditions and report repeatability, response time and observed limitations.",
  ];
  if (text.includes("elcb")) {
    validationNotes.push("The prototype must not automatically re-energise a tripped mains circuit. Demonstrate status detection on an isolated low-voltage simulator; inspection and manual reset belong to a qualified person.");
  }
  if (has(text, ["mains", "240v", "ac voltage", "grid voltage"])) {
    validationNotes.push("Do not connect hobby modules directly to mains. Use certified isolation, protected enclosures and qualified supervision, or demonstrate with an isolated low-voltage source.");
  }
  if (has(text, ["patient health", "patient room", "patient bed"])) {
    validationNotes.push("Use anonymous test identities and avoid storing identifiable personal or patient information in the educational prototype.");
  }

  return {
    profile,
    components,
    diagram: { nodes, edges },
    functionFlow: [
      { step: 1, title: "Power and initialise", description: `The ${power.name.toLowerCase()} starts the ${controller.name} and connected modules within their voltage and current requirements.` },
      { step: 2, title: "Acquire the input", description: `${inputLabel} supplies the project measurement, identity or trigger.` },
      { step: 3, title: "Validate the signal", description: "Firmware rejects missing or implausible samples and applies calibration, debounce or averaging appropriate to the module." },
      { step: 4, title: "Make the decision", description: "The controller compares the validated value with the documented threshold, authorisation rule or operating state." },
      { step: 5, title: "Act and communicate", description: `${outputLabel} presents the local result${communications.length ? ", while the communication link sends the corresponding event or reading" : ""}.` },
      { step: 6, title: "Record and recover", description: `${data.length ? "The logger stores the input, decision, output and timestamp. " : "The test sheet records the input, decision and output. "}On a fault, the system enters a defined safe state instead of silently continuing.` },
    ],
    validationNotes,
  };
}

export function getProjectEngineering(project: CatalogProject): ProjectEngineering {
  const text = haystack(project);
  return project.category === "software"
    ? getSoftwareEngineering(project, text)
    : getHardwareEngineering(project, text);
}
