import LayoutWrapper from "@/components/layout-wrapper";
import type { ReactNode } from "react";

export const metadata = {
  title: "My Projects",
  description: "Showcasing my best work I have done",
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <LayoutWrapper page_info={metadata}>{children}</LayoutWrapper>;
}
