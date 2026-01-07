import { useNavigate } from "react-router-dom";
import { ChevronDown, Key, ArrowLeft } from "lucide-react";

export default function MyPoint() {
  const navigate = useNavigate();
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
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">적립금</h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-[#5C4033] border-[1px]" />

        {/* 보유 적립금 */}
        <div className="border-b py-8 mt-6 mb-8">
          <p className="text-lg font-semibold">보유 적립금</p>
          <p className="text-4xl font-bold mt-2">40P</p>
        </div>

        {/* 포인트 안내사항 */}
        <div className="border rounded-lg mb-8">
          <button className="w-full flex justify-between items-center px-6 py-4 font-semibold">
            포인트 안내사항
            <ChevronDown />
          </button>
        </div>

        {/* 포인트 내역 */}
        <div className="space-y-4">
          {/* 항목 1 */}
          <div className="border rounded-lg mb-5">
            <div className="px-6 py-3 text-gray-400 text-sm border-b mb-2">
              2025.12.01
            </div>
            <div className="flex justify-between items-center px-6 py-5">
              <div className="flex items-center gap-4">
                <Key className="w-10 h-10 flex items-center justify-center rounded-full text-[#5C4033]" />
                <div>
                  <p className="text-xl font-semibold text-[#5C4033]">+300P</p>
                  <p className="text-xl">리뷰작성 적립</p>
                </div>
              </div>
              <p className="text-xl text-gray-400">2025.12.24까지</p>
            </div>
          </div>

          {/* 항목 2 */}
          <div className="border rounded-lg mb-5">
            <div className="px-6 py-3 text-gray-400 text-sm border-b mb-2">
              2025.10.03
            </div>
            <div className="flex justify-between items-center px-6 py-5">
              <div className="flex items-center gap-4">
                <Key className="w-10 h-10 flex items-center justify-center rounded-full text-[#5C4033]" />
                <div>
                  <p className="text-xl font-semibold text-[#5C4033]">-40P</p>
                  <p className="text-xl">소멸</p>
                </div>
              </div>
              <p className="text-xl text-gray-400">2025.12.24까지</p>
            </div>
          </div>

          {/* 항목 3 */}
          <div className="border rounded-lg mb-5">
            <div className="px-6 py-3 text-gray-400 text-sm border-b mb-2">
              2025.09.01
            </div>
            <div className="flex justify-between items-center px-6 py-5">
              <div className="flex items-center gap-4">
                <Key className="w-10 h-10 flex items-center justify-center rounded-full text-[#5C4033]" />
                <div>
                  <p className="text-xl font-semibold text-[#5C4033]">-3000P</p>
                  <p className="text-xl">결제 시 사용</p>
                </div>
              </div>
              <p className="text-xl text-gray-400">2025.12.24 까지</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
