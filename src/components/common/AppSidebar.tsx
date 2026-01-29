import { CLASS_CATEGORY } from "@/constants/category.constants"
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom";
// navigate hook moved inside component
import Logo from "@/assets/image/Logo.png"
import { ChevronDown } from "lucide-react"
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react"


interface AppSidebarProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

function AppSidebar({ open, onOpenChange }: AppSidebarProps) {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const localLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(localLoggedIn);
    }, [open]);

    const toggleMenu = (id: number) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        if (!open) {
            setOpenMenuId(null);
        }
    }, [open]);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("memberId");
            setIsLoggedIn(false);
            onOpenChange?.(false);
            navigate("/");
            window.location.reload();
        }
    };
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>

            <SheetContent side="left" className="w-80 p-0 bg-[#5C4033] border-none">
                <div className="h-full flex flex-col">
                    <div className="p-4 flex flex-col items-center border-b border-white/20">
                        <img
                            src={Logo}
                            alt="LaClave Logo"
                            className="h-10 w-auto object-contain mx-auto block"
                        />

                        <div className="mt-3 flex items-center gap-2 text-[9px] flex-wrap justify-center">
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => { navigate("/myPage"); onOpenChange?.(false); }}
                                        className="text-white font-semibold cursor-pointer px-1 py-0.5 hover:bg-white/10 rounded"
                                    >
                                        마이페이지
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="text-white font-semibold cursor-pointer px-1 py-0.5 hover:bg-white/10 rounded"
                                    >
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { navigate("/signup"); onOpenChange?.(false); }}
                                        className="text-white font-semibold cursor-pointer px-1 py-0.5 hover:bg-white/10 rounded"
                                    >
                                        회원가입
                                    </button>
                                    <button
                                        onClick={() => { navigate("/loginProc"); onOpenChange?.(false); }}
                                        className="text-white font-semibold cursor-pointer px-1 py-0.5 hover:bg-white/10 rounded"
                                    >
                                        로그인
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => { navigate(isLoggedIn ? "/myOrders" : "/loginProc"); onOpenChange?.(false); }}
                                className="text-white font-semibold cursor-pointer px-1 py-0.5 hover:bg-white/10 rounded"
                            >
                                주문조회
                            </button>
                            <button
                                onClick={() => { navigate("/recent-products"); onOpenChange?.(false); }}
                                className="text-white font-semibold cursor-pointer px-1 py-0.5 hover:bg-white/10 rounded"
                            >
                                최근 본 상품
                            </button>
                        </div>
                    </div>

                    {/* 카테고리 + 서브메뉴 */}
                    <div className="flex-1 mt-4 px-5 py-2">
                        <div className="w-full flex flex-col gap-5">
                            {CLASS_CATEGORY.map((menu) => (
                                <div key={menu.id} className="w-full">
                                    {/* 메인 메뉴 버튼 */}
                                    <button
                                        onClick={() => {
                                            if (menu.subItems) {
                                                // 서브메뉴가 있으면 토글만 (페이지 이동 없음)
                                                toggleMenu(menu.id);
                                            } else {
                                                // 서브메뉴가 없으면(베스트, 고객센터 등) 바로 이동
                                                navigate(menu.path);
                                                onOpenChange?.(false);
                                            }
                                        }}
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

                                    {/* 서브메뉴 - Link 컴포넌트 활용 */}
                                    {menu.subItems && openMenuId === menu.id && (
                                        <div className="ml-8 mt-2 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
                                            {menu.subItems.map((subItem: any, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={`/${menu.path}?subIdx=${subItem.id}`} // 하위 카테고리 ID 전달 (108, 109 등)
                                                    className="text-xs text-gray-200 hover:text-white hover:bg-white/5 py-1.5 px-2 rounded-md transition-colors text-left"
                                                    onClick={() => onOpenChange?.(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {/* 고객센터(7) 위에 선 추가 */}
                                    {menu.id === 6 && (
                                        <Separator className="my-4 bg-white/40" />
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
export { AppSidebar }
