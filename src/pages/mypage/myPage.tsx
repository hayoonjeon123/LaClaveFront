import {
  ShoppingCart,
  Bell,
  Settings,
  Heart,
  Phone,
  ClipboardList,
  Gift,
  Database,
  Truck,
  List,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function MyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Gowun_Dodum'] text-black">
      {/* Title */}
      <div className="text-center my-10">
        <h2 className="text-3xl font-bold text-[#5C4033]">My Page</h2>
      </div>

      {/* User Info */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#5C4033] text-3xl">
              빛나는 초코님 VIP
            </span>
          </div>
          <div className="flex gap-4 text-[#5C4033]">
            <ShoppingCart
              size={30}
              strokeWidth={2}
              className="cursor-pointer"
            />
            <Bell size={30} strokeWidth={2} className="cursor-pointer" />
            <Settings size={30} strokeWidth={2} className="cursor-pointer" />
          </div>
        </div>

        {/* Quick Menu */}
        <div className="mb-10">
          <div className="w-full h-[140px] grid grid-cols-6 gap-6 p-6 border border-[#5C4033] rounded-[10px] bg-white">
            {[
              { icon: <List size={30} />, label: "주문", path: "/myOrders" },
              {
                icon: <ClipboardList size={30} />,
                label: "리뷰",
                path: "/myReview",
              },
              {
                icon: <Phone size={30} />,
                label: "문의",
                path: "/myInquiryHistory",
              },
              { icon: <Heart size={30} />, label: "찜", path: "/myWishList" },
              { icon: <Gift size={30} />, label: "쿠폰", path: "/myCoupon" },
              {
                icon: <Database size={30} />,
                label: "포인트",
                path: "/myPoint",
              },
            ].map((item, idx) => (
              <Link
                to={item.path}
                key={idx}
                className="flex flex-col items-center gap-2 text-[#5C4033]"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        {/* 배송현황 */}
        <div className="mb-10">
          <Link to="/myDelivery">
            <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
              <h3 className="font-semibold flex items-center gap-2 text-3xl">
                <Truck size={40} strokeWidth={2} className="text-[#5C4033]" />
                배송현황
              </h3>
              <ArrowRight className="cursor-pointer" />
            </div>
          </Link>
        </div>

        {/* Section Box */}
        {["최근 본 상품", "AI 추천 상품"].map((title, idx) => (
          <Link
            to={title === "최근 본 상품" ? "/myRecent" : "/myAi"}
            key={idx}
            className="mb-10"
          >
            <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
              <Gift size={40} strokeWidth={2} className="text-[#5C4033]" />
              <h3 className="font-semibold text-3xl">{title}</h3>
              <ArrowRight className="cursor-pointer" />
            </div>
            <div className="bg-[#F5F5F5] rounded-[10px] p-6 text-sm">
              콘텐츠 영역
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
