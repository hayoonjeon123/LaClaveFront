import { Header, Footer } from "../components/common";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { MainLayout };
