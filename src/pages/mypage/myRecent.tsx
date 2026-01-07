import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sampleImg from "../../assets/sample-product.jpg";
export default function MyRecent() {
  const navigate = useNavigate();
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">최근 본 상품</h2>
        </div>
      </div>
      {/* 최근 본 날짜 */}
      <div className="max-w-5xl mx-auto font-semibold">2026-01-05</div>
      <hr className="max-w-5xl mx-auto border-black border-t-[1px]" />
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto p-4 flex gap-10">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />
        <div className="flex-1 text-sm">
          {/* 상품 정보 */}
          <p className="font-medium font-semibold mb-1 color-[#000000]">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="color-[#000000]">색상: 블랙</p>

          <p className="color-[#000000]">가격: 84,000원</p>
        </div>
      </div>
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto p-4 flex gap-10">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />
        <div className="flex-1 text-sm">
          {/* 상품 정보 */}
          <p className="font-medium font-semibold mb-1 color-[#000000]">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="color-[#000000]">색상: 블랙</p>

          <p className="color-[#000000]">가격: 84,000원</p>
        </div>
      </div>
      {/* 최근 본 날짜 */}
      <div className="max-w-5xl mx-auto font-semibold">2026-01-05</div>
      <hr className="max-w-5xl mx-auto border-black border-t-[1px]" />
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto p-4 flex gap-10">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />
        <div className="flex-1 text-sm">
          {/* 상품 정보 */}
          <p className="font-medium font-semibold mb-1 color-[#000000]">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="color-[#000000]">색상: 블랙</p>

          <p className="color-[#000000]">가격: 84,000원</p>
        </div>
      </div>
    </div>
  );
}
