import { allCatalogProjects } from "@/data/projects";
import {
  ComponentCategory,
  ComponentGuide,
  componentCategories,
  components,
} from "@/data/components";

const tagAliases: Record<string, string> = {
  arduino: "arduino-uno",
  ai: "esp32-cam",
  bluetooth: "hc-05",
  camera: "esp32-cam",
  "gas sensor": "mq135",
  gsm: "sim800l",
  gps: "gps-neo-6m",
  "heart rate": "max30102",
  "load cell": "hx711",
  lora: "lora-sx1278",
  rfid: "rc522",
  rtc: "ds3231",
  servo: "sg90-servo",
  "stepper motor": "28byj-48-stepper",
  ultrasonic: "hc-sr04",
  "soil sensor": "soil-moisture-sensor",
  "soil moisture": "soil-moisture-sensor",
  "current sensor": "ina219",
  oled: "oled-ssd1306",
  display: "oled-ssd1306",
  motor: "l298n",
  robot: "l298n",
  relay: "relay-module",
  "air quality": "mq135",
  "stepper driver": "a4988-stepper-driver",
  "a4988": "a4988-stepper-driver",
  "drv8825": "drv8825-stepper-driver",
  "uln2003": "uln2003-stepper-driver",
  "tb6612fng": "tb6612fng-motor-driver",
  "bts7960": "bts7960-motor-driver",
  "mosfet": "mosfet-trigger-module",
  "level shifter": "logic-level-converter",
  "logic level": "logic-level-converter",
  "ads1115": "ads1115-adc",
  "io expander": "mcp23017-io-expander",
  "i2c multiplexer": "tca9548a-i2c-multiplexer",
  "tof": "vl53l0x-time-of-flight",
  "light sensor": "bh1750-light-sensor",
  "encoder": "ky-040-rotary-encoder",
  "thermocouple": "max6675-thermocouple",
  "ds18b20": "ds18b20-temperature-sensor",
  "dht11": "dht11",
  "reed switch": "reed-switch",
  "magnetic sensor": "reed-switch",
  "vibration": "sw420-vibration-sensor",
  "sound sensor": "sound-sensor-module",
  "microphone": "max9814-microphone",
  "capacitive soil": "capacitive-soil-moisture",
};

const customSvgSlugs = new Set([
  "28byj-48-stepper",
  "arduino-uno",
  "bme280",
  "buck-converter-lm2596",
  "dht22",
  "ds3231",
  "esp32",
  "esp32-cam",
  "esp8266",
  "flame-sensor",
  "gps-neo-6m",
  "hc-sr04",
  "hc-05",
  "hx711",
  "ina219",
  "ir-obstacle-sensor",
  "keypad-4x4",
  "l298n",
  "lcd-16x2-i2c",
  "ldr-sensor",
  "load-cell-5kg",
  "lora-sx1278",
  "max30102",
  "mpu6050",
  "mq135",
  "nema17-stepper",
  "nodemcu",
  "nrf24l01",
  "oled-ssd1306",
  "ph-sensor",
  "pir-sensor",
  "pzem-004t",
  "rain-sensor",
  "raspberry-pi-pico",
  "rc522",
  "relay-module",
  "sg90-servo",
  "sim800l",
  "sim7600",
  "soil-moisture-sensor",
  "tds-sensor",
  "tft-ili9341",
  "tp4056",
  "turbidity-sensor",
  "water-level-sensor",
  "a4988-stepper-driver",
  "drv8825-stepper-driver",
  "uln2003-stepper-driver",
  "tb6612fng-motor-driver",
  "bts7960-motor-driver",
  "mosfet-trigger-module",
  "logic-level-converter",
  "breadboard-power-supply",
  "ads1115-adc",
  "mcp23017-io-expander",
  "pcf8574-io-expander",
  "tca9548a-i2c-multiplexer",
  "vl53l0x-time-of-flight",
  "bh1750-light-sensor",
  "as5600-magnetic-encoder",
  "max6675-thermocouple",
  "mlx90614-ir-temperature",
  "ds18b20-temperature-sensor",
  "dht11",
  "reed-switch",
  "sw420-vibration-sensor",
  "sound-sensor-module",
  "max9814-microphone",
  "ky-040-rotary-encoder",
  "capacitive-soil-moisture",
]);

export function getAllComponents() {
  return [...components].sort((a, b) => a.name.localeCompare(b.name));
}

export function getComponentBySlug(slug: string) {
  return components.find((component) => component.slug === slug);
}

export function getComponentsByCategory(category: ComponentCategory) {
  return getAllComponents().filter((component) => component.category === category);
}

export function getComponentCategoryBySlug(slug: string) {
  return componentCategories.find((category) => category.slug === slug);
}

export function componentCategoryMetaTitle(category: { label: string }) {
  return `${category.label} Components Malaysia | FYP Parts & Guides`;
}

export function componentCategoryMetaDescription(category: { label: string; description: string }) {
  return `${category.label} component guides for Malaysian FYP students. ${category.description} Compare modules, wiring notes, common mistakes, project ideas and related Rectronx resources.`;
}

export function getComponentMap() {
  return new Map(components.map((component) => [component.shortName.toLowerCase(), component]));
}

export function getComponentByTag(tag: string) {
  const normalized = tag.toLowerCase();
  const alias = tagAliases[normalized];

  if (alias) {
    return getComponentBySlug(alias);
  }

  return components.find(
    (component) =>
      component.shortName.toLowerCase() === normalized ||
      component.name.toLowerCase().includes(normalized) ||
      normalized.includes(component.shortName.toLowerCase())
  );
}

export function getRelatedProjects(component: ComponentGuide, limit = 6) {
  const keywords = [
    component.shortName,
    component.name,
    ...component.interfaces,
    ...component.compatibleWith,
  ].map((keyword) => keyword.toLowerCase());

  const explicitTitles = new Set(component.projectIdeas.map((title) => title.toLowerCase()));

  return allCatalogProjects
    .filter((project) => {
      if (explicitTitles.has(project.title.toLowerCase())) {
        return true;
      }

      const haystack = [project.title, ...project.tags].join(" ").toLowerCase();
      return keywords.some((keyword) => haystack.includes(keyword));
    })
    .slice(0, limit);
}

export function getAlternativeComponents(component: ComponentGuide) {
  return component.alternatives
    .map((alternative) => ({
      ...alternative,
      component: getComponentBySlug(alternative.slug),
    }))
    .filter((alternative) => alternative.component);
}

export function componentWhatsAppLink(component: ComponentGuide, source = "component_page") {
  const text = encodeURIComponent(
    `Hi Rectronx! I need help using ${component.shortName} in my FYP. Can you advise me?`
  );
  return `https://wa.me/60148600454?text=${text}&utm_source=${source}`;
}

export function componentMetaTitle(component: ComponentGuide) {
  return `${component.shortName} Guide Malaysia | Pinout, Specs, FYP Uses`;
}

export function componentMetaDescription(component: ComponentGuide) {
  return `${component.name} guide for Malaysian FYP students: specs, pinout, wiring, common mistakes, project ideas, alternatives and price range ${component.priceRange}.`;
}

export function componentImagePath(component: ComponentGuide) {
  if (customSvgSlugs.has(component.slug)) {
    return `/components/${component.slug}.svg`;
  }

  return `/components/generic-component.svg`;
}
