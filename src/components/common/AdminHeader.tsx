import { Link, useLocation } from "react-router-dom";
import { ADMIN_CATEGORY } from "@/constants/category.constants";

export function AdminHeader() {
    const location = useLocation();

    const getPageTitle = (pathname: string) => {
        if (pathname === '/admin' || pathname === '/admin/') return '홈';

        for (const category of ADMIN_CATEGORY) {
            if (category.path && category.path !== '/admin' && pathname.startsWith(category.path)) {
                return category.label;
            }
            if (category.subItems) {
                for (const subItem of category.subItems) {
                    if (typeof subItem !== 'string' && subItem.path && pathname.startsWith(subItem.path)) {
                        return category.label;
                    }
                }
            }
        }
        return 'La Clave';
    };

    return (
        <header className="w-full h-[80px] bg-[#A8A9AD] px-8 flex items-center justify-between font-['Inter',sans-serif]">
            {/* Left Title */}
            <h1 className="text-3xl font-bold text-black tracking-tight">
                {getPageTitle(location.pathname)}
            </h1>

            {/* Right Navigation */}
            <div className="flex items-center gap-6 text-lg font-medium text-[#1E1E1E]">
                <button className="hover:text-white transition-colors">
                    로그아웃
                </button>
                <Link to="/" className="hover:text-white transition-colors">
                    사용자화면
                </Link>
            </div>
        </header>
    );
}
