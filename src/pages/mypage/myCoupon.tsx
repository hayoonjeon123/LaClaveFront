import { useState } from "react";
import CouponCard from "@/components/common/myCoupon/CouponCard";

export default function MyCoupon() {
  const [activeTab, setActiveTab] = useState<"usable" | "used">("usable");

  return (
    <div>
      <h2 className="text-center text-3xl font-bold text-[#5C4033] my-5">
        쿠폰
      </h2>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-[#5C4033] border-[1px]" />

        {/* 쿠폰 상단 탭 */}
        <div className="grid grid-cols-2 border-b mb-8 mt-6">
          <button
            onClick={() => setActiveTab("usable")}
            className={`w-full pb-3 font-semibold text-2xl transition cursor-pointer text-center
              ${
                activeTab === "usable"
                  ? "text-[#5C4033] border-b-2 border-[#5C4033]"
                  : "text-[#A8A9AD] hover:text-[#5C4033]"
              }`}
          >
            사용 가능 쿠폰
          </button>

          <button
            onClick={() => setActiveTab("used")}
            className={`w-full pb-3 font-semibold text-2xl transition cursor-pointer text-center
              ${
                activeTab === "used"
                  ? "text-[#5C4033] border-b-2 border-[#5C4033]"
                  : "text-[#A8A9AD] hover:text-[#5C4033]"
              }`}
          >
            만료된 쿠폰
          </button>
        </div>

        {/* 탭 내용 */}
        {activeTab === "usable" && (
          <div className="space-y-4">
            <CouponCard
              title="신규 회원 쿠폰"
              discount="10% 할인"
              condition="30,000원 이상 구매 시"
              expireDate="2026-03-31"
            />
            <CouponCard
              title="겨울 시즌 쿠폰"
              discount="5,000원 할인"
              condition="50,000원 이상 구매 시"
              expireDate="2026-02-15"
            />
          </div>
        )}

        {activeTab === "used" && (
          <div className="space-y-4">
            <CouponCard
              title="블랙프라이데이 쿠폰"
              discount="15% 할인"
              condition="100,000원 이상 구매 시"
              expireDate="2025-12-31"
              disabled
            />
          </div>
        )}
      </div>
    </div>
  );
}
