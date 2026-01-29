import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { getRecentProducts } from "../../api/myPage/recentApi";
import type { RecentProduct } from "../../api/myPage/recentApi";

export default function MyRecent() {
  const navigate = useNavigate();

  const [recentItems, setRecentItems] = useState<RecentProduct[]>([]);

  // 이미지 매핑 (상품 idx → 이미지)
  const imageMap: Record<number, string> = {
    1: "",
    2: "",
    3: "",
  };

  // 최근 본 상품 가져오기
  useEffect(() => {
    getRecentProducts()
      .then((data) => {
        console.log("최근 본 상품 응답:", data);
        setRecentItems(data);
      })
      .catch(console.error);
  }, []);
  // 하트 토글
  const toggleLike = (productIdx: number) => {
    setRecentItems((prev) =>
      prev.map((item) =>
        item.productIdx === productIdx
          ? { ...item, isLiked: !item.isLiked }
          : item,
      ),
    );
  };

  return (
    <div className="pb-10 min-h-screen">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-12">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[32px] font-bold text-[#5C4033] tracking-tighter">
            최근 본 상품
          </h2>
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-10">
          {recentItems.map((item) => (
            <div
              key={item.productIdx}
              className="group relative flex flex-col cursor-pointer"
              onClick={() => navigate(`/product/${item.productIdx}`)}
            >
              <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden rounded-sm mb-2">
                <img
                  src={
                    item.productImageUrl
                      ? `http://localhost:8080${item.productImageUrl}`
                      : ""
                  }
                  alt={item.productName || `상품 ${item.productIdx}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.productIdx);
                  }}
                  className="absolute top-2 right-2 z-10 p-1"
                >
                  <Heart
                    size={18}
                    className={`transition-colors duration-300 ${(item as any).isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-300 fill-transparent"
                      }`}
                  />
                </button>
              </div>
              <div className="space-y-1">
                <h3 className="text-[12px] font-bold text-gray-900 leading-tight">
                  {item.productName || `상품 ${item.productIdx}`}
                </h3>
                <span className="text-[12px] font-bold text-gray-900">
                  {item.price + "원" || "-원"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
