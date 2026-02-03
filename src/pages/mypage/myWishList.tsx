import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getWishlistByMember,
  deleteWishlist,
} from "../../api/myPage/wishlistApi";
import type { Wishlist } from "../../api/myPage/wishlistApi";

export default function MyWishList() {
  const navigate = useNavigate();
  const [wishItems, setWishItems] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 찜 목록 조회 (memberIdx 없음)
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/loginProc");
      return;
    }
    getWishlistByMember()
      .then((data) => {
        setWishItems(data);
      })
      .catch((err) => {
        console.error("❌ wishlist error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ 찜 해제
  const toggleLike = async (productIdx: number) => {
    await deleteWishlist(productIdx);
    setWishItems((prev) =>
      prev.filter((item) => item.productIdx !== productIdx),
    );
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-400">불러오는 중...</p>;
  }

  return (
    <div className="pb-10 min-h-screen">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-12">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[32px] font-bold text-[#5C4033]">찜한 상품</h2>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="max-w-[950px] mx-auto px-6">
        {wishItems.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            찜한 상품이 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-20">
            {wishItems.map((item) => (
              <div
                key={item.productIdx}
                className="group relative flex flex-col cursor-pointer" // 커서 표시
                onClick={() => navigate(`/product/${item.productIdx}`)} // 클릭 시 상세페이지 이동
              >
                <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden mb-3">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />

                  {/* 찜 버튼은 클릭 이벤트가 div 클릭을 방해하지 않도록 stopPropagation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // div 클릭 이벤트 막기
                      toggleLike(item.productIdx);
                    }}
                    className="absolute top-3 right-3 p-1"
                  >
                    <Heart size={20} className="fill-red-500 text-red-500" />
                  </button>
                </div>

                <h3 className="text-[14px] font-bold text-gray-900">
                  {item.productName}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
