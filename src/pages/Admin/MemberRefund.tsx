import { Search } from "lucide-react";
import { useState } from "react";

const MOCK_DATA = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    orderDate: "2025.06.20",
    refundRequestDate: "2025.06.20",
    orderNumber: "20250620-123456",
    orderer: "주문자",
    productName: i === 1 || i === 6 ? `놀시 패딩 외 ${i === 1 ? '2' : '3'}건` : "놀시 패딩",
    totalRefundAmount: i === 1 ? "123,500원" : i === 6 ? "145,000원" : "60,000원",
    actualRefundAmount: i === 1 ? "123,500원" : i === 6 ? "145,000원" : "60,000원",
    rewardRefund: "-",
    paymentMethod: "카드",
    refundMethod: "카드",
    processStatus: i === 6 ? "환불 완료" : i === 1 || i === 3 ? "환불 철회" : "환불완료"
}));

export function MemberRefund() {
    const [activeTab, setActiveTab] = useState("전체");

    const tabs = ["전체", "환불전", "환불 완료", "환불보류", "환불철회"];

    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-8">
            <div className="space-y-2">
                <h2 className="text-[30px] font-bold text-gray-800">환불 관리</h2>

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

            {/* Tabs */}
            <div className="flex gap-4 md:gap-8 border-b-2 border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer pb-2 text-base md:text-lg transition-all relative ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
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
            <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
                <div className="min-w-[1200px]">
                    <div className="flex bg-[#5C4033] text-white py-4 text-center font-medium text-[13px]">
                        <div className="w-12">NO</div>
                        <div className="w-24">주문일</div>
                        <div className="w-24">환불신청일</div>
                        <div className="w-32">주문번호</div>
                        <div className="w-20">주문자</div>
                        <div className="flex-1">상품명</div>
                        <div className="w-24">총 환불액</div>
                        <div className="w-24">실 환불액</div>
                        <div className="w-36 text-[11px] leading-tight flex items-center justify-center">사용한 적립금/<br />예치금 환불</div>
                        <div className="w-20">결제수단</div>
                        <div className="w-20">환불수단</div>
                        <div className="w-28">처리 상태</div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {MOCK_DATA.map((item) => (
                            <div key={item.id} className="flex items-center text-center py-4 text-gray-700 font-medium hover:bg-gray-50 text-[12px]">
                                <div className="w-12">{item.id}</div>
                                <div className="w-24">{item.orderDate}</div>
                                <div className="w-24">{item.refundRequestDate}</div>
                                <div className="w-32">{item.orderNumber}</div>
                                <div className="w-20">{item.orderer}</div>
                                <div className="flex-1 px-2">{item.productName}</div>
                                <div className="w-24">{item.totalRefundAmount}</div>
                                <div className="w-24">{item.actualRefundAmount}</div>
                                <div className="w-36">{item.rewardRefund}</div>
                                <div className="w-20">{item.paymentMethod}</div>
                                <div className="w-20">{item.refundMethod}</div>
                                <div className="w-28 flex justify-center">
                                    <button className="cursor-pointer w-[85px] h-[30px] bg-[#5C4033] text-white text-[11px] font-medium rounded-[5px] border-[#A8A9AD] border-[2px] flex justify-center items-center">
                                        {item.processStatus}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
        </div>
    );
}
