"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Cpu, Search, X } from "lucide-react";
import pins from "@/data/esp32-pinout.json";
import { trackWhatsAppLead } from "@/lib/analytics";
import clsx from "clsx";

type Pin = {
  side: "left" | "right";
  phys: number;
  label: string;
  gpio: number | null;
  adc: string | null;
  kind: string;
  type: string;
  pwm: boolean;
  touch: string | null;
  dac: string | null;
  strap: boolean;
  inputOnly: boolean;
  wifiAdcCaution: boolean;
  note: string;
};

type FilterKey = "all" | "gpio" | "adc" | "dac" | "touch" | "pwm" | "strap";

const pinData = pins as Pin[];
const defaultPin = pinData.find((pin) => pin.gpio === 2) ?? pinData[0];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Pins" },
  { key: "gpio", label: "GPIO" },
  { key: "adc", label: "ADC" },
  { key: "dac", label: "DAC" },
  { key: "touch", label: "Touch" },
  { key: "pwm", label: "PWM" },
  { key: "strap", label: "Boot" },
];

function pinId(pin: Pin) {
  return pin.gpio === null ? `${pin.side}-${pin.label}-${pin.phys}` : `gpio-${pin.gpio}`;
}

function pinMatchesFilter(pin: Pin, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "gpio") return pin.gpio !== null;
  if (filter === "adc") return Boolean(pin.adc);
  if (filter === "dac") return Boolean(pin.dac);
  if (filter === "touch") return Boolean(pin.touch);
  if (filter === "pwm") return pin.pwm;
  return pin.strap;
}

function pinMatchesSearch(pin: Pin, query: string) {
  if (!query) return true;
  const haystack = [
    pin.label,
    pin.gpio === null ? "" : `gpio${pin.gpio}`,
    pin.gpio === null ? "" : `gpio ${pin.gpio}`,
    pin.adc,
    pin.touch,
    pin.dac,
    pin.type,
    pin.note,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function Capability({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "orange" | "green" }) {
  return (
    <span
      className={clsx(
        "rounded-full border px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.12em]",
        tone === "blue" && "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light",
        tone === "orange" && "border-orange-400/50 bg-orange-400/10 text-orange-200",
        tone === "green" && "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
      )}
    >
      {children}
    </span>
  );
}

function PinRow({
  pin,
  index,
  selectedId,
  hoveredId,
  visible,
  onSelect,
  onHover,
}: {
  pin: Pin;
  index: number;
  selectedId: string;
  hoveredId: string | null;
  visible: boolean;
  onSelect: (pin: Pin) => void;
  onHover: (id: string | null) => void;
}) {
  const id = pinId(pin);
  const active = selectedId === id || hoveredId === id;
  const y = 80 + index * 36;
  const isLeft = pin.side === "left";
  const opacity = visible ? 1 : 0.22;
  const labelX = isLeft ? 18 : 685;
  const gpioX = isLeft ? 116 : 594;
  const physX = isLeft ? 232 : 552;
  const boardX = isLeft ? 335 : 525;
  const powerLabel =
    pin.side === "left" && pin.label === "EN"
      ? { text: "EN", className: "fill-[#6D1B86]" }
      : pin.side === "left" && pin.label === "GND"
        ? { text: "2 GND", className: "fill-amber-800" }
        : pin.side === "left" && pin.label === "VIN"
          ? { text: "1 VCC", className: "fill-red-500" }
          : pin.side === "right" && pin.label === "GND"
            ? { text: "GND", className: "fill-amber-800" }
            : pin.side === "right" && pin.label === "3V3"
              ? { text: "3.3V", className: "fill-red-500" }
              : null;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${pin.label}${pin.gpio !== null ? ` GPIO ${pin.gpio}` : ""}`}
      className="cursor-pointer outline-none transition-opacity"
      style={{ opacity }}
      onClick={() => onSelect(pin)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect(pin);
      }}
    >
      {isLeft ? (
        <>
          {pin.adc && (
            <>
              <rect x={labelX} y={y - 13} width="84" height="26" rx="5" className={pin.adc.startsWith("ADC1") ? "fill-emerald-500" : "fill-orange-500"} />
              <text x={labelX + 42} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">{pin.adc.replace("_CH", "_")}</text>
            </>
          )}
          {pin.gpio !== null && (
            <>
              <line x1="102" y1={y} x2={gpioX} y2={y} className="stroke-orange-300" strokeWidth={active ? 2.2 : 1.1} />
              <rect x={gpioX} y={y - 13} width="82" height="26" rx="5" className={clsx(active ? "fill-brand-blue" : "fill-[#6D1B86]")} />
              <text x={gpioX + 41} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">GPIO {pin.gpio}</text>
            </>
          )}
          {powerLabel && (
            <>
              <rect x={gpioX} y={y - 13} width="82" height="26" rx="5" className={powerLabel.className} />
              <text x={gpioX + 41} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">{powerLabel.text}</text>
            </>
          )}
          <line x1="198" y1={y} x2={physX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.2 : 1.1} />
          <rect x={physX} y={y - 13} width="34" height="26" rx="5" className={clsx(active ? "fill-brand-blue" : "fill-[#101A2A]", "stroke-brand-blue")} />
          <text x={physX + 17} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">{pin.phys}</text>
          <line x1={physX + 34} y1={y} x2={boardX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.2 : 1.1} />
        </>
      ) : (
        <>
          <line x1={boardX} y1={y} x2={physX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.2 : 1.1} />
          <rect x={physX} y={y - 13} width="34" height="26" rx="5" className={clsx(active ? "fill-brand-blue" : "fill-[#101A2A]", "stroke-brand-blue")} />
          <text x={physX + 17} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">{pin.phys}</text>
          {pin.gpio !== null && (
            <>
              <line x1={physX + 34} y1={y} x2={gpioX} y2={y} className="stroke-orange-300" strokeWidth={active ? 2.2 : 1.1} />
              <rect x={gpioX} y={y - 13} width="82" height="26" rx="5" className={clsx(active ? "fill-brand-blue" : "fill-[#6D1B86]")} />
              <text x={gpioX + 41} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">GPIO {pin.gpio}</text>
            </>
          )}
          {powerLabel && (
            <>
              <line x1={physX + 34} y1={y} x2={gpioX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.2 : 1.1} />
              <rect x={gpioX} y={y - 13} width="82" height="26" rx="5" className={powerLabel.className} />
              <text x={gpioX + 41} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">{powerLabel.text}</text>
            </>
          )}
          {pin.adc && (
            <>
              <line x1="676" y1={y} x2={labelX} y2={y} className="stroke-orange-300" strokeWidth={active ? 2.2 : 1.1} />
              <rect x={labelX} y={y - 13} width="84" height="26" rx="5" className="fill-orange-500" />
              <text x={labelX + 42} y={y + 5} textAnchor="middle" className="fill-white text-[13px] font-extrabold">{pin.adc.replace("_CH", "_")}</text>
            </>
          )}
        </>
      )}
      <circle cx={isLeft ? 335 : 525} cy={y} r={active ? 10 : 8} className={clsx(active ? "fill-orange-400" : "fill-slate-300")} />
      <circle cx={isLeft ? 335 : 525} cy={y} r="3.8" className="fill-[#08111F]" />
    </g>
  );
}

function BoardSvg({
  selected,
  setSelected,
  activeFilter,
  query,
  fitBoard,
}: {
  selected: Pin;
  setSelected: (pin: Pin) => void;
  activeFilter: FilterKey;
  query: string;
  fitBoard: boolean;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectedId = pinId(selected);
  const leftPins = pinData.filter((pin) => pin.side === "left");
  const rightPins = pinData.filter((pin) => pin.side === "right");

  return (
    <svg
      viewBox="0 0 860 720"
      role="img"
      aria-label="Interactive ESP32 DevKit V1 GPIO pinout"
      className={clsx(
        "h-auto w-full select-none",
        fitBoard ? "min-w-0" : "min-w-[760px]",
        "xl:min-w-[680px]"
      )}
    >
      <defs>
        <linearGradient id="espBoardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4B5563" />
          <stop offset="0.55" stopColor="#1F2937" />
          <stop offset="1" stopColor="#374151" />
        </linearGradient>
      </defs>
      <rect width="860" height="720" rx="24" className="fill-transparent" />
      <g>
        {leftPins.map((pin, index) => (
          <PinRow
            key={pinId(pin)}
            pin={pin}
            index={index}
            selectedId={selectedId}
            hoveredId={hoveredId}
            visible={pinMatchesFilter(pin, activeFilter) && pinMatchesSearch(pin, query)}
            onSelect={setSelected}
            onHover={setHoveredId}
          />
        ))}
        {rightPins.map((pin, index) => (
          <PinRow
            key={pinId(pin)}
            pin={pin}
            index={index}
            selectedId={selectedId}
            hoveredId={hoveredId}
            visible={pinMatchesFilter(pin, activeFilter) && pinMatchesSearch(pin, query)}
            onSelect={setSelected}
            onHover={setHoveredId}
          />
        ))}
      </g>
      <g transform="translate(335 32)">
        <rect width="190" height="610" rx="18" fill="url(#espBoardGrad)" className="stroke-white/40" />
        <circle cx="28" cy="28" r="11" className="fill-slate-200" />
        <circle cx="162" cy="28" r="11" className="fill-slate-200" />
        <circle cx="28" cy="582" r="11" className="fill-slate-200" />
        <circle cx="162" cy="582" r="11" className="fill-slate-200" />
        <rect x="34" y="18" width="122" height="74" className="fill-[#111827] stroke-white/15" />
        <path d="M44 72 V32 H70 V72 H96 V32 H122 V72 H148" fill="none" className="stroke-slate-500" strokeWidth="4" />
        <rect x="43" y="104" width="104" height="162" rx="3" className="fill-slate-300 stroke-white" />
        <text x="95" y="140" textAnchor="middle" className="fill-slate-900 text-[11px] font-black tracking-tight">ESP-WROOM-32</text>
        <text x="95" y="164" textAnchor="middle" className="fill-slate-700 text-[10px] font-bold">WiFi + Bluetooth</text>
        <text x="95" y="216" textAnchor="middle" className="fill-slate-700 text-[12px] font-bold">ESP32</text>
        <rect x="54" y="365" width="82" height="26" rx="4" className="fill-red-500" />
        <text x="95" y="383" textAnchor="middle" className="fill-white text-[13px] font-black">POWER</text>
        <rect x="54" y="410" width="82" height="26" rx="4" className="fill-brand-blue" />
        <text x="95" y="428" textAnchor="middle" className="fill-white text-[13px] font-black">GPIO 2</text>
        <text x="95" y="451" textAnchor="middle" className="fill-brand-blue-light text-[10px] font-black">ONBOARD LED: GPIO 2</text>
        <rect x="52" y="520" width="86" height="44" rx="4" className="fill-slate-200" />
        <rect x="22" y="522" width="32" height="38" rx="6" className="fill-[#111827] stroke-slate-300" />
        <rect x="138" y="522" width="32" height="38" rx="6" className="fill-[#111827] stroke-slate-300" />
        <text x="95" y="591" textAnchor="middle" className="fill-white text-[13px] font-black">ESP32 DEVKIT V1</text>
      </g>
    </svg>
  );
}

function MobilePinRow({
  pin,
  index,
  selectedId,
  visible,
  onSelect,
}: {
  pin: Pin;
  index: number;
  selectedId: string;
  visible: boolean;
  onSelect: (pin: Pin) => void;
}) {
  const id = pinId(pin);
  const active = selectedId === id;
  const isLeft = pin.side === "left";
  const y = 56 + index * 31;
  const opacity = visible ? 1 : 0.22;
  const edgeX = isLeft ? 137 : 237;
  const physX = isLeft ? 110 : 240;
  const gpioX = isLeft ? 52 : 266;
  const adcX = isLeft ? 0 : 324;
  const powerLabel =
    pin.side === "left" && pin.label === "EN"
      ? { text: "EN", className: "fill-[#6D1B86]" }
      : pin.side === "left" && pin.label === "GND"
        ? { text: "2 GND", className: "fill-amber-800" }
        : pin.side === "left" && pin.label === "VIN"
          ? { text: "1 VCC", className: "fill-red-500" }
          : pin.side === "right" && pin.label === "GND"
            ? { text: "GND", className: "fill-amber-800" }
            : pin.side === "right" && pin.label === "3V3"
              ? { text: "3.3V", className: "fill-red-500" }
              : null;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${pin.label}${pin.gpio !== null ? ` GPIO ${pin.gpio}` : ""}`}
      className="cursor-pointer outline-none transition-opacity"
      style={{ opacity }}
      onClick={() => onSelect(pin)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect(pin);
      }}
    >
      {isLeft ? (
        <>
          {pin.adc && (
            <>
              <rect x={adcX} y={y - 12} width="50" height="24" rx="5" className={pin.adc.startsWith("ADC1") ? "fill-emerald-500" : "fill-orange-500"} />
              <text x={adcX + 25} y={y + 4} textAnchor="middle" className="fill-white text-[7.5px] font-black">{pin.adc.replace("_CH", "_")}</text>
            </>
          )}
          {(pin.gpio !== null || powerLabel) && (
            <>
              <rect x={gpioX} y={y - 12} width="58" height="24" rx="5" className={powerLabel?.className ?? clsx(active ? "fill-brand-blue" : "fill-[#6D1B86]")} />
              <text x={gpioX + 29} y={y + 4} textAnchor="middle" className="fill-white text-[8.5px] font-black">{powerLabel?.text ?? `GPIO ${pin.gpio}`}</text>
            </>
          )}
          <line x1={gpioX + 58} y1={y} x2={physX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.1 : 1.1} />
          <rect x={physX} y={y - 12} width="24" height="24" rx="5" className={clsx(active ? "fill-brand-blue" : "fill-[#101A2A]", "stroke-brand-blue")} />
          <text x={physX + 12} y={y + 4} textAnchor="middle" className="fill-white text-[9px] font-black">{pin.phys}</text>
          <line x1={physX + 24} y1={y} x2={edgeX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.1 : 1.1} />
        </>
      ) : (
        <>
          <line x1={edgeX} y1={y} x2={physX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.1 : 1.1} />
          <rect x={physX} y={y - 12} width="24" height="24" rx="5" className={clsx(active ? "fill-brand-blue" : "fill-[#101A2A]", "stroke-brand-blue")} />
          <text x={physX + 12} y={y + 4} textAnchor="middle" className="fill-white text-[9px] font-black">{pin.phys}</text>
          {(pin.gpio !== null || powerLabel) && (
            <>
              <line x1={physX + 24} y1={y} x2={gpioX} y2={y} className="stroke-brand-blue" strokeWidth={active ? 2.1 : 1.1} />
              <rect x={gpioX} y={y - 12} width="56" height="24" rx="5" className={powerLabel?.className ?? clsx(active ? "fill-brand-blue" : "fill-[#6D1B86]")} />
              <text x={gpioX + 28} y={y + 4} textAnchor="middle" className="fill-white text-[8.5px] font-black">{powerLabel?.text ?? `GPIO ${pin.gpio}`}</text>
            </>
          )}
          {pin.adc && (
            <>
              <line x1={gpioX + 56} y1={y} x2={adcX} y2={y} className="stroke-orange-300" strokeWidth={active ? 2.1 : 1.1} />
              <rect x={adcX} y={y - 12} width="50" height="24" rx="5" className="fill-orange-500" />
              <text x={adcX + 25} y={y + 4} textAnchor="middle" className="fill-white text-[7.5px] font-black">{pin.adc.replace("_CH", "_")}</text>
            </>
          )}
        </>
      )}
      <circle cx={edgeX} cy={y} r={active ? 7 : 5.8} className={clsx(active ? "fill-orange-400" : "fill-slate-300")} />
      <circle cx={edgeX} cy={y} r="2.6" className="fill-[#08111F]" />
    </g>
  );
}

function MobileBoardSvg({
  selected,
  setSelected,
  activeFilter,
  query,
}: {
  selected: Pin;
  setSelected: (pin: Pin) => void;
  activeFilter: FilterKey;
  query: string;
}) {
  const selectedId = pinId(selected);
  const leftPins = pinData.filter((pin) => pin.side === "left");
  const rightPins = pinData.filter((pin) => pin.side === "right");

  return (
    <svg viewBox="0 0 390 575" role="img" aria-label="Mobile full ESP32 DevKit V1 GPIO pinout" className="h-auto w-full max-w-[430px] select-none">
      <defs>
        <linearGradient id="espMobileBoardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4B5563" />
          <stop offset="0.55" stopColor="#1F2937" />
          <stop offset="1" stopColor="#374151" />
        </linearGradient>
      </defs>
      <rect width="390" height="575" rx="18" className="fill-transparent" />
      {leftPins.map((pin, index) => (
        <MobilePinRow
          key={pinId(pin)}
          pin={pin}
          index={index}
          selectedId={selectedId}
          visible={pinMatchesFilter(pin, activeFilter) && pinMatchesSearch(pin, query)}
          onSelect={setSelected}
        />
      ))}
      {rightPins.map((pin, index) => (
        <MobilePinRow
          key={pinId(pin)}
          pin={pin}
          index={index}
          selectedId={selectedId}
          visible={pinMatchesFilter(pin, activeFilter) && pinMatchesSearch(pin, query)}
          onSelect={setSelected}
        />
      ))}
      <g transform="translate(137 25)">
        <rect width="100" height="520" rx="16" fill="url(#espMobileBoardGrad)" className="stroke-white/40" />
        <circle cx="16" cy="19" r="8" className="fill-slate-200" />
        <circle cx="84" cy="19" r="8" className="fill-slate-200" />
        <circle cx="16" cy="502" r="8" className="fill-slate-200" />
        <circle cx="84" cy="502" r="8" className="fill-slate-200" />
        <rect x="18" y="20" width="64" height="58" className="fill-[#111827] stroke-white/15" />
        <path d="M24 63 V32 H37 V63 H50 V32 H63 V63 H76" fill="none" className="stroke-slate-500" strokeWidth="2.8" />
        <rect x="18" y="98" width="64" height="152" rx="3" className="fill-slate-300 stroke-white" />
        <text x="50" y="132" textAnchor="middle" className="fill-slate-900 text-[8.5px] font-black">ESP-WROOM</text>
        <text x="50" y="147" textAnchor="middle" className="fill-slate-900 text-[8.5px] font-black">32</text>
        <text x="50" y="170" textAnchor="middle" className="fill-slate-700 text-[7.5px] font-bold">WiFi + BT</text>
        <text x="50" y="215" textAnchor="middle" className="fill-slate-700 text-[9px] font-bold">ESP32</text>
        <rect x="18" y="318" width="64" height="24" rx="4" className="fill-red-500" />
        <text x="50" y="334" textAnchor="middle" className="fill-white text-[9px] font-black">POWER</text>
        <rect x="18" y="358" width="64" height="24" rx="4" className="fill-brand-blue" />
        <text x="50" y="374" textAnchor="middle" className="fill-white text-[9px] font-black">GPIO 2</text>
        <text x="50" y="397" textAnchor="middle" className="fill-brand-blue-light text-[7.5px] font-black">LED: GPIO 2</text>
        <rect x="27" y="458" width="46" height="32" rx="4" className="fill-slate-200" />
        <rect x="10" y="459" width="20" height="30" rx="5" className="fill-[#111827] stroke-slate-300" />
        <rect x="70" y="459" width="20" height="30" rx="5" className="fill-[#111827] stroke-slate-300" />
        <text x="50" y="515" textAnchor="middle" className="fill-white text-[8px] font-black">ESP32 DEVKIT V1</text>
      </g>
    </svg>
  );
}

export default function Esp32PinoutTool() {
  const [selected, setSelected] = useState<Pin>(defaultPin);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [fitBoard, setFitBoard] = useState(true);
  const query = search.trim().toLowerCase();

  const matchingPins = useMemo(
    () => pinData.filter((pin) => pinMatchesFilter(pin, activeFilter) && pinMatchesSearch(pin, query)),
    [activeFilter, query]
  );

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-[#080E1A] pt-28">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(43,127,212,0.24),transparent_58%)]" />
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-5 pb-16 sm:px-8">
        <div className="mb-8 max-w-4xl min-w-0">
          <p className="eyebrow mb-4">Engineering tool</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            ESP32 Pinout Tool
          </h1>
          <p className="mt-5 max-w-3xl break-words text-base leading-8 text-white/70">
            Search ESP32 DevKit V1 pins, inspect GPIO capabilities, and avoid common boot, ADC, and input-only mistakes before building your IoT or Projek Akhir Tahun prototype.
          </p>
        </div>

        <div className="grid min-w-0 gap-4 xl:grid-cols-[210px_minmax(720px,1fr)_300px] xl:gap-5">
          <aside className="order-1 min-w-0 space-y-4">
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <h2 className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white/80">Quick filter</h2>
              <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 [-webkit-overflow-scrolling:touch] xl:mx-0 xl:grid xl:grid-cols-1 xl:overflow-visible xl:px-0 xl:pb-0">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    className={clsx(
                      "min-h-11 shrink-0 rounded-lg border px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.1em] transition xl:w-full",
                      activeFilter === filter.key
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-white/10 bg-[#050A14] text-white/60 hover:border-brand-blue/60 hover:text-white"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-white/45">{matchingPins.length} pins match the current view.</p>
            </div>

            <div className="hidden rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-4 xl:block">
              <h2 className="text-sm font-extrabold text-white">Need help choosing pins?</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Rectronx can review your ESP32 wiring before demo day.
              </p>
              <a
                href="https://wa.me/601172792500?text=Hi%20Rectronx!%20I%20need%20help%20with%20ESP32%20pinout%20and%20wiring."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppLead("esp32_pinout_tool_quote")}
                className="mt-4 inline-flex w-full justify-center rounded-full bg-brand-blue px-4 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-brand-blue-dark"
              >
                Get wiring help
              </a>
            </div>
          </aside>

          <div className="order-2 min-w-0 rounded-2xl border border-white/10 bg-[#050A14]/95 p-3 shadow-glow-lg sm:p-4">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-extrabold text-white">
                  <Cpu size={20} className="text-brand-blue" />
                  ESP32 DevKit V1 GPIO map
                </h2>
                <p className="mt-1 text-sm text-white/55">Click a pin, label, or pad to open its details.</p>
              </div>
              <label className="relative block min-w-0 lg:w-72">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search GPIO, ADC, PWM..."
                  className="w-full rounded-xl border border-white/10 bg-[#08111F] py-3 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand-blue"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </label>
            </div>
            <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs font-semibold leading-5 text-white/60 md:hidden">
              Full mobile board view. Tap any pin label or pad to open its details below.
            </div>
            <div className="mb-3 hidden flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2 md:flex xl:hidden">
              <p className="text-xs font-semibold text-white/55">
                {fitBoard ? "Fit view shows the whole board." : "Readable view lets you scroll the labels."}
              </p>
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-[#050A14] p-1">
                <button
                  type="button"
                  onClick={() => setFitBoard(true)}
                  className={clsx(
                    "min-h-10 rounded-md px-3 text-xs font-extrabold uppercase tracking-[0.1em] transition",
                    fitBoard ? "bg-brand-blue text-white" : "text-white/55 hover:text-white"
                  )}
                >
                  Fit
                </button>
                <button
                  type="button"
                  onClick={() => setFitBoard(false)}
                  className={clsx(
                    "min-h-10 rounded-md px-3 text-xs font-extrabold uppercase tracking-[0.1em] transition",
                    !fitBoard ? "bg-brand-blue text-white" : "text-white/55 hover:text-white"
                  )}
                >
                  Read
                </button>
              </div>
            </div>
            <div className="min-w-0 overflow-hidden rounded-xl border border-white/8 bg-[#07101D] p-1 md:hidden">
              <MobileBoardSvg selected={selected} setSelected={setSelected} activeFilter={activeFilter} query={query} />
            </div>
            <div className="hidden overflow-x-auto rounded-xl border border-white/8 bg-[#07101D] [-webkit-overflow-scrolling:touch] md:block xl:overflow-x-visible">
              <BoardSvg selected={selected} setSelected={setSelected} activeFilter={activeFilter} query={query} fitBoard={fitBoard} />
            </div>
            <div className="mt-4 flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/65">
              <AlertTriangle size={18} className="mt-1 shrink-0 text-brand-blue" />
              <p>GPIO34 to GPIO39 are input-only on ESP32. ADC2 pins can be unreliable for analog reads while WiFi is active, so ADC1 is usually better for WiFi sensor projects.</p>
            </div>
          </div>

          <aside className="order-3 min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 xl:sticky xl:top-24 xl:h-fit">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/80">Pin information</h2>
              <button
                type="button"
                onClick={() => {
                  setSelected(defaultPin);
                  setSearch("");
                  setActiveFilter("all");
                }}
                className="min-h-10 rounded-full border border-white/10 px-4 py-1.5 text-xs font-bold text-white/55 transition hover:border-brand-blue hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#050A14] p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {selected.gpio !== null && <Capability>GPIO {selected.gpio}</Capability>}
                {selected.pwm && <Capability tone="green">PWM</Capability>}
                {selected.adc && <Capability tone={selected.adc.startsWith("ADC1") ? "green" : "orange"}>{selected.adc}</Capability>}
                {selected.touch && <Capability>Touch {selected.touch}</Capability>}
                {selected.dac && <Capability tone="orange">{selected.dac}</Capability>}
                {selected.strap && <Capability tone="orange">Boot pin</Capability>}
              </div>
              <div className="border-b border-white/10 pb-4">
                <p className="break-words text-3xl font-black text-white sm:text-4xl">{selected.gpio === null ? selected.label : `GPIO ${selected.gpio}`}</p>
                <p className="mt-2 text-sm text-white/55">{selected.label} - physical pin {selected.phys}</p>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Function", selected.type],
                  ["ADC", selected.adc ?? "No"],
                  ["PWM", selected.pwm ? "Yes" : "No"],
                  ["Touch", selected.touch ?? "No"],
                  ["DAC", selected.dac ?? "No"],
                  ["Boot mode", selected.strap ? "Strapping pin" : "Normal"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[100px_1fr] gap-3 border-b border-white/8 pb-3">
                    <dt className="text-white/45">{label}</dt>
                    <dd className="font-semibold text-white/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-7 text-white/70">{selected.note}</p>
              {(selected.strap || selected.inputOnly || selected.wifiAdcCaution) && (
                <div className="mt-4 rounded-xl border border-orange-400/35 bg-orange-400/10 p-4 text-sm leading-6 text-orange-100">
                  <div className="mb-1 flex items-center gap-2 font-extrabold">
                    <AlertTriangle size={16} />
                    Caution
                  </div>
                  {selected.strap && <p>This pin can affect boot mode. Avoid forcing the wrong level during startup.</p>}
                  {selected.inputOnly && <p>This pin is input-only and cannot be used as an output.</p>}
                  {selected.wifiAdcCaution && <p>ADC2 readings can conflict with WiFi on ESP32.</p>}
                </div>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-5 rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-4 xl:hidden">
          <h2 className="text-sm font-extrabold text-white">Need help choosing pins?</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Rectronx can review your ESP32 wiring before demo day.
          </p>
          <a
            href="https://wa.me/601172792500?text=Hi%20Rectronx!%20I%20need%20help%20with%20ESP32%20pinout%20and%20wiring."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead("esp32_pinout_tool_quote_mobile")}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-blue px-4 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-brand-blue-dark"
          >
            Get wiring help
          </a>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-extrabold text-white">Quick summary</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Use this ESP32 pinout tool to pick safer pins for sensors, displays, relays, UART, I2C, SPI, PWM, DAC, and analog inputs before wiring your prototype.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-extrabold text-white">Common mistakes</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-white/65">
              <li>Using GPIO34 to GPIO39 for output.</li>
              <li>Reading ADC2 while WiFi is active.</li>
              <li>Pulling a boot strapping pin to the wrong level.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-extrabold text-white">Related resources</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm font-bold text-brand-blue-light">
              <Link href="/components/esp32" className="hover:text-white">ESP32 component hub</Link>
              <Link href="/blog/esp32-project-ideas" className="hover:text-white">ESP32 project ideas</Link>
              <Link href="/catalog?search=esp32" className="hover:text-white">ESP32 Projek Akhir Tahun titles</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
