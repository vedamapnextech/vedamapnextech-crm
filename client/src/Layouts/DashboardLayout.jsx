import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-[300px]" : "w-[90px]"
        } bg-[#111827] border-r border-slate-800 transition-all duration-500 ease-in-out overflow-y-auto`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </aside>

      {/* Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 shadow-sm px-8 flex items-center justify-between">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;