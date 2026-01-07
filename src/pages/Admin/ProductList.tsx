import { Search } from "lucide-react";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MOCK_PRODUCTS = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    category: "기본상품",
    code: "P00000BD",
    name: "아노락",
    price: "25,000",
    discountPrice: "25,000",
}));

export function ProductList() {
    const [activePeriod, setActivePeriod] = useState("1개월");

    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-6">
            <h2 className="text-[30px] font-bold text-gray-800">상품 현황</h2>

            {/* Summary Cards */}
            <div className="bg-[#E5E5E5] p-8 rounded-lg">
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { title: "전체 등록 상품", count: 0 },
                        { title: "판매중인 상품", count: 0 },
                        { title: "품절상품", count: 0 },
                        { title: "삭제 상품", count: 0 },
                    ].map((card, idx) => (
                        <div key={idx} className="bg-white rounded-[5px] border border-[#5C4033] p-4 h-[120px] flex flex-col justify-between">
                            <span className="font-medium text-base text-black">{card.title}</span>
                            <span className="text-3xl font-medium text-gray-900">{card.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Section */}
            <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex border-b border-gray-300">
                    <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-4 font-bold text-gray-700 text-sm">상품 등록일</div>
                    <div className="flex-1 bg-white flex items-center px-4 py-2 gap-2">
                        {['1개월', '3개월', '6개월', '1년'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setActivePeriod(period)}
                                className={`cursor-pointer px-5 py-1.5 border-[2px] border-[#A8A9AD] rounded-full text-sm transition-colors ${activePeriod === period ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-32 bg-[#F9F9F9] flex items-center pl-6 py-4 font-bold text-gray-700 text-sm">검색어</div>
                    <div className="flex-1 bg-white flex items-center px-4 py-4 gap-3">
                        <Select defaultValue="productName">
                            <SelectTrigger className="cursor-pointer w-[120px] h-[40px] border-[2px] border-[#A8A9AD] rounded-full px-4 text-sm focus:ring-0">
                                <SelectValue placeholder="상품명" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="productName">상품명</SelectItem>
                                <SelectItem value="productCode">상품코드</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="relative w-[300px]">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                className="w-full h-[40px] pl-4 pr-10 border-[2px] border-[#A8A9AD] rounded-full text-sm focus:outline-none"
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
                    <div className="flex-1">상품 구분</div>
                    <div className="flex-1">상품 코드</div>
                    <div className="flex-[1.5]">상품명</div>
                    <div className="flex-1">판매가</div>
                    <div className="flex-1">할인가</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {MOCK_PRODUCTS.map((product) => (
                        <div key={product.id} className="flex items-center text-center py-4 text-gray-700 font-medium hover:bg-gray-50 text-sm">
                            <div className="w-16">{product.id}</div>
                            <div className="flex-1">{product.category}</div>
                            <div className="flex-1">
                                <span className="underline cursor-pointer">{product.code}</span>
                            </div>
                            <div className="flex-[1.5]">{product.name}</div>
                            <div className="flex-1">{product.price}</div>
                            <div className="flex-1">{product.discountPrice}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500 pt-4 pb-8">
                <button className="cursor-pointer text-black font-bold">1</button>
                <button className="cursor-pointer hover:text-black">2</button>
                <button className="cursor-pointer hover:text-black">3</button>
            </div>
        </div>
    );
}
