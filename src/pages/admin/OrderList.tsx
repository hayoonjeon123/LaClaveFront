
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MOCK_ORDERS = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    orderDate: "2025.06.20",
    orderNumber: "20250620-123456",
    orderer: "주문자",
    productName: i === 1 ? "놀시 패딩 외 2건" : i === 6 ? "놀시 패딩 외 3건" : "놀시 패딩",
    purchaseAmount: i === 1 ? "123,500원" : i === 6 ? "145,000원" : "60,000원",
    actualAmount: i === 1 ? "123,500원" : i === 6 ? "145,000원" : "60,000원",
    discountAmount: "-",
    paymentMethod: "카드",
    paymentStatus: i === 6 ? "결제실패" : "결제완료",
    deliveryStatus: i === 0 ? "배송중" : i === 1 ? "배송 대기" : i === 2 ? "배송완료" : i === 3 ? "배송완료" : i === 4 ? "배송완료" : "배송전"
}));

export function OrderList() {
    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-8">
            {/* 주문 현황 Header Title (Optional, based on image context) */}
            <div className="space-y-2">
                <h2 className="text-[30px] font-bold text-gray-800">주문 현황</h2>
                {/* 주문 현황 Stats */}
                {/* 주문 현황 Stats */}
                <div className="w-full bg-[#E5E5E5] p-6 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 px-8">
                        {/* Stat Card 1 */}
                        <div className="bg-white rounded-[5px] border border-[#5C4033] p-4 h-[100px] flex flex-col justify-between relative">
                            <span className="font-medium text-base text-black">총 주문 금액</span>
                            <span className="text-xl font-medium text-right">506,700원</span>
                        </div>
                        {/* Stat Card 2 */}
                        <div className="bg-white rounded-[5px] border border-[#5C4033] p-4 h-[100px] flex flex-col justify-between relative">
                            <span className="font-medium text-base text-black">실 주문 금액</span>
                            <span className="text-xl font-medium text-right">345,600원</span>
                        </div>
                        {/* Stat Card 3 */}
                        <div className="bg-white rounded-[5px] border border-[#5C4033] p-4 h-[100px] flex flex-col justify-between relative">
                            <span className="font-medium text-base text-black">환불 금액</span>
                            <span className="text-xl font-medium text-right">134,000원</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex border-b border-gray-300">
                    <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-2 font-bold text-gray-700">기간</div>
                    <div className="flex-1 bg-white flex items-center px-4 py-2 gap-2">
                        {['1개월', '3개월', '6개월', '1년'].map((period) => (
                            <button key={period} className="px-5 py-1.5 border-[2px] border-[#A8A9AD] rounded-full text-sm hover:bg-gray-50 focus:bg-gray-100 transition-colors">
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-2 font-bold text-gray-700">검색어</div>
                    <div className="flex-1 bg-white flex items-center px-4 py-2">
                        <div className="relative w-[300px]">
                            <input
                                type="text"
                                placeholder="주문번호를 입력하세요"
                                className="w-full pl-4 pr-10 py-2 border-[2px] border-[#A8A9AD] rounded-full text-sm focus:outline-none"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="flex bg-[#5C4033] text-white py-4 text-center font-medium text-sm md:text-base">
                    <div className="w-16">NO</div>
                    <div className="w-24">주문일</div>
                    <div className="w-36">주문번호</div>
                    <div className="w-20">주문자</div>
                    <div className="flex-1">상품명</div>
                    <div className="w-24">구매금액</div>
                    <div className="w-24">실 결제금액</div>
                    <div className="w-20">할인금액</div>
                    <div className="w-20">결제수단</div>
                    <div className="w-24">결제상태</div>
                    <div className="w-24">배송상태</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {MOCK_ORDERS.map((order) => (
                        <div key={order.id} className="flex items-center text-center py-4 text-gray-700 font-medium hover:bg-gray-50 text-sm">
                            <div className="w-16">{order.id}</div>
                            <div className="w-24">{order.orderDate}</div>
                            <div className="w-36">{order.orderNumber}</div>
                            <div className="w-20">{order.orderer}</div>
                            <div className="flex-1 text-center">{order.productName}</div>
                            <div className="w-24">{order.purchaseAmount}</div>
                            <div className="w-24">{order.actualAmount}</div>
                            <div className="w-20">{order.discountAmount}</div>
                            <div className="w-20">{order.paymentMethod}</div>
                            <div className="w-24 flex justify-center">
                                <Select defaultValue={order.paymentStatus}>
                                    <SelectTrigger className="!w-[80px] !h-[30px] !p-0 bg-[#5C4033] text-white !text-[11px] font-medium rounded-[5px] !border-[#A8A9AD] !border-[2px] flex justify-center items-center focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="결제완료">결제완료</SelectItem>
                                        <SelectItem value="결제실패">결제실패</SelectItem>
                                        <SelectItem value="결제대기">결제대기</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-24 flex justify-center">
                                <Select defaultValue={order.deliveryStatus}>
                                    <SelectTrigger className="!w-[80px] !h-[30px] !p-0 bg-[#5C4033] text-white !text-[11px] font-medium rounded-[5px] !border-[#A8A9AD] !border-[2px] flex justify-center items-center focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="배송전">배송전</SelectItem>
                                        <SelectItem value="배송중">배송중</SelectItem>
                                        <SelectItem value="배송 대기">배송 대기</SelectItem>
                                        <SelectItem value="배송완료">배송완료</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500 pt-8 pb-8">
                <button className="w-8 h-8 flex items-center justify-center text-black font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">2</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">3</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">4</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">5</button>
                <button className="flex items-center hover:text-black tracking-widest text-xs">
                    {">>"}
                </button>
            </div>
        </div>
    );
}
