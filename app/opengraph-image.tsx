import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rectronx Circuits — Engineering & Technology Company | FYP Projects & Commercial Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0F1C2E",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: "50%",
            transform: "translateY(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(43,127,212,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              background: "#2B7FD4",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 900,
              color: "white",
            }}
          >
            R
          </div>
          <span style={{ color: "white", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            Rectronx Circuits
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(43,127,212,0.15)",
            border: "1px solid rgba(43,127,212,0.4)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 24,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ color: "#93c5fd", fontSize: 16, fontWeight: 600, letterSpacing: 1 }}>
            MALAYSIA&apos;S ENGINEERING &amp; TECHNOLOGY COMPANY
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 700,
            marginBottom: 24,
          }}
        >
          FYP Projects &{" "}
          <span style={{ color: "#2B7FD4" }}>Commercial</span>{" "}
          Software
        </div>

        {/* Subtext */}
        <div style={{ fontSize: 22, color: "#94a3b8", maxWidth: 600, lineHeight: 1.5 }}>
          IoT · Arduino · Raspberry Pi · ESP32 · Web Apps · Penang, Malaysia
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
          {[
            { value: "500+", label: "Project Titles" },
            { value: "400+", label: "Delivered" },
            { value: "8 Yrs", label: "Experience" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#2B7FD4", fontSize: 32, fontWeight: 800 }}>{s.value}</span>
              <span style={{ color: "#64748b", fontSize: 15, marginTop: 2 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
