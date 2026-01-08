import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import outer1 from "../../assets/proudct/outer.png";
import outer2 from "../../assets/proudct/outer2.png";
import outer3 from "../../assets/proudct/outer3.png";

export default function MyWishList() {
  const navigate = useNavigate();

  // 찜 목록 데이터 상태 관리
  const [wishItems, setWishItems] = useState([
    {
      id: 1,
      name: "슈페리어 다운 파카-BLAK",
      price: "289,000원",
      image: outer1,
      isLiked: true,
    },
    {
      id: 2,
      name: "우먼 크롭 패딩 자켓",
      price: "289,000원",
      image: outer2,
      isLiked: true,
    },
    {
      id: 3,
      name: "Soft Collar fur Jacket (Ash ivory)",
      price: "194,000원",
      originalPrice: "289,000원",
      discount: "30%",
      image: outer3,
      isLiked: true,
    },
  ]);

  // 하트 토글 함수
  const toggleLike = (id: number) => {
    setWishItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
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
          <h2 className="text-[32px] font-bold text-[#5C4033] tracking-tighter">찜한 상품</h2>
        </div>
      </div>

      {/* 상품 그리드 영역 */}
      <div className="max-w-[950px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-15 gap-y-20">
          {wishItems.map((item) => (
            <div key={item.id} className="group relative flex flex-col">
              {/* 이미지 컨테이너 */}
              <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden rounded-sm mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* 하트 아이콘 */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-3 right-3 z-10 p-1"
                >
                  <Heart
                    size={20}
                    className={`transition-colors duration-300 ${item.isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-300 fill-transparent"
                      }`}
                  />
                </button>
              </div>

              {/* 상품 정보 */}
              <div className="space-y-1">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  {item.discount && (
                    <span className="text-red-500 font-bold text-[14px]">{item.discount}</span>
                  )}
                  <span className="text-[14px] font-bold text-gray-900">{item.price}</span>
                </div>
                {item.originalPrice && (
                  <p className="text-[12px] text-gray-400 line-through">
                    {item.originalPrice}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-20 flex justify-center items-center gap-6 text-[13px] font-medium text-gray-500">
          <button className="text-gray-900 font-bold border-b border-gray-900">1</button>
          <button className="hover:text-gray-900 transition-colors">2</button>
          <button className="hover:text-gray-900 transition-colors">3</button>
          <button className="hover:text-gray-900 transition-colors">4</button>
          <button className="hover:text-gray-900 transition-colors">5</button>
          <button className="hover:text-gray-900 transition-colors ml-2 tracking-tighter"> &gt;&gt; </button>
        </div>
      </div>
    </div>
  );
}
