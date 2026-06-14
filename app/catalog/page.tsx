import { Metadata } from "next";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "FYP Project Catalog — 500+ Titles | Rectronx Circuits",
  description:
    "Browse 500+ Final Year Project titles in IoT, Electronics, Software, AI and more. Find your perfect FYP with Rectronx Circuits.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
