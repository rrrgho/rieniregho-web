import type { ReactNode } from "react";

export const metadata = {
  title: "Working Experience",
  description: "Spy how I work with companies",
};

export default async function ProjectDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
