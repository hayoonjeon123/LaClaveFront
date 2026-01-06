import { Outlet } from "react-router-dom";
import { AdminHeader, AdminFooter, AdminSidebar } from "@/components/common";

export function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100 font-['Inter',sans-serif]">
            <div className="flex-shrink-0 bg-[#5C4033]">
                <AdminSidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader />
                <main className="flex-1 p-8 overflow-auto">
                    <Outlet />
                </main>
                <AdminFooter />
            </div>
        </div>
    );
}
