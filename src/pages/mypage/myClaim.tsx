import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sampleImg from "../../assets/sample-product.jpg";
export default function MyClaim() {
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
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">취소/반품/교환 내역</h2>
        </div>
      </div>
      {/* 탭 영역 */}
      <div className="max-w-5xl mx-auto font-semibold flex gap-4 ">
        <button className="w-[150px] px-4 py-2 border border-[#5C4033] rounded-[10px] hover:bg-[#5C4033] hover:text-white cursor-pointer">
          취소
        </button>
        <button className="w-[150px] px-4 py-2 border border-[#5C4033] rounded-[10px] hover:bg-[#5C4033] hover:text-white cursor-pointer">
          반품
        </button>
        <button className="w-[150px] px-4 py-2 border border-[#5C4033] rounded-[10px] hover:bg-[#5C4033] hover:text-white cursor-pointer">
          교환
        </button>
      </div>
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto font-semibold mt-4">
        주문번호 20124103
      </div>
      <div className="max-w-5xl mx-auto text-[#A8A9AD] font-semibold mb-2">
        결제날짜 2026-01-05
      </div>
      <hr className="max-w-5xl mx-auto border-black border-t-[1px]" />
      <div className="max-w-5xl mx-auto font-semibold flex gap-4 my-4">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />
        <div className="flex-1 text-sm">
          <p className="font-medium font-semibold mb-1 color-[#000000]">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="text-gray-600">색상: 블랙</p>
          <p className="text-gray-600">사이즈: S</p>
          <p className="text-gray-600">수량: 1개</p>
        </div>
        {/* 결제 정보 */}
        <div className="text-right text-sm whitespace-nowrap">
          <p className="text-gray-600 mb-1">취소 완료</p>
          <p className="font-semibold">84,000원</p>
        </div>
      </div>
    </div>
  );
}
