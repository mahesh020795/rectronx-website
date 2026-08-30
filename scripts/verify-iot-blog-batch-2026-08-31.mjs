import fs from "node:fs";
import path from "node:path";

const blogDir = path.join(process.cwd(), "content/blog");

const expected = [
  "esp32-water-level-monitoring-fyp-malaysia",
  "iot-flood-alert-system-esp32-malaysia-fyp",
  "smart-irrigation-iot-fyp-soil-moisture-malaysia",
  "esp32-dht11-temperature-monitoring-fyp-guide",
  "iot-air-quality-monitoring-fyp-classroom-malaysia",
  "rfid-attendance-iot-fyp-esp32-malaysia",
  "gps-gsm-vehicle-tracking-fyp-malaysia",
  "iot-energy-monitoring-fyp-esp32-pzem-malaysia",
  "smart-parking-iot-fyp-esp32-ultrasonic",
  "iot-fish-pond-water-quality-fyp-malaysia",
  "lora-iot-farm-monitoring-fyp-malaysia",
  "esp32-smart-home-automation-fyp-malaysia",
  "iot-health-monitoring-fyp-esp32-malaysia",
  "smart-waste-bin-iot-fyp-malaysia",
  "iot-final-year-project-report-guide-malaysia",
  "projek-iot-paras-air-esp32-pat-malaysia",
  "projek-iot-amaran-banjir-esp32-pelajar-malaysia",
  "projek-pengairan-pintar-iot-kelembapan-tanah-pat",
  "projek-esp32-dht11-monitor-suhu-kelembapan-pat",
  "projek-iot-kualiti-udara-bilik-darjah-pat",
  "projek-kehadiran-rfid-iot-esp32-pat-malaysia",
  "projek-gps-gsm-tracking-kenderaan-pat-malaysia",
  "projek-iot-monitor-tenaga-esp32-pzem-pat",
  "projek-parking-pintar-iot-esp32-ultrasonik-pat",
  "projek-iot-kualiti-air-kolam-ikan-pat",
  "projek-lora-iot-pertanian-pintar-pat-malaysia",
  "projek-automasi-rumah-esp32-iot-pat",
  "projek-iot-pemantauan-kesihatan-esp32-pat",
  "projek-tong-sampah-pintar-iot-pat-malaysia",
  "panduan-laporan-projek-iot-projek-akhir-tahun",
];

const requiredLinks = ["/catalog", "/components", "/tools/esp32-pinout", "/contact"];
const requiredHeadings = ["Quick Summary", "Core Components", "Testing Plan", "Common Mistakes", "FAQ"];
const requiredMalayHeadings = ["Ringkasan Cepat", "Komponen Utama", "Pelan Ujian", "Kesilapan Biasa", "FAQ"];

const failures = [];

for (const slug of expected) {
  const file = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    failures.push(`Missing ${slug}.mdx`);
    continue;
  }

  const text = fs.readFileSync(file, "utf8");
  if (!/^---[\s\S]*title: ".+"[\s\S]*excerpt: ".+"[\s\S]*category: "IoT"[\s\S]*date: "2026-08-31"[\s\S]*---/.test(text)) {
    failures.push(`${slug} has invalid frontmatter`);
  }
  if (!/Malaysia|Malaysian|pelajar Malaysia|Projek Akhir Tahun|PAT/.test(text)) {
    failures.push(`${slug} lacks Malaysia/PAT search context`);
  }
  if (!/ESP32|Arduino|Raspberry Pi|LoRa|RFID|GPS|GSM|PZEM|DHT11|sensor/i.test(text)) {
    failures.push(`${slug} lacks concrete IoT technology terms`);
  }
  const isMalay = slug.startsWith("projek-") || slug.startsWith("panduan-");
  const headings = isMalay ? requiredMalayHeadings : requiredHeadings;
  for (const heading of headings) {
    if (!text.includes(`## ${heading}`) && !text.includes(`### ${heading}`)) {
      failures.push(`${slug} missing heading ${heading}`);
    }
  }
  for (const link of requiredLinks) {
    if (!text.includes(`](${link}`)) {
      failures.push(`${slug} missing internal link ${link}`);
    }
  }
  if (text.split(/\s+/).length < 520) {
    failures.push(`${slug} is too thin for the requested quality`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified ${expected.length} Malaysia IoT FYP blog posts.`);
