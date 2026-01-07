
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock Data for the table
const COMMON_CODES = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    codeTypeId: "코드타입ID",
    codeTypeName: "코드타입명",
    commonCodeId: "공통코드ID",
    commonCodeName: "공통코드명",
    description: "공통코드 설명",
}));

export function CommonCodeManagement() {
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-8">
            <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <div className="text-xs text-gray-400">▼</div>
                    </div>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="w-full pl-8 pr-10 py-3 rounded-full border-[3px] border-[#A8A9AD] focus:outline-none text-sm shadow-sm placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mb-2">
                <button
                    onClick={() => navigate("/admin/code/add")}
                    className="px-6 py-2 bg-[#5C4033] text-white rounded-[5px] font-medium border-[2px] border-[#A8A9AD] hover:bg-[#4a332a] transition-colors cursor-pointer"
                >
                    공통코드 추가
                </button>
            </div>

            <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="flex bg-[#5C4033] text-white py-4 text-center font-medium text-sm md:text-base">
                    <div className="w-16">NO</div>
                    <div className="flex-1">코드타입ID</div>
                    <div className="flex-1">코드타입명</div>
                    <div className="flex-1">공통코드ID</div>
                    <div className="flex-1">공통코드명</div>
                    <div className="flex-[1.5]">공통코드 설명</div>
                    <div className="w-[200px]">관리</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {COMMON_CODES.map((code) => (
                        <div key={code.id} className="flex items-center text-center py-4 hover:bg-gray-50 text-sm text-gray-700 font-medium">
                            <div className="w-16">{code.id}</div>
                            <div className="flex-1">{code.codeTypeId}</div>
                            <div className="flex-1">{code.codeTypeName}</div>
                            <div className="flex-1">{code.commonCodeId}</div>
                            <div className="flex-1">{code.commonCodeName}</div>
                            <div className="flex-[1.5]">{code.description}</div>
                            <div className="w-[200px] flex justify-center gap-2">
                                <button className="px-4 py-1.5 bg-[#5C4033] text-white text-sm text-center rounded-[5px] border-[#A8A9AD] border-[2px] hover:bg-[#4a332a] cursor-pointer">
                                    수정
                                </button>
                                <button className="px-4 py-1.5 bg-[#5C4033] text-white text-sm text-center rounded-[5px] border-[#A8A9AD] border-[2px] hover:bg-[#4a332a] cursor-pointer">
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
