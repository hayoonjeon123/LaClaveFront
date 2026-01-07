import {
  ShoppingCart,
  Bell,
  Settings,
  Heart,
  Phone,
  ClipboardList,
  Gift,
  Truck,
  List,
  ArrowRight,
  Smile,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

const RECENT_PRODUCTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop",
    name: "Soft Collar fur Jacket (Ash ivory)",
    discount: "30%",
    price: "194,000원",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544026116-f3689408e06a?w=300&h=400&fit=crop",
    name: "T.S FLEECE JACKET - CHARCOAL",
    discount: "30%",
    price: "90,300원",
  }
];

const AI_PRODUCTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop",
    name: "레이스 플리스 배색 리버시블 점퍼 블랙",
    discount: "38%",
    price: "98,580원",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595152772835-21967499ac8a?w=300&h=400&fit=crop",
    name: "T Sherpa Fleece Jacket Grey",
    discount: "30%",
    price: "165,000원",
  }
];

function ProductCard({ product }: { product: any }) {
  return (
    <div className="w-[180px] flex-shrink-0">
      <div className="w-[180px] h-[230px] overflow-hidden bg-gray-100 mb-2">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-1">
        <p className="text-[12px] font-medium line-clamp-2 h-[32px]">{product.name}</p>
        <div className="flex gap-2 items-center">
          <span className="text-red-500 font-bold text-[13px]">{product.discount}</span>
          <span className="font-bold text-[13px]">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <div className="min-h-screen bg-white font-['Gowun_Dodum'] text-black pb-10">
      {/* Title */}
      <div className="text-center py-6">
        <h2 className="text-[40px] font-bold text-[#5C4033] tracking-tight">My Page</h2>
      </div>

      <div className="max-w-[1100px] mx-auto px-6">
        {/* User Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="w-[80px] h-[80px] flex items-center justify-center border-[2px] border-black rounded-full overflow-hidden">
              <Smile size={60} />
            </div>
            <span className="font-bold text-[#333] text-[28px]">
              빛나는 초코님 VIP
            </span>
          </div>
          <div className="flex gap-6 text-[#333]">
            <ShoppingCart size={40} strokeWidth={1.5} className="cursor-pointer" />
            <Bell size={40} strokeWidth={1.5} className="cursor-pointer" />
            <Settings size={40} strokeWidth={1.5} className="cursor-pointer" />
          </div>
        </div>

        {/* Quick Menu Card */}
        <div className="mb-6">
          <div className="w-full h-[150px] grid grid-cols-6 gap-4 p-4 border border-[#504033] rounded-[20px] bg-white shadow-sm">
            {[
              { icon: <List size={40} />, label: "주문", path: "/myOrders" },
              { icon: <ClipboardList size={40} />, label: "리뷰", path: "/myReview" },
              { icon: <Phone size={40} />, label: "문의", path: "/myInquiryHistory" },
              { icon: <Heart size={40} />, label: "찜", path: "/myWishList" },
              { icon: <Package size={40} />, label: "쿠폰", path: "/myCoupon" },
              { icon: <Gift size={40} />, label: "포인트", path: "/myPoint" },
            ].map((item, idx) => (
              <Link
                to={item.path}
                key={idx}
                className="flex flex-col items-center justify-center gap-3 text-[#333] hover:opacity-70 transition"
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[16px] font-bold">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 배송현황 Section */}
        <div className="mb-4">
          <Link to="/myDelivery" className="group">
            <div className="flex justify-between items-center border-b border-[#5C4033] pb-2">
              <div className="flex items-center gap-3">
                <Truck size={30} strokeWidth={1.5} className="text-[#5C4033]" />
                <h3 className="font-bold text-[20px]">배송현황</h3>
              </div>
              <ArrowRight size={24} className="text-gray-400 group-hover:text-black transition" />
            </div>
          </Link>
        </div>

        {/* 최근 본 상품 Section */}
        <div className="mb-4">
          <Link to="/myRecent" className="group">
            <div className="flex justify-between items-center pb-2 mb-2">
              <div className="flex items-center gap-3 text-left">
                <Gift size={30} strokeWidth={1.5} className="text-[#5C4033]" />
                <h3 className="font-bold text-[20px]">최근 본 상품</h3>
              </div>
              <ArrowRight size={24} className="text-gray-400 group-hover:text-black transition" />
            </div>
          </Link>
          <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 border-b border-[#5C4033] mb-4">
            {RECENT_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* AI 추천 상품 Section */}
        <div className="mb-4">
          <Link to="/myAi" className="group">
            <div className="flex justify-between items-center pb-2 mb-2">
              <div className="text-left">
                <h3 className="font-bold text-[20px]">AI 추천 상품</h3>
              </div>
              <ArrowRight size={24} className="text-gray-400 group-hover:text-black transition" />
            </div>
          </Link>
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {AI_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
