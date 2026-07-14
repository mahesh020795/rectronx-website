export interface TopicHub {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  keywords: string[];
  tags: string[];
  searchTerms: string[];
}

export const topicHubs: TopicHub[] = [
  {
    slug: "projek-akhir-tahun",
    title: "Projek Akhir Tahun Malaysia",
    eyebrow: "FYP Planning Cluster",
    description:
      "Panduan Projek Akhir Tahun untuk pelajar Malaysia: senarai tajuk, idea IoT, projek elektronik, software, AI/ML, skop demo, komponen dan laporan.",
    keywords: [
      "projek akhir tahun",
      "senarai projek akhir tahun",
      "projek akhir tahun Malaysia",
      "tajuk projek akhir tahun",
      "idea projek akhir tahun",
      "FYP Malaysia",
    ],
    tags: ["Projek Akhir Tahun", "FYP", "IoT", "Software", "AI"],
    searchTerms: ["projek akhir tahun", "fyp", "final year project", "tajuk", "senarai projek", "iot", "software", "ai"],
  },
  {
    slug: "esp32",
    title: "ESP32 FYP Projects Malaysia",
    eyebrow: "Microcontroller Cluster",
    description:
      "ESP32 project ideas, components, catalog titles and guides for IoT dashboards, Firebase, Blynk, Telegram alerts and sensor systems.",
    keywords: ["ESP32 FYP", "ESP32 project Malaysia", "ESP32 IoT project", "ESP32 Firebase", "ESP32 Blynk"],
    tags: ["ESP32", "IoT", "Blynk", "Firebase", "Telegram"],
    searchTerms: ["esp32", "blynk", "firebase", "telegram"],
  },
  {
    slug: "arduino",
    title: "Arduino FYP Projects Malaysia",
    eyebrow: "Beginner Hardware Cluster",
    description:
      "Arduino project ideas and achievable embedded-system titles for sensors, relays, GSM alerts, motors and beginner electronics prototypes.",
    keywords: ["Arduino FYP", "Arduino project Malaysia", "Arduino sensor project"],
    tags: ["Arduino", "GSM", "Relay", "Servo", "Sensor"],
    searchTerms: ["arduino", "relay", "servo"],
  },
  {
    slug: "raspberry-pi",
    title: "Raspberry Pi FYP Projects Malaysia",
    eyebrow: "Linux & Camera Cluster",
    description:
      "Raspberry Pi FYP ideas for camera systems, local dashboards, kiosks, OpenCV prototypes, smart mirrors and Python-based monitoring.",
    keywords: ["Raspberry Pi FYP", "Raspberry Pi project Malaysia", "Raspberry Pi OpenCV"],
    tags: ["Raspberry Pi", "Python", "Camera", "OpenCV", "Display"],
    searchTerms: ["raspberry pi", "raspberry", "opencv", "camera"],
  },
  {
    slug: "iot",
    title: "IoT FYP Projects Malaysia",
    eyebrow: "Connected Systems Cluster",
    description:
      "IoT project ideas for Malaysian students including sensors, dashboards, alerts, databases, automation and monitoring systems.",
    keywords: ["IoT FYP Malaysia", "IoT project ideas", "smart monitoring project"],
    tags: ["IoT", "ESP32", "Dashboard", "Firebase", "Blynk"],
    searchTerms: ["iot", "dashboard", "monitoring", "smart"],
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning FYP Projects Malaysia",
    eyebrow: "Software Intelligence Cluster",
    description:
      "AI and machine learning FYP ideas covering prediction systems, OpenCV, NLP, chatbots, dashboards and dataset-based prototypes.",
    keywords: ["AI FYP Malaysia", "machine learning FYP", "OpenCV project", "NLP chatbot FYP"],
    tags: ["AI", "ML", "NLP", "OpenCV", "Python"],
    searchTerms: ["ai", "ml", "machine learning", "opencv", "nlp", "chatbot", "prediction"],
  },
  {
    slug: "software-fyp",
    title: "Software, Website & App FYP Projects Malaysia",
    eyebrow: "Web & App Cluster",
    description:
      "Software FYP ideas for web apps, mobile apps, PHP/MySQL systems, Firebase apps, dashboards, booking systems and portals.",
    keywords: ["software FYP Malaysia", "website FYP", "mobile app FYP", "PHP MySQL project"],
    tags: ["PHP", "MySQL", "Web", "Android", "Firebase"],
    searchTerms: ["php", "mysql", "web", "android", "firebase", "app", "portal"],
  },
  {
    slug: "firebase",
    title: "Firebase FYP Projects",
    eyebrow: "Cloud Database Cluster",
    description:
      "Firebase-based project ideas for mobile apps, attendance systems, realtime dashboards, authentication and cloud-connected FYP prototypes.",
    keywords: ["Firebase FYP", "Firebase project", "Firebase mobile app"],
    tags: ["Firebase", "Android", "Database", "App"],
    searchTerms: ["firebase"],
  },
  {
    slug: "blynk",
    title: "Blynk IoT FYP Projects",
    eyebrow: "IoT Dashboard Cluster",
    description:
      "Blynk project ideas for ESP32 and IoT monitoring systems, alerts, dashboards, smart home and sensor-based FYP prototypes.",
    keywords: ["Blynk FYP", "Blynk ESP32", "Blynk IoT project"],
    tags: ["Blynk", "ESP32", "IoT", "Dashboard"],
    searchTerms: ["blynk"],
  },
  {
    slug: "lora",
    title: "LoRa FYP Projects Malaysia",
    eyebrow: "Long-Range IoT Cluster",
    description:
      "LoRa and long-range IoT project ideas for farms, flood monitoring, remote sensors, gateways and low-bandwidth alerts.",
    keywords: ["LoRa FYP", "LoRa project Malaysia", "long range IoT"],
    tags: ["LoRa", "ESP32", "IoT", "Agriculture"],
    searchTerms: ["lora", "long-range"],
  },
  {
    slug: "mqtt",
    title: "MQTT IoT FYP Projects",
    eyebrow: "IoT Protocol Cluster",
    description:
      "MQTT project ideas and architecture patterns for sensor nodes, dashboards, gateways and reliable IoT messaging.",
    keywords: ["MQTT FYP", "MQTT IoT project", "ESP32 MQTT"],
    tags: ["MQTT", "ESP32", "IoT", "Dashboard"],
    searchTerms: ["mqtt"],
  },
  {
    slug: "stm32",
    title: "STM32 Embedded FYP Projects",
    eyebrow: "Advanced Embedded Cluster",
    description:
      "STM32 project directions for embedded systems, real-time control, sensors, motor control and advanced microcontroller learning.",
    keywords: ["STM32 FYP", "STM32 project", "embedded system FYP"],
    tags: ["STM32", "Embedded", "Sensor", "Motor"],
    searchTerms: ["stm32", "embedded"],
  },
  {
    slug: "pcb-design",
    title: "PCB Design FYP Projects Malaysia",
    eyebrow: "Electronics Design Cluster",
    description:
      "PCB design and electronics project directions for students who want cleaner prototypes, custom boards and stronger engineering presentation.",
    keywords: ["PCB design FYP", "electronics project Malaysia", "custom PCB project"],
    tags: ["PCB", "Electronics", "Power", "Sensor"],
    searchTerms: ["pcb", "electronics", "schematic"],
  },
];
