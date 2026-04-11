import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
