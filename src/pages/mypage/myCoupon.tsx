import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getMyCoupons } from "@/api/myPage/couponApi"; // API 모듈 import
import type { Coupon } from "@/api/myPage/couponApi";

export default function MyCoupon() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"usable" | "used">("usable");
  const [coupons, setCoupons] = useState<Coupon[]>([]); // 백엔드 데이터 저장

  // 1️⃣ 컴포넌트 마운트 시 쿠폰 데이터 가져오기
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getMyCoupons();
        setCoupons(data);
      } catch (err) {
        console.error("쿠폰 조회 실패", err);
      }
    };
    fetchCoupons();
  }, []);

  const today = new Date();

  const reusableInquiries = {
    usable: coupons.filter(
      (c) => c.usedStatus === "N" && new Date(c.endDate) >= today
    ),
    used: coupons.filter(
      (c) => c.usedStatus === "Y" || new Date(c.endDate) < today
    ),
  };

  return (
    <div className="pb-15">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[32px] font-bold text-[#5C4033] tracking-tighter">
            쿠폰
          </h2>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        <div className="w-full h-[1px] bg-[#A8A9AD] mb-4" />

        {/* 탭 */}
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
            만료된 쿠폰 ({reusableInquiries.used.length}장)
            {activeTab === "used" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[2.5px] bg-black" />
            )}
          </button>
        </div>

        {/* 쿠폰 리스트 */}
        <div className="space-y-3">
          {(activeTab === "usable"
            ? reusableInquiries.usable
            : reusableInquiries.used
          ).map((coupon) => (
            <div
              key={coupon.couponIdx}
              className={`border rounded-[8px] shadow-sm overflow-hidden
    ${activeTab === "used"
                  ? "border-gray-300 bg-gray-50 opacity-80"
                  : "border-[#A8A9AD] bg-white"
                }`}
            >
              {/* 상단 금액 */}
              <div className="px-5 py-3 border-b border-[#A8A9AD]">
                <div className="text-[20px] font-bold text-black">
                  {coupon.discountValue.toLocaleString()}원
                </div>
              </div>

              {/* 하단 정보 */}
              <div className="p-5 pt-3 space-y-1">
                <div
                  className={`text-[16px] font-bold ${activeTab === "used" ? "text-gray-400" : "text-black"
                    }`}
                >
                  {coupon.couponName} / 최소 결제{" "}
                  {coupon.minOrderPrice.toLocaleString()}원
                </div>
                <div
                  className={`text-[14px] font-medium ${activeTab === "used" ? "text-gray-400" : "text-[#A8A9AD]"
                    }`}
                >
                  {coupon.startDate} ~ {coupon.endDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
