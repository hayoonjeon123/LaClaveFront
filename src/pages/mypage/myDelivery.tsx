import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import sampleImg from "../../assets/sample-product.jpg";
import { getMyDeliveryListByMember } from "@/api/myDeliveryApi";
import type { MyDelivery } from "@/api/myDeliveryApi";

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
  const [deliveryLogs, setDeliveryLogs] = useState<DeliveryLog[]>([]);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const data = await getMyDeliveryListByMember();
        console.log(data); // 여기서 확인
        // 화면용 deliveryLogs 변환
        const logs: DeliveryLog[] = data.map((d, idx) => {
          const dateObj = new Date(d.startDate);
          const date = dateObj.toISOString().split("T")[0];
          const time = dateObj.toTimeString().split(" ")[0];

          const statusMap: { [key: number]: string } = {
            79: "배송 준비",
            80: "배송 중",
            81: "배송 완료",
          };

          return {
            id: d.deliveryIdx,
            date,
            time,
            status: statusMap[d.deliveryStatusCommonIdx] || "배송 정보 없음",
            location: "서울 강남구", // 실제 위치 데이터 있으면 대체 가능
            active: idx === 0, // 최신 기록만 active 처리
          };
        });

        setDeliveryLogs(logs);
      } catch (err) {
        console.error("배송 정보 조회 실패", err);
      }
    };

    fetchDelivery();
  }, []);

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[24px] font-bold text-[#5C4033] tracking-tight">
            배송조회
          </h2>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        {/* Status Illustration Section */}
        <div className="p-8">
          <h3 className="text-[20px] font-bold text-center text-gray-800 mb-8">
            주문하신 상품이 도착했어요
          </h3>

          <div className="px-5">
            <div className="relative h-[14px] bg-[#EEEEEE] rounded-full mb-4 overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-full bg-[#5C4033] rounded-full"></div>
            </div>
            <div className="flex justify-between px-1">
              {["발송", "집하", "배송중", "도착"].map((step, idx) => (
                <span
                  key={idx}
                  className="text-[14px] font-bold text-[#5C4033]"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-[#A8A9AD] h-[1px] my-2" />

        {/* Product Summary Section */}
        <div className="py-4 flex items-center gap-5">
          <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden flex-shrink-0">
            <img
              src={sampleImg}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-[18px] font-bold text-[#333] mb-1">
              배색 리버시블 컴포트핏 다운패딩(블랙)
            </h4>
            <p className="text-[14px] text-[#A8A9AD] font-medium">블랙/FREE</p>
          </div>
        </div>

        <Separator className="bg-[#A8A9AD] h-[1px] my-2" />

        {/* Delivery Logs Section */}
        <div className="p-3">
          <h3 className="text-[18px] font-bold text-black mb-6">배송 기록</h3>
          <div className="space-y-6">
            {deliveryLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-6">
                <div className="w-[100px] flex-shrink-0">
                  <p
                    className={`text-[14px] font-bold ${
                      log.active ? "text-black" : "text-[#A8A9AD]"
                    }`}
                  >
                    {log.date}
                  </p>
                  <p
                    className={`text-[13px] font-bold ${
                      log.active ? "text-black" : "text-[#A8A9AD]"
                    }`}
                  >
                    {log.time}
                  </p>
                </div>
                <div className="flex-1">
                  <p
                    className={`text-[15px] font-bold mb-0.5 ${
                      log.active ? "text-black" : "text-[#A8A9AD]"
                    }`}
                  >
                    {log.status}
                  </p>
                  <p
                    className={`text-[14px] font-medium ${
                      log.active ? "text-gray-600" : "text-[#A8A9AD]"
                    }`}
                  >
                    {log.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
