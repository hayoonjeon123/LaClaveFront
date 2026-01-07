import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MOCK_PAYMENTS = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    paymentUniqueId: "고유번호",
    payerName: "이름",
    userId: "아이디",
    amount: "결제금액",
    pointChange: "금액",
    date: "2025.05.30",
    status: i === 6 ? "결제실패" : "결제완료" // 7th item (index 6) is failed in the image example
}));

export function PaymentList() {
    return (
        <div className="w-full max-w-[1400px] mx-auto space-y-8">
            <div className="relative w-full max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full pl-4 pr-10 py-3 rounded-full border-[2px] border-[#A8A9AD] focus:outline-none text-sm shadow-sm placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="flex bg-[#5C4033] text-white py-4 text-center font-medium text-sm md:text-base">
                    <div className="w-20">NO</div>
                    <div className="flex-1">결제고유번호</div>
                    <div className="flex-1">결제자 이름</div>
                    <div className="flex-1">아이디</div>
                    <div className="flex-1">결제금액</div>
                    <div className="flex-1">포인트 충전/차감</div>
                    <div className="flex-1">결제일시</div>
                    <div className="w-32">결제상태</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {MOCK_PAYMENTS.map((payment) => (
                        <div key={payment.id} className="flex items-center text-center py-4 text-gray-700 text-sm font-medium hover:bg-gray-50">
                            <div className="w-20">{payment.id}</div>
                            <div className="flex-1">{payment.paymentUniqueId}</div>
                            <div className="flex-1">{payment.payerName}</div>
                            <div className="flex-1">{payment.userId}</div>
                            <div className="flex-1">{payment.amount}</div>
                            <div className="flex-1">{payment.pointChange}</div>
                            <div className="flex-1">{payment.date}</div>
                            <div className="w-32 flex justify-center">
                                <Select defaultValue={payment.status}>
                                    <SelectTrigger className="cursor-pointer !w-[80px] !h-[30px] !p-0 bg-[#5C4033] text-white !text-[13px] font-medium rounded-[5px] !border-[#A8A9AD] !border-[2px] flex justify-center items-center focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="결제완료">결제완료</SelectItem>
                                        <SelectItem value="결제실패">결제실패</SelectItem>
                                        <SelectItem value="결제보류">결제보류</SelectItem>
                                    </SelectContent>
                                </Select>
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
        </div>
    );
}
