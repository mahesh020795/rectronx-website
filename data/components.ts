export type ComponentCategory =
  | "microcontrollers"
  | "sensors"
  | "displays"
  | "wireless"
  | "power"
  | "drivers"
  | "actuators";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ComponentSpec {
  label: string;
  value: string;
}

export interface ComponentPin {
  name: string;
  description: string;
}

export interface WiringGuide {
  platform: string;
  notes: string;
  connections: ComponentSpec[];
  code?: string;
}

export interface ComponentAlternative {
  slug: string;
  name: string;
  reason: string;
}

export interface ComponentFaq {
  q: string;
  a: string;
}

export interface ComponentGuide {
  slug: string;
  name: string;
  shortName: string;
  category: ComponentCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  priceRange: string;
  difficulty: Difficulty;
  rating: number;
  referenceType?: "verified-pinout" | "connection-overview";
  imageHint: string;
  interfaces: string[];
  voltage: string[];
  compatibleWith: string[];
  specs: ComponentSpec[];
  pins: ComponentPin[];
  wiring: WiringGuide[];
  libraries: ComponentSpec[];
  suitableFor: string[];
  notSuitableFor: string[];
  commonMistakes: string[];
  projectIdeas: string[];
  alternatives: ComponentAlternative[];
  relatedBlogSlugs: string[];
  faqs: ComponentFaq[];
  buyNotes: string;
  updatedAt: string;
}

export const componentCategories: {
  slug: ComponentCategory;
  label: string;
  description: string;
}[] = [
  {
    slug: "microcontrollers",
    label: "Microcontrollers",
    description: "Boards used as the brain of Arduino, ESP32, STM32 and IoT projects.",
  },
  {
    slug: "sensors",
    label: "Sensors",
    description: "Modules that detect gas, motion, temperature, distance, position and environment data.",
  },
  {
    slug: "displays",
    label: "Displays",
    description: "OLED, LCD and interface modules for showing project status and readings.",
  },
  {
    slug: "wireless",
    label: "Wireless",
    description: "WiFi, GSM, GPS, LoRa and RF modules for connected FYP systems.",
  },
  {
    slug: "power",
    label: "Power",
    description: "Measurement and power-support modules for safer, more reliable builds.",
  },
  {
    slug: "drivers",
    label: "Drivers",
    description: "Motor and load driver boards for robots, automation and control projects.",
  },
  {
    slug: "actuators",
    label: "Actuators",
    description: "Motors, servos and moving parts used in physical prototypes.",
  },
];

const esp32Code = `void setup() {
  Serial.begin(115200);
}

void loop() {
  int reading = analogRead(34);
  Serial.println(reading);
  delay(1000);
}`;

const arduinoAnalogCode = `void setup() {
  Serial.begin(9600);
}

void loop() {
  int reading = analogRead(A0);
  Serial.println(reading);
  delay(1000);
}`;

type AdditionalComponentSeed = {
  slug: string;
  name: string;
  shortName: string;
  category: ComponentCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  priceRange: string;
  difficulty?: Difficulty;
  interfaces: string[];
  voltage: string[];
  compatibleWith: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  commonMistakes: string[];
  projectIdeas: string[];
  alternatives?: ComponentAlternative[];
  relatedBlogSlugs?: string[];
  buyNotes: string;
};

function createAdditionalComponents(seeds: AdditionalComponentSeed[]): ComponentGuide[] {
  return seeds.map((seed) => ({
    slug: seed.slug,
    name: seed.name,
    shortName: seed.shortName,
    category: seed.category,
    categoryLabel: seed.categoryLabel,
    tagline: seed.tagline,
    description: seed.description,
    priceRange: seed.priceRange,
    difficulty: seed.difficulty ?? "Intermediate",
    rating: 4.5,
    referenceType: "connection-overview",
    imageHint: `${seed.name} electronics module illustration`,
    interfaces: seed.interfaces,
    voltage: seed.voltage,
    compatibleWith: seed.compatibleWith,
    specs: [
      { label: "Operating Voltage", value: seed.voltage.join(" / ") },
      { label: "Interface", value: seed.interfaces.join(", ") },
      { label: "Difficulty", value: seed.difficulty ?? "Intermediate" },
      { label: "Typical Malaysia Price", value: seed.priceRange },
      { label: "Best For", value: seed.suitableFor.slice(0, 2).join(", ") },
    ],
    pins: [
      { name: "Power", description: `Use only a supply supported by the exact board or module variant. Common listings for this part mention ${seed.voltage.join(" or ")}.` },
      { name: "Ground", description: "Connect a common ground between the controller, module and any external supply." },
      { name: "Primary interface", description: `Plan for ${seed.interfaces.join(" / ")}; confirm the exact terminal names in the manufacturer documentation.` },
      { name: "Variant-specific connections", description: "Connector names and optional pins can differ between breakout-board revisions." },
    ],
    wiring: [
      {
        platform: "Arduino / ESP32",
        notes: `This is a planning overview, not a board-specific pin map. Confirm the exact module revision, supply limits and ${seed.interfaces.join(" / ")} terminals in its datasheet before wiring. Use suitable level shifting when logic voltages differ.`,
        connections: [
          { label: "Power", value: `Confirm against the exact board; listed variants commonly use ${seed.voltage.join(" / ")}` },
          { label: "Ground", value: "Common ground with the controller" },
          { label: "Interface", value: `${seed.interfaces.join(", ")} (exact pins vary by module)` },
        ],
      },
    ],
    libraries: [
      { label: "Arduino Library Manager", value: `Search for ${seed.shortName} or the module chipset name.` },
      { label: "Raw interface", value: `Many FYP demos can use direct ${seed.interfaces[0] ?? "GPIO"} reading or standard examples.` },
    ],
    suitableFor: seed.suitableFor,
    notSuitableFor: seed.notSuitableFor,
    commonMistakes: seed.commonMistakes,
    projectIdeas: seed.projectIdeas,
    alternatives: seed.alternatives ?? [{ slug: "esp32", name: "ESP32", reason: "Common controller used with many FYP modules." }],
    relatedBlogSlugs: seed.relatedBlogSlugs ?? ["iot-project-ideas-2025", "esp32-project-ideas"],
    faqs: [
      {
        q: `Is ${seed.shortName} good for FYP projects?`,
        a: `Yes, ${seed.shortName} is suitable for FYP work when the project matches its limits: ${seed.suitableFor.slice(0, 2).join(" and ")}.`,
      },
      {
        q: `What is the most common ${seed.shortName} mistake?`,
        a: seed.commonMistakes[0] ?? "The most common mistake is wiring the module before checking voltage, current and interface requirements.",
      },
    ],
    buyNotes: seed.buyNotes,
    updatedAt: "2026-07-10",
  }));
}

export const components: ComponentGuide[] = [
  {
    slug: "esp32",
    name: "ESP32 Development Board",
    shortName: "ESP32",
    category: "microcontrollers",
    categoryLabel: "Microcontroller",
    tagline: "WiFi and Bluetooth microcontroller for IoT FYP projects.",
    description:
      "The ESP32 is a low-cost microcontroller board with built-in WiFi and Bluetooth. It is one of the most useful boards for Malaysian FYP projects involving sensors, mobile apps, dashboards, Blynk, Firebase or Telegram alerts.",
    priceRange: "RM18-RM45",
    difficulty: "Beginner",
    rating: 4.9,
    imageHint: "ESP32 development board with USB connector and pin labels",
    interfaces: ["GPIO", "ADC", "PWM", "UART", "I2C", "SPI", "WiFi", "Bluetooth"],
    voltage: ["3.3V logic", "5V USB/VIN"],
    compatibleWith: ["Arduino IDE", "ESP-IDF", "MicroPython", "Blynk", "Firebase"],
    specs: [
      { label: "Logic Voltage", value: "3.3V" },
      { label: "Input Power", value: "5V via USB or VIN" },
      { label: "Wireless", value: "WiFi 2.4GHz, Bluetooth" },
      { label: "ADC", value: "12-bit, input range depends on attenuation" },
      { label: "Best For", value: "IoT dashboards, sensor monitoring, automation" },
    ],
    pins: [
      { name: "3V3", description: "Regulated 3.3V output for low-current modules." },
      { name: "VIN/5V", description: "5V input from USB or external supply." },
      { name: "GND", description: "Common ground." },
      { name: "GPIO21/22", description: "Common I2C SDA/SCL pins." },
      { name: "GPIO34-39", description: "Input-only analog-capable pins." },
    ],
    wiring: [
      {
        platform: "Arduino IDE",
        notes: "Install ESP32 board support, select the correct board, then use GPIO numbers directly.",
        connections: [
          { label: "Sensor VCC", value: "3.3V or 5V depending on module" },
          { label: "Sensor GND", value: "ESP32 GND" },
          { label: "Analog signal", value: "GPIO34, GPIO35 or another ADC pin" },
        ],
        code: esp32Code,
      },
    ],
    libraries: [
      { label: "Board package", value: "esp32 by Espressif Systems" },
      { label: "Blynk", value: "Blynk library for IoT dashboards" },
      { label: "Firebase", value: "Firebase ESP Client" },
    ],
    suitableFor: ["IoT FYP projects", "WiFi sensor dashboards", "Telegram or Blynk alerts", "Smart home automation"],
    notSuitableFor: ["Direct 5V logic input", "High-current loads without driver circuits", "Industrial PLC replacement"],
    commonMistakes: [
      "Powering relays, motors or GSM modules directly from the ESP32 3.3V pin",
      "Using boot pins incorrectly and causing upload failures",
      "Feeding 5V signals into 3.3V GPIO pins",
      "Choosing ADC2 pins while WiFi is active",
    ],
    projectIdeas: [
      "IoT-based Smart Agriculture Monitoring System",
      "Real-Time Air Quality Monitoring System for Indoor Spaces with App Alerts",
      "IoT-Based Smart Parking System with Automated Payment and RFID Identification",
    ],
    alternatives: [
      { slug: "esp8266", name: "ESP8266", reason: "Cheaper WiFi board with fewer GPIO features." },
      { slug: "arduino-uno", name: "Arduino Uno", reason: "Simpler beginner board without built-in WiFi." },
      { slug: "raspberry-pi-pico", name: "Raspberry Pi Pico", reason: "Good low-cost microcontroller when WiFi is not required." },
    ],
    relatedBlogSlugs: ["esp32-getting-started", "esp32-project-ideas", "esp32-wifi-disconnect-fyp-demo-fix"],
    faqs: [
      { q: "Is ESP32 good for FYP projects?", a: "Yes. ESP32 is one of the best boards for IoT FYP projects because it includes WiFi, many GPIO pins and strong Arduino IDE support." },
      { q: "Can ESP32 use 5V sensors?", a: "Many modules accept 5V power, but ESP32 GPIO pins are 3.3V only. Use level shifting or a divider when a signal can output 5V." },
    ],
    buyNotes: "Check whether the board uses USB-C or micro USB and confirm the USB-to-serial driver before buying.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "arduino-uno",
    name: "Arduino Uno R3",
    shortName: "Arduino Uno",
    category: "microcontrollers",
    categoryLabel: "Microcontroller",
    tagline: "Beginner-friendly 5V board for simple sensors, relays and prototypes.",
    description:
      "Arduino Uno is the classic beginner board for electronics projects. It is easy to teach, easy to wire and works well for FYP prototypes that do not need built-in WiFi.",
    priceRange: "RM18-RM55",
    difficulty: "Beginner",
    rating: 4.7,
    imageHint: "Arduino Uno R3 board with digital and analog headers",
    interfaces: ["GPIO", "ADC", "PWM", "UART", "I2C", "SPI"],
    voltage: ["5V logic", "7V-12V barrel jack"],
    compatibleWith: ["Arduino IDE", "Most beginner sensor modules"],
    specs: [
      { label: "Logic Voltage", value: "5V" },
      { label: "Digital I/O", value: "14 pins" },
      { label: "Analog Inputs", value: "6 pins" },
      { label: "Clock Speed", value: "16MHz" },
      { label: "Best For", value: "Beginner prototypes and teaching demos" },
    ],
    pins: [
      { name: "5V", description: "Regulated 5V output for small modules." },
      { name: "GND", description: "Common ground." },
      { name: "A0-A5", description: "Analog input pins." },
      { name: "D0/D1", description: "Serial RX/TX pins, avoid when uploading sketches." },
    ],
    wiring: [
      {
        platform: "Arduino IDE",
        notes: "Most beginner modules connect directly to 5V, GND and one signal pin.",
        connections: [
          { label: "Sensor VCC", value: "5V" },
          { label: "Sensor GND", value: "GND" },
          { label: "Analog signal", value: "A0" },
        ],
        code: arduinoAnalogCode,
      },
    ],
    libraries: [
      { label: "Arduino AVR Boards", value: "Built into Arduino IDE" },
      { label: "Common sensor libraries", value: "Available through Library Manager" },
    ],
    suitableFor: ["Beginner FYP prototypes", "Relay control", "Simple sensor reading", "Teaching demonstrations"],
    notSuitableFor: ["WiFi IoT without extra module", "Heavy multitasking", "Direct motor driving"],
    commonMistakes: [
      "Using D0/D1 for modules and then failing to upload code",
      "Powering motors from the 5V pin",
      "Assuming every Arduino clone uses the same USB driver",
    ],
    projectIdeas: ["LPG Gas Leakage Detector with IoT based Alerting", "Smart Blind Stick with GPS and GSM Emergency SMS Alert"],
    alternatives: [
      { slug: "esp32", name: "ESP32", reason: "Better for WiFi IoT and mobile app projects." },
      { slug: "raspberry-pi-pico", name: "Raspberry Pi Pico", reason: "Cheaper and faster for embedded control." },
    ],
    relatedBlogSlugs: ["arduino-project-ideas-malaysia", "arduino-vs-esp32-fyp-malaysia"],
    faqs: [
      { q: "Is Arduino Uno enough for FYP?", a: "Yes for simple automation and sensor projects. For IoT dashboards, ESP32 is usually a better choice." },
      { q: "Can Arduino Uno connect to WiFi?", a: "Yes, but it needs an external WiFi module or shield. ESP32 is simpler when WiFi is required." },
    ],
    buyNotes: "Original boards cost more; clones are fine for education if the USB driver is supported.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "mq135",
    name: "MQ135 Air Quality Sensor",
    shortName: "MQ135",
    category: "sensors",
    categoryLabel: "Environmental Gas Sensor",
    tagline: "Low-cost gas sensor for relative air quality and smoke-style FYP demos.",
    description:
      "MQ135 is a popular gas sensor module used in air quality projects. It can react to gases such as ammonia, alcohol, benzene and smoke, but it is best used for relative trend detection rather than accurate certified PPM measurement.",
    priceRange: "RM6-RM15",
    difficulty: "Intermediate",
    rating: 4.8,
    imageHint: "MQ135 gas sensor module with blue PCB and metal mesh sensor can",
    interfaces: ["Analog", "Digital threshold"],
    voltage: ["5V"],
    compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi with ADC"],
    specs: [
      { label: "Operating Voltage", value: "5V" },
      { label: "Output", value: "Analog and digital threshold" },
      { label: "Detects", value: "NH3, alcohol, benzene, smoke and air quality changes" },
      { label: "Interface", value: "Analog" },
      { label: "Warm-up Time", value: "Up to 24 hours for stable readings" },
      { label: "Power", value: "Around 150mA heater current" },
    ],
    pins: [
      { name: "VCC", description: "5V supply for the sensor heater and module." },
      { name: "GND", description: "Ground connection." },
      { name: "A0", description: "Analog output for reading gas concentration trend." },
      { name: "D0", description: "Digital threshold output adjusted by onboard potentiometer." },
    ],
    wiring: [
      {
        platform: "Arduino",
        notes: "Arduino Uno can read the MQ135 analog output directly on A0.",
        connections: [
          { label: "MQ135 VCC", value: "Arduino 5V" },
          { label: "MQ135 GND", value: "Arduino GND" },
          { label: "MQ135 A0", value: "Arduino A0" },
        ],
        code: arduinoAnalogCode,
      },
      {
        platform: "ESP32",
        notes: "Use a divider or module output check if the analog signal may reach 5V. ESP32 ADC pins are not 5V tolerant.",
        connections: [
          { label: "MQ135 VCC", value: "5V" },
          { label: "MQ135 GND", value: "ESP32 GND" },
          { label: "MQ135 A0", value: "ESP32 GPIO34 through safe scaling" },
        ],
        code: esp32Code,
      },
    ],
    libraries: [
      { label: "MQUnifiedsensor", value: "Common Arduino library for MQ sensors" },
      { label: "Raw ADC", value: "Often enough for FYP trend demos" },
    ],
    suitableFor: ["Relative air quality trend", "Smoke detection demos", "Educational IoT air monitoring", "Classroom or greenhouse prototypes"],
    notSuitableFor: ["Accurate CO2 measurement", "Certified gas safety systems", "Medical or industrial compliance monitoring"],
    commonMistakes: [
      "No warm-up time before taking readings",
      "Expecting accurate PPM without calibration",
      "Connecting 5V analog output directly to ESP32 ADC",
      "Ignoring indoor airflow and sensor placement",
    ],
    projectIdeas: [
      "Real-Time Air Quality Monitoring System for Indoor Spaces with App Alerts",
      "WiFi based Robot Car with Gas Detector",
      "IoT-Enabled Vehicle Emission Monitoring System for Eco-Friendly Alerts",
    ],
    alternatives: [
      { slug: "bme280", name: "BME280", reason: "Measures temperature, humidity and pressure, not gas." },
      { slug: "bme680", name: "BME680", reason: "Adds VOC-style air quality sensing in a compact digital sensor." },
    ],
    relatedBlogSlugs: ["iot-gas-detector-fyp", "sistem-kualiti-udara-pencemaran-iot", "sensor-fyp-reading-tak-tepat-time-hujan-monsun"],
    faqs: [
      { q: "Can MQ135 measure CO2 accurately?", a: "MQ135 is not recommended for accurate CO2 measurement. It is better for relative air quality changes and educational demos." },
      { q: "Can MQ135 work with ESP32?", a: "Yes, but protect the ESP32 ADC from 5V analog signals by using proper scaling or a safe module output." },
    ],
    buyNotes: "Cheap modules vary in calibration. Buy extra units if you need consistent readings across prototypes.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "dht22",
    name: "DHT22 Temperature and Humidity Sensor",
    shortName: "DHT22",
    category: "sensors",
    categoryLabel: "Temperature Sensor",
    tagline: "Simple digital temperature and humidity sensor for weather and greenhouse projects.",
    description:
      "DHT22 is a common digital temperature and humidity sensor. It is slower than professional sensors but easy to use for FYP weather stations, smart rooms and greenhouse demos.",
    priceRange: "RM8-RM18",
    difficulty: "Beginner",
    rating: 4.5,
    imageHint: "DHT22 white temperature humidity sensor module",
    interfaces: ["Single-wire digital"],
    voltage: ["3.3V", "5V"],
    compatibleWith: ["Arduino", "ESP32", "Raspberry Pi", "STM32"],
    specs: [
      { label: "Operating Voltage", value: "3.3V-5V" },
      { label: "Temperature Range", value: "-40C to 80C" },
      { label: "Humidity Range", value: "0-100% RH" },
      { label: "Sampling Rate", value: "About 0.5Hz" },
    ],
    pins: [
      { name: "VCC", description: "3.3V or 5V supply." },
      { name: "DATA", description: "Digital data output, usually needs pull-up resistor." },
      { name: "GND", description: "Ground connection." },
    ],
    wiring: [
      {
        platform: "ESP32",
        notes: "Use a pull-up resistor if your module does not already include one.",
        connections: [
          { label: "DHT22 VCC", value: "ESP32 3V3" },
          { label: "DHT22 DATA", value: "ESP32 GPIO4" },
          { label: "DHT22 GND", value: "ESP32 GND" },
        ],
      },
    ],
    libraries: [
      { label: "DHT sensor library", value: "Adafruit DHT sensor library" },
      { label: "Adafruit Unified Sensor", value: "Dependency for Adafruit examples" },
    ],
    suitableFor: ["Weather station FYP", "Smart greenhouse", "Room comfort monitoring", "Incubator monitoring"],
    notSuitableFor: ["Fast response control loops", "Outdoor installation without enclosure", "High-accuracy lab measurement"],
    commonMistakes: ["Reading too frequently", "Missing pull-up resistor", "Placing sensor near heat from regulators or enclosures"],
    projectIdeas: ["IoT based Smart Agriculture Monitoring System", "Room Humidity Controller using IoT", "Egg Incubator using IoT"],
    alternatives: [
      { slug: "bme280", name: "BME280", reason: "More stable digital environmental sensor." },
      { slug: "bme680", name: "BME680", reason: "Adds gas/VOC-style air quality estimation." },
    ],
    relatedBlogSlugs: ["iot-weather-station-esp32-bme280", "sistem-rumah-hijau-pintar-suhu-kelembapan"],
    faqs: [
      { q: "Is DHT22 better than DHT11?", a: "DHT22 usually has a wider measurement range and better accuracy than DHT11." },
    ],
    buyNotes: "Module versions are easier to wire because they often include the pull-up resistor.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "rc522",
    name: "RC522 RFID Reader",
    shortName: "RC522",
    category: "sensors",
    categoryLabel: "RFID Module",
    tagline: "Low-cost 13.56MHz RFID reader for attendance, access and smart locker projects.",
    description:
      "RC522 is a common RFID reader module for reading MIFARE-style cards and tags. It is widely used in FYP attendance, access control, library and smart locker projects.",
    priceRange: "RM5-RM15",
    difficulty: "Beginner",
    rating: 4.7,
    imageHint: "RC522 RFID reader module with blue key tag and white card",
    interfaces: ["SPI"],
    voltage: ["3.3V"],
    compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi"],
    specs: [
      { label: "Frequency", value: "13.56MHz" },
      { label: "Operating Voltage", value: "3.3V" },
      { label: "Interface", value: "SPI" },
      { label: "Typical Range", value: "A few centimeters" },
    ],
    pins: [
      { name: "SDA/SS", description: "SPI chip select." },
      { name: "SCK", description: "SPI clock." },
      { name: "MOSI", description: "SPI data from controller to reader." },
      { name: "MISO", description: "SPI data from reader to controller." },
      { name: "RST", description: "Reset pin." },
      { name: "3.3V", description: "Power input. Do not use 5V." },
    ],
    wiring: [
      {
        platform: "Arduino Uno",
        notes: "Power the module from 3.3V and use SPI pins.",
        connections: [
          { label: "SDA", value: "D10" },
          { label: "SCK", value: "D13" },
          { label: "MOSI", value: "D11" },
          { label: "MISO", value: "D12" },
          { label: "RST", value: "D9" },
        ],
      },
    ],
    libraries: [{ label: "MFRC522", value: "Miguel Balboa RFID library" }],
    suitableFor: ["Attendance systems", "Door access", "Smart lockers", "Library projects"],
    notSuitableFor: ["Long-range RFID", "Reading many tags at once", "Payment-grade security systems"],
    commonMistakes: ["Powering RC522 with 5V", "Expecting long read range", "Using weak jumper wires on SPI connections"],
    projectIdeas: [
      "RFID-Based Library Management System with Fine Calculation and Alerts",
      "IoT-Based Classroom Attendance System with RFID and Database Integration",
      "Smart Locker System for E-commerce Parcel Pickup with OTP and SMS Alerts",
    ],
    alternatives: [
      { slug: "esp32", name: "ESP32", reason: "Use as the controller for WiFi-enabled RFID systems." },
    ],
    relatedBlogSlugs: ["rfid-attendance-system-fyp", "sistem-kunci-pintu-pintar-keypad-rfid"],
    faqs: [
      { q: "Can RC522 read MyKad?", a: "RC522 is normally used with compatible 13.56MHz tags/cards. Do not assume it can read identity cards for FYP use." },
    ],
    buyNotes: "Most kits include one white card and one key tag. Confirm they are included if needed for demo.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "sim800l",
    name: "SIM800L GSM Module",
    shortName: "SIM800L",
    category: "wireless",
    categoryLabel: "GSM Module",
    tagline: "2G GSM module for SMS alerts and basic mobile network projects.",
    description:
      "SIM800L is a small GSM module used for SMS and call alerts. It is popular in older Arduino FYP projects, but it needs a strong power supply and depends on 2G network availability.",
    priceRange: "RM12-RM30",
    difficulty: "Advanced",
    rating: 4.2,
    imageHint: "SIM800L red GSM module with antenna connector",
    interfaces: ["UART"],
    voltage: ["3.7V-4.2V"],
    compatibleWith: ["Arduino", "ESP32", "STM32"],
    specs: [
      { label: "Network", value: "2G GSM/GPRS" },
      { label: "Supply Voltage", value: "Around 3.7V-4.2V" },
      { label: "Peak Current", value: "Can exceed 2A during transmit bursts" },
      { label: "Interface", value: "UART AT commands" },
    ],
    pins: [
      { name: "VCC", description: "Stable high-current supply input." },
      { name: "GND", description: "Common ground with controller." },
      { name: "TXD", description: "Module UART transmit." },
      { name: "RXD", description: "Module UART receive." },
      { name: "RST", description: "Reset input on some modules." },
    ],
    wiring: [
      {
        platform: "Arduino",
        notes: "Use a separate regulated supply. Do not power SIM800L from Arduino 5V pin.",
        connections: [
          { label: "SIM800L VCC", value: "Dedicated 4V supply with high current capacity" },
          { label: "SIM800L GND", value: "Arduino GND and supply GND" },
          { label: "SIM800L TXD", value: "Arduino RX" },
          { label: "SIM800L RXD", value: "Arduino TX through level consideration" },
        ],
      },
    ],
    libraries: [
      { label: "TinyGSM", value: "Popular GSM/GPRS helper library" },
      { label: "AT Commands", value: "Direct serial command control" },
    ],
    suitableFor: ["SMS alert systems", "GPS tracker alerts", "Panic button projects", "Remote basic telemetry"],
    notSuitableFor: ["Areas without 2G service", "High-speed internet", "Low-power battery projects without careful power design"],
    commonMistakes: [
      "Powering from Arduino 5V pin",
      "Ignoring 2A current bursts",
      "Weak antenna placement",
      "Forgetting 2G network availability checks",
    ],
    projectIdeas: [
      "Vehicle Crash Alerting System with GPS and GSM",
      "Smart Blind Stick with GPS and GSM Emergency SMS Alert",
      "Panic Button with GPS Alerting System",
    ],
    alternatives: [
      { slug: "sim7600", name: "SIM7600", reason: "4G module for modern cellular projects." },
      { slug: "esp32", name: "ESP32", reason: "Use WiFi when mobile network alerts are not required." },
    ],
    relatedBlogSlugs: ["gps-vehicle-tracking-system-fyp", "smart-blind-stick-ultrasonic-arduino-fyp"],
    faqs: [
      { q: "Why does SIM800L keep restarting?", a: "The most common reason is weak power. SIM800L needs a stable supply that can handle high transmit current bursts." },
      { q: "Is SIM800L still good for new projects?", a: "Only if 2G coverage is available in the project area. For future-proof projects, consider a 4G module." },
    ],
    buyNotes: "Confirm local 2G support before designing a new FYP around SIM800L.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "hc-sr04",
    name: "HC-SR04 Ultrasonic Sensor",
    shortName: "HC-SR04",
    category: "sensors",
    categoryLabel: "Distance Sensor",
    tagline: "Popular ultrasonic distance sensor for robots, bins and water-level demos.",
    description:
      "HC-SR04 measures distance using ultrasonic pulses. It is cheap and common in obstacle avoidance, smart bin, blind stick and level detection prototypes.",
    priceRange: "RM3-RM10",
    difficulty: "Beginner",
    rating: 4.6,
    imageHint: "HC-SR04 ultrasonic sensor with two round transducers",
    interfaces: ["Digital trigger/echo"],
    voltage: ["5V"],
    compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi"],
    specs: [
      { label: "Operating Voltage", value: "5V" },
      { label: "Range", value: "About 2cm to 400cm" },
      { label: "Interface", value: "Trigger and echo pins" },
      { label: "Best For", value: "Distance and level demos" },
    ],
    pins: [
      { name: "VCC", description: "5V power input." },
      { name: "TRIG", description: "Trigger pulse input." },
      { name: "ECHO", description: "Echo pulse output. Level shift for 3.3V boards." },
      { name: "GND", description: "Ground connection." },
    ],
    wiring: [
      {
        platform: "Arduino",
        notes: "Connect trigger and echo to digital pins.",
        connections: [
          { label: "VCC", value: "5V" },
          { label: "TRIG", value: "D9" },
          { label: "ECHO", value: "D10" },
          { label: "GND", value: "GND" },
        ],
      },
    ],
    libraries: [{ label: "NewPing", value: "Useful Arduino ultrasonic helper library" }],
    suitableFor: ["Obstacle avoidance", "Smart bin fill level", "Water tank level demo", "Blind stick prototype"],
    notSuitableFor: ["Soft/angled surfaces", "Outdoor rain exposure", "High-precision measurement"],
    commonMistakes: ["Using 5V echo directly on ESP32", "Mounting sensor at a bad angle", "Expecting reliable readings on soft fabric"],
    projectIdeas: ["Smart Waste Bin with IoT", "Smart Blind Stick with GPS and GSM Emergency SMS Alert"],
    alternatives: [
      { slug: "mpu6050", name: "MPU6050", reason: "Use for motion/orientation instead of distance." },
    ],
    relatedBlogSlugs: ["smart-blind-stick-ultrasonic-arduino-fyp", "sistem-pemantauan-tong-sampah-ai-iot"],
    faqs: [{ q: "Can HC-SR04 work with ESP32?", a: "Yes, but the echo pin is 5V on many modules, so use voltage scaling for ESP32 input." }],
    buyNotes: "Waterproof ultrasonic modules are better for outdoor tank projects.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "mpu6050",
    name: "MPU6050 Accelerometer Gyroscope",
    shortName: "MPU6050",
    category: "sensors",
    categoryLabel: "Motion Sensor",
    tagline: "6-axis motion sensor for fall detection, vibration and balance projects.",
    description:
      "MPU6050 combines a 3-axis accelerometer and 3-axis gyroscope. It is useful for fall detection, vibration analysis, gesture control and balancing robot prototypes.",
    priceRange: "RM5-RM15",
    difficulty: "Intermediate",
    rating: 4.6,
    imageHint: "MPU6050 GY-521 accelerometer gyroscope breakout board",
    interfaces: ["I2C"],
    voltage: ["3.3V", "5V module"],
    compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi"],
    specs: [
      { label: "Axes", value: "3-axis accelerometer, 3-axis gyroscope" },
      { label: "Interface", value: "I2C" },
      { label: "I2C Address", value: "0x68 or 0x69" },
      { label: "Best For", value: "Motion and vibration sensing" },
    ],
    pins: [
      { name: "VCC", description: "Power input, check module regulator." },
      { name: "GND", description: "Ground." },
      { name: "SCL", description: "I2C clock." },
      { name: "SDA", description: "I2C data." },
      { name: "INT", description: "Interrupt output for advanced use." },
    ],
    wiring: [
      {
        platform: "ESP32",
        notes: "Default ESP32 I2C pins are often GPIO21 SDA and GPIO22 SCL.",
        connections: [
          { label: "SDA", value: "GPIO21" },
          { label: "SCL", value: "GPIO22" },
          { label: "VCC", value: "3.3V or module-supported 5V" },
          { label: "GND", value: "GND" },
        ],
      },
    ],
    libraries: [{ label: "Adafruit MPU6050", value: "Beginner-friendly Arduino library" }],
    suitableFor: ["Fall detection", "Vibration monitoring", "Gesture control", "Balancing robot learning"],
    notSuitableFor: ["Precision inertial navigation", "Long-term drift-free orientation without fusion"],
    commonMistakes: ["No calibration", "Confusing accelerometer and gyroscope readings", "Mounting loosely on vibrating surfaces"],
    projectIdeas: ["Elderly Fall Detection System with IoT and Family Alert Notifications", "IoT-Based Bridge Condition Monitoring System with Structural Health Alerts"],
    alternatives: [{ slug: "esp32", name: "ESP32", reason: "Common controller used with MPU6050 in IoT motion projects." }],
    relatedBlogSlugs: ["vibration-machine-fault-detection-esp32-mpu6050", "sistem-pengesanan-jatuh-orang-tua-iot"],
    faqs: [{ q: "Does MPU6050 measure vibration?", a: "Yes, it can detect vibration patterns, but mechanical mounting and filtering affect results heavily." }],
    buyNotes: "GY-521 breakout boards are common and cheap, but quality varies.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "oled-ssd1306",
    name: "0.96 inch OLED SSD1306 Display",
    shortName: "OLED SSD1306",
    category: "displays",
    categoryLabel: "Display Module",
    tagline: "Small I2C OLED display for compact sensor and IoT status screens.",
    description:
      "SSD1306 OLED modules are compact displays used to show readings, status, icons and menus in FYP prototypes. The I2C version needs only two signal wires.",
    priceRange: "RM8-RM20",
    difficulty: "Beginner",
    rating: 4.7,
    imageHint: "0.96 inch SSD1306 OLED display module",
    interfaces: ["I2C", "SPI variants"],
    voltage: ["3.3V", "5V module"],
    compatibleWith: ["Arduino", "ESP32", "Raspberry Pi", "STM32"],
    specs: [
      { label: "Resolution", value: "128x64 typical" },
      { label: "Interface", value: "I2C common, SPI variants exist" },
      { label: "I2C Address", value: "0x3C or 0x3D" },
    ],
    pins: [
      { name: "VCC", description: "Power input." },
      { name: "GND", description: "Ground." },
      { name: "SCL", description: "I2C clock." },
      { name: "SDA", description: "I2C data." },
    ],
    wiring: [
      {
        platform: "ESP32",
        notes: "Use the same I2C bus as many sensors if addresses do not conflict.",
        connections: [
          { label: "SDA", value: "GPIO21" },
          { label: "SCL", value: "GPIO22" },
          { label: "VCC", value: "3.3V or module-supported 5V" },
          { label: "GND", value: "GND" },
        ],
      },
    ],
    libraries: [
      { label: "Adafruit SSD1306", value: "Popular display library" },
      { label: "U8g2", value: "Flexible graphics library" },
    ],
    suitableFor: ["Sensor dashboards", "Battery status display", "Compact menus", "IoT device status"],
    notSuitableFor: ["Large readable displays", "Photo or rich UI display"],
    commonMistakes: ["Wrong I2C address", "Using SPI example on I2C module", "Not allocating enough memory on smaller boards"],
    projectIdeas: ["IoT-Based Weather Station with Predictive Alerting for Severe Conditions", "Smart Energy Meter ESP32 PZEM"],
    alternatives: [{ slug: "arduino-uno", name: "Arduino Uno", reason: "Can drive OLEDs but has limited memory for complex graphics." }],
    relatedBlogSlugs: ["iot-weather-station-esp32-bme280", "smart-energy-meter-esp32-pzem"],
    faqs: [{ q: "Why is my OLED blank?", a: "Common causes are wrong I2C address, swapped SDA/SCL pins or using the wrong display size in code." }],
    buyNotes: "Confirm whether the module is I2C or SPI before following wiring tutorials.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "relay-module",
    name: "5V Relay Module",
    shortName: "Relay Module",
    category: "drivers",
    categoryLabel: "Switching Module",
    tagline: "Electrically controlled switch for lights, pumps, fans and AC-load demos.",
    description:
      "A relay module lets a microcontroller switch a higher-voltage or higher-current load. It is common in smart home, irrigation, fan control and safety projects.",
    priceRange: "RM4-RM18",
    difficulty: "Intermediate",
    rating: 4.5,
    imageHint: "single channel blue 5V relay module",
    interfaces: ["Digital GPIO"],
    voltage: ["5V coil", "3.3V input on some modules"],
    compatibleWith: ["Arduino", "ESP32 with suitable module", "Raspberry Pi with driver"],
    specs: [
      { label: "Control Input", value: "Digital signal" },
      { label: "Coil Voltage", value: "Usually 5V" },
      { label: "Contacts", value: "COM, NO, NC" },
    ],
    pins: [
      { name: "VCC", description: "Relay module supply." },
      { name: "GND", description: "Common ground." },
      { name: "IN", description: "Control input from microcontroller." },
      { name: "COM/NO/NC", description: "Load-side switch terminals." },
    ],
    wiring: [
      {
        platform: "Arduino",
        notes: "Use proper safety practices for AC loads. Keep low-voltage and high-voltage wiring separated.",
        connections: [
          { label: "VCC", value: "5V" },
          { label: "GND", value: "GND" },
          { label: "IN", value: "Digital pin such as D7" },
        ],
      },
    ],
    libraries: [{ label: "No special library", value: "Use digitalWrite" }],
    suitableFor: ["Pump control", "Fan control", "Smart light demos", "Irrigation projects"],
    notSuitableFor: ["Fast PWM switching", "Unsafe exposed AC wiring", "Direct motor speed control"],
    commonMistakes: ["Confusing NO and NC terminals", "No flyback/isolation consideration on cheap modules", "Unsafe AC wiring during demos"],
    projectIdeas: ["Home Automation using Voice Command with Google Assistant", "Smart Irrigation System with Water Level and Moisture Monitoring"],
    alternatives: [{ slug: "l298n", name: "L298N", reason: "Use motor drivers for DC motor direction/speed instead of relays." }],
    relatedBlogSlugs: ["iot-home-automation-fyp", "smart-garden-irrigation-system-esp32"],
    faqs: [{ q: "Can ESP32 trigger a 5V relay?", a: "Some relay modules trigger from 3.3V signals and some do not. Check the input circuit or use a transistor/driver." }],
    buyNotes: "For AC loads, choose proper enclosure, terminals and safety-rated hardware.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "l298n",
    name: "L298N Motor Driver",
    shortName: "L298N",
    category: "drivers",
    categoryLabel: "Motor Driver",
    tagline: "Classic dual H-bridge driver for small DC motor and robot car projects.",
    description:
      "L298N is a common motor driver module for controlling two DC motors or one stepper motor. It is widely used in beginner robot cars, but it is inefficient compared with modern drivers.",
    priceRange: "RM6-RM18",
    difficulty: "Beginner",
    rating: 4.4,
    imageHint: "red L298N dual H bridge motor driver module with heatsink",
    interfaces: ["Digital GPIO", "PWM"],
    voltage: ["5V logic", "Motor supply depends on module"],
    compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi"],
    specs: [
      { label: "Channels", value: "2 DC motor channels" },
      { label: "Control", value: "Direction pins plus enable/PWM" },
      { label: "Known Issue", value: "Voltage drop and heat under load" },
    ],
    pins: [
      { name: "IN1-IN4", description: "Motor direction inputs." },
      { name: "ENA/ENB", description: "Enable or PWM speed control pins." },
      { name: "OUT1-OUT4", description: "Motor outputs." },
      { name: "12V", description: "Motor supply input label on many boards." },
      { name: "GND", description: "Common ground." },
    ],
    wiring: [
      {
        platform: "Arduino",
        notes: "Connect motor power separately and share ground with Arduino.",
        connections: [
          { label: "IN1-IN4", value: "Arduino digital pins" },
          { label: "ENA/ENB", value: "PWM-capable pins" },
          { label: "GND", value: "Arduino GND and motor supply GND" },
        ],
      },
    ],
    libraries: [{ label: "No special library", value: "Use digitalWrite and analogWrite/PWM" }],
    suitableFor: ["Beginner robot car", "Simple DC motor direction control", "Stepper learning demos"],
    notSuitableFor: ["High-efficiency battery robots", "High-current motors", "Quiet precision motion"],
    commonMistakes: ["Powering motors from Arduino", "No common ground", "Ignoring voltage drop and heat"],
    projectIdeas: ["WiFi based Robot Car with Gas Detector", "Robot Car with Flammable Gas Detector using IoT"],
    alternatives: [{ slug: "esp32", name: "ESP32", reason: "Common controller for WiFi robot car projects." }],
    relatedBlogSlugs: ["smart-wheelchair-obstacle-avoidance-arduino-fyp"],
    faqs: [{ q: "Why is my robot weak with L298N?", a: "L298N has a significant voltage drop and can heat up. Battery and motor current also matter." }],
    buyNotes: "Modern drivers can be better for battery-powered robots, but L298N is still easy for beginner demos.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "soil-moisture-sensor",
    name: "Soil Moisture Sensor",
    shortName: "Soil Moisture",
    category: "sensors",
    categoryLabel: "Agriculture Sensor",
    tagline: "Low-cost soil moisture module for smart farming and irrigation demos.",
    description:
      "Soil moisture sensors are used to estimate whether soil is dry or wet. Cheap resistive probes are common for demos but corrode over time, so capacitive probes are better for longer projects.",
    priceRange: "RM3-RM15",
    difficulty: "Beginner",
    rating: 4.3,
    imageHint: "soil moisture sensor probe with comparator module",
    interfaces: ["Analog", "Digital threshold"],
    voltage: ["3.3V", "5V"],
    compatibleWith: ["Arduino", "ESP32", "Raspberry Pi with ADC"],
    specs: [
      { label: "Output", value: "Analog and optional digital threshold" },
      { label: "Probe Type", value: "Resistive or capacitive depending on module" },
      { label: "Best For", value: "Relative wet/dry detection" },
    ],
    pins: [
      { name: "VCC", description: "Power input." },
      { name: "GND", description: "Ground." },
      { name: "AO", description: "Analog output." },
      { name: "DO", description: "Digital threshold output on comparator modules." },
    ],
    wiring: [
      {
        platform: "ESP32",
        notes: "Power the probe only when taking readings to reduce corrosion for resistive types.",
        connections: [
          { label: "AO", value: "GPIO34" },
          { label: "VCC", value: "3.3V or controlled GPIO/transistor" },
          { label: "GND", value: "GND" },
        ],
      },
    ],
    libraries: [{ label: "No special library", value: "Use analogRead" }],
    suitableFor: ["Smart irrigation", "Greenhouse monitoring", "Plant watering reminders"],
    notSuitableFor: ["Accurate soil science measurement", "Long-term outdoor use with cheap resistive probes"],
    commonMistakes: ["No calibration for dry/wet soil", "Leaving resistive probe powered permanently", "Using one threshold for every soil type"],
    projectIdeas: ["Smart Irrigation System with Water Level and Moisture Monitoring", "IoT-Enabled Smart Greenhouse with Climate Control and Soil Monitoring"],
    alternatives: [{ slug: "bme280", name: "BME280", reason: "Measures air environment instead of soil moisture." }],
    relatedBlogSlugs: ["smart-garden-irrigation-system-esp32", "sistem-pertanian-pintar-pengairan-automatik"],
    faqs: [{ q: "Which soil moisture sensor is better?", a: "Capacitive probes are usually better for longer use because cheap resistive probes corrode faster." }],
    buyNotes: "For real deployments, choose capacitive probes and waterproof connectors.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "gps-neo-6m",
    name: "GPS NEO-6M Module",
    shortName: "GPS NEO-6M",
    category: "wireless",
    categoryLabel: "GPS Module",
    tagline: "GPS receiver for vehicle tracking, panic button and outdoor location projects.",
    description:
      "NEO-6M is a common GPS module used for getting latitude, longitude and speed in outdoor tracking projects. It needs sky visibility and may take time to get its first fix.",
    priceRange: "RM12-RM30",
    difficulty: "Intermediate",
    rating: 4.5,
    imageHint: "NEO-6M GPS module with ceramic antenna",
    interfaces: ["UART"],
    voltage: ["3.3V", "5V module"],
    compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi"],
    specs: [
      { label: "Interface", value: "UART NMEA output" },
      { label: "Update Rate", value: "Typically 1Hz default" },
      { label: "Best Environment", value: "Outdoor with sky visibility" },
    ],
    pins: [
      { name: "VCC", description: "Module power input." },
      { name: "GND", description: "Ground." },
      { name: "TX", description: "GPS serial output to controller RX." },
      { name: "RX", description: "Optional serial input." },
    ],
    wiring: [
      {
        platform: "Arduino",
        notes: "Use SoftwareSerial or hardware serial depending on board.",
        connections: [
          { label: "GPS TX", value: "Arduino RX pin" },
          { label: "GPS RX", value: "Arduino TX pin if needed" },
          { label: "VCC/GND", value: "Module-supported power and common ground" },
        ],
      },
    ],
    libraries: [{ label: "TinyGPS++", value: "Parses NMEA location data" }],
    suitableFor: ["Vehicle tracking", "Panic button location", "Smart helmet", "Outdoor asset tracking"],
    notSuitableFor: ["Indoor location", "Fast first fix in covered areas", "Centimeter precision tracking"],
    commonMistakes: ["Testing indoors", "No common ground", "Swapping TX/RX incorrectly", "Ignoring first fix time"],
    projectIdeas: ["Vehicle Crash Alerting System with GPS and GSM", "Smart Safety Helmet with Solar Panel and GPS Tracking"],
    alternatives: [{ slug: "sim800l", name: "SIM800L", reason: "Often paired with GPS for SMS location alerts." }],
    relatedBlogSlugs: ["gps-vehicle-tracking-system-fyp", "smart-helmet-safety-monitoring-esp32"],
    faqs: [{ q: "Why does NEO-6M show no location?", a: "Most failures happen indoors or before the module gets a satellite fix. Test outdoors with antenna facing the sky." }],
    buyNotes: "Modules with backup battery can keep satellite data and improve future fix time.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "bme280",
    name: "BME280 Environmental Sensor",
    shortName: "BME280",
    category: "sensors",
    categoryLabel: "Environmental Sensor",
    tagline: "Digital temperature, humidity and pressure sensor for weather stations.",
    description:
      "BME280 measures temperature, humidity and pressure using I2C or SPI. It is a cleaner choice than DHT sensors for compact weather station and environmental monitoring projects.",
    priceRange: "RM12-RM35",
    difficulty: "Beginner",
    rating: 4.8,
    imageHint: "BME280 environmental sensor breakout board",
    interfaces: ["I2C", "SPI"],
    voltage: ["3.3V", "5V module"],
    compatibleWith: ["Arduino", "ESP32", "Raspberry Pi", "STM32"],
    specs: [
      { label: "Measures", value: "Temperature, humidity, pressure" },
      { label: "Interface", value: "I2C or SPI" },
      { label: "I2C Address", value: "0x76 or 0x77" },
    ],
    pins: [
      { name: "VIN/VCC", description: "Power input." },
      { name: "GND", description: "Ground." },
      { name: "SCL", description: "I2C clock." },
      { name: "SDA", description: "I2C data." },
    ],
    wiring: [
      {
        platform: "ESP32",
        notes: "Use default I2C pins or define your own Wire pins in code.",
        connections: [
          { label: "SDA", value: "GPIO21" },
          { label: "SCL", value: "GPIO22" },
          { label: "VIN", value: "3.3V" },
          { label: "GND", value: "GND" },
        ],
      },
    ],
    libraries: [{ label: "Adafruit BME280", value: "Arduino weather station examples" }],
    suitableFor: ["Weather station", "Smart greenhouse", "Indoor comfort monitoring", "Pressure trend demos"],
    notSuitableFor: ["Gas/VOC measurement", "Waterproof outdoor exposure without enclosure"],
    commonMistakes: ["Buying BMP280 when humidity is required", "Wrong I2C address", "Heating sensor with nearby electronics"],
    projectIdeas: ["IoT-Based Weather Station with Predictive Alerting for Severe Conditions", "IoT-Enabled Smart Greenhouse with Climate Control and Soil Monitoring"],
    alternatives: [
      { slug: "dht22", name: "DHT22", reason: "Cheaper temperature/humidity option." },
      { slug: "bme680", name: "BME680", reason: "Adds gas/VOC-style sensing." },
    ],
    relatedBlogSlugs: ["iot-weather-station-esp32-bme280", "sistem-rumah-hijau-pintar-suhu-kelembapan"],
    faqs: [{ q: "BME280 vs BMP280: what is the difference?", a: "BME280 measures humidity, temperature and pressure. BMP280 measures pressure and temperature only." }],
    buyNotes: "Check the listing carefully because BME280 and BMP280 modules look similar.",
    updatedAt: "2026-07-10",
  },
  {
    slug: "nrf24l01",
    name: "NRF24L01 RF Module",
    shortName: "NRF24L01",
    category: "wireless",
    categoryLabel: "RF Module",
    tagline: "Low-cost 2.4GHz RF module for short-range wireless sensor projects.",
    description:
      "NRF24L01 is a low-cost 2.4GHz transceiver module used for wireless sensor nodes and remote controls. It is not WiFi, and it needs careful power decoupling for reliable communication.",
    priceRange: "RM4-RM18",
    difficulty: "Intermediate",
    rating: 4.3,
    imageHint: "NRF24L01 wireless RF module with PCB antenna",
    interfaces: ["SPI"],
    voltage: ["3.3V"],
    compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi"],
    specs: [
      { label: "Frequency", value: "2.4GHz" },
      { label: "Interface", value: "SPI" },
      { label: "Voltage", value: "3.3V only" },
      { label: "Use Case", value: "Short-range custom RF links" },
    ],
    pins: [
      { name: "VCC", description: "3.3V only power input." },
      { name: "GND", description: "Ground." },
      { name: "CE/CSN", description: "Control and chip select pins." },
      { name: "SCK/MOSI/MISO", description: "SPI bus pins." },
    ],
    wiring: [
      {
        platform: "Arduino",
        notes: "Add a capacitor near the module power pins for stability.",
        connections: [
          { label: "VCC", value: "3.3V stable supply" },
          { label: "GND", value: "GND" },
          { label: "SCK/MOSI/MISO", value: "Arduino SPI pins" },
          { label: "CE/CSN", value: "Any suitable digital pins" },
        ],
      },
    ],
    libraries: [{ label: "RF24", value: "Common Arduino NRF24L01 library" }],
    suitableFor: ["Wireless sensor nodes", "Remote control demos", "Low-cost RF communication"],
    notSuitableFor: ["Internet connection", "Long-range LoRa-style links", "High-reliability industrial telemetry"],
    commonMistakes: ["Powering from noisy 3.3V pin", "No decoupling capacitor", "Expecting it to connect to WiFi"],
    projectIdeas: ["IoT-Based Equipment Tracking System using RFID and Blynk App Alerting", "Remote Pet Monitoring System with Health Tracking via IoT"],
    alternatives: [
      { slug: "esp32", name: "ESP32", reason: "Use WiFi/Bluetooth instead of custom RF." },
    ],
    relatedBlogSlugs: ["iot-project-ideas-2025", "electrical-engineering-fyp-ideas-malaysia"],
    faqs: [{ q: "Is NRF24L01 a WiFi module?", a: "No. It uses 2.4GHz RF but does not connect to WiFi networks." }],
    buyNotes: "PA+LNA antenna versions can improve range but need better power supply design.",
    updatedAt: "2026-07-10",
  },
  ...createAdditionalComponents([
    {
      slug: "esp8266",
      name: "ESP8266 WiFi Module",
      shortName: "ESP8266",
      category: "microcontrollers",
      categoryLabel: "WiFi Microcontroller",
      tagline: "Low-cost WiFi board for simple IoT dashboards and alerts.",
      description: "ESP8266 is a low-cost WiFi microcontroller used in many beginner IoT projects. It is useful when the project needs WiFi but does not require the extra GPIO, Bluetooth or ADC flexibility of ESP32.",
      priceRange: "RM10-RM25",
      difficulty: "Beginner",
      interfaces: ["GPIO", "ADC", "UART", "I2C", "SPI", "WiFi"],
      voltage: ["3.3V logic", "5V USB/VIN"],
      compatibleWith: ["Arduino IDE", "Blynk", "Firebase", "ThingSpeak"],
      suitableFor: ["Simple IoT monitoring", "WiFi sensor alerts", "Low-cost FYP prototypes"],
      notSuitableFor: ["Bluetooth projects", "Many analog sensors", "5V GPIO input"],
      commonMistakes: ["Feeding 5V into GPIO pins", "Using unstable USB power", "Choosing ESP8266 when many pins are needed"],
      projectIdeas: ["IoT based Smart Agriculture Monitoring System", "Home Monitoring and Automation System using IoT"],
      alternatives: [{ slug: "esp32", name: "ESP32", reason: "More GPIO, Bluetooth and better ADC options." }],
      buyNotes: "NodeMCU-style ESP8266 boards are easier for students than bare ESP-01 modules.",
    },
    {
      slug: "nodemcu",
      name: "NodeMCU ESP8266 Board",
      shortName: "NodeMCU",
      category: "microcontrollers",
      categoryLabel: "WiFi Development Board",
      tagline: "Student-friendly ESP8266 board with USB programming.",
      description: "NodeMCU packages the ESP8266 with USB programming and breadboard-friendly pins. It is common in low-cost IoT FYP projects using Blynk, Firebase or web dashboards.",
      priceRange: "RM12-RM28",
      difficulty: "Beginner",
      interfaces: ["GPIO", "ADC", "UART", "I2C", "SPI", "WiFi"],
      voltage: ["3.3V logic", "5V USB/VIN"],
      compatibleWith: ["Arduino IDE", "Blynk", "Firebase", "ThingSpeak"],
      suitableFor: ["Beginner WiFi projects", "Sensor uploads", "Relay automation"],
      notSuitableFor: ["Direct 5V logic", "Bluetooth", "Many analog channels"],
      commonMistakes: ["Confusing board pin labels with GPIO numbers", "Powering relay boards from weak USB", "Using ADC without checking voltage range"],
      projectIdeas: ["IoT based clothes drying system", "IoT based futsal court management system with RFID and Telegram notifications"],
      alternatives: [{ slug: "esp32", name: "ESP32", reason: "Better long-term IoT board for new FYP work." }],
      buyNotes: "Choose boards with a reliable USB-to-serial chip and clear pin labels.",
    },
    {
      slug: "raspberry-pi-pico",
      name: "Raspberry Pi Pico",
      shortName: "Pi Pico",
      category: "microcontrollers",
      categoryLabel: "Microcontroller",
      tagline: "RP2040 microcontroller board for low-cost embedded control.",
      description: "Raspberry Pi Pico is a low-cost RP2040 board for embedded control, sensors and MicroPython learning. The standard Pico does not include WiFi unless you use Pico W.",
      priceRange: "RM18-RM35",
      difficulty: "Beginner",
      interfaces: ["GPIO", "ADC", "PWM", "UART", "I2C", "SPI"],
      voltage: ["3.3V logic", "5V USB"],
      compatibleWith: ["MicroPython", "C/C++ SDK", "Arduino IDE"],
      suitableFor: ["MicroPython FYP demos", "Sensor control", "PWM projects"],
      notSuitableFor: ["Built-in WiFi on standard Pico", "Linux applications", "Direct 5V GPIO"],
      commonMistakes: ["Buying Pico instead of Pico W for WiFi", "Treating it like a Raspberry Pi computer", "Applying 5V to GPIO"],
      projectIdeas: ["Hand-Gesture based Bicycle Signal Indicator and Stop Alarm", "Fish Feeder System"],
      alternatives: [{ slug: "esp32", name: "ESP32", reason: "Better when WiFi and Bluetooth are required." }],
      buyNotes: "Buy Pico W if the project needs WiFi without extra modules.",
    },
    {
      slug: "esp32-cam",
      name: "ESP32-CAM Module",
      shortName: "ESP32-CAM",
      category: "microcontrollers",
      categoryLabel: "Camera Microcontroller",
      tagline: "Low-cost WiFi camera module for image capture and AI demo projects.",
      description: "ESP32-CAM combines an ESP32 with a small camera module. It is useful for face recognition demos, smart doorbells and visual monitoring FYP projects.",
      priceRange: "RM20-RM45",
      difficulty: "Advanced",
      interfaces: ["Camera", "GPIO", "UART", "WiFi"],
      voltage: ["5V input", "3.3V logic"],
      compatibleWith: ["Arduino IDE", "ESP32 camera examples", "Web streaming demos"],
      suitableFor: ["Smart doorbell", "Face recognition demo", "Remote image capture"],
      notSuitableFor: ["High-resolution video", "Low-light professional camera work", "Easy USB programming without adapter"],
      commonMistakes: ["Weak power causing brownout resets", "No USB programmer", "Wrong camera board selected in code"],
      projectIdeas: ["Smart Doorbell Face Recognition ESP32-CAM", "Sistem Pintu Pintar Pengecaman Wajah"],
      relatedBlogSlugs: ["esp32-cam-brownout-reboot-battery-fix", "smart-doorbell-face-recognition-esp32-cam"],
      alternatives: [{ slug: "esp32", name: "ESP32", reason: "Use normal ESP32 when a camera is not required." }],
      buyNotes: "Buy with an FTDI/programmer board if you do not already have one.",
    },
    {
      slug: "sim7600",
      name: "SIM7600 4G LTE Module",
      shortName: "SIM7600",
      category: "wireless",
      categoryLabel: "4G Module",
      tagline: "4G cellular module for modern GPS tracking and remote IoT projects.",
      description: "SIM7600 is a 4G LTE module used when projects need cellular internet, SMS or GPS features without relying on 2G networks.",
      priceRange: "RM120-RM260",
      difficulty: "Advanced",
      interfaces: ["UART", "USB", "AT commands"],
      voltage: ["5V module", "High-current supply"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["4G tracking", "Remote IoT telemetry", "Cellular dashboards"],
      notSuitableFor: ["Very low budget FYP", "Weak power supplies", "Areas with poor LTE coverage"],
      commonMistakes: ["Underestimating current requirement", "Buying wrong LTE band variant", "No active SIM/data plan"],
      projectIdeas: ["Smart GPS Tracker System and Panic Button with Mobile Application", "IoT-Based Real-Time Traffic Monitoring and Accident Alert System"],
      alternatives: [{ slug: "sim800l", name: "SIM800L", reason: "Cheaper SMS option if 2G is available." }],
      buyNotes: "Check Malaysian LTE band support before buying.",
    },
    {
      slug: "lora-sx1278",
      name: "LoRa SX1278 Module",
      shortName: "LoRa SX1278",
      category: "wireless",
      categoryLabel: "LoRa Module",
      tagline: "Long-range low-power wireless module for sensor telemetry.",
      description: "SX1278 LoRa modules are used for long-range, low-data-rate communication between sensor nodes and gateways. They are useful for agriculture, flood and remote monitoring FYP projects.",
      priceRange: "RM18-RM45",
      interfaces: ["SPI"],
      voltage: ["3.3V"],
      compatibleWith: ["Arduino", "ESP32", "STM32", "Raspberry Pi"],
      suitableFor: ["Long-range sensor nodes", "Flood monitoring", "Agriculture telemetry"],
      notSuitableFor: ["High-speed internet", "Video/audio streaming", "Projects without antenna planning"],
      commonMistakes: ["Wrong frequency module", "Poor antenna placement", "No common ground on SPI wiring"],
      projectIdeas: ["IoT-Based Smart Agriculture Monitoring System", "Flood Level Detection and Alerting System with IoT-Based Notifications"],
      alternatives: [{ slug: "nrf24l01", name: "NRF24L01", reason: "Cheaper short-range RF alternative." }],
      buyNotes: "Use legal local frequency bands and proper antennas.",
    },
    {
      slug: "hc-05",
      name: "HC-05 Bluetooth Module",
      shortName: "HC-05",
      category: "wireless",
      categoryLabel: "Bluetooth Module",
      tagline: "Classic Bluetooth serial module for phone-controlled prototypes.",
      description: "HC-05 is a classic Bluetooth SPP module used for phone-to-Arduino serial control. It is popular in robot cars, home automation and simple app control demos.",
      priceRange: "RM8-RM20",
      difficulty: "Beginner",
      interfaces: ["UART", "Bluetooth"],
      voltage: ["3.3V logic", "5V module"],
      compatibleWith: ["Arduino", "ESP32", "STM32"],
      suitableFor: ["Bluetooth robot car", "Phone-controlled relay", "Simple serial control"],
      notSuitableFor: ["iOS BLE apps", "Internet connectivity", "Long-range wireless"],
      commonMistakes: ["Connecting 5V TX to module RX without checking level", "Using D0/D1 and blocking uploads", "Confusing HC-05 with BLE modules"],
      projectIdeas: ["Smart Baby Cradle System with App Control", "Voice-Activated Home Control System for Elderly and Disabled Users"],
      alternatives: [{ slug: "esp32", name: "ESP32", reason: "Built-in Bluetooth and WiFi in one board." }],
      buyNotes: "HC-05 is classic Bluetooth, not BLE.",
    },
    {
      slug: "ds3231",
      name: "DS3231 RTC Module",
      shortName: "DS3231",
      category: "sensors",
      categoryLabel: "RTC Module",
      tagline: "Accurate real-time clock module for schedules and data logging.",
      description: "DS3231 keeps accurate date and time even when the main controller is off. It is useful for feeders, attendance logs, schedules and offline data logging.",
      priceRange: "RM5-RM18",
      difficulty: "Beginner",
      interfaces: ["I2C"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Scheduled automation", "Data logging timestamps", "Feeder timing"],
      notSuitableFor: ["GPS-grade timing", "Projects without backup battery", "High-speed timing"],
      commonMistakes: ["No coin-cell battery", "Wrong I2C address/wiring", "Forgetting to set initial time"],
      projectIdeas: ["Fish Feeder System", "IoT-Based Elderly Medication Reminder and Health Monitoring System"],
      alternatives: [{ slug: "esp32", name: "ESP32", reason: "Can use internet time when WiFi is available." }],
      buyNotes: "Check that the coin-cell holder and battery are included if needed.",
    },
    {
      slug: "ina219",
      name: "INA219 Current Sensor",
      shortName: "INA219",
      category: "power",
      categoryLabel: "Current Sensor",
      tagline: "I2C current and voltage monitor for battery and solar projects.",
      description: "INA219 measures bus voltage and current over I2C. It is useful for battery percentage, solar monitoring and power consumption analysis in FYP systems.",
      priceRange: "RM8-RM25",
      interfaces: ["I2C"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Solar monitoring", "Battery current logging", "Power consumption analysis"],
      notSuitableFor: ["High-current loads beyond shunt rating", "AC current measurement", "Mains voltage work"],
      commonMistakes: ["Wiring load path incorrectly", "Exceeding shunt current", "Wrong I2C address"],
      projectIdeas: ["Solar Panel based Plant Environmental Monitoring System with Battery Percentage Monitoring", "IoT-Based Home Energy Monitoring and Optimization System"],
      alternatives: [{ slug: "pzem-004t", name: "PZEM-004T", reason: "Use for AC energy monitoring with proper safety." }],
      relatedBlogSlugs: ["solar-panel-performance-monitoring-esp32", "smart-energy-meter-esp32-pzem"],
      buyNotes: "Check maximum current rating and shunt value before buying.",
    },
    {
      slug: "pzem-004t",
      name: "PZEM-004T AC Energy Meter",
      shortName: "PZEM-004T",
      category: "power",
      categoryLabel: "Energy Meter",
      tagline: "AC voltage, current and energy module for smart meter FYP projects.",
      description: "PZEM-004T is used for AC energy monitoring projects. It can measure voltage, current, power and energy, but mains wiring must be handled safely.",
      priceRange: "RM25-RM60",
      difficulty: "Advanced",
      interfaces: ["UART"],
      voltage: ["5V module", "AC measurement terminals"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Smart energy meter", "Appliance monitoring", "Power dashboard"],
      notSuitableFor: ["Unsafe exposed mains demos", "Battery DC measurement", "Beginner wiring without supervision"],
      commonMistakes: ["Unsafe AC wiring", "Wrong CT orientation", "No enclosure or terminal protection"],
      projectIdeas: ["Smart Energy Meter ESP32 PZEM", "IoT-Based Home Energy Monitoring and Optimization System"],
      relatedBlogSlugs: ["smart-energy-meter-esp32-pzem", "sistem-automasi-tenaga-bilik-darjah"],
      alternatives: [{ slug: "ina219", name: "INA219", reason: "Use for low-voltage DC current measurement." }],
      buyNotes: "Use proper enclosure and safety isolation for AC projects.",
    },
    {
      slug: "max30102",
      name: "MAX30102 Pulse Oximeter Sensor",
      shortName: "MAX30102",
      category: "sensors",
      categoryLabel: "Biomedical Sensor",
      tagline: "Heart-rate and SpO2 sensor module for health monitoring demos.",
      description: "MAX30102 uses optical sensing for pulse and SpO2-style demos. It is common in wearable health monitoring FYP projects but needs careful placement and filtering.",
      priceRange: "RM10-RM30",
      interfaces: ["I2C"],
      voltage: ["3.3V", "5V module"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Health monitoring demo", "Wearable prototype", "Pulse trend measurement"],
      notSuitableFor: ["Medical diagnosis", "Certified patient monitoring", "Loose finger placement"],
      commonMistakes: ["Treating readings as medical grade", "Poor finger placement", "No signal filtering"],
      projectIdeas: ["IoT based Health Monitoring and Alerting System", "Wearable Vital Monitoring Device with Emergency GSM Alerting for Seniors"],
      alternatives: [{ slug: "esp32", name: "ESP32", reason: "Common IoT controller for health dashboards." }],
      relatedBlogSlugs: ["sistem-pemantauan-pesakit-iot", "iot-project-ideas-2025"],
      buyNotes: "Use only as educational prototype, not as a medical device.",
    },
    {
      slug: "pir-sensor",
      name: "PIR Motion Sensor",
      shortName: "PIR Sensor",
      category: "sensors",
      categoryLabel: "Motion Sensor",
      tagline: "Passive infrared motion detector for security and occupancy projects.",
      description: "PIR sensors detect motion from warm bodies and are common in alarm, lighting and occupancy monitoring FYP projects.",
      priceRange: "RM4-RM12",
      difficulty: "Beginner",
      interfaces: ["Digital GPIO"],
      voltage: ["5V", "3.3V module variants"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Motion alarms", "Room occupancy", "Automatic lighting"],
      notSuitableFor: ["Counting exact people", "Detecting stationary humans", "Outdoor rain exposure without enclosure"],
      commonMistakes: ["Expecting it to detect stationary people", "Wrong sensitivity/delay settings", "Mounting near heat sources"],
      projectIdeas: ["IoT and Telegram based Alarm System", "Solar-Powered IoT Security System with Motion Detection and Alerts"],
      relatedBlogSlugs: ["sensor-pir-false-alarm-punca-cara-betulkan", "iot-home-automation-fyp"],
      buyNotes: "Choose modules with adjustable delay and sensitivity for easier demos.",
    },
    {
      slug: "flame-sensor",
      name: "Flame Sensor Module",
      shortName: "Flame Sensor",
      category: "sensors",
      categoryLabel: "Safety Sensor",
      tagline: "Infrared flame detection module for fire alert demos.",
      description: "Flame sensor modules detect infrared light from flames and are often used in educational fire alert prototypes.",
      priceRange: "RM3-RM10",
      difficulty: "Beginner",
      interfaces: ["Analog", "Digital GPIO"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Fire alert demo", "Safety prototype", "Robot flame detection"],
      notSuitableFor: ["Certified fire safety systems", "Outdoor sunlight-heavy detection", "Smoke-only detection"],
      commonMistakes: ["Assuming it replaces smoke detectors", "False triggers from sunlight/IR", "Bad sensor angle"],
      projectIdeas: ["Fire Accident Prevention System using IoT", "Smart Emergency Exit Signage with IoT and Fire Hazard Alerts"],
      alternatives: [{ slug: "mq135", name: "MQ135", reason: "Use gas/smoke-style sensing instead of flame light detection." }],
      buyNotes: "Use only for demo/education, not life-safety certification.",
    },
    {
      slug: "rain-sensor",
      name: "Rain Sensor Module",
      shortName: "Rain Sensor",
      category: "sensors",
      categoryLabel: "Weather Sensor",
      tagline: "Rain detection board for smart clothesline and weather projects.",
      description: "Rain sensor modules detect water droplets on a conductive plate. They are simple and useful for smart clothes drying, weather station and window automation demos.",
      priceRange: "RM3-RM10",
      difficulty: "Beginner",
      interfaces: ["Analog", "Digital GPIO"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Smart clothesline", "Weather alert", "Automatic window demo"],
      notSuitableFor: ["Accurate rainfall measurement", "Long outdoor exposure without corrosion protection"],
      commonMistakes: ["Leaving plate powered permanently", "Expecting rainfall amount measurement", "No waterproof enclosure for electronics"],
      projectIdeas: ["IoT based clothes drying system", "IoT-Enabled Smart Roof Leak Detection System with Weather Alerts"],
      buyNotes: "Conductive plates can corrode; power only during readings for longer life.",
    },
    {
      slug: "water-level-sensor",
      name: "Water Level Sensor",
      shortName: "Water Level Sensor",
      category: "sensors",
      categoryLabel: "Liquid Level Sensor",
      tagline: "Simple water-level detection module for tanks and flood alert demos.",
      description: "Water level sensors estimate liquid presence or level using exposed traces. They are common in tank monitoring and flood alert FYP projects.",
      priceRange: "RM3-RM12",
      difficulty: "Beginner",
      interfaces: ["Analog"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Tank level demo", "Flood alert", "Pump automation"],
      notSuitableFor: ["Long-term submerged use", "Precise industrial level measurement", "Dirty/corrosive liquids"],
      commonMistakes: ["Leaving sensor submerged permanently", "No calibration", "Exposing controller to water"],
      projectIdeas: ["Flood Level Detection and Alerting System with IoT-Based Notifications", "Sistem Tangki Air Pintar Paras Pam Automatik"],
      relatedBlogSlugs: ["sistem-amaran-banjir-paras-air", "sistem-tangki-air-pintar-paras-pam-automatik"],
      buyNotes: "For real tanks, float switches or ultrasonic sensors often last longer.",
    },
    {
      slug: "ph-sensor",
      name: "Analog pH Sensor Kit",
      shortName: "pH Sensor",
      category: "sensors",
      categoryLabel: "Water Quality Sensor",
      tagline: "pH probe and interface board for aquaculture and water quality FYP projects.",
      description: "Analog pH sensor kits estimate acidity/alkalinity of water. They are popular in aquaculture, river monitoring and smart farming projects but require calibration.",
      priceRange: "RM45-RM120",
      difficulty: "Advanced",
      interfaces: ["Analog"],
      voltage: ["5V"],
      compatibleWith: ["Arduino", "ESP32 with safe ADC scaling"],
      suitableFor: ["Water quality monitoring", "Aquaculture", "Hydroponics"],
      notSuitableFor: ["No-calibration projects", "Dry storage of probe", "Certified lab measurement"],
      commonMistakes: ["No buffer calibration", "Drying the probe", "Using noisy ADC readings without averaging"],
      projectIdeas: ["Water pH and Temperature Monitoring System", "Smart Water Quality Monitoring for Aquaculture with IoT"],
      relatedBlogSlugs: ["sistem-kualiti-air-sungai-tasik-iot", "sistem-pemantauan-kolam-ikan-pintar"],
      alternatives: [{ slug: "tds-sensor", name: "TDS Sensor", reason: "Measures dissolved solids, not acidity." }],
      buyNotes: "Budget for calibration buffer solutions, not only the probe.",
    },
    {
      slug: "tds-sensor",
      name: "TDS Sensor Module",
      shortName: "TDS Sensor",
      category: "sensors",
      categoryLabel: "Water Quality Sensor",
      tagline: "Total dissolved solids sensor for water quality and aquaculture demos.",
      description: "TDS sensors estimate dissolved solids in water. They are useful in aquaculture and water quality FYP projects, but readings depend on calibration and temperature.",
      priceRange: "RM25-RM70",
      interfaces: ["Analog"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Aquaculture monitoring", "Water quality dashboard", "Hydroponic nutrient trend"],
      notSuitableFor: ["Exact chemical analysis", "No calibration", "Dirty probes"],
      commonMistakes: ["Confusing TDS with pH", "No temperature compensation", "No calibration solution"],
      projectIdeas: ["Smart Water Quality Monitoring for Aquaculture with IoT", "IoT-Enabled Pool Monitoring System with Chemical Balance Alerts"],
      alternatives: [{ slug: "ph-sensor", name: "pH Sensor", reason: "Measures acidity instead of dissolved solids." }],
      buyNotes: "Look for waterproof probe kits with documented calibration examples.",
    },
    {
      slug: "turbidity-sensor",
      name: "Turbidity Sensor",
      shortName: "Turbidity Sensor",
      category: "sensors",
      categoryLabel: "Water Quality Sensor",
      tagline: "Water clarity sensor for river, pond and aquaculture projects.",
      description: "Turbidity sensors estimate water cloudiness using optical measurement. They are useful for water quality dashboards and environmental FYP projects.",
      priceRange: "RM20-RM55",
      interfaces: ["Analog"],
      voltage: ["5V"],
      compatibleWith: ["Arduino", "ESP32 with safe ADC scaling"],
      suitableFor: ["Water clarity monitoring", "Aquaculture", "River pollution demos"],
      notSuitableFor: ["Certified lab turbidity measurement", "Dirty lens without maintenance"],
      commonMistakes: ["No calibration reference", "Dirty optical window", "Expecting exact NTU from cheap module"],
      projectIdeas: ["Smart Aquarium System with pH and turbidity monitoring", "Sistem Kualiti Air Sungai Tasik IoT"],
      alternatives: [{ slug: "tds-sensor", name: "TDS Sensor", reason: "Measures dissolved solids rather than cloudiness." }],
      buyNotes: "Plan a cleaning method for the optical probe in long demos.",
    },
    {
      slug: "ir-obstacle-sensor",
      name: "IR Obstacle Sensor",
      shortName: "IR Obstacle",
      category: "sensors",
      categoryLabel: "Proximity Sensor",
      tagline: "Short-range infrared obstacle detection module for counters and robots.",
      description: "IR obstacle sensors detect nearby objects using reflected infrared light. They are cheap and common in robot, counter and line-detection style prototypes.",
      priceRange: "RM3-RM10",
      difficulty: "Beginner",
      interfaces: ["Digital GPIO"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Obstacle detection", "Object counter", "Robot demo"],
      notSuitableFor: ["Long distance", "Black/reflective objects reliability", "Outdoor sunlight-heavy use"],
      commonMistakes: ["Expecting ultrasonic-like range", "Bad threshold adjustment", "Using in direct sunlight"],
      projectIdeas: ["Smart Waste Bin with IoT", "Smart Parking System FYP Guide"],
      alternatives: [{ slug: "hc-sr04", name: "HC-SR04", reason: "Better for distance measurement." }],
      buyNotes: "Adjust the onboard potentiometer during testing.",
    },
    {
      slug: "ldr-sensor",
      name: "LDR Light Sensor Module",
      shortName: "LDR Sensor",
      category: "sensors",
      categoryLabel: "Light Sensor",
      tagline: "Simple light-dependent resistor module for day/night detection.",
      description: "LDR modules detect brightness changes and are useful for solar tracking, automatic lighting and classroom demos.",
      priceRange: "RM2-RM8",
      difficulty: "Beginner",
      interfaces: ["Analog", "Digital GPIO"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Automatic lighting", "Solar tracker", "Day/night detection"],
      notSuitableFor: ["Accurate lux measurement", "Fast optical sensing", "Calibrated industrial lighting"],
      commonMistakes: ["No calibration threshold", "Sensor shadowed by enclosure", "Expecting lux accuracy"],
      projectIdeas: ["Solar-Powered IoT Garden Light with Automatic Brightness Adjustment", "Sistem Solar Tracker Automatik LDR Servo"],
      relatedBlogSlugs: ["sistem-solar-tracker-automatik-ldr-servo", "solar-panel-performance-monitoring-esp32"],
      buyNotes: "Use a proper lux sensor if the project requires calibrated light values.",
    },
    {
      slug: "keypad-4x4",
      name: "4x4 Matrix Keypad",
      shortName: "4x4 Keypad",
      category: "sensors",
      categoryLabel: "Input Module",
      tagline: "16-key keypad for passwords, menus and access-control projects.",
      description: "A 4x4 matrix keypad provides numeric and function input for access control, menus and locker systems.",
      priceRange: "RM4-RM15",
      difficulty: "Beginner",
      interfaces: ["GPIO matrix"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32", "STM32"],
      suitableFor: ["Password door lock", "Menu input", "Smart locker"],
      notSuitableFor: ["Secure commercial access alone", "Waterproof outdoor input without enclosure"],
      commonMistakes: ["Wrong row/column mapping", "No debounce handling", "Using too many GPIO pins without planning"],
      projectIdeas: ["Sistem Kunci Pintu Pintar Keypad RFID", "Smart Locker System for E-commerce Parcel Pickup with OTP and SMS Alerts"],
      alternatives: [{ slug: "rc522", name: "RC522", reason: "Use RFID for card-based input." }],
      relatedBlogSlugs: ["sistem-kunci-pintu-pintar-keypad-rfid", "rfid-attendance-system-fyp"],
      buyNotes: "Membrane keypads are cheap; mechanical keypads feel better for demos.",
    },
    {
      slug: "lcd-16x2-i2c",
      name: "16x2 LCD I2C Display",
      shortName: "LCD 16x2 I2C",
      category: "displays",
      categoryLabel: "Display Module",
      tagline: "Simple text display for sensor readings and project status.",
      description: "16x2 LCD displays show two lines of text and are widely used in beginner Arduino and ESP32 projects. The I2C backpack reduces wiring.",
      priceRange: "RM8-RM20",
      difficulty: "Beginner",
      interfaces: ["I2C"],
      voltage: ["5V", "3.3V module variants"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Sensor display", "Menu status", "Attendance messages"],
      notSuitableFor: ["Graphics", "Small wearable projects", "High refresh UI"],
      commonMistakes: ["Wrong I2C address", "Contrast not adjusted", "SDA/SCL swapped"],
      projectIdeas: ["System Hantaran Tugas Pelajar dengan No.Matrix", "Water pH and Temperature Monitoring System"],
      alternatives: [{ slug: "oled-ssd1306", name: "OLED SSD1306", reason: "Better for compact graphic displays." }],
      buyNotes: "Make sure the I2C backpack is already soldered if you want fast setup.",
    },
    {
      slug: "tft-ili9341",
      name: "ILI9341 TFT Display",
      shortName: "ILI9341 TFT",
      category: "displays",
      categoryLabel: "Color Display",
      tagline: "Color SPI TFT display for richer dashboards and interfaces.",
      description: "ILI9341 TFT displays provide color graphics for dashboards, menus and visual interfaces in embedded projects.",
      priceRange: "RM18-RM45",
      interfaces: ["SPI"],
      voltage: ["3.3V logic", "5V module variants"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Color dashboard", "Touch UI variants", "Smart mirror/status panel"],
      notSuitableFor: ["Low-memory Arduino graphics-heavy UI", "Ultra-low power display"],
      commonMistakes: ["Wrong SPI wiring", "Using too slow controller", "Wrong display driver selected"],
      projectIdeas: ["Smart Mirror Raspberry Pi", "IoT-Based Weather Station with Predictive Alerting for Severe Conditions"],
      alternatives: [{ slug: "oled-ssd1306", name: "OLED SSD1306", reason: "Smaller and simpler monochrome display." }],
      relatedBlogSlugs: ["smart-mirror-raspberry-pi", "iot-weather-station-esp32-bme280"],
      buyNotes: "Check whether the module includes touch and SD card features.",
    },
    {
      slug: "sg90-servo",
      name: "SG90 Micro Servo Motor",
      shortName: "SG90 Servo",
      category: "actuators",
      categoryLabel: "Servo Motor",
      tagline: "Small positional servo for locks, flaps and simple mechanisms.",
      description: "SG90 is a small hobby servo used for angular movement in doors, feeders, solar trackers and small robotic mechanisms.",
      priceRange: "RM5-RM15",
      difficulty: "Beginner",
      interfaces: ["PWM"],
      voltage: ["5V"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Small door lock", "Feeder mechanism", "Solar tracker"],
      notSuitableFor: ["Heavy loads", "Continuous rotation without special servo", "Direct power from weak GPIO"],
      commonMistakes: ["Powering servo from controller 5V under load", "No common ground", "Expecting high torque from SG90"],
      projectIdeas: ["Fish Feeder System", "Sistem Solar Tracker Automatik LDR Servo"],
      alternatives: [{ slug: "28byj-48-stepper", name: "28BYJ-48 Stepper", reason: "Use for step-based rotation." }],
      relatedBlogSlugs: ["sistem-solar-tracker-automatik-ldr-servo", "smart-garden-irrigation-system-esp32"],
      buyNotes: "Use external 5V supply for multiple servos.",
    },
    {
      slug: "28byj-48-stepper",
      name: "28BYJ-48 Stepper Motor",
      shortName: "28BYJ-48",
      category: "actuators",
      categoryLabel: "Stepper Motor",
      tagline: "Small geared stepper motor for low-cost positioning demos.",
      description: "28BYJ-48 is a small geared stepper motor commonly sold with a ULN2003 driver board. It is useful for slow, light-duty positioning.",
      priceRange: "RM8-RM20",
      difficulty: "Beginner",
      interfaces: ["GPIO driver"],
      voltage: ["5V"],
      compatibleWith: ["Arduino", "ESP32"],
      suitableFor: ["Small positioning", "Mini turntable", "Valve/flap demo"],
      notSuitableFor: ["High speed", "High torque", "Precision CNC motion"],
      commonMistakes: ["Driving motor directly from GPIO", "No external power", "Expecting fast rotation"],
      projectIdeas: ["Automatic Greenhouse Shading System with IoT Temperature Control", "Smart Food Storage System with Temperature and Humidity Control via IoT"],
      alternatives: [{ slug: "sg90-servo", name: "SG90 Servo", reason: "Simpler for limited-angle motion." }],
      buyNotes: "Buy the set with ULN2003 driver board included.",
    },
    {
      slug: "nema17-stepper",
      name: "NEMA17 Stepper Motor",
      shortName: "NEMA17",
      category: "actuators",
      categoryLabel: "Stepper Motor",
      tagline: "Common stepper motor for stronger positioning and motion projects.",
      description: "NEMA17 stepper motors are used in stronger positioning systems such as sliders, dispensers, plotters and CNC-style prototypes. They require a proper stepper driver.",
      priceRange: "RM25-RM70",
      difficulty: "Advanced",
      interfaces: ["Step/Dir driver"],
      voltage: ["Driver-dependent"],
      compatibleWith: ["Arduino", "ESP32", "A4988/DRV8825 drivers"],
      suitableFor: ["Linear motion", "Dispenser mechanisms", "Plotter-style projects"],
      notSuitableFor: ["Direct GPIO drive", "Tiny battery projects", "No-current-limit drivers"],
      commonMistakes: ["No stepper driver", "Wrong current limit", "Weak power supply"],
      projectIdeas: ["Reverse Vending Machine using IoT and Thermal Printer", "Smart Parcel Receiving Unit with IoT and Database Connection"],
      alternatives: [{ slug: "28byj-48-stepper", name: "28BYJ-48", reason: "Cheaper and easier for small light-duty movement." }],
      buyNotes: "Budget for the motor driver and power supply, not only the motor.",
    },
    {
      slug: "buck-converter-lm2596",
      name: "LM2596 Buck Converter",
      shortName: "LM2596",
      category: "power",
      categoryLabel: "Power Module",
      tagline: "Adjustable step-down regulator for powering modules safely.",
      description: "LM2596 buck converter modules step a higher DC voltage down to a lower voltage. They are useful for battery, solar and multi-module FYP builds.",
      priceRange: "RM4-RM15",
      difficulty: "Beginner",
      interfaces: ["Power"],
      voltage: ["Adjustable DC output"],
      compatibleWith: ["Arduino", "ESP32", "Sensors", "Relay modules"],
      suitableFor: ["Battery projects", "Solar projects", "Stable 5V/3.3V rails"],
      notSuitableFor: ["AC mains conversion", "No heatsinking under high current", "Precision low-noise analog rails"],
      commonMistakes: ["Not adjusting output before connecting electronics", "Exceeding current rating", "Reverse polarity"],
      projectIdeas: ["Solar Panel based Plant Environmental Monitoring System with Battery Percentage Monitoring", "Smart Safety Helmet with Solar Panel and GPS Tracking"],
      alternatives: [{ slug: "tp4056", name: "TP4056", reason: "Use for charging single-cell lithium batteries." }],
      buyNotes: "Always set the output voltage with a multimeter before connecting your board.",
    },
    {
      slug: "tp4056",
      name: "TP4056 Lithium Battery Charger",
      shortName: "TP4056",
      category: "power",
      categoryLabel: "Battery Charger",
      tagline: "Single-cell lithium charging module for portable prototypes.",
      description: "TP4056 modules charge one lithium cell from USB input. Protection-board versions add safer overcharge/overdischarge protection for student prototypes.",
      priceRange: "RM2-RM8",
      difficulty: "Beginner",
      interfaces: ["Power", "USB"],
      voltage: ["5V input", "1-cell lithium output"],
      compatibleWith: ["Portable Arduino projects", "ESP32 battery projects"],
      suitableFor: ["Portable prototypes", "Wearables", "Battery charging demos"],
      notSuitableFor: ["Multi-cell battery packs", "High-current load without power-path design", "Unprotected lithium handling"],
      commonMistakes: ["Using with two lithium cells", "No battery protection", "Powering high-current GSM directly"],
      projectIdeas: ["Wearable Vital Monitoring Device with Emergency GSM Alerting for Seniors", "Smart Safety Helmet with Solar Panel and GPS Tracking"],
      alternatives: [{ slug: "buck-converter-lm2596", name: "LM2596", reason: "Use for voltage step-down regulation." }],
      buyNotes: "Choose TP4056 modules with protection if students will handle batteries.",
    },
    {
      slug: "hx711",
      name: "HX711 Load Cell Amplifier",
      shortName: "HX711",
      category: "sensors",
      categoryLabel: "Weight Sensor Interface",
      tagline: "24-bit load-cell amplifier for weighing scale projects.",
      description: "HX711 amplifies load-cell signals for digital reading by Arduino or ESP32. It is common in smart weighing, inventory and bin-weight projects.",
      priceRange: "RM4-RM15",
      difficulty: "Intermediate",
      interfaces: ["Digital serial"],
      voltage: ["3.3V", "5V"],
      compatibleWith: ["Arduino", "ESP32", "Raspberry Pi"],
      suitableFor: ["Weighing scale", "Smart bin weight", "Inventory measurement"],
      notSuitableFor: ["No calibration projects", "Fast dynamic force measurement", "Wrong load cell wiring"],
      commonMistakes: ["No calibration weight", "Wrong E+/E-/A+/A- wiring", "Mechanical mounting flex issues"],
      projectIdeas: ["Smart Waste Bin with IoT", "Smart Inventory Tracking System for Retail with IoT and Data Logging"],
      alternatives: [{ slug: "load-cell-5kg", name: "5kg Load Cell", reason: "HX711 is usually paired with a load cell." }],
      buyNotes: "Buy HX711 together with a matching load cell and calibration weight.",
    },
    {
      slug: "load-cell-5kg",
      name: "5kg Load Cell",
      shortName: "5kg Load Cell",
      category: "sensors",
      categoryLabel: "Weight Sensor",
      tagline: "Strain-gauge weight sensor for smart scale and bin projects.",
      description: "A 5kg load cell measures force/weight and is commonly used with HX711 amplifier modules in weighing scale and smart bin FYP projects.",
      priceRange: "RM8-RM25",
      interfaces: ["Bridge sensor"],
      voltage: ["Excitation from HX711"],
      compatibleWith: ["HX711", "Arduino", "ESP32"],
      suitableFor: ["Smart weighing scale", "Bin weight monitoring", "Inventory measurement"],
      notSuitableFor: ["Direct microcontroller input", "Loads beyond rated capacity", "Bad mechanical mounting"],
      commonMistakes: ["No HX711 amplifier", "Mounting both ends rigidly", "No calibration weight"],
      projectIdeas: ["Smart Waste Bin with IoT", "Intelligent Waste Sorting Bin with IoT Tracking and Monitoring"],
      alternatives: [{ slug: "hx711", name: "HX711", reason: "Required amplifier/interface for most load cells." }],
      buyNotes: "Match the load range to your actual object weight for better accuracy.",
    },
    {
          "slug": "a4988-stepper-driver",
          "name": "A4988 Stepper Motor Driver",
          "shortName": "A4988",
          "category": "drivers",
          "categoryLabel": "Stepper Driver",
          "tagline": "Compact stepper driver for NEMA17 motion and positioning projects.",
          "description": "A4988 is a stepper motor driver module used to control bipolar stepper motors through STEP and DIR pins. It is common in plotters, dispensers, sliders, small CNC-style demos and automated mechanisms.",
          "priceRange": "RM5-RM15",
          "difficulty": "Intermediate",
          "interfaces": [
                "STEP/DIR",
                "GPIO"
          ],
          "voltage": [
                "3.3V logic",
                "5V logic",
                "8V-35V motor supply"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "NEMA17 Stepper"
          ],
          "suitableFor": [
                "NEMA17 control",
                "Linear motion prototype",
                "Dispenser mechanism"
          ],
          "notSuitableFor": [
                "Driving motors without current limit setup",
                "DC motors",
                "High-current industrial motion"
          ],
          "commonMistakes": [
                "Not setting current limit",
                "No motor power supply",
                "Disconnecting motor while powered"
          ],
          "projectIdeas": [
                "Smart Conveyor Quality Reject Prototype with Load Cell Check",
                "Automatic Bottle Filling Prototype with Flow Sensor and Level Stop"
          ],
          "alternatives": [
                {
                      "slug": "drv8825-stepper-driver",
                      "name": "DRV8825",
                      "reason": "Higher current option with similar step/dir control."
                }
          ],
          "relatedBlogSlugs": [
                "fyp-electronics-troubleshooting-checklist",
                "esp32-power-supply-for-sensors-relays-fyp"
          ],
          "buyNotes": "Buy heatsinks and set the current limit before running a NEMA17 motor."
    },
    {
          "slug": "drv8825-stepper-driver",
          "name": "DRV8825 Stepper Motor Driver",
          "shortName": "DRV8825",
          "category": "drivers",
          "categoryLabel": "Stepper Driver",
          "tagline": "Higher-current stepper driver for stronger motion prototypes.",
          "description": "DRV8825 is a stepper driver module for bipolar stepper motors. It supports STEP/DIR control and is often used when a project needs more current margin than low-cost A4988 boards.",
          "priceRange": "RM8-RM22",
          "difficulty": "Intermediate",
          "interfaces": [
                "STEP/DIR",
                "GPIO"
          ],
          "voltage": [
                "3.3V logic",
                "5V logic",
                "8.2V-45V motor supply"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "NEMA17 Stepper"
          ],
          "suitableFor": [
                "Stepper motion",
                "Robot mechanism",
                "Positioning system"
          ],
          "notSuitableFor": [
                "No-current-limit operation",
                "Small servo replacement",
                "Direct GPIO motor drive"
          ],
          "commonMistakes": [
                "Wrong current limit",
                "No cooling under load",
                "Poor motor supply wiring"
          ],
          "projectIdeas": [
                "Mini AGV Path Tracking Robot with Station Check-In Display",
                "Smart Mini Lift Model with Floor Display and Overload Alert"
          ],
          "alternatives": [
                {
                      "slug": "a4988-stepper-driver",
                      "name": "A4988",
                      "reason": "Cheaper option for lighter current needs."
                }
          ],
          "relatedBlogSlugs": [
                "fyp-electronics-troubleshooting-checklist",
                "esp32-power-supply-for-sensors-relays-fyp"
          ],
          "buyNotes": "Check the motor current rating and tune the driver before full-speed testing."
    },
    {
          "slug": "uln2003-stepper-driver",
          "name": "ULN2003 Stepper Driver Board",
          "shortName": "ULN2003",
          "category": "drivers",
          "categoryLabel": "Stepper Driver",
          "tagline": "Simple driver board commonly paired with 28BYJ-48 steppers.",
          "description": "ULN2003 driver boards are used to drive 28BYJ-48 geared stepper motors from microcontroller GPIO pins. They are beginner-friendly for low-speed positioning demos.",
          "priceRange": "RM3-RM10",
          "difficulty": "Beginner",
          "interfaces": [
                "GPIO"
          ],
          "voltage": [
                "5V motor supply",
                "3.3V/5V logic"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "28BYJ-48 Stepper"
          ],
          "suitableFor": [
                "Small stepper demo",
                "Mini turntable",
                "Flap or valve prototype"
          ],
          "notSuitableFor": [
                "NEMA17 motors",
                "High torque",
                "Fast motion"
          ],
          "commonMistakes": [
                "Using it for NEMA17 motors",
                "No external 5V supply",
                "Wrong coil sequence"
          ],
          "projectIdeas": [
                "Automatic Greenhouse Shading System with IoT Temperature Control",
                "Smart Food Storage System with Temperature and Humidity Control via IoT"
          ],
          "alternatives": [
                {
                      "slug": "28byj-48-stepper",
                      "name": "28BYJ-48 Stepper",
                      "reason": "The common motor paired with this driver."
                }
          ],
          "relatedBlogSlugs": [
                "arduino-uno-vs-esp32-for-electronics-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Most student kits include ULN2003 together with the 28BYJ-48 motor."
    },
    {
          "slug": "tb6612fng-motor-driver",
          "name": "TB6612FNG Dual Motor Driver",
          "shortName": "TB6612FNG",
          "category": "drivers",
          "categoryLabel": "DC Motor Driver",
          "tagline": "Efficient dual H-bridge driver for small robot cars and DC motors.",
          "description": "TB6612FNG is a compact dual motor driver for small DC motors. It is usually more efficient and smaller than older L298N boards for lightweight robot projects.",
          "priceRange": "RM8-RM25",
          "difficulty": "Intermediate",
          "interfaces": [
                "PWM",
                "GPIO"
          ],
          "voltage": [
                "2.7V-5.5V logic",
                "4.5V-13.5V motor supply"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi Pico"
          ],
          "suitableFor": [
                "Robot car",
                "Small DC motor control",
                "PWM speed control"
          ],
          "notSuitableFor": [
                "High-current motors",
                "Stepper motor control",
                "No motor power planning"
          ],
          "commonMistakes": [
                "No standby pin control",
                "Underrated motor supply",
                "No common ground"
          ],
          "projectIdeas": [
                "Line Following Delivery Robot with RFID Drop-Off Verification",
                "Voice-Controlled Classroom Demonstration Robot with Obstacle Avoidance"
          ],
          "alternatives": [
                {
                      "slug": "l298n",
                      "name": "L298N",
                      "reason": "Older but common driver for beginner robot kits."
                }
          ],
          "relatedBlogSlugs": [
                "arduino-uno-vs-esp32-for-electronics-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Choose TB6612FNG for small efficient robots, not heavy motors."
    },
    {
          "slug": "bts7960-motor-driver",
          "name": "BTS7960 High Current Motor Driver",
          "shortName": "BTS7960",
          "category": "drivers",
          "categoryLabel": "High Current Driver",
          "tagline": "High-current H-bridge module for stronger DC motor prototypes.",
          "description": "BTS7960 modules drive larger brushed DC motors compared with small robot drivers. They are useful in heavier automation demos, but need careful power and fuse planning.",
          "priceRange": "RM18-RM45",
          "difficulty": "Advanced",
          "interfaces": [
                "PWM",
                "GPIO"
          ],
          "voltage": [
                "3.3V/5V logic",
                "6V-27V motor supply"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32"
          ],
          "suitableFor": [
                "High-current DC motor",
                "Linear actuator",
                "Heavy robot prototype"
          ],
          "notSuitableFor": [
                "Tiny battery projects",
                "Stepper motors",
                "Unsafe unfused power wiring"
          ],
          "commonMistakes": [
                "No fuse or current planning",
                "Weak battery wiring",
                "Undersized motor supply"
          ],
          "projectIdeas": [
                "Smart Compressor Runtime and Overheat Alert System",
                "Smart Vehicle Workshop Job Bay Occupancy Monitor"
          ],
          "alternatives": [
                {
                      "slug": "tb6612fng-motor-driver",
                      "name": "TB6612FNG",
                      "reason": "Better for smaller low-current robots."
                }
          ],
          "relatedBlogSlugs": [
                "esp32-power-supply-for-sensors-relays-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Use thick wires, correct motor supply and protection for high-current loads."
    },
    {
          "slug": "mosfet-trigger-module",
          "name": "MOSFET Trigger Switch Module",
          "shortName": "MOSFET Module",
          "category": "drivers",
          "categoryLabel": "Load Driver",
          "tagline": "Low-side switching module for LED strips, pumps and DC loads.",
          "description": "MOSFET trigger modules switch DC loads using a microcontroller signal. They are useful when a relay is too slow or noisy for PWM-style control.",
          "priceRange": "RM5-RM18",
          "difficulty": "Intermediate",
          "interfaces": [
                "PWM",
                "GPIO"
          ],
          "voltage": [
                "3.3V/5V input",
                "DC load supply"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "LED strips",
                "DC pumps"
          ],
          "suitableFor": [
                "LED dimming",
                "Small DC pump",
                "Fan speed control"
          ],
          "notSuitableFor": [
                "AC mains loads",
                "Inductive loads without protection",
                "Unknown high-current loads"
          ],
          "commonMistakes": [
                "No flyback diode for inductive loads",
                "Wrong load polarity",
                "No common ground"
          ],
          "projectIdeas": [
                "Smart Home Water Leak Detection with Solenoid Valve Shutdown",
                "Smart Greenhouse Ventilation Control with CO2 and Temperature Feedback"
          ],
          "alternatives": [
                {
                      "slug": "relay-module",
                      "name": "Relay Module",
                      "reason": "Better for simple on/off isolation where PWM is not needed."
                }
          ],
          "relatedBlogSlugs": [
                "esp32-relay-module-wiring-fyp-safety-guide",
                "esp32-power-supply-for-sensors-relays-fyp"
          ],
          "buyNotes": "Check whether the module is logic-level and rated for the actual load current."
    },
    {
          "slug": "logic-level-converter",
          "name": "4-Channel Logic Level Converter",
          "shortName": "Level Shifter",
          "category": "power",
          "categoryLabel": "Interface Support",
          "tagline": "Bidirectional level shifting for 3.3V and 5V signal compatibility.",
          "description": "Logic level converters translate signal voltage between 3.3V controllers and 5V modules. They help protect ESP32, Raspberry Pi and other 3.3V boards from 5V logic.",
          "priceRange": "RM3-RM10",
          "difficulty": "Beginner",
          "interfaces": [
                "I2C",
                "UART",
                "GPIO"
          ],
          "voltage": [
                "3.3V side",
                "5V side"
          ],
          "compatibleWith": [
                "ESP32",
                "Arduino",
                "Raspberry Pi",
                "I2C modules"
          ],
          "suitableFor": [
                "3.3V to 5V interface",
                "I2C level shifting",
                "Safer mixed-voltage prototypes"
          ],
          "notSuitableFor": [
                "Power conversion",
                "High-speed unknown buses",
                "Motor current control"
          ],
          "commonMistakes": [
                "Using it as a power regulator",
                "Missing low-voltage reference",
                "Connecting HV and LV sides backwards"
          ],
          "projectIdeas": [
                "ESP32-Based MQTT Sensor Gateway for Multiple Arduino Nodes",
                "IoT-Based Classroom Asset Checkout System with RFID and Dashboard"
          ],
          "alternatives": [
                {
                      "slug": "buck-converter-lm2596",
                      "name": "LM2596",
                      "reason": "Use for power voltage conversion, not signal shifting."
                }
          ],
          "relatedBlogSlugs": [
                "esp32-pinout-tool-how-to-use-for-fyp",
                "common-esp32-wiring-mistakes-fyp-demo"
          ],
          "buyNotes": "Use level shifters for signals; use regulators for power rails."
    },
    {
          "slug": "breadboard-power-supply",
          "name": "MB102 Breadboard Power Supply",
          "shortName": "MB102 Power",
          "category": "power",
          "categoryLabel": "Power Module",
          "tagline": "Breadboard power module for quick 3.3V and 5V prototype rails.",
          "description": "MB102-style breadboard power modules provide selectable 3.3V and 5V rails for quick prototyping. They are useful for demos but should not be pushed beyond their regulator limits.",
          "priceRange": "RM4-RM12",
          "difficulty": "Beginner",
          "interfaces": [
                "Power"
          ],
          "voltage": [
                "3.3V output",
                "5V output",
                "DC input"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Sensors",
                "Breadboards"
          ],
          "suitableFor": [
                "Quick sensor testing",
                "Breadboard demos",
                "Low-current logic rails"
          ],
          "notSuitableFor": [
                "Motors",
                "GSM modules",
                "High-current relay banks"
          ],
          "commonMistakes": [
                "Powering motors from breadboard rails",
                "Wrong jumper voltage setting",
                "Overheating regulator"
          ],
          "projectIdeas": [
                "ESP32 DHT11 Firebase Temperature Monitoring FYP Guide",
                "IoT Dashboard and Data Logging Guide for FYP Students"
          ],
          "alternatives": [
                {
                      "slug": "buck-converter-lm2596",
                      "name": "LM2596",
                      "reason": "Better for stronger regulated supply from batteries/adapters."
                }
          ],
          "relatedBlogSlugs": [
                "esp32-power-supply-for-sensors-relays-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Use it for low-current logic testing, not final high-load prototypes."
    },
    {
          "slug": "ads1115-adc",
          "name": "ADS1115 16-bit ADC Module",
          "shortName": "ADS1115",
          "category": "sensors",
          "categoryLabel": "ADC Module",
          "tagline": "External high-resolution ADC for analog sensors and data logging.",
          "description": "ADS1115 is a 16-bit I2C analog-to-digital converter. It is useful when a project needs better analog resolution or extra analog inputs than the controller provides.",
          "priceRange": "RM10-RM28",
          "difficulty": "Intermediate",
          "interfaces": [
                "I2C",
                "Analog input"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Precision analog readings",
                "Extra ADC channels",
                "Sensor data logging"
          ],
          "notSuitableFor": [
                "Fast oscilloscope-style sampling",
                "High-voltage direct measurement",
                "No calibration projects"
          ],
          "commonMistakes": [
                "Measuring voltage above VDD",
                "Ignoring gain setting",
                "No sensor calibration"
          ],
          "projectIdeas": [
                "Water pH and Temperature Monitoring System",
                "IoT-Based Hydroponic Nutrient Level and pH Monitoring Prototype"
          ],
          "alternatives": [
                {
                      "slug": "ina219",
                      "name": "INA219",
                      "reason": "Better for current and voltage monitoring of power rails."
                }
          ],
          "relatedBlogSlugs": [
                "esp32-adc2-wifi-problem-fix",
                "arduino-sensor-calibration-student-projects"
          ],
          "buyNotes": "Check input range and gain before connecting analog sensors."
    },
    {
          "slug": "mcp23017-io-expander",
          "name": "MCP23017 I/O Expander",
          "shortName": "MCP23017",
          "category": "drivers",
          "categoryLabel": "I/O Expander",
          "tagline": "I2C GPIO expander for projects that need more input/output pins.",
          "description": "MCP23017 adds 16 GPIO pins over I2C. It is useful for keypads, LEDs, buttons and status panels when the main microcontroller runs out of pins.",
          "priceRange": "RM8-RM22",
          "difficulty": "Intermediate",
          "interfaces": [
                "I2C",
                "GPIO"
          ],
          "voltage": [
                "1.8V-5.5V module-dependent"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "More GPIO pins",
                "Button panels",
                "LED status boards"
          ],
          "notSuitableFor": [
                "High-current outputs",
                "Very fast timing signals",
                "Motor drive without driver"
          ],
          "commonMistakes": [
                "Driving loads directly",
                "Wrong I2C address",
                "No pull-ups where needed"
          ],
          "projectIdeas": [
                "ESP32-Based Student Workshop Safety Checklist Kiosk",
                "Smart Cafeteria Queue Number Display with Button Counter Control"
          ],
          "alternatives": [
                {
                      "slug": "pcf8574-io-expander",
                      "name": "PCF8574",
                      "reason": "Simpler 8-bit I/O expander often used in LCD backpacks."
                }
          ],
          "relatedBlogSlugs": [
                "esp32-pinout-tool-how-to-use-for-fyp",
                "software-fyp-admin-panel-features-that-score"
          ],
          "buyNotes": "Use drivers or transistors if the expanded pins control loads."
    },
    {
          "slug": "pcf8574-io-expander",
          "name": "PCF8574 I/O Expander",
          "shortName": "PCF8574",
          "category": "drivers",
          "categoryLabel": "I/O Expander",
          "tagline": "Simple 8-bit I2C expander used in LCD backpacks and button panels.",
          "description": "PCF8574 provides simple I/O expansion over I2C. It is widely used in 16x2 LCD I2C backpacks and can also read buttons or drive small logic signals.",
          "priceRange": "RM4-RM12",
          "difficulty": "Beginner",
          "interfaces": [
                "I2C",
                "GPIO"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "LCD 16x2"
          ],
          "suitableFor": [
                "LCD backpack",
                "Button input panel",
                "Simple GPIO expansion"
          ],
          "notSuitableFor": [
                "High-current output",
                "Precise PWM",
                "High-speed signal control"
          ],
          "commonMistakes": [
                "Wrong I2C address",
                "Expecting strong output drive",
                "No I2C pull-up consideration"
          ],
          "projectIdeas": [
                "Smart School Bell and Announcement Trigger with Web Schedule",
                "ESP32-Based Campus Notice Board with Web Update Control"
          ],
          "alternatives": [
                {
                      "slug": "mcp23017-io-expander",
                      "name": "MCP23017",
                      "reason": "More GPIO pins and stronger control features."
                }
          ],
          "relatedBlogSlugs": [
                "esp32-i2c-address-conflict-multiple-sensors",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Useful when a project uses many LCDs, buttons or low-current status outputs."
    },
    {
          "slug": "tca9548a-i2c-multiplexer",
          "name": "TCA9548A I2C Multiplexer",
          "shortName": "TCA9548A",
          "category": "drivers",
          "categoryLabel": "I2C Multiplexer",
          "tagline": "I2C channel selector for multiple same-address sensors.",
          "description": "TCA9548A lets one controller talk to multiple I2C devices that share the same address. It is useful for multi-sensor dashboards and classroom comfort monitoring nodes.",
          "priceRange": "RM8-RM22",
          "difficulty": "Intermediate",
          "interfaces": [
                "I2C"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Multiple same-address I2C sensors",
                "Sensor arrays",
                "Modular dashboards"
          ],
          "notSuitableFor": [
                "SPI devices",
                "Fixing bad wiring",
                "High-speed long cable I2C without planning"
          ],
          "commonMistakes": [
                "Using it when address can be changed",
                "No pull-up planning",
                "Forgetting to select channel in code"
          ],
          "projectIdeas": [
                "ESP32-Based Wireless Sensor Network for Room Comfort Study",
                "IoT-Based Classroom Noise and Comfort Score Display"
          ],
          "alternatives": [
                {
                      "slug": "mcp23017-io-expander",
                      "name": "MCP23017",
                      "reason": "Use when the project needs more GPIO rather than more I2C channels."
                }
          ],
          "relatedBlogSlugs": [
                "iot-dashboard-data-logging-fyp-guide",
                "esp32-pinout-tool-how-to-use-for-fyp"
          ],
          "buyNotes": "Use short I2C wiring and label each channel in the report."
    },
    {
          "slug": "vl53l0x-time-of-flight",
          "name": "VL53L0X Time-of-Flight Distance Sensor",
          "shortName": "VL53L0X",
          "category": "sensors",
          "categoryLabel": "Distance Sensor",
          "tagline": "Compact laser time-of-flight distance sensor for short-range measurement.",
          "description": "VL53L0X measures short distance using time-of-flight sensing. It is useful when ultrasonic sensors are too bulky or when a compact short-range distance module is needed.",
          "priceRange": "RM12-RM30",
          "difficulty": "Intermediate",
          "interfaces": [
                "I2C"
          ],
          "voltage": [
                "3.3V",
                "5V module variants"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Short-range distance",
                "Object presence",
                "Compact robot sensing"
          ],
          "notSuitableFor": [
                "Long outdoor range",
                "Transparent/reflective target accuracy",
                "Dirty sensor window"
          ],
          "commonMistakes": [
                "Expecting HC-SR04 range",
                "Bad performance on reflective surfaces",
                "No address handling for multiple modules"
          ],
          "projectIdeas": [
                "Smart Lecture Hall Seat Occupancy Counter with Live Display",
                "Mini AGV Path Tracking Robot with Station Check-In Display"
          ],
          "alternatives": [
                {
                      "slug": "hc-sr04",
                      "name": "HC-SR04",
                      "reason": "Cheaper ultrasonic option for longer basic distance demos."
                }
          ],
          "relatedBlogSlugs": [
                "low-cost-sensors-that-make-strong-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Choose breakout boards with regulator/level shifting if using 5V controllers."
    },
    {
          "slug": "bh1750-light-sensor",
          "name": "BH1750 Digital Light Sensor",
          "shortName": "BH1750",
          "category": "sensors",
          "categoryLabel": "Light Sensor",
          "tagline": "Digital lux sensor for lighting, solar and comfort projects.",
          "description": "BH1750 measures light intensity in lux over I2C. It gives more report-friendly light readings than a simple LDR divider.",
          "priceRange": "RM5-RM18",
          "difficulty": "Beginner",
          "interfaces": [
                "I2C"
          ],
          "voltage": [
                "3.3V",
                "5V module variants"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Light level monitoring",
                "Solar tracker study",
                "Room comfort dashboard"
          ],
          "notSuitableFor": [
                "Color measurement",
                "Camera exposure analysis",
                "Outdoor waterproof sensing without enclosure"
          ],
          "commonMistakes": [
                "Using without light shielding",
                "Comparing against LDR raw values directly",
                "Wrong I2C wiring"
          ],
          "projectIdeas": [
                "ESP32-Based Classroom Air Comfort Score with Traffic Light Indicator",
                "Smart Green Building Window Ventilation Control Prototype"
          ],
          "alternatives": [
                {
                      "slug": "ldr-sensor",
                      "name": "LDR Sensor",
                      "reason": "Cheaper analog light sensing option."
                }
          ],
          "relatedBlogSlugs": [
                "low-cost-sensors-that-make-strong-fyp",
                "smart-greenhouse-fyp-scope-components-testing"
          ],
          "buyNotes": "BH1750 is useful when the report needs lux values instead of raw ADC values."
    },
    {
          "slug": "as5600-magnetic-encoder",
          "name": "AS5600 Magnetic Rotary Encoder",
          "shortName": "AS5600",
          "category": "sensors",
          "categoryLabel": "Rotary Position Sensor",
          "tagline": "Magnetic angle sensor for non-contact rotary position measurement.",
          "description": "AS5600 measures rotation angle using a magnet. It is useful for valve position, knob input, steering angle demos and mechanism feedback.",
          "priceRange": "RM10-RM28",
          "difficulty": "Intermediate",
          "interfaces": [
                "I2C",
                "Analog/PWM output"
          ],
          "voltage": [
                "3.3V",
                "5V module variants"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Rotary position feedback",
                "Valve angle sensing",
                "Control knob input"
          ],
          "notSuitableFor": [
                "No-magnet installation",
                "Dirty mechanical mounting",
                "High-speed industrial encoders"
          ],
          "commonMistakes": [
                "Wrong magnet alignment",
                "Loose shaft mounting",
                "Ignoring wrap-around angle"
          ],
          "projectIdeas": [
                "Smart Green Building Window Ventilation Control Prototype",
                "Automatic Hand Tool Dispenser Prototype with RFID User Log"
          ],
          "alternatives": [
                {
                      "slug": "ky-040-rotary-encoder",
                      "name": "KY-040 Encoder",
                      "reason": "Cheaper manual knob encoder for menu input."
                }
          ],
          "relatedBlogSlugs": [
                "fyp-electronics-troubleshooting-checklist",
                "arduino-uno-vs-esp32-for-electronics-fyp"
          ],
          "buyNotes": "Buy with a matching diametric magnet or confirm your magnet orientation."
    },
    {
          "slug": "max6675-thermocouple",
          "name": "MAX6675 K-Type Thermocouple Module",
          "shortName": "MAX6675",
          "category": "sensors",
          "categoryLabel": "High Temperature Sensor",
          "tagline": "Thermocouple interface for higher-temperature measurement demos.",
          "description": "MAX6675 modules read K-type thermocouples over SPI. They are useful for higher-temperature monitoring where DHT or DS18B20 sensors are not suitable.",
          "priceRange": "RM12-RM35",
          "difficulty": "Intermediate",
          "interfaces": [
                "SPI"
          ],
          "voltage": [
                "3.3V",
                "5V module variants"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32"
          ],
          "suitableFor": [
                "Heater monitoring",
                "Oven demo",
                "High-temperature logging"
          ],
          "notSuitableFor": [
                "Humidity sensing",
                "Medical temperature",
                "No thermocouple calibration"
          ],
          "commonMistakes": [
                "Loose thermocouple connection",
                "Wrong thermocouple type",
                "Touching unsafe hot surfaces"
          ],
          "projectIdeas": [
                "IoT-Based Food Storage Humidity and Temperature Compliance Logger",
                "Smart Lab Incubator Temperature Stability Logger"
          ],
          "alternatives": [
                {
                      "slug": "ds18b20-temperature-sensor",
                      "name": "DS18B20",
                      "reason": "Better for waterproof low-temperature monitoring."
                }
          ],
          "relatedBlogSlugs": [
                "arduino-sensor-calibration-student-projects",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Use safe heat sources and document the thermocouple type in the report."
    },
    {
          "slug": "mlx90614-ir-temperature",
          "name": "MLX90614 Infrared Temperature Sensor",
          "shortName": "MLX90614",
          "category": "sensors",
          "categoryLabel": "IR Temperature Sensor",
          "tagline": "Non-contact temperature sensor for object surface measurement.",
          "description": "MLX90614 measures object temperature without contact using infrared sensing. It is useful for surface temperature demos and safety screening prototypes, but depends strongly on target material and distance.",
          "priceRange": "RM25-RM70",
          "difficulty": "Intermediate",
          "interfaces": [
                "I2C"
          ],
          "voltage": [
                "3.3V",
                "5V module variants"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Non-contact temperature",
                "Surface temperature logging",
                "Demo screening prototype"
          ],
          "notSuitableFor": [
                "Medical diagnosis",
                "Unknown emissivity accuracy",
                "Long-distance thermal imaging"
          ],
          "commonMistakes": [
                "Claiming medical accuracy",
                "Wrong distance-to-target",
                "Ignoring emissivity"
          ],
          "projectIdeas": [
                "Smart Clinic Hand Hygiene Station with Usage Analytics",
                "IoT-Based Electric Scooter Battery Temperature and Charge Monitor"
          ],
          "alternatives": [
                {
                      "slug": "ds18b20-temperature-sensor",
                      "name": "DS18B20",
                      "reason": "Contact temperature sensor for waterproof probes."
                }
          ],
          "relatedBlogSlugs": [
                "fyp-electronics-troubleshooting-checklist",
                "final-year-project-prototype-vs-product"
          ],
          "buyNotes": "Use it for educational surface-temperature prototypes, not certified medical measurement."
    },
    {
          "slug": "ds18b20-temperature-sensor",
          "name": "DS18B20 Waterproof Temperature Sensor",
          "shortName": "DS18B20",
          "category": "sensors",
          "categoryLabel": "Temperature Sensor",
          "tagline": "Waterproof digital temperature probe for tanks, aquaculture and outdoor builds.",
          "description": "DS18B20 waterproof probes measure temperature over a 1-Wire digital bus. They are commonly used in water tanks, aquaculture, incubators and outdoor monitoring projects.",
          "priceRange": "RM5-RM18",
          "difficulty": "Beginner",
          "interfaces": [
                "1-Wire"
          ],
          "voltage": [
                "3.0V-5.5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Water temperature",
                "Outdoor probe",
                "Aquaculture monitoring"
          ],
          "notSuitableFor": [
                "Humidity sensing",
                "Fast thermal response",
                "High-temperature ovens"
          ],
          "commonMistakes": [
                "No pull-up resistor",
                "Poor waterproof cable sealing",
                "Confusing probe variants"
          ],
          "projectIdeas": [
                "Water pH and Temperature Monitoring System",
                "Smart Water Quality Monitoring for Aquaculture with IoT"
          ],
          "alternatives": [
                {
                      "slug": "dht22",
                      "name": "DHT22",
                      "reason": "Use for air temperature and humidity together."
                }
          ],
          "relatedBlogSlugs": [
                "dht11-vs-dht22-vs-bme280-fyp-sensors",
                "iot-fish-pond-water-quality-fyp-malaysia"
          ],
          "buyNotes": "Use a 4.7k pull-up resistor and check probe waterproofing before immersion."
    },
    {
          "slug": "dht11",
          "name": "DHT11 Temperature Humidity Sensor",
          "shortName": "DHT11",
          "category": "sensors",
          "categoryLabel": "Temperature Humidity Sensor",
          "tagline": "Very low-cost temperature and humidity sensor for beginner demos.",
          "description": "DHT11 is a basic digital temperature and humidity sensor. It is cheap and common in beginner kits, but less accurate and slower than DHT22 or BME280.",
          "priceRange": "RM3-RM8",
          "difficulty": "Beginner",
          "interfaces": [
                "Digital"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Beginner weather demo",
                "Simple classroom monitoring",
                "Low-cost practice project"
          ],
          "notSuitableFor": [
                "Accurate environmental logging",
                "Fast readings",
                "Professional climate monitoring"
          ],
          "commonMistakes": [
                "Expecting DHT22 accuracy",
                "Reading too frequently",
                "No pull-up resistor on bare sensor"
          ],
          "projectIdeas": [
                "IoT Weather Monitoring Project ESP32 DHT11",
                "ESP32 DHT11 Firebase Temperature Monitoring FYP Guide"
          ],
          "alternatives": [
                {
                      "slug": "dht22",
                      "name": "DHT22",
                      "reason": "Better accuracy and wider measurement range."
                }
          ],
          "relatedBlogSlugs": [
                "dht11-vs-dht22-vs-bme280-fyp-sensors",
                "esp32-dht11-firebase-temperature-monitoring-fyp-guide"
          ],
          "buyNotes": "Use DHT22 or BME280 if the project needs stronger measurement quality."
    },
    {
          "slug": "reed-switch",
          "name": "Magnetic Reed Switch Sensor",
          "shortName": "Reed Switch",
          "category": "sensors",
          "categoryLabel": "Door Contact Sensor",
          "tagline": "Simple magnetic switch for door, window and cabinet status detection.",
          "description": "Reed switches detect whether a magnet is near the sensor. They are simple, low-cost modules for door-open, cabinet tamper and parcel box status projects.",
          "priceRange": "RM2-RM10",
          "difficulty": "Beginner",
          "interfaces": [
                "Digital"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi"
          ],
          "suitableFor": [
                "Door status",
                "Cabinet tamper",
                "Parcel box detection"
          ],
          "notSuitableFor": [
                "Distance measurement",
                "High-security certified access",
                "Heavy current switching"
          ],
          "commonMistakes": [
                "Wrong magnet alignment",
                "No pull-up or pull-down",
                "Mounting sensor too far from magnet"
          ],
          "projectIdeas": [
                "Smart Emergency Exit Door Open Status Monitoring System",
                "Smart Parcel Drop Box with Weight Check and Door Status Log"
          ],
          "alternatives": [
                {
                      "slug": "pir-sensor",
                      "name": "PIR Sensor",
                      "reason": "Use for motion detection instead of door contact."
                }
          ],
          "relatedBlogSlugs": [
                "low-cost-sensors-that-make-strong-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Buy normally-open/normally-closed variant that matches your logic."
    },
    {
          "slug": "sw420-vibration-sensor",
          "name": "SW-420 Vibration Sensor",
          "shortName": "SW-420",
          "category": "sensors",
          "categoryLabel": "Vibration Sensor",
          "tagline": "Low-cost vibration trigger module for impact and tamper demos.",
          "description": "SW-420 modules detect vibration or impact as a digital trigger. They are useful for simple tamper alerts, crash demos and machine vibration awareness prototypes.",
          "priceRange": "RM3-RM10",
          "difficulty": "Beginner",
          "interfaces": [
                "Digital"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32"
          ],
          "suitableFor": [
                "Tamper alert",
                "Impact trigger",
                "Simple vibration detection"
          ],
          "notSuitableFor": [
                "Accurate vibration analysis",
                "Bearing fault diagnosis",
                "Frequency measurement"
          ],
          "commonMistakes": [
                "Claiming precise vibration measurement",
                "No sensitivity tuning",
                "Mounting loosely"
          ],
          "projectIdeas": [
                "IoT-Based Low-Cost Seismic Vibration Logger for Building Demo",
                "ESP32-Based Vibration Logger for Small Motor Bearing Study"
          ],
          "alternatives": [
                {
                      "slug": "mpu6050",
                      "name": "MPU6050",
                      "reason": "Better for acceleration and motion data."
                }
          ],
          "relatedBlogSlugs": [
                "tinyml-vibration-monitoring-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Use SW-420 for event detection; use accelerometers for measured vibration data."
    },
    {
          "slug": "sound-sensor-module",
          "name": "Sound Sensor Module",
          "shortName": "Sound Sensor",
          "category": "sensors",
          "categoryLabel": "Sound Sensor",
          "tagline": "Basic microphone module for noise level and sound-trigger demos.",
          "description": "Sound sensor modules detect sound intensity using a microphone and amplifier. They are useful for classroom noise indicators and simple sound-triggered alerts.",
          "priceRange": "RM3-RM12",
          "difficulty": "Beginner",
          "interfaces": [
                "Analog",
                "Digital"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32"
          ],
          "suitableFor": [
                "Noise indicator",
                "Clap trigger",
                "Classroom comfort demo"
          ],
          "notSuitableFor": [
                "Calibrated decibel meter",
                "Voice recognition",
                "Audio recording quality"
          ],
          "commonMistakes": [
                "Claiming accurate dB without calibration",
                "Bad threshold tuning",
                "Mounting near buzzer or fan noise"
          ],
          "projectIdeas": [
                "IoT-Based Classroom Noise and Comfort Score Display",
                "IoT-Based Library Quiet Zone Noise Warning Display"
          ],
          "alternatives": [
                {
                      "slug": "max9814-microphone",
                      "name": "MAX9814 Microphone",
                      "reason": "Better microphone amplifier for audio-level projects."
                }
          ],
          "relatedBlogSlugs": [
                "low-cost-sensors-that-make-strong-fyp",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Use as a relative noise indicator unless calibrated against a sound meter."
    },
    {
          "slug": "max9814-microphone",
          "name": "MAX9814 Microphone Amplifier",
          "shortName": "MAX9814",
          "category": "sensors",
          "categoryLabel": "Microphone Module",
          "tagline": "Microphone amplifier with automatic gain control for audio sensing.",
          "description": "MAX9814 microphone amplifier modules provide an analog audio signal with automatic gain control. They are useful for sound-level prototypes and audio-triggered projects.",
          "priceRange": "RM8-RM25",
          "difficulty": "Intermediate",
          "interfaces": [
                "Analog"
          ],
          "voltage": [
                "2.7V-5.5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi Pico"
          ],
          "suitableFor": [
                "Audio amplitude sensing",
                "Sound event detection",
                "Noise trend logging"
          ],
          "notSuitableFor": [
                "Speech recognition alone",
                "Certified dB meter",
                "Noisy power rails"
          ],
          "commonMistakes": [
                "Sampling too slowly",
                "No signal filtering",
                "Expecting direct speech understanding"
          ],
          "projectIdeas": [
                "IoT-Based Workshop Noise Exposure Warning Display",
                "IoT-Based Classroom Noise and Comfort Score Display"
          ],
          "alternatives": [
                {
                      "slug": "sound-sensor-module",
                      "name": "Sound Sensor",
                      "reason": "Cheaper for simple digital sound triggers."
                }
          ],
          "relatedBlogSlugs": [
                "machine-learning-fyp-evaluation-metrics-guide",
                "fyp-electronics-troubleshooting-checklist"
          ],
          "buyNotes": "Pair with filtering and clear sampling explanation in the report."
    },
    {
          "slug": "ky-040-rotary-encoder",
          "name": "KY-040 Rotary Encoder Module",
          "shortName": "KY-040 Encoder",
          "category": "sensors",
          "categoryLabel": "Rotary Input",
          "tagline": "Rotary knob input module for menus, counters and adjustment controls.",
          "description": "KY-040 rotary encoders provide incremental rotation and a push button. They are useful for embedded menus, setting values and manual counter controls.",
          "priceRange": "RM3-RM10",
          "difficulty": "Beginner",
          "interfaces": [
                "Digital",
                "GPIO"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32",
                "Raspberry Pi Pico"
          ],
          "suitableFor": [
                "Menu control",
                "Setpoint adjustment",
                "Counter input"
          ],
          "notSuitableFor": [
                "Absolute angle measurement",
                "High-speed shaft feedback",
                "No-debounce software"
          ],
          "commonMistakes": [
                "No debounce handling",
                "Confusing CLK/DT direction",
                "Expecting absolute position"
          ],
          "projectIdeas": [
                "Smart Cafeteria Queue Number Display with Button Counter Control",
                "ESP32-Based Queue Token Display with WhatsApp Collection Alert"
          ],
          "alternatives": [
                {
                      "slug": "as5600-magnetic-encoder",
                      "name": "AS5600",
                      "reason": "Use for absolute magnetic angle measurement."
                }
          ],
          "relatedBlogSlugs": [
                "arduino-uno-vs-esp32-for-electronics-fyp",
                "student-project-dashboard-design-tips"
          ],
          "buyNotes": "Include debounce handling in code for reliable menu input."
    },
    {
          "slug": "capacitive-soil-moisture",
          "name": "Capacitive Soil Moisture Sensor",
          "shortName": "Capacitive Soil",
          "category": "sensors",
          "categoryLabel": "Soil Moisture Sensor",
          "tagline": "More durable soil moisture sensor for agriculture and irrigation prototypes.",
          "description": "Capacitive soil moisture sensors estimate soil moisture without exposed resistive metal traces. They are usually more suitable than cheap resistive probes for longer agriculture demos.",
          "priceRange": "RM5-RM18",
          "difficulty": "Beginner",
          "interfaces": [
                "Analog"
          ],
          "voltage": [
                "3.3V",
                "5V"
          ],
          "compatibleWith": [
                "Arduino",
                "ESP32"
          ],
          "suitableFor": [
                "Smart irrigation",
                "Greenhouse monitoring",
                "Plant moisture trend"
          ],
          "notSuitableFor": [
                "Laboratory-grade soil water content",
                "Direct long-term outdoor exposure without protection",
                "No calibration projects"
          ],
          "commonMistakes": [
                "No wet/dry calibration",
                "Water entering electronics",
                "Using raw values without threshold testing"
          ],
          "projectIdeas": [
                "Smart Agriculture IoT FYP with Soil Moisture and Pump Control",
                "IoT-Based Hydroponic Nutrient Level and pH Monitoring Prototype"
          ],
          "alternatives": [
                {
                      "slug": "soil-moisture-sensor",
                      "name": "Soil Moisture Sensor",
                      "reason": "Cheaper resistive probe for short demos."
                }
          ],
          "relatedBlogSlugs": [
                "smart-agriculture-iot-fyp-soil-moisture-guide",
                "projek-pertanian-pintar-iot-soil-moisture-pam"
          ],
          "buyNotes": "Calibrate dry and wet readings using your actual soil sample."
    },
  ]),
];
