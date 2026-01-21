import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Key, ArrowLeft } from "lucide-react";
import { getMyPoints } from "@/api/pointApi";
import type { Point } from "@/api/pointApi";

export default function MyPoint() {
  const navigate = useNavigate();
  const [points, setPoints] = useState<Point[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const data = await getMyPoints();
        setPoints(data);

        const total = data.reduce((sum, p) => sum + p.pointAmount, 0);
        setTotalPoints(total);
      } catch (error) {
        console.error("포인트 조회 실패:", error);
      }
    };

    fetchPoints();
  }, []);

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
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">
            적립금
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-[#5C4033] border-[1px]" />

        {/* 보유 적립금 */}
        <div className="border-b py-8 mt-6 mb-8">
          <p className="text-lg font-semibold">보유 적립금</p>
          <p className="text-4xl font-bold mt-2">{totalPoints}P</p>
        </div>

        {/* 포인트 안내사항 */}
        <div className="border rounded-lg mb-8 overflow-hidden">
          <button
            onClick={() => setIsGuideOpen((prev) => !prev)}
            className="w-full flex justify-between items-center px-6 py-4 font-semibold"
          >
            포인트 안내사항
            <ChevronDown
              className={`transition-transform ${
                isGuideOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isGuideOpen && (
            <div className="px-6 py-4 text-sm text-gray-600 border-t leading-relaxed">
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  적립금은 상품 구매 시 결제 금액의 일부로 사용하실 수 있습니다.
                </li>
                <li>
                  적립금은 현금으로 환불되지 않으며 타인에게 양도할 수 없습니다.
                </li>
                <li>
                  주문 취소 및 환불 시 사용된 적립금은 자동으로 복원됩니다.
                </li>
                <li>이벤트 적립금은 별도의 사용 기한이 있을 수 있습니다.</li>
                <li>적립금 정책은 사전 고지 후 변경될 수 있습니다.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 포인트 내역 */}
        <div className="space-y-4">
          {points.map((p) => (
            <div key={p.pointIdx} className="border rounded-lg mb-5">
              <div className="px-6 py-3 text-gray-400 text-sm border-b mb-2">
                {p.createdAt
                  ? p.createdAt.split("T")[0].replace(/-/g, ".")
                  : ""}
              </div>

              <div className="flex justify-between items-center px-6 py-5">
                <div className="flex items-center gap-4">
                  <Key className="w-10 h-10 text-[#5C4033]" />
                  <div>
                    <p className="text-xl font-semibold text-[#5C4033]">
                      {p.pointAmount > 0
                        ? `+${p.pointAmount}P`
                        : `${p.pointAmount}P`}
                    </p>
                    <p className="text-xl">{p.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
