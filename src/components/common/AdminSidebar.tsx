import { ADMIN_CATEGORY, CLASS_CATEGORY } from "@/constants/category.constants"
import { Separator } from "@/components/ui/separator"
import Logo from "@/assets/Logo.png"
import { ChevronDown } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"

// 관리자 사이드바
function AdminSidebar() {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const toggleMenu = (id: number) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        if (!isSheetOpen) {
            setOpenMenuId(null);
        }
    }, [isSheetOpen]);

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="p-2 bg-[#5C4033] text-white rounded-lg" onClick={() => setIsSheetOpen(true)}>
                메뉴
            </SheetTrigger>

            <SheetContent side="left" className="w-80 p-0 bg-[#5C4033] border-none">
                <div className="h-full flex flex-col">
                    {/* 로고 + 상단 메뉴 */}
                    <div className="p-4 flex flex-col items-center border-b border-white/20">
                        <img
                            src={Logo}
                            alt="LaClave Logo"
                            className="h-10 w-auto object-contain mx-auto block"
                        />

                        <div className="flex items-center gap-3 w-full justify-center mb-3">
                            <img
                                src={Logo}
                                alt="LaClave Logo"
                                className="h-10 w-auto object-contain flex-shrink-0"
                            />
                            <span className="text-white font-semibold text-[20px]">관리자님</span>
                        </div>

                    </div>

                    {/* 카테고리 + 서브메뉴 */}
                    <div className="flex-1 mt-4 px-5 py-2">
                        <div className="w-full flex flex-col gap-5">
                            {ADMIN_CATEGORY.map((menu, index) => (
                                <div key={menu.id} className="w-full">
                                    {/* 메인 메뉴 버튼 */}
                                    <button
                                        onClick={() => toggleMenu(menu.id)}
                                        className="flex items-center justify-between w-full text-left text-white text-sm py-3 px-2 hover:pl-4 hover:bg-white/10 rounded-lg transition-all duration-300"
                                    >
                                        <span>{menu.label}</span>
                                        {menu.subItems && (
                                            <ChevronDown
                                                className={`ml-2 text-white transition-transform duration-300 ${openMenuId === menu.id ? "rotate-180" : ""
                                                    }`}
                                                size={16}
                                            />
                                        )}
                                    </button>

                                    {/* 서브메뉴 */}
                                    {menu.subItems && openMenuId === menu.id && (
                                        <div className="ml-8 mt-2 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
                                            {menu.subItems.map((subItem, index) => (
                                                <button
                                                    key={index}
                                                    className="text-xs text-gray-200 hover:text-white hover:bg-white/5 py-1.5 px-2 rounded-md transition-colors text-left"
                                                >
                                                    {subItem}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
export { AdminSidebar }
