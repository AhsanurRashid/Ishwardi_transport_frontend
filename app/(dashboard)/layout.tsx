import Sidebar from "@/components/dashboard/sidebar/side-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <div className="2xl:min-w-[320px] min-w-[250px] min-h-screen bg-white shadow-md p-4 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="p-4 w-full">
        {children}
      </div>
    </section>
  )
}