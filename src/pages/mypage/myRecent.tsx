import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import outer1 from "../../assets/proudct/outer.png";
import outer2 from "../../assets/proudct/outer2.png";
import outer3 from "../../assets/proudct/outer3.png";

export default function MyRecent() {
  const navigate = useNavigate();

  // 최근 본 상품 데이터 상태 관리
  // 찜(하트) 기능은 찜 페이지와 동일하게 구현하되 데이터 개수를 더 늘림
  const [recentItems, setRecentItems] = useState([
    { id: 1, name: "슈페리어 다운 파카-BLAK", price: "289,000원", image: outer1, isLiked: false },
    { id: 2, name: "우먼 크롭 패딩 자켓", price: "289,000원", image: outer2, isLiked: true },
    { id: 3, name: "Soft Collar fur Jacket", price: "194,000원", discount: "30%", image: outer3, isLiked: false },
    { id: 4, name: "리버시블 컴포트핏 다운", price: "159,000원", image: outer1, isLiked: false },
    { id: 5, name: "데일리 퀼팅 재킷", price: "129,000원", image: outer2, isLiked: false },
    { id: 6, name: "라이트 가디건 패딩", price: "99,000원", image: outer3, isLiked: true },
    { id: 7, name: "오버사이즈 울 코트", price: "349,000원", image: outer1, isLiked: false },
    { id: 8, name: "숏 퍼 자켓", price: "219,000원", image: outer2, isLiked: false },
    { id: 9, name: "플리스 하프 집업", price: "79,000원", image: outer3, isLiked: false },
    { id: 10, name: "프리미엄 구스 다운", price: "459,000원", image: outer1, isLiked: true },
  ]);

  // 하트 토글 함수
  const toggleLike = (id: number) => {
    setRecentItems((prev) =>
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
          <h2 className="text-[32px] font-bold text-[#5C4033] tracking-tighter">최근 본 상품</h2>
        </div>
      </div>

      {/* 상품 그리드 영역 - 상품이 많을 수 있으므로 6열로 더 축소 구성 */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-10">
          {recentItems.map((item) => (
            <div key={item.id} className="group relative flex flex-col">
              {/* 이미지 컨테이너 */}
              <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden rounded-sm mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* 하트 아이콘 */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-2 right-2 z-10 p-1"
                >
                  <Heart
                    size={18}
                    className={`transition-colors duration-300 ${item.isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-300 fill-transparent"
                      }`}
                  />
                </button>
              </div>

              {/* 상품 정보 */}
              <div className="space-y-1">
                <h3 className="text-[12px] font-bold text-gray-900 leading-tight">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  {item.discount && (
                    <span className="text-red-500 font-bold text-[12px]">{item.discount}</span>
                  )}
                  <span className="text-[12px] font-bold text-gray-900">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-24 flex justify-center items-center gap-6 text-[14px] font-medium text-gray-500">
          <button className="text-gray-900 font-bold border-b border-gray-900">1</button>
          <button className="hover:text-gray-900 transition-colors">2</button>
          <button className="hover:text-gray-900 transition-colors">3</button>
          <button className="hover:text-gray-900 transition-colors ml-2 tracking-tighter"> &gt;&gt; </button>
        </div>
      </div>
    </div>
  );
}
