import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function MyCoupon() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"usable" | "used">("usable");

  const reusableInquiries = {
    usable: [
      { id: 1, amount: "10,000원", condition: "30,000원 이상 결제 시 사용가능", expiry: "2025.12.24까지" },
      { id: 2, amount: "2,000원", condition: "15,000원 이상 결제 시 사용가능", expiry: "2025.12.24까지" },
    ],
    used: [
      { id: 3, amount: "5,000원", condition: "50,000원 이상 결제 시 사용가능", expiry: "기간 만료" },
    ]
  };

  return (
    <div className="pb-15 ">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[32px] font-bold text-[#5C4033] tracking-tighter">쿠폰</h2>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        {/* 쿠폰 글자 밑 구분선 */}
        <div className="w-full h-[1px] bg-[#A8A9AD] mb-4" />

        {/* 쿠폰 상단 탭 */}
        <div className="flex border-t border-gray-100 mb-6">
          <button
            onClick={() => setActiveTab("usable")}
            className={`flex-1 py-3 text-[16px] font-bold transition cursor-pointer text-center relative
              ${activeTab === "usable" ? "text-black" : "text-[#A8A9AD]"}`}
          >
            보유 ({reusableInquiries.usable.length}장)
            {activeTab === "usable" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[2.5px] bg-black" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("used")}
            className={`flex-1 py-3 text-[16px] font-bold transition cursor-pointer text-center relative
              ${activeTab === "used" ? "text-black" : "text-[#A8A9AD]"}`}
          >
            만료된 쿠폰
            {activeTab === "used" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[2.5px] bg-black" />
            )}
          </button>
        </div>

        {/* 쿠폰 리스트 */}
        <div className="space-y-3">
          {(activeTab === "usable" ? reusableInquiries.usable : reusableInquiries.used).map((coupon) => (
            <div key={coupon.id} className="border border-[#A8A9AD] rounded-[8px] shadow-sm overflow-hidden">
              {/* 상단 금액 섹션 */}
              <div className="px-5 py-3 border-b border-[#A8A9AD]">
                <div className="text-[20px] font-bold text-black">
                  {coupon.amount}
                </div>
              </div>

              {/* 하단 정보 섹션 */}
              <div className="p-5 pt-3 space-y-1">
                <div className="text-[16px] font-bold text-black">
                  {coupon.condition}
                </div>
                <div className="text-[14px] text-[#A8A9AD] font-medium">
                  {coupon.expiry}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
