import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MyClaim() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("취소");
  const tabs = ["취소", "교환", "반품", "환불"];

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-6 flex items-center relative mb-4">
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
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex border-b border-[#D1D1D1] px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-[16px] transition-all ${activeTab === tab
                ? "font-bold text-black border-b-2 border-[#5C4033]"
                : "font-normal text-[#555555] hover:text-black"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto font-semibold mt-4">
        주문번호 20124103
      </div>
      <div className="max-w-5xl mx-auto text-[#A8A9AD] font-semibold mb-2">
        결제날짜 2026-01-05
      </div>

      <div className="max-w-5xl mx-auto flex items-center gap-6 my-4">
        {/* 상품 이미지 */}
        <img
          src={""}
          alt="상품 이미지"
          className="w-20 h-20 object-cover rounded-lg border border-gray-100 shadow-sm"
        />
        <div className="flex-1">
          <p className="text-[17px] font-bold text-black mb-1">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="text-[#A8A9AD] text-[14px] font-medium">
            블랙 / S
          </p>
        </div>
        {/* 결제 정보 */}
        <div className="text-right whitespace-nowrap">
          <p className="text-[#555555] text-[14px] mb-1 font-medium">취소 완료</p>
          <p className="text-[18px] font-bold text-black">84,000원</p>
        </div>
      </div>
      <hr className="max-w-5xl mx-auto border-[#D1D1D1] border-t-[1px] mt-4" />
    </div>
  );
}
