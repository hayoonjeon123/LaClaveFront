import { Header, Footer, AppSidebar } from "../components/common";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <AppSidebar open={isSidebarOpen} onOpenChange={setSidebarOpen} />

      {/* 메인 콘텐츠 */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { MainLayout };
