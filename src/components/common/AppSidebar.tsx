import { CLASS_CATEGORY } from "@/constants/category.constants"
import { Separator } from "@/components/ui/separator"
import Logo from "@/assets/Logo.png"
import { ChevronDown } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"




function AppSidebar() {
    return (
        <aside className="min-w-80 w-80 flex flex-col gap-6" style={{ backgroundColor: "#5C4033" }}>
            <div className="flex items-center gap-2 justify-between gap-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
                    <img
                        src={Logo}
                        alt="LaClave Logo"
                        className="h-10 w-auto object-contain mx-auto block pt-1 pb-1"  // 높이 48px, 비율 유지
                    />
                    <div className="flex items-center gap-2 text-[9px] justify-center">
                        <div className="text-white text-[9px] cursor-pointer font-semibold">회원가입</div>
                        <div className="text-white text-[9px] cursor-pointer font-semibold">로그인</div>
                        <div className="text-white text-[9px] cursor-pointer font-semibold">주문조회</div>
                        <div className="text-white text-[9px] cursor-pointer font-semibold">최근 본 상품</div>
                    </div>
                    <Separator className="!w-[320px] my-2" />



                </h4>
            </div>
            <div className="w-full flex flex-col gap-10 pl-5">
                {CLASS_CATEGORY.map((menu) => {
                    return (
                        <div key={menu.id} className="flex items-left gap-2">
                            <button
                                className="justify-start text-white hover:text-white hover:pl-6 transition-all duration-500">
                                {menu.label}
                            </button>
                            <ChevronDown className="mt-1 text-white " />
                        </div>

                    )

                })}
            </div>

        </aside>
    )
}

export { AppSidebar }
