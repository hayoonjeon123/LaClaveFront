
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MOCK_INQUIRIES = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "상품 문의" : "배송 문의",
    title: i % 2 === 0 ? "옷 사이즈 문의 드립니다" : "배송 언제 되나요",
    writer: i % 2 === 0 ? "aaa123" : "fll45",
    date: i % 2 === 0 ? "2025.04.23" : "2025.05.23",
    status: i % 2 === 0 ? "답변 완료" : "답변 전",
    replier: i % 2 === 0 ? "관리자" : "-",
    replyDate: i % 2 === 0 ? "2025.04.23" : "-"
}));

export function InquiryList() {
    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-4">
            <div className="space-y-2">
                <h2 className="text-[30px] font-bold text-gray-800 ">문의내역</h2>
            </div>

            {/* Filter Section */}
            <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                {/* Period Filter */}
                <div className="flex border-b border-gray-300">
                    <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-2 font-bold text-gray-700">기간</div>
                    <div className="flex-1 bg-white flex items-center px-4 py-2 gap-2">
                        {['1개월', '3개월', '6개월', '1년'].map((period) => (
                            <button key={period} className="cursor-pointer px-5 py-1.5 border-[2px] border-[#A8A9AD] rounded-full text-sm hover:bg-gray-50 focus:bg-gray-100 transition-colors">
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Inquiry Type Filter */}
                <div className="flex border-b border-gray-300">
                    <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-2 font-bold text-gray-700">문의 유형</div>
                    <div className="flex-1 bg-white flex items-center px-4 py-2">
                        <Select>
                            <SelectTrigger className="cursor-pointer w-[180px] h-[35px] border-[2px] border-[#A8A9AD] rounded-[5px]">
                                <SelectValue placeholder="상품문의" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">전체</SelectItem>
                                <SelectItem value="product">상품문의</SelectItem>
                                <SelectItem value="delivery">배송문의</SelectItem>
                                <SelectItem value="exchange">교환/반품</SelectItem>
                                <SelectItem value="other">기타</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* Search Filter */}
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
                    <div className="w-20">NO</div>
                    <div className="w-32">질문 유형</div>
                    <div className="flex-1">제목</div>
                    <div className="w-32">작성자(아이디)</div>
                    <div className="w-32">작성일</div>
                    <div className="w-32">처리여부</div>
                    <div className="w-32">답변자</div>
                    <div className="w-32">답변일시</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {MOCK_INQUIRIES.map((item) => (
                        <div key={item.id} className="flex items-center text-center py-4 text-gray-700 font-medium hover:bg-gray-50 text-sm">
                            <div className="w-20">{item.id}</div>
                            <div className="w-32">{item.type}</div>
                            <div className="flex-1 text-center">{item.title}</div>
                            <div className="w-32">{item.writer}</div>
                            <div className="w-32">{item.date}</div>
                            <div className="w-32 flex justify-center">
                                <Select defaultValue={item.status}>
                                    <SelectTrigger className="cursor-pointer !w-[80px] !h-[30px] !p-0 bg-[#5C4033] text-white !text-[11px] font-medium rounded-[5px] !border-[#A8A9AD] !border-[2px] flex justify-center items-center focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="답변 전">답변 전</SelectItem>
                                        <SelectItem value="답변 완료">답변 완료</SelectItem>
                                        <SelectItem value="답변 보류">답변 보류</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-32">{item.replier}</div>
                            <div className="w-32">{item.replyDate}</div>
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
