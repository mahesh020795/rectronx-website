export interface ServicePage {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  location: string;
  areaServed: string[];
  keywords: string[];
  heroPoints: string[];
  whoFor: string[];
  deliverables: string[];
  process: string[];
  qualityChecks: string[];
  relatedTags: string[];
  relatedTopicSlugs: string[];
  componentSlugs: string[];
  faqs: { q: string; a: string }[];
  whatsappMessage: string;
}

export const servicePages: ServicePage[] = [
  {
    slug: "fyp-project-malaysia",
    title: "FYP Project Support Malaysia",
    shortTitle: "FYP Malaysia",
    eyebrow: "Final Year Project Support",
    description:
      "Engineering and software final year project support for Malaysian students who need a practical, testable and well-documented project scope.",
    metaTitle: "FYP Project Malaysia | IoT, Arduino, ESP32 & Software Support",
    metaDescription:
      "Rectronx helps Malaysian students plan and build realistic FYP projects in IoT, Arduino, ESP32, Raspberry Pi, AI/ML, websites and mobile apps.",
    location: "Malaysia",
    areaServed: ["Malaysia", "Penang", "Kuala Lumpur", "Selangor", "Johor", "Kedah", "Perak"],
    keywords: [
      "fyp project malaysia",
      "final year project malaysia",
      "iot fyp malaysia",
      "arduino fyp malaysia",
      "software fyp malaysia",
    ],
    heroPoints: [
      "Project titles matched to achievable hardware and software scope",
      "Prototype, documentation and demo planning based on real constraints",
      "Suitable for engineering, IT, computer science and embedded systems students",
    ],
    whoFor: [
      "Students who need a realistic FYP idea before proposal submission",
      "Students who already have a title but need architecture, components and workflow",
      "Students who want a project that can be demonstrated clearly during presentation",
    ],
    deliverables: [
      "Project scope, objective and system workflow",
      "Recommended hardware/software stack",
      "Prototype implementation guidance",
      "Testing checklist and presentation demo flow",
      "Report sections for methodology, limitations and future work",
    ],
    process: [
      "Clarify course requirement, deadline and allowed technologies",
      "Shortlist project ideas from catalog topics and difficulty",
      "Define the minimum viable demo before adding advanced features",
      "Build and test each module before final integration",
      "Prepare explanation points for viva and project report",
    ],
    qualityChecks: [
      "No fixed price claim is shown before checking exact scope",
      "Each project should have measurable input, processing and output",
      "Hardware projects include power, sensor and connectivity limitations",
      "Software projects include roles, database design and deployment path",
    ],
    relatedTags: ["IoT", "Arduino", "ESP32", "Raspberry Pi", "AI", "Web App", "Mobile App", "Firebase"],
    relatedTopicSlugs: ["iot", "esp32", "arduino", "raspberry-pi", "ai-ml", "software-fyp"],
    componentSlugs: ["esp32", "arduino-uno", "raspberry-pi-pico", "bme280", "rc522", "sim800l"],
    faqs: [
      {
        q: "Can Rectronx help choose an FYP title in Malaysia?",
        a: "Yes. Rectronx can help narrow the title based on course requirement, deadline, budget range, available components and the type of demo expected by the supervisor.",
      },
      {
        q: "Does every FYP need IoT or AI?",
        a: "No. A strong FYP needs a clear problem, working implementation, testing evidence and a good explanation. IoT or AI is useful only when it improves the project outcome.",
      },
      {
        q: "Can the project be adjusted for diploma or degree level?",
        a: "Yes. The same topic can be scoped differently by changing the number of sensors, automation level, dashboard complexity, dataset size or testing depth.",
      },
    ],
    whatsappMessage: "Hi Rectronx, I need help with an FYP project in Malaysia.",
  },
  {
    slug: "fyp-project-penang",
    title: "FYP Project Support Penang",
    shortTitle: "FYP Penang",
    eyebrow: "Penang Engineering Students",
    description:
      "Penang-focused FYP support for students who need a practical project idea, hardware/software planning and a demo that can be explained confidently.",
    metaTitle: "FYP Project Penang | Rectronx Engineering Project Support",
    metaDescription:
      "Based in Penang, Rectronx supports FYP projects for IoT, Arduino, ESP32, Raspberry Pi, software, apps and AI/ML with realistic project scopes.",
    location: "Penang, Malaysia",
    areaServed: ["Penang", "Ayer Itam", "George Town", "Bayan Lepas", "Butterworth", "Bukit Mertajam"],
    keywords: ["fyp project penang", "final year project penang", "arduino project penang", "iot project penang"],
    heroPoints: [
      "Local Penang support for planning, prototype review and project explanation",
      "Project scopes suitable for Malaysian university and polytechnic requirements",
      "Useful for electronics, embedded, IoT, software and AI/ML project tracks",
    ],
    whoFor: [
      "Penang students who want direct project discussion and clearer project direction",
      "Students who need help turning a broad idea into a defendable proposal",
      "Students who want a practical build with clear limitations and testing plan",
    ],
    deliverables: [
      "Title refinement and scope boundary",
      "Block diagram, component direction and software modules",
      "Prototype milestones for proposal, progress demo and final presentation",
      "Testing evidence checklist for report writing",
      "Viva explanation notes for major design decisions",
    ],
    process: [
      "Review the given title or supervisor requirement",
      "Confirm what can be built within the deadline",
      "Select components, platform and dashboard/app approach",
      "Test modules separately before integration",
      "Prepare report explanation around engineering decisions",
    ],
    qualityChecks: [
      "No promise of marks or guaranteed approval",
      "Avoid titles that require unavailable datasets or unsafe hardware",
      "Prefer modules that can be tested in front of a panel",
      "Document assumptions, limitations and calibration needs",
    ],
    relatedTags: ["IoT", "Arduino", "ESP32", "Raspberry Pi", "Firebase", "Blynk", "Sensors"],
    relatedTopicSlugs: ["iot", "esp32", "arduino", "raspberry-pi", "firebase", "blynk"],
    componentSlugs: ["esp32", "arduino-uno", "mq135", "bme280", "hc-sr04", "relay-module"],
    faqs: [
      {
        q: "Is Rectronx based in Penang?",
        a: "Yes. Rectronx is based in Penang and works with Malaysian students on FYP and engineering project support.",
      },
      {
        q: "Can Penang students discuss the project before deciding?",
        a: "Yes. The best first step is to share the title, course, deadline and current progress so the project scope can be reviewed realistically.",
      },
      {
        q: "What types of FYP projects are suitable in Penang?",
        a: "Common suitable areas include IoT monitoring, smart agriculture, parking systems, access control, mobile apps, web dashboards and AI/ML prototypes.",
      },
    ],
    whatsappMessage: "Hi Rectronx, I am in Penang and need help with my FYP project.",
  },
  {
    slug: "iot-project-malaysia",
    title: "IoT Project Support Malaysia",
    shortTitle: "IoT Projects",
    eyebrow: "ESP32, Sensors, Apps and Dashboards",
    description:
      "IoT project support for sensor monitoring, automation, alerts, dashboards and mobile app integrations using platforms such as ESP32, Arduino, Firebase and Blynk.",
    metaTitle: "IoT Project Malaysia | ESP32, Arduino, Sensors & Dashboards",
    metaDescription:
      "Build realistic IoT FYP projects in Malaysia with ESP32, Arduino, sensors, Firebase, Blynk, MQTT, LoRa and mobile/web dashboards.",
    location: "Malaysia",
    areaServed: ["Malaysia", "Penang", "Selangor", "Kuala Lumpur", "Johor", "Perak"],
    keywords: ["iot project malaysia", "esp32 iot project", "arduino iot project", "blynk project malaysia"],
    heroPoints: [
      "Sensor-to-cloud workflows with clear live demo outcomes",
      "Support for alerting, dashboards, relay control and data logging",
      "Scope planning for ESP32, Arduino, Raspberry Pi, LoRa, MQTT, Firebase or Blynk",
    ],
    whoFor: [
      "Students building environmental, agriculture, safety or automation IoT systems",
      "Teams that need a dashboard, app or database connected to hardware",
      "Projects that require SMS, Telegram, WhatsApp-style alerts or push notifications",
    ],
    deliverables: [
      "IoT system architecture and data flow",
      "Sensor and controller recommendation",
      "Dashboard/app/database integration direction",
      "Testing plan for connectivity, sensor reading and actuator response",
      "Limitations around network, calibration, power and enclosure",
    ],
    process: [
      "Choose the sensor/control objective",
      "Select controller and communication method",
      "Build local sensor reading and actuator logic",
      "Connect to dashboard, app or database",
      "Test latency, reliability, alerts and edge cases",
    ],
    qualityChecks: [
      "Sensor accuracy is explained honestly",
      "WiFi, cellular or LoRa range limitations are stated",
      "Power supply and relay safety are considered",
      "Dashboard data is useful, not decorative only",
    ],
    relatedTags: ["IoT", "ESP32", "Arduino", "Blynk", "Firebase", "MQTT", "LoRa", "Sensors"],
    relatedTopicSlugs: ["iot", "esp32", "arduino", "firebase", "blynk", "mqtt", "lora"],
    componentSlugs: ["esp32", "bme280", "mq135", "soil-moisture-sensor", "lora-sx1278", "sim800l"],
    faqs: [
      {
        q: "Which controller is best for an IoT FYP?",
        a: "ESP32 is usually the best starting point for WiFi IoT projects because it has built-in WiFi, enough GPIO and strong community support. Arduino is better for simpler offline control.",
      },
      {
        q: "Should I use Firebase, Blynk or MQTT?",
        a: "Blynk is fast for mobile dashboards, Firebase is good for custom apps and databases, while MQTT is better for more professional IoT architecture.",
      },
      {
        q: "What makes an IoT project strong for presentation?",
        a: "A strong IoT demo shows live sensor readings, meaningful alerts, clear actuator response, logged data and honest discussion of limitations.",
      },
    ],
    whatsappMessage: "Hi Rectronx, I want help planning an IoT FYP project.",
  },
  {
    slug: "esp32-project-malaysia",
    title: "ESP32 Project Support Malaysia",
    shortTitle: "ESP32 Projects",
    eyebrow: "WiFi and Bluetooth FYP Builds",
    description:
      "ESP32 project support for WiFi IoT systems, mobile app control, Firebase dashboards, sensor monitoring, automation and ESP32-CAM projects.",
    metaTitle: "ESP32 Project Malaysia | IoT, Firebase, Blynk & Sensor Projects",
    metaDescription:
      "Plan and build ESP32 FYP projects in Malaysia with WiFi, Bluetooth, Firebase, Blynk, sensors, relays, dashboards and mobile app control.",
    location: "Malaysia",
    areaServed: ["Malaysia", "Penang", "Kuala Lumpur", "Selangor", "Johor"],
    keywords: ["esp32 project malaysia", "esp32 fyp", "esp32 firebase project", "esp32 blynk project"],
    heroPoints: [
      "ESP32 project scopes for sensor monitoring, automation and app control",
      "Support for Firebase, Blynk, MQTT, Telegram and web dashboard workflows",
      "Practical guidance for GPIO, ADC, boot pins, power and WiFi reliability",
    ],
    whoFor: [
      "Students using ESP32 for IoT, automation or wireless sensor projects",
      "Projects that need phone app control or real-time dashboard updates",
      "Teams upgrading from Arduino Uno to WiFi-based project architecture",
    ],
    deliverables: [
      "ESP32 pin planning and module selection",
      "Sensor reading and actuator control workflow",
      "Cloud/app/dashboard integration plan",
      "Testing plan for WiFi, data update and relay response",
      "Common ESP32 mistakes and troubleshooting notes",
    ],
    process: [
      "Confirm sensors, outputs and power requirements",
      "Choose safe GPIO pins and avoid boot-mode conflicts",
      "Test each input/output locally",
      "Integrate WiFi/cloud/app layer",
      "Verify demo flow under realistic network conditions",
    ],
    qualityChecks: [
      "Avoid using input-only or boot-sensitive pins wrongly",
      "Explain ADC limitations for analog sensors",
      "Plan stable 5V/3.3V power where modules need it",
      "Test reconnection after WiFi drop",
    ],
    relatedTags: ["ESP32", "IoT", "Firebase", "Blynk", "MQTT", "Relay", "Sensors", "Camera"],
    relatedTopicSlugs: ["esp32", "iot", "firebase", "blynk", "mqtt"],
    componentSlugs: ["esp32", "esp32-cam", "bme280", "mq135", "relay-module", "ina219"],
    faqs: [
      {
        q: "Is ESP32 better than Arduino for FYP?",
        a: "ESP32 is better when the project needs WiFi, Bluetooth, app control or cloud data. Arduino Uno is still fine for simpler offline control and beginner-friendly circuits.",
      },
      {
        q: "Can ESP32 connect to Firebase or Blynk?",
        a: "Yes. ESP32 is commonly used with Firebase for custom apps and databases, and with Blynk for faster mobile IoT dashboards.",
      },
      {
        q: "What are common ESP32 project issues?",
        a: "Common issues include unstable power, wrong GPIO choice, weak WiFi handling, ADC noise and expecting precise readings from low-cost analog sensors without calibration.",
      },
    ],
    whatsappMessage: "Hi Rectronx, I want help with an ESP32 FYP project.",
  },
  {
    slug: "arduino-project-malaysia",
    title: "Arduino Project Support Malaysia",
    shortTitle: "Arduino Projects",
    eyebrow: "Beginner-Friendly Embedded Projects",
    description:
      "Arduino project support for sensor systems, automation, GSM/GPS alerts, RFID access, motor control and beginner-friendly embedded FYP prototypes.",
    metaTitle: "Arduino Project Malaysia | Sensor, GSM, RFID & Automation FYP",
    metaDescription:
      "Get realistic Arduino FYP project support in Malaysia for sensors, RFID, GPS, GSM, motor control, automation and display-based systems.",
    location: "Malaysia",
    areaServed: ["Malaysia", "Penang", "Kedah", "Perak", "Selangor", "Johor"],
    keywords: ["arduino project malaysia", "arduino fyp", "arduino sensor project", "arduino gsm project"],
    heroPoints: [
      "Arduino project scopes for sensors, displays, motors, RFID, GPS and GSM",
      "Good for beginner to intermediate embedded systems demonstrations",
      "Clear testing plan for input, output, control logic and alerting",
    ],
    whoFor: [
      "Students who need a reliable embedded project without complex cloud setup",
      "Projects focused on automation, access control, safety alerts or display systems",
      "Teams that need easier wiring and simpler code structure",
    ],
    deliverables: [
      "Arduino board and module selection",
      "Wiring plan and pin assignment",
      "Sensor/actuator control logic",
      "LCD/OLED/GSM/RFID integration direction",
      "Demo checklist and common mistake notes",
    ],
    process: [
      "Start with one sensor or input module",
      "Add output modules such as relay, buzzer, display or motor driver",
      "Integrate communication modules only after local logic works",
      "Test power supply and wiring stability",
      "Prepare explanation of thresholds, calibration and limitations",
    ],
    qualityChecks: [
      "Check voltage and current needs of every module",
      "Avoid powering heavy loads directly from Arduino pins",
      "Use simple, explainable control logic",
      "Document sensor limitations instead of overstating accuracy",
    ],
    relatedTags: ["Arduino", "RFID", "GSM", "GPS", "Sensors", "Relay", "Motor", "LCD"],
    relatedTopicSlugs: ["arduino", "iot", "pcb-design"],
    componentSlugs: ["arduino-uno", "rc522", "sim800l", "gps-neo-6m", "hc-sr04", "l298n"],
    faqs: [
      {
        q: "Is Arduino still good for FYP projects?",
        a: "Yes. Arduino is still suitable for sensor, automation, RFID, GPS/GSM and motor control projects where WiFi or advanced processing is not the main requirement.",
      },
      {
        q: "When should I avoid Arduino Uno?",
        a: "Avoid Arduino Uno when the project needs built-in WiFi, many serial modules, advanced image processing or large memory. ESP32 or Raspberry Pi may be better.",
      },
      {
        q: "What makes an Arduino project presentation stronger?",
        a: "A strong Arduino presentation shows clear wiring, stable power, reliable module testing, threshold reasoning and a demo that responds predictably.",
      },
    ],
    whatsappMessage: "Hi Rectronx, I want help with an Arduino FYP project.",
  },
  {
    slug: "software-fyp-malaysia",
    title: "Software, Website and App FYP Support Malaysia",
    shortTitle: "Software FYP",
    eyebrow: "Web Apps, Mobile Apps and AI/ML",
    description:
      "Software FYP support for websites, mobile apps, dashboards, admin panels, Firebase systems, database projects and AI/ML prototypes with practical scope.",
    metaTitle: "Software FYP Malaysia | Website, Mobile App, Firebase & AI/ML",
    metaDescription:
      "Plan and build software FYP projects in Malaysia including web apps, mobile apps, dashboards, Firebase systems, AI/ML prototypes and database platforms.",
    location: "Malaysia",
    areaServed: ["Malaysia", "Penang", "Kuala Lumpur", "Selangor", "Johor"],
    keywords: ["software fyp malaysia", "website fyp malaysia", "mobile app fyp", "firebase fyp", "ai ml fyp malaysia"],
    heroPoints: [
      "Web, mobile, dashboard and database systems with real user workflows",
      "AI/ML project scopes that avoid unrealistic claims and weak datasets",
      "Good structure for proposal, ERD, system architecture and testing",
    ],
    whoFor: [
      "Students building web apps, admin dashboards, booking systems or management platforms",
      "Students building mobile apps with Firebase or API backends",
      "Students exploring AI/ML, computer vision or prediction systems with limited datasets",
    ],
    deliverables: [
      "System modules, roles and user flow",
      "Database/entity relationship planning",
      "Feature scope for web, mobile or admin dashboard",
      "Testing plan for validation, roles, security and edge cases",
      "AI/ML limitations, dataset assumptions and evaluation metrics where relevant",
    ],
    process: [
      "Define users, roles and core transactions",
      "Design database tables and main screens",
      "Build authentication, CRUD and dashboard workflow",
      "Add notifications, reports or AI/ML module only after core flow works",
      "Test user roles, data validation and deployment path",
    ],
    qualityChecks: [
      "Every app has a clear user problem and workflow",
      "AI/ML pages state dataset and evaluation limitations",
      "Admin features are separated from normal user features",
      "Deployment and demo login flow are planned before presentation",
    ],
    relatedTags: ["Web App", "Mobile App", "Firebase", "AI", "Machine Learning", "Dashboard", "Database"],
    relatedTopicSlugs: ["software-fyp", "ai-ml", "firebase"],
    componentSlugs: ["esp32", "rc522", "gps-neo-6m", "bme280"],
    faqs: [
      {
        q: "What is a good software FYP scope?",
        a: "A good software FYP has clear users, roles, database design, core transactions, validation, reports or dashboard views and a demo workflow that can be tested.",
      },
      {
        q: "Can AI/ML be included in a software FYP?",
        a: "Yes, but it should be scoped honestly. The project should explain the dataset, model choice, evaluation metric and limitations instead of claiming perfect prediction.",
      },
      {
        q: "Is Firebase suitable for FYP apps?",
        a: "Firebase is suitable for many FYP apps because it supports authentication, realtime data and hosting workflows, but database rules and data structure must be planned carefully.",
      },
    ],
    whatsappMessage: "Hi Rectronx, I want help with a software, website or app FYP project.",
  },
];
