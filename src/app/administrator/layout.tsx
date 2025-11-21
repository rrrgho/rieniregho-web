import AdminAppSidebar from "@/components/admin-app-sidebar";

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAppSidebar>
      <div className="px-10">{children}</div>
    </AdminAppSidebar>
  );
}
