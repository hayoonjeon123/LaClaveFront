import { Link } from "react-router-dom";

export function AdminHeader() {
    return (
        <header className="w-full h-[80px] bg-[#A8A9AD] px-8 flex items-center justify-between font-['Inter',sans-serif]">
            {/* Left Title */}
            <h1 className="text-3xl font-bold text-black tracking-tight">
                고객
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
