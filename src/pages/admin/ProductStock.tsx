
import { Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MOCK_STOCK = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    productName: "놀시 패딩",
    totalStock: "33,000",
    currentStock: "15,000",
    soldOutMark: "-",
    totalCumulativeSales: "1,255건",
    status: "판매중"
}));

export function ProductStock() {
    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[30px] font-bold text-gray-800">재고 관리</h2>
                <button className="cursor-pointer w-[120px] h-[45px] bg-[#5C4033] text-white text-base font-bold rounded-[5px] border-[2px] border-[#A8A9AD] hover:bg-[#4a332a] transition-colors">
                    저장
                </button>
            </div>

            <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
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
                <div className="flex">
                    <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-2 font-bold text-gray-700">검색어</div>
                    <div className="flex-1 bg-white flex items-center px-4 py-2">
                        <div className="relative w-[300px]">
                            <input
                                type="text"
                                placeholder="상품명을 입력하세요"
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
                    <div className="flex-1">상품명</div>
                    <div className="w-32">총 재고량</div>
                    <div className="w-32">재고수량</div>
                    <div className="w-32">품절표시</div>
                    <div className="w-32">총 누적 판매량</div>
                    <div className="w-32">판매 상태</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {MOCK_STOCK.map((item) => (
                        <div key={item.id} className="flex items-center text-center py-4 text-gray-700 font-medium hover:bg-gray-50 text-sm">
                            <div className="w-20">{item.id}</div>
                            <div className="flex-1">{item.productName}</div>
                            <div className="w-32">{item.totalStock}</div>
                            <div className="w-32">{item.currentStock}</div>
                            <div className="w-32">{item.soldOutMark}</div>
                            <div className="w-32">{item.totalCumulativeSales}</div>
                            <div className="w-32 flex justify-center">
                                <Select defaultValue={item.status}>
                                    <SelectTrigger className="!w-[80px] !h-[30px] !p-0 bg-[#5C4033] text-white !text-[11px] font-medium rounded-[5px] !border-[#A8A9AD] !border-[2px] flex justify-center items-center focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="판매중">판매중</SelectItem>
                                        <SelectItem value="품절">품절</SelectItem>
                                        <SelectItem value="판매중지">판매중지</SelectItem>
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
