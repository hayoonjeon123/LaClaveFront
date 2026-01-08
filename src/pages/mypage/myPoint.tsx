import { useNavigate } from "react-router-dom";
import { ChevronDown, Key, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MyPoint() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("전체");
  const tabs = ["전체", "적립", "사용", "소멸"];

  const pointHistory = [
    {
      date: "2025.12.01",
      amount: "+ 300P",
      reason: "리뷰작성 적립",
      expiry: "2025.12.24 23:59분까지",
      type: "plus"
    },
    {
      date: "2025.10.03",
      amount: "-40P",
      reason: "소멸",
      expiry: "2025.12.24 23:59분까지",
      type: "minus"
    },
    {
      date: "2025.09.01",
      amount: "-3000P",
      reason: "결제 시 사용",
      expiry: "2025.12.24 23:59분까지",
      type: "minus"
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center font-bold">
          <h2 className="text-[32px] font-bold text-[#5C4033] tracking-tighter">적립금</h2>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6">
        {/* 보유 적립금 Section */}
        <div className="mb-4">
          <p className="text-[18px] font-bold text-black mb-1">보유 적립금</p>
          <p className="text-[40px] font-bold text-black tracking-tight">40P</p>
          <Separator className="mt-4 bg-[#A8A9AD] h-[1.5px]" />
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-3 mb-4 border-[#A8A9AD] rounded-[6px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-[8px] border text-[18px] font-bold transition cursor-pointer
                ${activeTab === tab
                  ? "bg-[#5C4033] border-[#5C4033] text-white"
                  : "border-[#A8A9AD] text-[#333] hover:bg-gray-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 포인트 안내사항 Accordion */}
        <div className="border border-[#A8A9AD] rounded-[6px] mb-5 shadow-sm px-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="hover:no-underline py-2.5 text-[18px] font-bold text-black flex justify-between items-center w-full">
                포인트 안내사항
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-gray-600 leading-relaxed pb-4 border-t border-[#f0f0f0] mt-1 pt-4">
                <ul className="list-disc pl-5 space-y-1">
                  <li>적립금은 구매 금액의 일정 비율로 적립됩니다.</li>
                  <li>리뷰 작성 시 추가 적립금이 지급될 수 있습니다.</li>
                  <li>적립금은 발행일로부터 1년 후 자동 소멸됩니다.</li>
                  <li>소멸 예정 적립금은 내역에서 확인하실 수 있습니다.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* 포인트 내역 리스트 */}
        <div className="space-y-3">
          {pointHistory.map((item, index) => (
            <div key={index} className="border border-[#A8A9AD] rounded-[6px] overflow-hidden">
              {/* Card Header: Date */}
              <div className="px-5 py-2 border-b border-[#A8A9AD] text-[14px] font-bold text-[#A8A9AD]">
                {item.date}
              </div>

              {/* Card Content */}
              <div className="p-5 flex items-center gap-5 relative">
                {/* Key Icon */}
                <div className="w-12 h-12 rounded-full border-[1.5px] border-[#5C4033] flex items-center justify-center">
                  <Key size={24} className="text-[#5C4033] -rotate-45" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-[#5C4033] mb-0.5">
                    {item.amount}
                  </p>
                  <p className="text-[18px] font-bold text-black">
                    {item.reason}
                  </p>
                </div>

                {/* Expiry (Bottom Right) */}
                <div className="absolute bottom-2 right-4 text-[12px] text-[#A8A9AD] font-medium">
                  {item.expiry}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
