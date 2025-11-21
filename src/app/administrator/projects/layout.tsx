export const metadata = {
  title: "My Projects",
  description: "Showcasing my best work I have done",
};

export default function LayoutAdminProjects({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
