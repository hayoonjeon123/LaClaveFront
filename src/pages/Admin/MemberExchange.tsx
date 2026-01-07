import { Search } from "lucide-react";
import { useState } from "react";

const MOCK_DATA = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  exchangeDate: "2025.06.20",
  orderNumber: "20250620-123456",
  orderer: "주문자",
  productName: i === 1 || i === 6 ? `놀시 패딩 외 ${i === 1 ? '2' : '3'}건` : "놀시 패딩",
  orderStatus: i === 6 ? "결제실패" : "결제완료",
  exchangeProcess: "교환 전"
}));

export function MemberExchange() {
  const [activeTab, setActiveTab] = useState("전체");

  const tabs = ["전체", "교환신청", "교환처리중", "교환완료", "교환준비/보류", "접수거부/철회"];

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-[30px] font-bold text-gray-800">교환 관리</h2>

        {/* Filter Section */}
        <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-300">
            <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-4 font-bold text-gray-700">기간</div>
            <div className="flex-1 bg-white flex items-center px-4 py-2 gap-2">
              {['1개월', '3개월', '6개월', '1년'].map((period) => (
                <button key={period} className="cursor-pointer px-5 py-1.5 border-[2px] border-[#A8A9AD] rounded-full text-sm hover:bg-gray-50 focus:bg-gray-100 transition-colors">
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex">
            <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-4 font-bold text-gray-700">검색어</div>
            <div className="flex-1 bg-white flex items-center px-4 py-2">
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="주문번호를 입력하세요"
                  className="w-full h-[40px] pl-4 pr-10 border-[2px] border-[#A8A9AD] rounded-full text-sm focus:outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 border-b-2 border-gray-200 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer pb-2 text-lg transition-all relative ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[4px] bg-[#5C4033]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="flex bg-[#5C4033] text-white py-4 text-center font-medium text-sm">
          <div className="w-16">NO</div>
          <div className="flex-1">교환 접수일</div>
          <div className="flex-1">주문번호</div>
          <div className="flex-1">주문자</div>
          <div className="flex-[1.5]">상품명/옵션</div>
          <div className="flex-1">주문 상태</div>
          <div className="flex-1">교환처리</div>
        </div>

        <div className="divide-y divide-gray-200">
          {MOCK_DATA.map((item) => (
            <div key={item.id} className="flex items-center text-center py-4 text-gray-700 font-medium hover:bg-gray-50 text-sm">
              <div className="w-16">{item.id}</div>
              <div className="flex-1">{item.exchangeDate}</div>
              <div className="flex-1">{item.orderNumber}</div>
              <div className="flex-1">{item.orderer}</div>
              <div className="flex-[1.5] text-center">{item.productName}</div>
              <div className="flex-1 flex justify-center">
                <button className="cursor-pointer w-[80px] h-[30px] bg-[#4A3933] text-white text-[11px] font-medium rounded-[5px] border-[#A8A9AD] border-[2px] flex justify-center items-center">
                  {item.orderStatus}
                </button>
              </div>
              <div className="flex-1 flex justify-center">
                <button className="cursor-pointer w-[80px] h-[30px] bg-[#5C4033] text-white text-[11px] font-medium rounded-[5px] border-[#A8A9AD] border-[2px] flex justify-center items-center">
                  {item.exchangeProcess}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500 pt-8 pb-8">
        <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-black font-bold">1</button>
        <button className="cursor-pointer w-8 h-8 flex items-center justify-center hover:text-black">2</button>
        <button className="cursor-pointer w-8 h-8 flex items-center justify-center hover:text-black">3</button>
        <button className="cursor-pointer w-8 h-8 flex items-center justify-center hover:text-black">4</button>
        <button className="cursor-pointer w-8 h-8 flex items-center justify-center hover:text-black">5</button>
        <button className="cursor-pointer flex items-center hover:text-black tracking-widest text-xs">
          {">>"}
        </button>
      </div>
    </div >
  );
}
