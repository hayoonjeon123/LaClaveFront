import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getDeliveryByOrder } from "@/api/myPage/myDeliveryApi";
import type { MyDelivery } from "@/api/myPage/myDeliveryApi";
import { getMyOrders } from "@/api/order/myOrdersApi";
import type { Order } from "@/api/order/myOrdersApi";
import { SERVER_URL } from "@/utils/productUtils";

interface DeliveryLog {
  id: number;
  date: string;
  time: string;
  status: string;
  location: string;
  active: boolean;
}

export default function MyDeliveryPage() {
  const navigate = useNavigate();
  const { orderIdx } = useParams<{ orderIdx: string }>();
  const [deliveryLogs, setDeliveryLogs] = useState<DeliveryLog[]>([]);
  const [orderInfo, setOrderInfo] = useState<Order | null>(null);
  const location = useLocation();
  const orderNo = location.state?.orderNo;

  useEffect(() => {
    if (!orderIdx) return;

    const fetchDelivery = async () => {
      try {
        const data: MyDelivery[] = await getDeliveryByOrder(Number(orderIdx));

        if (!Array.isArray(data) || data.length === 0) {
          setDeliveryLogs([]);
          return;
        }

        const statusMap: Record<number, string> = {
          79: "배송 준비",
          80: "배송 중",
          81: "배송 완료",
        };

        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );

        const logs: DeliveryLog[] = sorted.map((d, idx) => {
          const dateObj = new Date(d.startDate);

          return {
            id: d.deliveryIdx,
            date: dateObj.toISOString().split("T")[0],
            time: dateObj.toTimeString().split(" ")[0],
            status: statusMap[d.deliveryStatusCommonIdx] ?? "배송 정보 없음",
            location: d.courier ?? "배송사 정보 없음",
            active: idx === 0,
          };
        });

        setDeliveryLogs(logs);
      } catch (err: any) {
        console.error("❌ 주문별 배송 조회 실패");

        if (err.response) {
          console.error("📛 status:", err.response.status);
          console.error("📛 data:", err.response.data);
          console.error("📛 headers:", err.response.headers);
        } else if (err.request) {
          console.error("📛 요청은 갔지만 응답 없음:", err.request);
        } else {
          console.error("📛 axios 설정 에러:", err.message);
        }
      }
    };

    fetchDelivery();

    // 주문 정보 조회 (상품 이미지를 위해)
    getMyOrders()
      .then((orders) => {
        const order = orders.find((o) => o.ordersIdx === Number(orderIdx));
        if (order) {
          setOrderInfo(order);
        }
      })
      .catch(console.error);
  }, [orderIdx]);

  /** 진행바 퍼센트 계산 */
  const progressPercent = (() => {
    const status = deliveryLogs[0]?.status;
    if (status === "배송 준비") return "25%";
    if (status === "배송 중") return "75%";
    if (status === "배송 완료") return "100%";
    return "10%";
  })();

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="flex-1 text-center text-[24px] font-bold text-[#5C4033]">
          배송조회
        </h2>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        {/* 배송 상태 요약 */}
        <div className="p-8">
          <h3 className="text-[20px] font-bold text-center mb-8">
            {deliveryLogs[0]?.status ?? "배송 준비중입니다"}
          </h3>

          <div className="px-5">
            <div className="relative h-[14px] bg-[#EEEEEE] rounded-full mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-[#5C4033] rounded-full transition-all"
                style={{ width: progressPercent }}
              />
            </div>
            <div className="flex justify-between text-[14px] font-bold text-[#5C4033]">
              {["발송", "집하", "배송중", "도착"].map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* 주문 요약 */}
        <div className="py-4 flex items-center gap-5">
          {orderInfo &&
          orderInfo.details.length > 0 &&
          orderInfo.details[0].productImageUrl ? (
            <img
              src={`${SERVER_URL}${orderInfo.details[0].productImageUrl}`}
              alt="상품"
              className="w-[70px] h-[70px] rounded-[10px] object-cover"
            />
          ) : (
            <div className="w-[70px] h-[70px] rounded-[10px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
          <div>
            <h4 className="text-[18px] font-bold">
              주문번호 {orderNo ?? orderIdx}
            </h4>
            <p className="text-[14px] text-gray-400">배송 현황 조회</p>
          </div>
        </div>

        <Separator />

        {/* 배송 기록 */}
        <div className="p-3">
          <h3 className="text-[18px] font-bold mb-6">배송 기록</h3>

          {deliveryLogs.length === 0 ? (
            <p className="text-gray-400 text-center">배송 정보가 없습니다.</p>
          ) : (
            <div className="space-y-6">
              {deliveryLogs.map((log) => (
                <div key={log.id} className="flex gap-6">
                  <div className="w-[100px]">
                    <p className={log.active ? "font-bold" : "text-gray-400"}>
                      {log.date}
                    </p>
                    <p className={log.active ? "font-bold" : "text-gray-400"}>
                      {log.time}
                    </p>
                  </div>
                  <div>
                    <p className={log.active ? "font-bold" : "text-gray-400"}>
                      {log.status}
                    </p>
                    <p className="text-sm text-gray-500">{log.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
