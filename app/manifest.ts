import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rectronx Circuits — FYP Projects & Commercial Software",
    short_name: "Rectronx",
    description:
      "Malaysia's engineering & technology company for Final Year Projects and commercial software. IoT, Arduino, ESP32, Raspberry Pi.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1C2E",
    theme_color: "#0F1C2E",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["education", "technology", "business"],
    lang: "en-MY",
  };
}
