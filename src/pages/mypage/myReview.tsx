import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import sampleImg from "../../assets/sample-product.jpg";

export default function MyReview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"writable" | "written">(
    "writable"
  );

  return (
    <div className="max-w-[700px] mx-auto pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-4 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[24px] font-bold text-[#5C4033] tracking-tight">리뷰 관리</h2>
        </div>
      </div>

      {/* 리뷰 상단 탭*/}
      <div className="grid grid-cols-2 border-b mb-6 border-[#A8A9AD] max-w-[650px] mx-auto">
        <button
          onClick={() => setActiveTab("writable")}
          className={`w-full pb-2 font-bold text-[18px] transition cursor-pointer text-center
            ${activeTab === "writable"
              ? "text-[#5C4033] border-b-2 border-[#5C4033]"
              : "text-[#A8A9AD] hover:text-[#5C4033]"
            }`}
        >
          작성 가능 리뷰
        </button>

        <button
          onClick={() => setActiveTab("written")}
          className={`w-full pb-2 font-bold text-[18px] transition cursor-pointer text-center
            ${activeTab === "written"
              ? "text-[#5C4033] border-b-2 border-[#5C4033]"
              : "text-[#A8A9AD] hover:text-[#5C4033]"
            }`}
        >
          작성 완료 리뷰
        </button>
      </div>

      {/* 리뷰 내용 */}
      {activeTab === "writable" && (
        <div className="text-center font-medium text-[#A8A9AD] py-10 text-[16px]">
          작성 가능한 리뷰가 없습니다.
        </div>
      )}

      {activeTab === "written" && (
        <div className="space-y-4 px-6">
          {/* 리뷰 카드 (Final Redesigned Layout) */}
          <div className="border border-[#EEEEEE] rounded-[10px] shadow-sm overflow-hidden">
            {/* 상단: 상품 정보 및 액션 버튼 */}
            <div className="p-4 py-3 flex items-center gap-4">
              <div className="w-[52px] h-[52px] flex-shrink-0 overflow-hidden rounded-[8px]">
                <img
                  src={sampleImg}
                  alt="상품 이미지"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[14px] text-[#333] truncate">
                  배색 리버시블 컴포트핏 다운패딩(블랙)
                </p>
                <div className="flex items-center gap-1 text-[12px] text-[#A8A9AD] font-medium mt-0.5">
                  <span>블랙/FREE</span>
                </div>
              </div>
              <div className="flex gap-1.5 min-w-fit">
                <button className="border border-[#A8A9AD] px-3 h-7 py-0.5 rounded-[5px] text-[11px] font-bold transition cursor-pointer text-[#333]">
                  수정
                </button>
                <button className="border border-[#A8A9AD] bg-[#5C4033] text-white px-3 h-7 py-0.5 rounded-[5px] text-[11px] font-bold transition cursor-pointer">
                  삭제
                </button>
              </div>
            </div>

            {/* 구분선 */}
            <hr className="border-[#F5F5F5] mx-4" />

            {/* 하단: 리뷰 내용 및 별점 */}
            <div className="p-4 pt-3">
              <div className="mb-2.5">
                <div className="text-yellow-400 text-sm mb-0.5">★★★★☆</div>
                <p className="text-[12px] text-[#A8A9AD] font-medium">작성일 2024.07.08</p>
              </div>

              {/* 리뷰 텍스트 */}
              <p className="text-[14px] text-[#333] font-medium leading-relaxed">
                완전 보들보들 따뜻하고 진짜 가벼워요! 색감도 화면이랑 똑같고 배송도 빨랐어요.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
