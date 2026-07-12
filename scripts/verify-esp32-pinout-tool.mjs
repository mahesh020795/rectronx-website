import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const routeDir = path.join(root, "app", "tools", "esp32-pinout");
const pagePath = path.join(routeDir, "page.tsx");
const clientPath = path.join(routeDir, "Esp32PinoutTool.tsx");
const dataPath = path.join(root, "data", "esp32-pinout.json");
const navPath = path.join(root, "components", "Navbar.tsx");
const sitemapPath = path.join(root, "app", "sitemap.ts");

assert.ok(existsSync(pagePath), "ESP32 pinout page route is missing");
assert.ok(existsSync(clientPath), "ESP32 pinout client component is missing");
assert.ok(existsSync(dataPath), "ESP32 pinout data file is missing");

const pins = JSON.parse(readFileSync(dataPath, "utf8"));
assert.equal(pins.length, 30, "ESP32 DevKit V1 data should include 30 header pins");

const byGpio = new Map(pins.filter((pin) => pin.gpio !== null).map((pin) => [pin.gpio, pin]));
for (const gpio of [2, 5, 12, 15]) {
  assert.equal(byGpio.get(gpio)?.strap, true, `GPIO${gpio} should be marked as a strapping pin`);
}
for (const gpio of [34, 35, 36, 39]) {
  assert.equal(byGpio.get(gpio)?.inputOnly, true, `GPIO${gpio} should be marked input-only`);
}
for (const gpio of [25, 26]) {
  assert.ok(byGpio.get(gpio)?.dac, `GPIO${gpio} should include DAC capability`);
}
assert.ok(
  pins.some((pin) => String(pin.adc ?? "").startsWith("ADC2") && pin.wifiAdcCaution),
  "At least one ADC2 pin should carry the WiFi ADC caution"
);

const nav = readFileSync(navPath, "utf8");
assert.match(nav, /href:\s*"\/tools\/esp32-pinout"/, "Navbar dropdown should link to ESP32 pinout tool");
assert.match(nav, /ESP32 Pinout Tool/, "Navbar dropdown should label the ESP32 tool clearly");

const sitemap = readFileSync(sitemapPath, "utf8");
assert.match(sitemap, /\/tools\/esp32-pinout/, "Sitemap should include ESP32 pinout tool URL");

const page = readFileSync(pagePath, "utf8");
assert.match(page, /WebApplication/, "Page should include WebApplication structured data");
assert.match(page, /faqSchema/, "Page should include FAQ structured data");
assert.match(page, /canonical:\s*"\/tools\/esp32-pinout"/, "Page metadata should define canonical URL");
assert.match(page, /GPIO0, GPIO2, GPIO5, GPIO12 and GPIO15/, "Page should mention all official ESP32 strapping pins, including GPIO0");

const client = readFileSync(clientPath, "utf8");
for (const label of ["All Pins", "GPIO", "ADC", "DAC", "Touch", "PWM", "Boot"]) {
  assert.ok(client.includes(label), `Client tool should include the ${label} filter`);
}
for (const section of ["Quick summary", "Common mistakes", "Related resources"]) {
  assert.ok(client.includes(section), `Client tool should include ${section} SEO/supporting section`);
}
assert.match(client, /className="h-auto w-full min-w-\[680px\]"/, "Board SVG should scale to the available desktop panel");
assert.match(client, /xl:overflow-x-visible/, "Desktop board container should show the full pinout without forced horizontal scrolling");

console.log("ESP32 pinout tool verification passed.");
