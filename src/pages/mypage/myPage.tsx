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
import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { getMemberInfo } from "@/api/memberApi";

// ------------------- ProductCard -------------------
function ProductCard({ product }: { product: any }) {
  const imageUrl = product.image || (product.images?.[0]?.imagePath ?? "");
  const nameDisplay = product.productName || product.name;
  const priceDisplay =
    product.productPrice !== undefined
      ? typeof product.productPrice === "number"
        ? product.productPrice.toLocaleString() + "원"
        : product.productPrice
      : product.price;

  const discountDisplay =
    product.productDiscountRate !== undefined
      ? product.productDiscountRate + "%"
      : (product.discount ?? null);

  return (
    <div className="w-[180px] flex-shrink-0">
      <Link to={`/product/${product.productIdx || product.id}`}>
        <div className="w-[180px] h-[230px] overflow-hidden bg-gray-100 mb-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={nameDisplay}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200 text-xs">
              No Image
            </div>
          )}
        </div>
        <div className="space-y-0">
          <p className="text-[12px] font-medium line-clamp-2 leading-tight">
            {nameDisplay}
          </p>
          <div className="flex gap-2 items-center mt-0.5">
            {discountDisplay && (
              <span className="text-red-500 font-bold text-[13px]">
                {discountDisplay}
              </span>
            )}
            <span className="font-bold text-[13px]">{priceDisplay}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ------------------- MyPage -------------------
export default function MyPage() {
  const [member, setMember] = useState<{
    nickname: string;
    level: string;
  } | null>(null);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [aiProducts, setAiProducts] = useState<any[]>([]);

  // === 회원 정보 조회 ===
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMemberInfo();
        setMember(data);
      } catch (error) {
        console.error("회원 정보 로딩 실패:", error);
      }
    };
    fetchMember();
  }, []);

  // === 최근 본 상품 조회 (localStorage) ===
  useEffect(() => {
    const saved = localStorage.getItem("recentProducts");
    if (saved) {
      setRecentProducts(JSON.parse(saved));
    } else {
      // 초기 예시 데이터
      const initialProducts = [
        {
          id: 1,
          name: "Soft Collar fur Jacket",
          price: "194,000원",
          image:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop",
        },
        {
          id: 2,
          name: "T.S FLEECE JACKET - CHARCOAL",
          price: "90,300원",
          image:
            "https://images.unsplash.com/photo-1544026116-f3689408e06a?w=300&h=400&fit=crop",
        },
      ];
      setRecentProducts(initialProducts);
    }
  }, []);

  // === AI 추천 상품 조회 ===
  useEffect(() => {
    const fetchAiProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/ai/recommend");
        if (Array.isArray(response.data)) {
          setAiProducts(response.data.slice(0, 5));
        }
      } catch (error) {
        console.error("AI 추천 상품 로딩 실패:", error);
      }
    };
    fetchAiProducts();
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-6 pb-10 min-h-screen">
      {/* Title */}
      <div className="text-center py-6">
        <h2 className="text-[40px] font-bold text-[#5C4033] tracking-tight">
          My Page
        </h2>
      </div>

      {/* User Info */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="w-[80px] h-[80px] flex items-center justify-center border-[2px] border-black rounded-full overflow-hidden">
            <Smile size={60} />
          </div>
          <span className="font-bold text-[#333] text-[28px]">
            {member ? `${member.nickname}님` : "로딩 중..."}
          </span>
        </div>
        <div className="flex gap-6 text-[#333] items-center">
          <Link to="/cart" className="hover:opacity-70 transition">
            <ShoppingCart size={40} strokeWidth={1.5} />
          </Link>
          <Bell size={40} strokeWidth={1.5} className="cursor-pointer" />
          <Link to="/myMemberEdit" className="hover:opacity-70 transition">
            <Settings size={40} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Quick Menu Card */}
      <div className="mb-6">
        <div className="w-full h-[150px] grid grid-cols-6 gap-4 p-4 border border-[#504033] rounded-[20px] bg-white shadow-sm">
          {[
            { icon: <List size={40} />, label: "주문", path: "/myOrders" },
            {
              icon: <ClipboardList size={40} />,
              label: "리뷰",
              path: "/myReview",
            },
            {
              icon: <Phone size={40} />,
              label: "문의",
              path: "/myInquiryHistory",
            },
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

      {/* 최근 본 상품 Section */}
      <div className="mb-4">
        <Link to="/myRecent" className="group">
          <div className="flex justify-between items-center pb-2 mb-2">
            <div className="flex items-center gap-3 text-left">
              <Gift size={30} strokeWidth={1.5} className="text-[#5C4033]" />
              <h3 className="font-bold text-[20px]">최근 본 상품</h3>
            </div>
            <ArrowRight
              size={24}
              className="text-gray-400 group-hover:text-black transition"
            />
          </div>
        </Link>
        <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 border-b border-[#5C4033] mb-4">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-gray-400 py-4 w-full text-center">
              최근 본 상품이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* AI 추천 상품 Section */}
      <div className="mb-4">
        <Link to="/myAi" className="group">
          <div className="flex justify-between items-center pb-2 mb-2">
            <div className="text-left">
              <h3 className="font-bold text-[20px]">AI 추천 상품</h3>
            </div>
            <ArrowRight
              size={24}
              className="text-gray-400 group-hover:text-black transition"
            />
          </div>
        </Link>
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {aiProducts.length > 0 ? (
            aiProducts.map((product) => (
              <ProductCard key={product.productIdx} product={product} />
            ))
          ) : (
            <div className="text-gray-400 py-4 w-full text-center">
              추천 상품을 로딩 중이거나 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
