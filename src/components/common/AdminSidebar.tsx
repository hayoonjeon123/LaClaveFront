import { ADMIN_CATEGORY } from "@/constants/category.constants"
import Logo from "@/assets/Logo.png"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

// 관리자 사이드바
function AdminSidebar() {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleMenu = (id: number) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleMenuClick = (menu: any) => {
        if (menu.subItems) {
            toggleMenu(menu.id);
        } else if (menu.path) {
            console.log('Navigating to:', menu.path);
            navigate(menu.path);
        }
    };

    return (
        <div className="w-[300px] h-full bg-[#5C4033] flex flex-col font-['Inter',sans-serif]">
            <div className="p-6 border-b border-[#7A5C4E] flex flex-col items-center">
                <img
                    src={Logo}
                    alt="LaClave"
                    className="w-24 mb-6"
                />
                {/* 사이드바 */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-white text-sm font-medium text-[30px]">관리자님</span>
                    </div>
                </div>
            </div>


            <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="flex flex-col gap-1">
                    {ADMIN_CATEGORY.map((menu) => (
                        <div key={menu.id} className="w-full">
                            <button
                                onClick={() => handleMenuClick(menu)}
                                className={`flex items-center justify-between w-full text-left text-white text-sm py-3 px-3 rounded-lg transition-all duration-200 ${openMenuId === menu.id ? 'bg-[#4A332A]' : 'hover:bg-[#4A332A]'}`}
                            >
                                <span className="font-medium text-[15px]">{menu.label}</span>
                                {menu.subItems && (
                                    <ChevronDown
                                        className={`ml-2 text-white/70 transition-transform duration-200 ${openMenuId === menu.id ? "rotate-180" : ""}`}
                                        size={16}
                                    />
                                )}
                            </button>

                            {menu.subItems && openMenuId === menu.id && (
                                <div className="mt-1 ml-2 pl-2 border-l border-[#7A5C4E] space-y-1">
                                    {menu.subItems.map((subItem: any, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => navigate(subItem.path)}
                                            className="w-full text-left text-[#D4C5C0] hover:text-white hover:bg-[#4A332A] text-sm py-2 px-3 rounded-md transition-colors"
                                        >
                                            {subItem.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { AdminSidebar }
