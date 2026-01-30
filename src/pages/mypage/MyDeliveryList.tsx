// src/pages/mypage/MyDeliveryList.tsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getMyDeliveryList } from "@/api/myPage/myDeliveryApi";
import type { MyDelivery } from "@/api/myPage/myDeliveryApi";

export default function MyDeliveryList() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState<MyDelivery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyDeliveryList()
      .then((list) => {
        console.log("받은 배송 리스트:", list);
        setDeliveries(list);
      })
      .catch((err) => console.error("배송 목록 불러오기 실패", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">배송 정보를 불러오는 중...</p>;
  }

  if (!deliveries || deliveries.length === 0) {
    return <p className="text-center mt-10">배송 정보가 없습니다.</p>;
  }

  return (
    <div className="pb-10 min-h-screen text-black">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="flex-1 text-center text-[24px] font-bold text-[#5C4033]">
          배송 목록
        </h2>
      </div>

      {/* 배송 리스트 */}
      <div className="max-w-[700px] mx-auto px-6 space-y-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.deliveryIdx}
            className="border p-4 rounded-lg space-y-2 cursor-pointer hover:bg-gray-50"
            onClick={() =>
              navigate(`/mypage/mydelivery/${delivery.orderIdx}`, {
                state: { orderNo: delivery.orderNo },
              })
            }
          >
            <p>
              <span className="font-bold">주문번호</span> : {delivery.orderNo}
            </p>
            <p>
              <span className="font-bold">배송 상태</span> :{" "}
              {delivery.deliveryStatusCommonIdx === 79
                ? "배송준비"
                : delivery.deliveryStatusCommonIdx === 80
                  ? "배송중"
                  : delivery.deliveryStatusCommonIdx === 81
                    ? "배송완료"
                    : "알수없음"}
            </p>
            <p>
              <span className="font-bold">택배사</span> : {delivery.courier}
            </p>
            <p>
              <span className="font-bold">운송장 번호</span> :{" "}
              {delivery.trackingNO}
            </p>
            <p>
              <span className="font-bold">출고일</span> : {delivery.startDate}
            </p>
            {delivery.endDate && (
              <p>
                <span className="font-bold">배송 완료</span> :{" "}
                {delivery.endDate}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
