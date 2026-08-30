import fs from "node:fs";
import path from "node:path";

const blogDir = path.join(process.cwd(), "content/blog");

const englishPosts = [
  {
    slug: "esp32-water-level-monitoring-fyp-malaysia",
    title: "ESP32 Water Level Monitoring FYP in Malaysia: Practical Build Guide",
    excerpt: "A practical ESP32 water level monitoring guide for Malaysian final year students, covering sensors, dashboard, alerts, testing and common demo mistakes.",
    problem: "Water tank overflow and low-level warning are easy for panels to understand because the problem is visible during the demo.",
    project: "The system reads tank level with an ultrasonic or water level sensor, displays the current status, logs the reading, and sends an alert when the level crosses a threshold.",
    components: ["ESP32 DevKit", "HC-SR04 ultrasonic sensor or non-contact water level sensor", "OLED or LCD display", "Buzzer and indicator LED", "Firebase, Blynk, ThingSpeak or a simple web dashboard"],
    testing: ["Show empty, half and full tank readings.", "Record the measured distance and calculated percentage.", "Trigger low-level and overflow alerts.", "Disconnect WiFi and show the local display still works.", "Repeat readings to show stability instead of only one lucky demo."],
    mistakes: ["Mounting the ultrasonic sensor too close to moving water.", "Using only one threshold without warning and danger states.", "Skipping calibration for tank height.", "Depending fully on WiFi during viva.", "Using weak power when the buzzer and display are active."],
    angle: "This topic ranks well because students search for ESP32 water level monitoring, smart tank FYP and IoT water level project in Malaysia.",
  },
  {
    slug: "iot-flood-alert-system-esp32-malaysia-fyp",
    title: "IoT Flood Alert System with ESP32 for Malaysia FYP Students",
    excerpt: "Build a realistic flood alert final year project using ESP32, water level sensing, local alarm, dashboard logging and Malaysia-focused testing.",
    problem: "Flood warning is a strong Malaysian use case because heavy rain and drainage overflow are familiar problems in many student project discussions.",
    project: "The prototype measures water level in a drain or model channel, categorises the risk level, sounds a local alarm, and sends a Telegram, dashboard or SMS-style alert.",
    components: ["ESP32 DevKit", "Water level sensor, float switch or ultrasonic sensor", "Buzzer", "OLED display", "Telegram bot, Firebase dashboard or GSM module for alert demonstration"],
    testing: ["Use a transparent container so the panel can see level changes.", "Define normal, warning and danger thresholds.", "Log time, level and alert status.", "Test repeated rising and falling levels.", "Explain that real field deployment needs waterproof casing and maintenance."],
    mistakes: ["Claiming it predicts floods when it only detects local water level.", "Leaving sensor wires exposed to water.", "No debounce or filtering for unstable readings.", "No local alarm when internet fails.", "No explanation of false alarms during splashing."],
    angle: "Use this post to capture searches like IoT flood alert system, ESP32 flood monitoring Malaysia and Projek Akhir Tahun banjir IoT.",
  },
  {
    slug: "smart-irrigation-iot-fyp-soil-moisture-malaysia",
    title: "Smart Irrigation IoT FYP: Soil Moisture, ESP32 and Pump Control",
    excerpt: "A student-friendly smart irrigation IoT guide with soil moisture sensing, ESP32 pump control, dashboard logs and practical Malaysia FYP testing.",
    problem: "Smart irrigation is popular because the demo is simple: dry soil starts watering and wet soil stops watering.",
    project: "The system reads soil moisture, decides whether watering is needed, switches a pump through a relay or MOSFET module, and records the result for reporting.",
    components: ["ESP32 DevKit", "Capacitive soil moisture sensor", "Relay module or MOSFET driver", "Small DC pump", "Water container", "Dashboard or mobile notification"],
    testing: ["Compare dry soil, moist soil and water-dipped sensor values.", "Set a safe threshold after calibration.", "Show automatic and manual pump modes.", "Record pump runtime.", "Test the system after restarting the ESP32."],
    mistakes: ["Using a resistive soil sensor for long-term wet soil testing.", "Driving the pump directly from ESP32 pins.", "No flyback or relay isolation considerations.", "No manual override.", "Using one plant condition as proof for all agriculture cases."],
    angle: "This targets smart irrigation FYP, IoT agriculture project Malaysia and ESP32 soil moisture project queries.",
  },
  {
    slug: "esp32-dht11-temperature-monitoring-fyp-guide",
    title: "ESP32 DHT11 Temperature Monitoring FYP: What to Build and What to Avoid",
    excerpt: "A clear ESP32 DHT11 monitoring guide for final year projects, with realistic accuracy notes, dashboard design, testing and better sensor alternatives.",
    problem: "Temperature and humidity monitoring is beginner friendly, but many projects become too simple unless the dashboard, alerts and testing are well planned.",
    project: "The system reads DHT11 temperature and humidity, shows the data locally, stores readings, and sends an alert when the room condition exceeds selected limits.",
    components: ["ESP32 DevKit", "DHT11 or DHT22 sensor", "OLED display", "Buzzer or LED", "Firebase, Blynk or web dashboard", "Optional BME280 upgrade"],
    testing: ["Compare readings with a reference thermometer if available.", "Test near fan airflow and normal room conditions.", "Show historical graphs.", "Trigger high-temperature and high-humidity alerts.", "Explain DHT11 limitations in the report."],
    mistakes: ["Claiming lab-grade accuracy from DHT11.", "Reading too frequently without respecting sensor timing.", "No explanation of sensor placement.", "Only showing serial monitor output.", "No alert or data logging feature."],
    angle: "This is built for searches around ESP32 DHT11 FYP, temperature monitoring project and IoT humidity monitoring Malaysia.",
  },
  {
    slug: "iot-air-quality-monitoring-fyp-classroom-malaysia",
    title: "IoT Air Quality Monitoring FYP for Classrooms in Malaysia",
    excerpt: "A practical classroom air quality FYP guide covering ESP32, MQ sensors, CO2 sensor choices, dashboard alerts and honest accuracy wording.",
    problem: "Classrooms and labs make the project relatable because students can explain comfort, ventilation and air quality trends.",
    project: "The system monitors temperature, humidity and air quality indicators, displays status, and logs trend data for a classroom or small lab.",
    components: ["ESP32 DevKit", "BME280 or DHT22", "SCD41 or SCD30 for CO2 claims", "MQ135 only for relative gas trend experiments", "OLED display", "Dashboard"],
    testing: ["Test normal room air and controlled changes such as ventilation.", "Separate CO2 measurement from general gas trend readings.", "Warm up MQ sensors before recording values.", "Log readings over time.", "Explain sensor limitations clearly."],
    mistakes: ["Calling MQ135 a precise CO2 sensor.", "No warm-up time for gas sensors.", "No calibration discussion.", "Ignoring airflow and sensor placement.", "Using ppm claims without reference measurement."],
    angle: "This supports searches like classroom air quality IoT FYP, ESP32 air quality project Malaysia and MQ135 final year project.",
  },
  {
    slug: "rfid-attendance-iot-fyp-esp32-malaysia",
    title: "RFID Attendance IoT FYP with ESP32: Malaysia Student Build Guide",
    excerpt: "A complete RFID attendance IoT FYP guide with ESP32, RC522, database logging, duplicate scan handling, reports and viva-ready testing.",
    problem: "Attendance projects are familiar to schools, colleges and labs, so the workflow is easy to explain during presentation.",
    project: "The system reads RFID cards, verifies the user, stores attendance in a database, and shows daily records on a dashboard.",
    components: ["ESP32 DevKit", "RC522 RFID reader", "RFID cards or tags", "OLED or LCD", "Firebase or web database", "Optional buzzer and LED feedback"],
    testing: ["Register a valid user card.", "Scan valid, invalid and repeated cards.", "Show timestamped records.", "Generate a simple attendance report.", "Test what happens when WiFi is disconnected."],
    mistakes: ["No duplicate scan protection.", "Storing all users in hard-coded code only.", "No unknown-card workflow.", "No clear privacy explanation.", "No report output for the panel to inspect."],
    angle: "This targets RFID attendance FYP, ESP32 attendance system Malaysia and IoT student attendance project searches.",
  },
  {
    slug: "gps-gsm-vehicle-tracking-fyp-malaysia",
    title: "GPS GSM Vehicle Tracking FYP in Malaysia: Scope, Components and Demo Plan",
    excerpt: "A realistic GPS and GSM vehicle tracking final year project guide for Malaysian students, with ESP32/Arduino options, maps, alerts and limitations.",
    problem: "Vehicle tracking is popular because location data, theft alerts and route logs are easy to demonstrate with a phone or model vehicle.",
    project: "The system reads GPS coordinates, sends location data through GSM or WiFi, and displays the result on a map or dashboard.",
    components: ["ESP32 or Arduino", "NEO-6M GPS module", "SIM800L or SIM7600 module", "Stable power supply", "Web map dashboard or Google Maps link", "Optional vibration sensor"],
    testing: ["Test GPS lock outdoors.", "Show latitude and longitude changes.", "Send a location alert.", "Log a short route.", "Explain indoor GPS limitations."],
    mistakes: ["Testing GPS only indoors.", "Powering SIM800L from a weak 5V pin.", "No antenna placement plan.", "No explanation of SIM credit or network dependency.", "No fallback when GPS has no fix."],
    angle: "This captures GPS GSM tracking FYP, vehicle tracking project Malaysia and ESP32 GPS tracker searches.",
  },
  {
    slug: "iot-energy-monitoring-fyp-esp32-pzem-malaysia",
    title: "IoT Energy Monitoring FYP with ESP32 and PZEM: Safe Student Scope",
    excerpt: "A safe and practical IoT energy monitoring FYP guide using ESP32, PZEM-style metering, dashboards, alerts and Malaysian student demo boundaries.",
    problem: "Energy monitoring is strong for electrical and IoT students because it creates useful graphs and clear before-after data.",
    project: "The system reads voltage, current, power and energy from a suitable sensor module, then displays usage trends and alerts for abnormal consumption.",
    components: ["ESP32 DevKit", "PZEM-004T or suitable isolated measurement module", "OLED display", "Dashboard", "Safe test load", "Proper enclosure for demonstration"],
    testing: ["Use safe low-risk demonstration loads.", "Compare idle and active load readings.", "Show live power and cumulative energy.", "Trigger high-usage alerts.", "State that mains wiring requires qualified supervision."],
    mistakes: ["Unsafe exposed AC wiring.", "No isolation discussion.", "Claiming utility-meter accuracy without validation.", "No graph or history.", "No explanation of sensor range and limits."],
    angle: "This supports IoT energy monitoring FYP, ESP32 PZEM project Malaysia and smart energy meter student project searches.",
  },
  {
    slug: "smart-parking-iot-fyp-esp32-ultrasonic",
    title: "Smart Parking IoT FYP with ESP32 and Ultrasonic Sensors",
    excerpt: "A practical smart parking final year project guide with ESP32, ultrasonic/IR sensors, slot status dashboard, testing and common mistakes.",
    problem: "Smart parking works well for FYP because the panel can instantly see whether each slot is empty or occupied.",
    project: "The system uses sensors to detect parking slot status, shows availability on LEDs or display, and optionally updates a web dashboard.",
    components: ["ESP32 DevKit", "HC-SR04 ultrasonic sensors or IR obstacle sensors", "LED indicators", "OLED/LCD display", "Dashboard", "Model parking base"],
    testing: ["Test each slot individually.", "Show empty, occupied and sensor-error states.", "Record distance threshold values.", "Check false detection with angled objects.", "Show dashboard sync delay."],
    mistakes: ["One sensor tested for many slots without explanation.", "Threshold not calibrated for model size.", "No occupied/empty history.", "No error state when sensor fails.", "Messy wiring that makes demo unreliable."],
    angle: "This targets smart parking FYP Malaysia, ESP32 parking project and IoT parking system searches.",
  },
  {
    slug: "iot-fish-pond-water-quality-fyp-malaysia",
    title: "IoT Fish Pond Water Quality FYP: pH, TDS, Turbidity and Temperature",
    excerpt: "A Malaysian aquaculture-style IoT FYP guide for monitoring fish pond water quality with ESP32, calibrated sensors, alerts and dashboard logs.",
    problem: "Fish pond monitoring is locally relevant because aquaculture, small farms and water quality are easy to connect to real user needs.",
    project: "The system monitors water temperature and selected quality indicators, then shows whether readings are within safe project-defined ranges.",
    components: ["ESP32 DevKit", "Waterproof DS18B20 temperature sensor", "pH sensor kit", "TDS sensor", "Turbidity sensor", "Dashboard and alert output"],
    testing: ["Calibrate pH using known buffer solutions where possible.", "Compare clean and cloudy water samples.", "Log readings over time.", "Show warning states.", "Explain that student sensors are for monitoring trends, not certified lab analysis."],
    mistakes: ["No calibration for pH or TDS.", "Submerging non-waterproof electronics.", "Claiming medical or laboratory accuracy.", "No cleaning plan for probes.", "No separation between trend monitoring and exact measurement."],
    angle: "This helps rank for IoT water quality FYP, fish pond monitoring project Malaysia and pH sensor ESP32 project searches.",
  },
  {
    slug: "lora-iot-farm-monitoring-fyp-malaysia",
    title: "LoRa IoT Farm Monitoring FYP for Malaysian Students",
    excerpt: "A practical LoRa IoT farm monitoring guide for FYP students using sensor nodes, gateway logging, packet testing and realistic rural limitations.",
    problem: "LoRa farm monitoring is stronger than a normal WiFi project when the story involves distance, low-power nodes or areas without stable internet.",
    project: "The system sends soil, temperature or water data from one or more sensor nodes to a gateway that stores and displays readings.",
    components: ["ESP32 or Arduino node", "LoRa SX1278/SX1276 module", "Soil moisture sensor", "BME280 or DHT22", "Gateway ESP32", "Dashboard or local display"],
    testing: ["Show node ID in each packet.", "Measure packet success rate at different distances.", "Test with one node first, then add a second node if scope allows.", "Log missed packets.", "Explain legal frequency and range limits practically."],
    mistakes: ["Using LoRa when WiFi would be enough without explaining why.", "No antenna consideration.", "No packet loss data.", "No gateway workflow.", "Trying to build too many nodes too early."],
    angle: "This targets LoRa IoT FYP, smart farm monitoring Malaysia and agriculture IoT project searches.",
  },
  {
    slug: "esp32-smart-home-automation-fyp-malaysia",
    title: "ESP32 Smart Home Automation FYP: Relay Control, Safety and Dashboard",
    excerpt: "A safe ESP32 smart home automation FYP guide covering relay control, dashboard design, manual override, isolation and Malaysia student demo scope.",
    problem: "Home automation remains a high-search FYP topic, but it must be built with clear safety boundaries and a useful control workflow.",
    project: "The system controls lights or low-voltage loads through relays, shows device status on a dashboard, and includes manual switches for fallback control.",
    components: ["ESP32 DevKit", "Relay module", "Low-voltage lamp or supervised AC demo load", "Manual switch", "Blynk/Firebase/web dashboard", "Fuse/enclosure for safer demo"],
    testing: ["Show app control and physical button control.", "Restart ESP32 and check default relay state.", "Test WiFi disconnection behavior.", "Log on/off actions.", "Use safe supervised loads."],
    mistakes: ["Exposed mains wiring.", "No manual override.", "Relay turns on unexpectedly after reset.", "No status feedback from device.", "Only building an app button without real hardware testing."],
    angle: "This supports ESP32 smart home FYP Malaysia, home automation IoT project and relay control ESP32 searches.",
  },
  {
    slug: "iot-health-monitoring-fyp-esp32-malaysia",
    title: "IoT Health Monitoring FYP with ESP32: Safe Scope for Students",
    excerpt: "A practical IoT health monitoring FYP guide using ESP32, MAX30102-style sensors, alerts and responsible wording for Malaysian student projects.",
    problem: "Health monitoring is engaging, but students must avoid medical claims unless the system is clinically validated.",
    project: "The prototype reads selected wellness indicators, displays readings, logs trends and sends alerts for project-defined thresholds.",
    components: ["ESP32 DevKit", "MAX30102 pulse oximeter module or pulse sensor", "DS18B20 or contact temperature sensor", "OLED display", "Dashboard", "Buzzer or notification output"],
    testing: ["Test sensor placement consistency.", "Compare readings with a reference device only as a rough check.", "Log trends instead of making diagnosis claims.", "Trigger threshold alerts.", "State limitations and non-medical use clearly."],
    mistakes: ["Claiming hospital-grade accuracy.", "No consent/privacy explanation.", "No filtering for noisy readings.", "No sensor placement guide.", "No clear statement that it is a student prototype."],
    angle: "This targets IoT health monitoring FYP, ESP32 patient monitoring Malaysia and final year project healthcare IoT searches.",
  },
  {
    slug: "smart-waste-bin-iot-fyp-malaysia",
    title: "Smart Waste Bin IoT FYP: Fill-Level Monitoring with ESP32",
    excerpt: "A Malaysia-focused smart waste bin FYP guide with ESP32, ultrasonic fill-level sensing, dashboard routes, alerts and useful testing ideas.",
    problem: "Smart waste bin projects are easy to understand because the system turns a simple bin into a measurable service workflow.",
    project: "The system measures bin fill level, displays status, sends collection alerts and optionally ranks bins by urgency on a dashboard.",
    components: ["ESP32 DevKit", "Ultrasonic sensor", "OLED or LED status", "Buzzer", "Dashboard", "Optional GPS module for outdoor bin mapping"],
    testing: ["Measure empty, half and full bin levels.", "Use different material shapes to check false readings.", "Trigger collection-needed status.", "Log fill level over time.", "Explain waterproofing and maintenance for real deployment."],
    mistakes: ["Sensor blocked by uneven trash shape.", "No alert priority logic.", "No bin ID for multi-bin systems.", "No cleaning or casing discussion.", "No dashboard beyond one number."],
    angle: "This captures smart waste bin FYP, IoT garbage monitoring Malaysia and ESP32 ultrasonic bin project searches.",
  },
  {
    slug: "iot-final-year-project-report-guide-malaysia",
    title: "IoT Final Year Project Report Guide for Malaysian Students",
    excerpt: "A practical IoT FYP report guide showing what to write for problem statement, methodology, components, testing, limitations and results.",
    problem: "Many students can build the circuit but lose marks because the report does not explain the design decisions and testing evidence clearly.",
    project: "This guide shows how to describe an IoT project so the reader understands the sensor flow, controller logic, dashboard, testing and limitations.",
    components: ["Problem statement", "System block diagram", "Component list", "Methodology", "Testing table", "Result screenshots", "Limitations and future work"],
    testing: ["Document normal, warning and failure states.", "Include dashboard screenshots.", "Show sensor calibration or threshold setting.", "Explain data flow from sensor to dashboard.", "Add photos of the actual prototype."],
    mistakes: ["Writing only generic IoT definitions.", "No evidence table.", "No limitation section.", "No explanation of why each component was chosen.", "No link between objectives and final demo outcome."],
    angle: "This supports IoT FYP report, final year project methodology Malaysia and Projek Akhir Tahun IoT documentation searches.",
  },
];

const malayPosts = [
  {
    slug: "projek-iot-paras-air-esp32-pat-malaysia",
    title: "Projek IoT Paras Air ESP32 untuk Projek Akhir Tahun Malaysia",
    excerpt: "Panduan projek IoT paras air menggunakan ESP32 untuk pelajar Malaysia, lengkap dengan komponen, dashboard, ujian dan kesilapan biasa.",
    problem: "Paras air ialah tajuk PAT yang mudah difahami kerana demo boleh dilihat secara terus melalui bekas air atau model tangki.",
    project: "Sistem membaca paras air, menukar bacaan kepada status rendah, normal atau penuh, memaparkan status dan menghantar notifikasi apabila melepasi had.",
    components: ["ESP32 DevKit", "Sensor ultrasonic HC-SR04 atau sensor paras air", "OLED atau LCD", "Buzzer dan LED", "Firebase, Blynk, ThingSpeak atau dashboard web ringkas"],
    testing: ["Tunjuk bacaan kosong, separuh dan penuh.", "Catat jarak atau peratus paras air.", "Uji amaran paras rendah dan limpahan.", "Tunjuk paparan tempatan jika WiFi bermasalah.", "Ulang bacaan beberapa kali supaya laporan nampak kukuh."],
    mistakes: ["Sensor terlalu dekat dengan permukaan air bergelora.", "Tiada kalibrasi tinggi tangki.", "Hanya ada satu status amaran.", "Bergantung sepenuhnya pada internet.", "Power tidak stabil apabila buzzer dan display digunakan."],
    angle: "Artikel ini kuat untuk carian projek IoT paras air, Projek Akhir Tahun ESP32 dan smart water tank Malaysia.",
  },
  {
    slug: "projek-iot-amaran-banjir-esp32-pelajar-malaysia",
    title: "Projek IoT Amaran Banjir ESP32 untuk Pelajar Malaysia",
    excerpt: "Panduan Projek Akhir Tahun amaran banjir IoT menggunakan ESP32, sensor paras air, buzzer, notifikasi dan dashboard.",
    problem: "Banjir ialah masalah tempatan yang mudah dikaitkan dengan Malaysia, jadi tajuk ini sesuai untuk pelajar politeknik, kolej dan universiti.",
    project: "Sistem mengesan kenaikan paras air, menentukan tahap risiko, membunyikan buzzer dan menghantar amaran melalui dashboard, Telegram atau GSM.",
    components: ["ESP32 DevKit", "Sensor paras air, float switch atau ultrasonic", "Buzzer", "OLED", "Modul GSM atau notifikasi internet", "Bekas demo lutsinar"],
    testing: ["Sediakan tahap normal, amaran dan bahaya.", "Naikkan paras air secara berperingkat.", "Catat masa dan status amaran.", "Uji bacaan turun semula selepas air rendah.", "Terangkan batasan sensor dalam persekitaran sebenar."],
    mistakes: ["Dakwa sistem meramal banjir sedangkan ia mengesan paras air setempat.", "Wayar sensor tidak dilindungi.", "Tiada penapis bacaan tidak stabil.", "Tiada alarm tempatan jika internet gagal.", "Tiada penerangan false alarm."],
    angle: "Sesuai untuk carian projek amaran banjir IoT, Projek Akhir Tahun banjir ESP32 dan projek IoT Malaysia.",
  },
  {
    slug: "projek-pengairan-pintar-iot-kelembapan-tanah-pat",
    title: "Projek Pengairan Pintar IoT: Kelembapan Tanah, ESP32 dan Pam",
    excerpt: "Panduan projek pengairan pintar IoT untuk PAT: sensor kelembapan tanah, ESP32, relay, pam, dashboard dan ujian demo.",
    problem: "Pengairan pintar mudah menarik perhatian kerana panel boleh lihat tanah kering menyebabkan pam hidup dan tanah lembap menyebabkan pam berhenti.",
    project: "Sistem membaca kelembapan tanah, membuat keputusan berdasarkan threshold, mengawal pam melalui relay atau MOSFET dan menyimpan log bacaan.",
    components: ["ESP32 DevKit", "Capacitive soil moisture sensor", "Relay atau MOSFET module", "Pam DC kecil", "Bekas air", "Dashboard atau notifikasi"],
    testing: ["Bandingkan bacaan tanah kering, lembap dan sensor dicelup air.", "Tetapkan threshold selepas kalibrasi.", "Tunjuk mod automatik dan manual.", "Catat runtime pam.", "Uji sistem selepas ESP32 restart."],
    mistakes: ["Guna sensor resistive terlalu lama dalam tanah basah.", "Sambung pam terus ke pin ESP32.", "Tiada manual override.", "Tiada jadual bacaan untuk laporan.", "Dakwa sesuai untuk semua tanaman tanpa ujian."],
    angle: "Artikel ini bantu carian projek pengairan pintar, projek pertanian IoT dan smart irrigation PAT Malaysia.",
  },
  {
    slug: "projek-esp32-dht11-monitor-suhu-kelembapan-pat",
    title: "Projek ESP32 DHT11 Monitor Suhu dan Kelembapan untuk PAT",
    excerpt: "Panduan projek ESP32 DHT11 untuk monitor suhu dan kelembapan, termasuk dashboard, amaran, batasan sensor dan cara uji.",
    problem: "DHT11 sesuai untuk mula belajar IoT, tetapi projek perlu ada dashboard, alert dan ujian supaya tidak nampak terlalu asas.",
    project: "Sistem membaca suhu dan kelembapan, memaparkan data, menyimpan log dan menghantar amaran jika bacaan melebihi had yang ditetapkan.",
    components: ["ESP32 DevKit", "DHT11 atau DHT22", "OLED display", "Buzzer atau LED", "Firebase, Blynk atau dashboard web", "Pilihan naik taraf BME280"],
    testing: ["Bandingkan dengan termometer rujukan jika ada.", "Uji dalam bilik biasa dan dekat kipas.", "Tunjuk graf sejarah bacaan.", "Aktifkan amaran suhu tinggi.", "Terangkan had ketepatan DHT11."],
    mistakes: ["Dakwa DHT11 sangat tepat tanpa rujukan.", "Baca sensor terlalu kerap.", "Tiada penerangan lokasi sensor.", "Hanya tunjuk Serial Monitor.", "Tiada log data atau notifikasi."],
    angle: "Sesuai untuk carian projek ESP32 DHT11, projek monitor suhu kelembapan dan PAT IoT sensor.",
  },
  {
    slug: "projek-iot-kualiti-udara-bilik-darjah-pat",
    title: "Projek IoT Kualiti Udara Bilik Darjah untuk Projek Akhir Tahun",
    excerpt: "Panduan projek IoT kualiti udara bilik darjah dengan ESP32, sensor gas, CO2 yang sesuai, dashboard dan amaran.",
    problem: "Bilik darjah ialah konteks yang dekat dengan pelajar, jadi projek ini mudah dijelaskan dari segi keselesaan, ventilasi dan keselamatan asas.",
    project: "Sistem memantau suhu, kelembapan dan indikator kualiti udara, kemudian menunjukkan status normal, perhatian atau bahaya pada dashboard.",
    components: ["ESP32 DevKit", "BME280 atau DHT22", "SCD41/SCD30 jika mahu ukur CO2", "MQ135 untuk trend gas relatif sahaja", "OLED", "Dashboard"],
    testing: ["Uji bacaan bilik biasa dan selepas ventilasi.", "Bezakan bacaan CO2 sebenar dengan trend gas umum.", "Panaskan sensor MQ sebelum rekod data.", "Log bacaan mengikut masa.", "Nyatakan batasan sensor dengan jelas."],
    mistakes: ["Menganggap MQ135 sebagai sensor CO2 tepat.", "Tiada warm-up untuk sensor gas.", "Tiada kalibrasi.", "Abaikan aliran udara.", "Guna unit ppm tanpa rujukan yang sah."],
    angle: "Artikel ini menyasarkan projek kualiti udara IoT, Projek Akhir Tahun MQ135 dan ESP32 air quality Malaysia.",
  },
  {
    slug: "projek-kehadiran-rfid-iot-esp32-pat-malaysia",
    title: "Projek Kehadiran RFID IoT ESP32 untuk PAT Malaysia",
    excerpt: "Panduan projek kehadiran RFID menggunakan ESP32, RC522, database, laporan kehadiran dan ujian kad valid/invalid.",
    problem: "Sistem kehadiran kuat untuk PAT kerana workflow pengguna jelas: daftar kad, scan, rekod dan semak laporan.",
    project: "Sistem membaca kad RFID, menyemak pengguna, menyimpan rekod kehadiran dan memaparkan laporan harian pada dashboard.",
    components: ["ESP32 DevKit", "RC522 RFID reader", "Kad RFID", "OLED atau LCD", "Firebase atau database web", "Buzzer dan LED"],
    testing: ["Daftar kad pengguna.", "Scan kad sah, kad tidak sah dan scan berulang.", "Tunjuk rekod timestamp.", "Tunjuk laporan harian.", "Uji keadaan WiFi terputus."],
    mistakes: ["Tiada kawalan duplicate scan.", "Semua data hanya hard-code dalam sketch.", "Tiada flow kad tidak dikenali.", "Tiada penerangan privasi data.", "Tiada laporan yang boleh diperiksa panel."],
    angle: "Sesuai untuk carian projek kehadiran RFID, PAT ESP32 RC522 dan sistem kehadiran IoT Malaysia.",
  },
  {
    slug: "projek-gps-gsm-tracking-kenderaan-pat-malaysia",
    title: "Projek GPS GSM Tracking Kenderaan untuk Projek Akhir Tahun",
    excerpt: "Panduan projek tracking kenderaan GPS dan GSM untuk pelajar Malaysia, lengkap dengan komponen, peta, alert dan batasan demo.",
    problem: "Tracking kenderaan popular kerana pelajar boleh tunjuk lokasi, alert dan rekod perjalanan dengan demo yang mudah difahami.",
    project: "Sistem membaca koordinat GPS, menghantar lokasi melalui GSM atau WiFi dan memaparkan lokasi pada peta atau dashboard.",
    components: ["ESP32 atau Arduino", "NEO-6M GPS", "SIM800L atau SIM7600", "Power supply stabil", "Dashboard peta atau pautan Google Maps", "Sensor getaran pilihan"],
    testing: ["Uji GPS lock di kawasan terbuka.", "Tunjuk perubahan latitude dan longitude.", "Hantar alert lokasi.", "Log laluan pendek.", "Terangkan kelemahan GPS di dalam bangunan."],
    mistakes: ["Uji GPS hanya dalam bilik.", "Bekalkan SIM800L dengan power lemah.", "Tiada kedudukan antena yang baik.", "Tiada penerangan kredit SIM atau liputan rangkaian.", "Tiada fallback jika GPS tiada fix."],
    angle: "Artikel ini bantu carian projek GPS GSM, tracking kenderaan PAT dan ESP32 GPS tracker Malaysia.",
  },
  {
    slug: "projek-iot-monitor-tenaga-esp32-pzem-pat",
    title: "Projek IoT Monitor Tenaga ESP32 PZEM untuk PAT",
    excerpt: "Panduan projek monitor tenaga IoT dengan ESP32 dan PZEM secara selamat, termasuk dashboard, graf, amaran dan batasan wiring.",
    problem: "Monitor tenaga sesuai untuk pelajar elektrik dan IoT kerana keputusan boleh ditunjukkan melalui voltan, arus, kuasa dan graf penggunaan.",
    project: "Sistem membaca penggunaan elektrik melalui modul pengukuran sesuai, memaparkan bacaan dan menyimpan sejarah untuk analisis.",
    components: ["ESP32 DevKit", "PZEM-004T atau modul pengukuran berpenebat sesuai", "OLED", "Dashboard", "Beban demo selamat", "Kotak/enclosure"],
    testing: ["Gunakan beban demo yang selamat.", "Bandingkan bacaan idle dan aktif.", "Tunjuk kuasa semasa dan tenaga terkumpul.", "Aktifkan amaran penggunaan tinggi.", "Nyatakan wiring AC perlu pengawasan orang berkelayakan."],
    mistakes: ["Wayar AC terdedah.", "Tiada penerangan isolation.", "Dakwa setepat meter utiliti tanpa validasi.", "Tiada graf sejarah.", "Tiada had sensor dalam laporan."],
    angle: "Sesuai untuk carian projek monitor tenaga IoT, ESP32 PZEM PAT dan smart energy meter Malaysia.",
  },
  {
    slug: "projek-parking-pintar-iot-esp32-ultrasonik-pat",
    title: "Projek Parking Pintar IoT ESP32 Ultrasonik untuk PAT",
    excerpt: "Panduan projek parking pintar IoT menggunakan ESP32, sensor ultrasonic/IR, LED slot, dashboard dan ujian status parking.",
    problem: "Parking pintar mudah dibentang kerana panel boleh lihat slot kosong dan penuh berubah secara langsung.",
    project: "Sistem mengesan status slot parking menggunakan sensor, menunjukkan ketersediaan pada LED atau display dan menghantar status ke dashboard.",
    components: ["ESP32 DevKit", "Sensor ultrasonic HC-SR04 atau IR obstacle", "LED indikator", "OLED/LCD", "Dashboard", "Model parking"],
    testing: ["Uji setiap slot satu persatu.", "Tunjuk status kosong, penuh dan sensor error.", "Catat nilai threshold jarak.", "Uji objek senget atau kecil.", "Tunjuk delay sync dashboard."],
    mistakes: ["Satu sensor dianggap mewakili semua slot tanpa sebab.", "Threshold tidak ikut saiz model.", "Tiada log occupied/empty.", "Tiada error state.", "Wiring terlalu tidak kemas untuk demo stabil."],
    angle: "Artikel ini menyasarkan projek parking pintar, IoT parking ESP32 dan smart parking PAT Malaysia.",
  },
  {
    slug: "projek-iot-kualiti-air-kolam-ikan-pat",
    title: "Projek IoT Kualiti Air Kolam Ikan untuk Projek Akhir Tahun",
    excerpt: "Panduan projek IoT kualiti air kolam ikan menggunakan ESP32, pH, TDS, turbidity, suhu, dashboard dan amaran.",
    problem: "Kolam ikan dan akuakultur ialah konteks Malaysia yang baik kerana bacaan air boleh dikaitkan dengan kesihatan ikan dan penyelenggaraan kolam.",
    project: "Sistem memantau suhu air dan beberapa indikator kualiti air, kemudian memaparkan status serta amaran apabila bacaan keluar dari julat projek.",
    components: ["ESP32 DevKit", "DS18B20 waterproof", "pH sensor kit", "TDS sensor", "Turbidity sensor", "Dashboard"],
    testing: ["Kalibrasi pH jika ada buffer solution.", "Bandingkan air bersih dan air keruh.", "Log bacaan mengikut masa.", "Tunjuk status amaran.", "Nyatakan sensor pelajar sesuai untuk trend, bukan analisis makmal rasmi."],
    mistakes: ["Tiada kalibrasi pH/TDS.", "Rendam elektronik yang tidak waterproof.", "Dakwa ketepatan makmal.", "Tiada rancangan bersihkan probe.", "Tidak bezakan pemantauan trend dan ukuran tepat."],
    angle: "Sesuai untuk projek kualiti air IoT, kolam ikan pintar PAT dan sensor pH ESP32 Malaysia.",
  },
  {
    slug: "projek-lora-iot-pertanian-pintar-pat-malaysia",
    title: "Projek LoRa IoT Pertanian Pintar untuk PAT Malaysia",
    excerpt: "Panduan projek LoRa IoT untuk pertanian pintar: node sensor, gateway, jarak komunikasi, packet loss dan dashboard.",
    problem: "LoRa sesuai jika projek menceritakan kawasan ladang, jarak jauh atau tempat yang tidak stabil WiFi.",
    project: "Sistem menghantar data soil moisture, suhu atau cuaca daripada node sensor kepada gateway yang menyimpan dan memaparkan bacaan.",
    components: ["ESP32 atau Arduino node", "LoRa SX1278/SX1276", "Soil moisture sensor", "BME280 atau DHT22", "Gateway ESP32", "Dashboard atau display"],
    testing: ["Letakkan node ID dalam packet.", "Ukur packet success rate pada jarak berbeza.", "Mulakan dengan satu node sebelum tambah node kedua.", "Log packet hilang.", "Terangkan had frekuensi dan jarak secara praktikal."],
    mistakes: ["Guna LoRa tanpa sebab berbanding WiFi.", "Tiada antena yang sesuai.", "Tiada data packet loss.", "Tiada aliran kerja gateway.", "Cuba bina terlalu banyak node terlalu awal."],
    angle: "Artikel ini kuat untuk carian LoRa IoT PAT, pertanian pintar Malaysia dan smart farm monitoring project.",
  },
  {
    slug: "projek-automasi-rumah-esp32-iot-pat",
    title: "Projek Automasi Rumah ESP32 IoT untuk Projek Akhir Tahun",
    excerpt: "Panduan projek automasi rumah ESP32 dengan relay, dashboard, manual override, keselamatan dan ujian demo.",
    problem: "Automasi rumah masih popular kerana ia mudah difahami, tetapi pelajar perlu tunjuk keselamatan dan workflow yang jelas.",
    project: "Sistem mengawal lampu atau beban voltan rendah melalui relay, menunjukkan status pada dashboard dan menyediakan manual switch sebagai backup.",
    components: ["ESP32 DevKit", "Relay module", "Lampu voltan rendah atau demo AC dengan pengawasan", "Manual switch", "Blynk/Firebase/dashboard web", "Enclosure"],
    testing: ["Tunjuk kawalan app dan butang fizikal.", "Restart ESP32 dan semak default relay state.", "Uji WiFi terputus.", "Log tindakan on/off.", "Gunakan beban demo yang selamat."],
    mistakes: ["Wiring mains terdedah.", "Tiada manual override.", "Relay hidup sendiri selepas reset.", "Tiada feedback status.", "Hanya bina butang app tanpa hardware sebenar."],
    angle: "Sesuai untuk carian projek automasi rumah ESP32, home automation PAT dan projek IoT relay Malaysia.",
  },
  {
    slug: "projek-iot-pemantauan-kesihatan-esp32-pat",
    title: "Projek IoT Pemantauan Kesihatan ESP32 untuk PAT",
    excerpt: "Panduan projek pemantauan kesihatan IoT dengan ESP32, sensor denyutan, suhu, dashboard dan wording yang bertanggungjawab.",
    problem: "Projek kesihatan menarik, tetapi pelajar perlu elak dakwaan perubatan jika tiada validasi klinikal.",
    project: "Prototaip membaca indikator asas, memaparkan data, menyimpan trend dan memberi amaran berdasarkan threshold projek.",
    components: ["ESP32 DevKit", "MAX30102 atau pulse sensor", "DS18B20 atau sensor suhu sentuhan", "OLED", "Dashboard", "Buzzer/notifikasi"],
    testing: ["Pastikan kedudukan sensor konsisten.", "Bandingkan dengan alat rujukan hanya sebagai semakan kasar.", "Log trend, bukan diagnosis.", "Aktifkan alert threshold.", "Nyatakan ini prototaip pelajar bukan alat perubatan."],
    mistakes: ["Dakwa hospital-grade accuracy.", "Tiada penerangan privasi/consent.", "Tiada filtering bacaan noisy.", "Tiada panduan kedudukan sensor.", "Tiada batasan projek."],
    angle: "Artikel ini bantu carian projek kesihatan IoT, patient monitoring ESP32 dan Projek Akhir Tahun healthcare IoT.",
  },
  {
    slug: "projek-tong-sampah-pintar-iot-pat-malaysia",
    title: "Projek Tong Sampah Pintar IoT untuk PAT Malaysia",
    excerpt: "Panduan projek tong sampah pintar IoT dengan ESP32, sensor ultrasonic, status penuh, dashboard dan alert kutipan.",
    problem: "Tong sampah pintar sesuai untuk PAT kerana ia menukar objek harian kepada sistem pemantauan yang ada data dan tindakan.",
    project: "Sistem mengukur tahap penuh tong, menunjukkan status dan menghantar alert apabila kutipan diperlukan.",
    components: ["ESP32 DevKit", "Ultrasonic sensor", "OLED atau LED status", "Buzzer", "Dashboard", "GPS pilihan untuk multi-bin"],
    testing: ["Ukur tahap kosong, separuh dan penuh.", "Uji bahan pelbagai bentuk.", "Aktifkan status perlu kutipan.", "Log paras tong mengikut masa.", "Terangkan waterproofing dan maintenance."],
    mistakes: ["Sensor blocked oleh bentuk sampah tidak rata.", "Tiada logik priority alert.", "Tiada ID tong untuk multi-bin.", "Tiada rancangan casing.", "Dashboard hanya tunjuk satu nombor tanpa tindakan."],
    angle: "Sesuai untuk carian projek tong sampah pintar, smart waste bin IoT dan PAT ESP32 Malaysia.",
  },
  {
    slug: "panduan-laporan-projek-iot-projek-akhir-tahun",
    title: "Panduan Laporan Projek IoT untuk Projek Akhir Tahun Malaysia",
    excerpt: "Panduan menulis laporan projek IoT PAT: objektif, metodologi, komponen, dashboard, ujian, keputusan dan batasan projek.",
    problem: "Ramai pelajar boleh siapkan hardware tetapi markah laporan jatuh kerana tidak jelas kaedah, keputusan dan bukti ujian.",
    project: "Artikel ini menerangkan cara susun laporan projek IoT supaya pembaca faham aliran sensor, controller, dashboard, alert dan keputusan ujian.",
    components: ["Pernyataan masalah", "Objektif", "Block diagram", "Senarai komponen", "Metodologi", "Jadual ujian", "Screenshot dashboard", "Batasan dan cadangan"],
    testing: ["Dokumenkan keadaan normal, amaran dan ralat.", "Masukkan screenshot dashboard.", "Tunjuk threshold atau kalibrasi sensor.", "Terangkan data flow sensor ke dashboard.", "Letak gambar prototaip sebenar."],
    mistakes: ["Tulis definisi IoT terlalu umum.", "Tiada jadual bukti ujian.", "Tiada batasan projek.", "Tiada sebab pemilihan komponen.", "Objektif tidak berkait dengan demo akhir."],
    angle: "Artikel ini menyasarkan laporan projek IoT, metodologi Projek Akhir Tahun dan panduan PAT Malaysia.",
  },
];

function list(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function englishBody(post) {
  return `---
title: "${post.title}"
excerpt: "${post.excerpt}"
category: "IoT"
date: "2026-08-31"
---

## Quick Summary

${post.project} For a Malaysia final year project, the strongest version is not only a working circuit. It should also show a clear problem, a clean data flow, useful alerts, repeatable testing and honest limitations.

${post.angle} The goal is to help students choose a topic that can be built, explained and defended during viva without overclaiming.

## Why This Topic Works for Malaysia FYP

${post.problem} It also gives the student enough engineering content: sensor selection, ESP32 wiring, power planning, threshold logic, dashboard design and result validation.

A good proposal can use this structure:

- Problem: what user or environment issue is being monitored.
- Input: what the sensor reads and how often it updates.
- Processing: how the ESP32 filters data and decides the status.
- Output: buzzer, relay, display, dashboard, Telegram or WhatsApp-style alert.
- Evidence: screenshots, log tables and repeated test cases.

## Recommended System Flow

Use this flow for the report and presentation:

1. Sensor reads the physical condition.
2. ESP32 checks the reading against calibrated thresholds.
3. Local display shows the latest value and status.
4. Dashboard stores readings with timestamp.
5. Alert is sent only when the status is warning or danger.
6. The system returns to normal when the reading is stable again.

This makes the project easier to explain than a simple sensor demo because every block has a purpose.

## Core Components

${list(post.components)}

Check component details in the [Rectronx Components Database](/components). If your project uses ESP32, plan safe pins using the [ESP32 Pinout Tool](/tools/esp32-pinout) before wiring sensors, relays and displays.

## Suggested Features

- Live sensor reading with clear unit or status.
- Normal, warning and danger states.
- Dashboard table with timestamp.
- Simple graph for trend analysis.
- Local output such as buzzer, LED or display.
- Manual reset or override where suitable.
- Short error message when sensor data is missing.

For more title ideas, browse the [500+ project catalog](/catalog). For implementation help, use the [contact page](/contact) and explain your required deadline, board and preferred dashboard.

## Testing Plan

${list(post.testing)}

Testing is where many FYP projects become stronger. Instead of saying “the system works,” show a small table with test condition, expected result, actual result and screenshot evidence.

## Common Mistakes

${list(post.mistakes)}

Avoid fixed cost promises in your report. Component prices in Malaysia change by supplier, stock, shipping and module quality, so it is safer to describe the bill of materials and explain what is optional.

## What to Show During Viva

Prepare a short demo path:

- Show the wiring and explain the main sensor.
- Open the dashboard before triggering the test.
- Trigger normal, warning and danger conditions.
- Show the timestamped log.
- Explain one limitation honestly.
- Mention one future upgrade such as casing, battery backup, LoRa, better calibration or mobile app.

This gives the panel a complete story: problem, prototype, data, result and improvement.

## Related Rectronx Pages

- [Malaysia FYP project catalog](/catalog)
- [Electronics components database](/components)
- [ESP32 Pinout Tool](/tools/esp32-pinout)
- [Contact Rectronx for project help](/contact)

## FAQ

### Is this IoT project suitable for beginners?

Yes, if the first version uses one sensor, one ESP32 and one dashboard. Add extra sensors only after the basic flow is stable.

### Do I need a mobile app for this FYP?

Not always. A web dashboard, Firebase page, Blynk screen or Telegram alert can be enough if the data flow and testing are clear.

### Can I claim high accuracy?

Only if you calibrate and compare against a suitable reference. For most student prototypes, it is better to say the system monitors trends and alerts based on project-defined thresholds.
`;
}

function malayBody(post) {
  return `---
title: "${post.title}"
excerpt: "${post.excerpt}"
category: "IoT"
date: "2026-08-31"
---

## Ringkasan Cepat

${post.project} Untuk Projek Akhir Tahun di Malaysia, versi yang kuat bukan sekadar litar boleh hidup. Projek perlu ada masalah jelas, aliran data, dashboard, notifikasi, ujian berulang dan batasan yang jujur.

${post.angle} Fokus utama ialah membantu pelajar memilih tajuk yang boleh dibina, diterangkan dan dipertahankan semasa viva.

## Kenapa Tajuk Ini Sesuai untuk PAT Malaysia

${post.problem} Tajuk ini juga ada kandungan teknikal yang cukup: pilihan sensor, wiring ESP32, bekalan kuasa, logik threshold, dashboard dan bukti ujian.

Struktur proposal yang kemas:

- Masalah: isu pengguna atau persekitaran yang mahu dipantau.
- Input: sensor apa yang membaca data.
- Proses: bagaimana ESP32 tapis bacaan dan tentukan status.
- Output: buzzer, relay, display, dashboard atau notifikasi.
- Bukti: screenshot, jadual log dan keputusan ujian.

## Aliran Sistem Dicadangkan

Gunakan aliran ini untuk laporan dan pembentangan:

1. Sensor membaca keadaan fizikal.
2. ESP32 semak bacaan dengan threshold yang dikalibrasi.
3. Display tempatan tunjuk bacaan dan status.
4. Dashboard simpan bacaan bersama masa.
5. Notifikasi dihantar apabila status amaran atau bahaya.
6. Sistem kembali normal apabila bacaan stabil.

Aliran ini lebih kuat daripada demo sensor biasa kerana setiap bahagian ada fungsi yang jelas.

## Komponen Utama

${list(post.components)}

Rujuk maklumat komponen di [Rectronx Components Database](/components). Jika projek guna ESP32, semak pin yang sesuai melalui [ESP32 Pinout Tool](/tools/esp32-pinout) sebelum sambung sensor, relay dan display.

## Ciri yang Sesuai Ditambah

- Bacaan sensor secara live.
- Status normal, amaran dan bahaya.
- Jadual dashboard dengan timestamp.
- Graf ringkas untuk trend.
- Output tempatan seperti buzzer, LED atau display.
- Manual reset atau override jika sesuai.
- Mesej ralat jika sensor tidak memberi bacaan stabil.

Untuk lebih banyak idea, buka [500+ katalog projek](/catalog). Jika perlukan bantuan bina projek, hubungi melalui [contact page](/contact) dan nyatakan deadline, board serta jenis dashboard yang diperlukan.

## Pelan Ujian

${list(post.testing)}

Bahagian ujian sangat penting. Jangan hanya tulis “sistem berjaya.” Sediakan jadual kecil dengan keadaan ujian, keputusan dijangka, keputusan sebenar dan bukti screenshot.

## Kesilapan Biasa

${list(post.mistakes)}

Elakkan janji kos tetap dalam laporan. Harga komponen di Malaysia berubah mengikut supplier, stok, shipping dan kualiti module. Lebih selamat tulis senarai komponen dan nyatakan bahagian optional.

## Apa Perlu Tunjuk Semasa Viva

Sediakan laluan demo pendek:

- Tunjuk wiring dan sensor utama.
- Buka dashboard sebelum ujian.
- Uji keadaan normal, amaran dan bahaya.
- Tunjuk log bertimestamp.
- Terangkan satu batasan projek dengan jujur.
- Cadangkan naik taraf seperti casing, bateri backup, LoRa, kalibrasi lebih baik atau mobile app.

Ini memberi panel cerita lengkap: masalah, prototaip, data, keputusan dan penambahbaikan.

## Pautan Berkaitan

- [Katalog projek Malaysia](/catalog)
- [Database komponen elektronik](/components)
- [ESP32 Pinout Tool](/tools/esp32-pinout)
- [Hubungi Rectronx untuk bantuan projek](/contact)

## FAQ

### Adakah projek IoT ini sesuai untuk beginner?

Ya, jika versi pertama guna satu sensor, satu ESP32 dan satu dashboard. Tambah sensor lain selepas aliran asas stabil.

### Perlu bina mobile app untuk PAT ini?

Tidak semestinya. Dashboard web, Firebase, Blynk atau Telegram alert sudah cukup jika data flow dan ujian jelas.

### Boleh dakwa bacaan sangat tepat?

Hanya jika ada kalibrasi dan perbandingan dengan alat rujukan yang sesuai. Untuk prototaip pelajar, lebih selamat tulis bahawa sistem memantau trend dan memberi amaran berdasarkan threshold projek.
`;
}

for (const post of englishPosts) {
  fs.writeFileSync(path.join(blogDir, `${post.slug}.mdx`), englishBody(post));
}

for (const post of malayPosts) {
  fs.writeFileSync(path.join(blogDir, `${post.slug}.mdx`), malayBody(post));
}

console.log(`Generated ${englishPosts.length + malayPosts.length} IoT blog posts.`);
