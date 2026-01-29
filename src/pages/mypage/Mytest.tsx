import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Route, Routes } from "react-router-dom";
import MyDeliveryPage from "@/pages/mypage/Mytest";
// import { getDeliveryInfo } from "@/api/deliveryApi"; // 나중에 연결

interface DeliveryInfo {
  orderNo: string;
  deliveryStatus: string;
  courier: string;
  trackingNumber: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export default function MyDelivery() {
  const navigate = useNavigate();
  const { ordersIdx } = useParams();
  const [delivery, setDelivery] = useState<DeliveryInfo | null>(null);

  useEffect(() => {
    console.log("📦 배송조회 ordersIdx:", ordersIdx);

    // 👉 임시 더미 데이터 (백엔드 연결 전)
    setDelivery({
      orderNo: "20260119-d07c3f6f",
      deliveryStatus: "배송중",
      courier: "CJ대한통운",
      trackingNumber: "1234-5678-9999",
      shippedAt: "2026-01-20 10:30",
    });

    // 실제 사용 시
    // getDeliveryInfo(Number(ordersIdx)).then(setDelivery);
  }, [ordersIdx]);

  if (!delivery) {
    return <p className="text-center mt-10">배송 정보를 불러오는 중...</p>;
  }

  return (
    <div className="text-black pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="flex-1 text-center text-[24px] font-bold text-[#5C4033]">
          배송 현황
        </h2>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        <div className="border border-[#A8A9AD] rounded-[10px] p-5 space-y-3">
          <p className="font-bold">주문번호 {delivery.orderNo}</p>

          <Separator />

          <div className="text-sm space-y-2">
            <p>
              <span className="font-bold">배송 상태</span> :{" "}
              <span className="text-[#5C4033] font-bold">
                {delivery.deliveryStatus}
              </span>
            </p>
            <p>
              <span className="font-bold">택배사</span> : {delivery.courier}
            </p>
            <p>
              <span className="font-bold">운송장 번호</span> :{" "}
              {delivery.trackingNumber}
            </p>

            {delivery.shippedAt && (
              <p>
                <span className="font-bold">출고일</span> : {delivery.shippedAt}
              </p>
            )}

            {delivery.deliveredAt && (
              <p>
                <span className="font-bold">배송 완료</span> :{" "}
                {delivery.deliveredAt}
              </p>
            )}
          </div>
          <button
            onClick={() => navigate(`/my_delivery/${ordersIdx}`)}
            className="w-full h-[44px]
    border border-[#5C4033]
    text-[#5C4033] font-bold text-[15px]
    rounded-lg
    hover:bg-[#5C4033] hover:text-white
    transition"
          >
            실시간 배송조회
          </button>
        </div>
      </div>
    </div>
  );
}
