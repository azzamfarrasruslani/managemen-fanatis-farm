import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="mt-1 p-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}

