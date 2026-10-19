import type { Metadata } from "next";
import { TreeMission } from "@/components/TreeMission";

export const metadata: Metadata = {
  title: "ภารกิจต้นไม้และน้ำ",
  description: "ลองคาดการณ์ รดน้ำ สังเกตผล และปรับวิธีคิดกับต้นไม้หนึ่งต้น",
};

export default function TreeMissionPage() {
  return <TreeMission />;
}
