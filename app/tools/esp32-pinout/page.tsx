import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import Esp32PinoutTool from "./Esp32PinoutTool";

const faqs = [
  {
    q: "Which ESP32 GPIO pins are safest for beginner projects?",
    a: "GPIO21, GPIO22, GPIO23, GPIO19, GPIO18, GPIO16, GPIO17, GPIO32 and GPIO33 are common choices for many ESP32 DevKit V1 projects, depending on the peripheral used.",
  },
  {
    q: "Which ESP32 pins should I be careful with during boot?",
    a: "GPIO0, GPIO2, GPIO5, GPIO12 and GPIO15 are strapping pins. External circuits on these pins can affect boot mode if they force the wrong level at startup.",
  },
  {
    q: "Can I use ESP32 ADC2 pins while WiFi is running?",
    a: "ADC2 pins can conflict with the WiFi driver on ESP32. For analog readings in WiFi projects, ADC1 pins are usually the safer choice.",
  },
  {
    q: "Are GPIO34 to GPIO39 output pins?",
    a: "No. GPIO34, GPIO35, GPIO36 and GPIO39 are input-only pins on ESP32 and should not be used to drive outputs.",
  },
  {
    q: "What are the best ESP32 pins for I2C sensors and OLED displays?",
    a: "GPIO21 for SDA and GPIO22 for SCL are the common default I2C pins on many ESP32 DevKit V1 examples. ESP32 can route I2C to other GPIOs, but using the common defaults makes student projects easier to debug.",
  },
  {
    q: "Can I use GPIO6 to GPIO11 on ESP32 DevKit boards?",
    a: "Avoid GPIO6 to GPIO11 on typical ESP32-WROOM development boards because they are usually connected to the module flash memory and are not exposed as safe general-purpose project pins.",
  },
];

export const metadata: Metadata = {
  title: "ESP32 Pinout Tool - Interactive GPIO Reference",
  description:
    "Interactive ESP32 DevKit V1 GPIO pinout tool with searchable pins, ADC, PWM, DAC, touch, boot strapping cautions, and practical notes for student IoT projects.",
  keywords: [
    "ESP32 pinout",
    "ESP32 GPIO tool",
    "ESP32 DevKit V1 pinout",
    "ESP32 ADC pins",
    "ESP32 boot pins",
    "ESP32 safe pins",
    "ESP32 pins to avoid",
    "ESP32 ADC2 WiFi",
    "ESP32 strapping pins",
    "ESP32 Malaysia",
    "IoT project Malaysia",
  ],
  alternates: { canonical: "/tools/esp32-pinout" },
  openGraph: {
    title: "ESP32 Pinout Tool - Interactive GPIO Reference",
    description:
      "Search and inspect ESP32 DevKit V1 GPIO pins, ADC channels, PWM, DAC, touch pins, and boot cautions.",
    url: "https://rectronx.com/tools/esp32-pinout",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ESP32 Pinout Tool",
  url: "https://rectronx.com/tools/esp32-pinout",
  applicationCategory: "EngineeringApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  description:
    "Interactive ESP32 DevKit V1 GPIO pinout reference for makers, students, and embedded systems projects.",
  publisher: {
    "@type": "Organization",
    name: "Rectronx Circuits",
    url: "https://rectronx.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MYR",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "ESP32 Pinout Tool and Safe GPIO Reference",
  description:
    "Interactive ESP32 DevKit V1 pinout tool and engineering reference covering safe GPIO pins, ADC1, ADC2, WiFi limitations, strapping pins, input-only pins, I2C, SPI, UART, PWM, DAC and common wiring mistakes.",
  url: "https://rectronx.com/tools/esp32-pinout",
  author: {
    "@type": "Organization",
    name: "Rectronx Circuits",
    url: "https://rectronx.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Rectronx Circuits",
    url: "https://rectronx.com",
  },
  mainEntityOfPage: "https://rectronx.com/tools/esp32-pinout",
  about: ["ESP32", "GPIO", "Pinout", "ADC", "IoT"],
  educationalLevel: "Beginner to intermediate",
  proficiencyLevel: "Beginner",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to choose ESP32 pins safely",
  description:
    "A practical process for choosing ESP32 DevKit V1 pins for student IoT projects without causing boot, WiFi ADC, or output-pin problems.",
  totalTime: "PT5M",
  supply: [
    { "@type": "HowToSupply", name: "ESP32 DevKit V1" },
    { "@type": "HowToSupply", name: "Sensor, display, relay, or communication module" },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Start with common safe GPIO pins",
      text: "For general digital input or output, start with pins such as GPIO16, GPIO17, GPIO18, GPIO19, GPIO21, GPIO22, GPIO23, GPIO25, GPIO26, GPIO27, GPIO32 and GPIO33, then check the exact peripheral requirement.",
    },
    {
      "@type": "HowToStep",
      name: "Avoid boot strapping pins for risky loads",
      text: "Be careful with GPIO0, GPIO2, GPIO5, GPIO12 and GPIO15 because external circuits can affect ESP32 boot mode if they force the wrong level during reset.",
    },
    {
      "@type": "HowToStep",
      name: "Use ADC1 for WiFi analog projects",
      text: "When the project uses WiFi and analog sensors, prefer ADC1 pins such as GPIO32, GPIO33, GPIO34, GPIO35, GPIO36 or GPIO39 instead of ADC2 pins.",
    },
    {
      "@type": "HowToStep",
      name: "Do not use input-only pins for outputs",
      text: "GPIO34, GPIO35, GPIO36 and GPIO39 are input-only on ESP32 and cannot drive LEDs, relays, buzzers, motors or other output devices.",
    },
  ],
};

const safePinRows = [
  ["General digital I/O", "GPIO16, GPIO17, GPIO18, GPIO19, GPIO21, GPIO22, GPIO23, GPIO25, GPIO26, GPIO27, GPIO32, GPIO33", "Good starting choices for many sensors, displays, serial modules, buttons and low-current signals."],
  ["I2C", "GPIO21 SDA, GPIO22 SCL", "Common default pins used by many Arduino ESP32 examples for OLED displays, BME280 and other I2C modules."],
  ["VSPI", "GPIO23 MOSI, GPIO19 MISO, GPIO18 SCK, GPIO5 CS", "Common SPI mapping. GPIO5 is a strapping pin, so avoid circuits that pull it to the wrong level during boot."],
  ["UART2", "GPIO16 RX2, GPIO17 TX2", "Useful for GPS, GSM, LoRa UART modules and serial debugging without disturbing USB programming pins."],
  ["Analog with WiFi", "GPIO32, GPIO33, GPIO34, GPIO35, GPIO36, GPIO39", "ADC1 pins are safer for WiFi projects. Remember GPIO34-GPIO39 are input-only."],
  ["DAC", "GPIO25 DAC1, GPIO26 DAC2", "Useful for simple analog voltage output. These pins also have ADC2, so avoid ADC2 readings while WiFi is active."],
];

const cautionRows = [
  ["Boot strapping pins", "GPIO0, GPIO2, GPIO5, GPIO12, GPIO15", "External pull-ups, pull-downs or modules on these pins can stop boot or flashing if the startup level is wrong."],
  ["Input-only pins", "GPIO34, GPIO35, GPIO36, GPIO39", "Use for buttons or analog sensors only. They cannot drive outputs and do not have software pull-up or pull-down support."],
  ["Flash pins", "GPIO6, GPIO7, GPIO8, GPIO9, GPIO10, GPIO11", "Usually connected to SPI flash on ESP32-WROOM modules. Do not use them for normal project wiring."],
  ["UART0 pins", "GPIO1 TX0, GPIO3 RX0", "Used for programming and serial logs. Heavy loads here can disturb uploads or debugging."],
  ["ADC2 with WiFi", "GPIO0, GPIO2, GPIO4, GPIO12-GPIO15, GPIO25-GPIO27", "ADC2 readings can conflict with WiFi. Use ADC1 for analog sensors in WiFi projects."],
];

const projectRows = [
  ["DHT11 or DHT22 temperature monitor", "GPIO4, GPIO16, GPIO17 or GPIO23", "Use a stable 3.3V supply and a data pull-up if the sensor module does not include one."],
  ["OLED SSD1306 display", "GPIO21 SDA and GPIO22 SCL", "This is the easiest I2C wiring for most ESP32 Arduino examples."],
  ["GPS NEO-6M", "GPIO16 RX2 and GPIO17 TX2", "UART2 keeps GPS serial away from USB programming pins."],
  ["Relay module", "GPIO18, GPIO19, GPIO23, GPIO25, GPIO26 or GPIO27", "Use a proper relay module and separate power path for loads. Do not drive relay coils directly from GPIO."],
  ["MQ gas sensor analog output", "GPIO32 or GPIO33", "Prefer ADC1 if the project also uses WiFi, Blynk, Firebase, MQTT or HTTP."],
];

export default function Esp32PinoutPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://rectronx.com" },
          { name: "Tools & Learning", url: "https://rectronx.com/topics" },
          { name: "ESP32 Pinout Tool", url: "https://rectronx.com/tools/esp32-pinout" },
        ])}
      />
      <JsonLd schema={webApplicationSchema} />
      <JsonLd schema={articleSchema} />
      <JsonLd schema={howToSchema} />
      <JsonLd schema={faqSchema(faqs)} />

      <Esp32PinoutTool />

      <section className="bg-[#050A14] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">Validated notes</p>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white">
            ESP32 pinout reference for safe GPIO choices
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/70">
            A good ESP32 pinout page must do more than show labels. Students need to know which pins are safer for a project demo, which pins can break boot, which analog pins conflict with WiFi, and which pins are input-only. This guide is written for ESP32 DevKit V1 and ESP-WROOM-32 based boards commonly used in Malaysian IoT and Projek Akhir Tahun builds.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "GPIO0, GPIO2, GPIO5, GPIO12 and GPIO15 are boot strapping pins. Use them carefully.",
              "GPIO34, GPIO35, GPIO36 and GPIO39 are input-only. They cannot drive relays, LEDs, motors, or buzzers.",
              "ADC2 pins can conflict with WiFi. For WiFi sensor projects, prefer ADC1 pins for analog readings.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-white/70">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/10 px-5 py-4">
              <h3 className="text-xl font-bold text-white">Best ESP32 pins by use case</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                These are practical starting points, not absolute rules. Always confirm your exact board, module and library pin mapping.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.12em] text-white/45">
                  <tr>
                    <th className="px-5 py-3">Use case</th>
                    <th className="px-5 py-3">Recommended pins</th>
                    <th className="px-5 py-3">Practical note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/70">
                  {safePinRows.map(([useCase, pins, note]) => (
                    <tr key={useCase}>
                      <td className="px-5 py-4 font-bold text-white">{useCase}</td>
                      <td className="px-5 py-4 font-mono text-brand-blue-light">{pins}</td>
                      <td className="px-5 py-4 leading-6">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {cautionRows.map(([title, pins, note]) => (
              <article key={title} className="rounded-2xl border border-orange-400/25 bg-orange-400/10 p-5">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 font-mono text-sm font-bold text-orange-100">{pins}</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{note}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-white">Recommended ESP32 wiring examples</h3>
            <p className="mt-3 text-sm leading-7 text-white/65">
              These examples cover the modules students commonly use in FYP demos. They keep WiFi, serial upload and boot behavior in mind.
            </p>
            <div className="mt-5 grid gap-3">
              {projectRows.map(([module, pins, note]) => (
                <div key={module} className="grid gap-2 rounded-xl border border-white/10 bg-[#050A14] p-4 text-sm sm:grid-cols-[220px_1fr]">
                  <div>
                    <p className="font-bold text-white">{module}</p>
                    <p className="mt-1 font-mono text-brand-blue-light">{pins}</p>
                  </div>
                  <p className="leading-6 text-white/65">{note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-6">
            <h3 className="text-xl font-bold text-white">Official references used</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              The caution notes are aligned with official Espressif GPIO and ADC documentation. Espressif documents the ESP32 strapping pins, input-only pins, flash-connected pins, and ADC2 WiFi limitation. Always check the exact module and board clone before final PCB or hardware submission.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/peripherals/gpio.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Espressif GPIO docs
              </a>
              <a
                href="https://documentation.espressif.com/esp32_datasheet_en.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                ESP32 datasheet
              </a>
              <Link href="/components/esp32" className="btn-outline">ESP32 component page</Link>
              <Link href="/blog/esp32-getting-started" className="btn-outline">ESP32 guide</Link>
              <Link href="/contact" className="btn-primary">Ask Rectronx</Link>
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-white">ESP32 pinout FAQ</h3>
            <div className="mt-5 grid gap-4">
              {faqs.map((faq) => (
                <article key={faq.q} className="rounded-xl border border-white/10 bg-[#050A14] p-5">
                  <h4 className="font-bold text-white">{faq.q}</h4>
                  <p className="mt-2 text-sm leading-7 text-white/65">{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
