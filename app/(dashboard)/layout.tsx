import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <Navbar />
        {children}
      </div>
    </section>
  );
}
