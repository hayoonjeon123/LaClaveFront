import { Search } from "lucide-react";

// Mock Data for the table
const MEMBERS = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: "회원 이름",
    userId: "아이디",
    email: "이메일",
    joinDate: "가입일",
    status: "정상",
}));

export function MemberManagement() {
    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-8">
            <h2 className="text-2xl font-bold mb-4 text-[30px]">회원 현황</h2>

            <div className="bg-white rounded-lg bg-[#5C4033] shadow-sm border border-gray-200">
                <div className="grid grid-cols-4">
                    {[1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className="relative h-[120px] px-6 py-4 text-left flex flex-col justify-between">
                            <h3 className="font-medium font-bold">신규 회원</h3>
                            <p className="text-3xl text-s text-gray-900">0</p>
                            {idx < 3 && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-gray-200"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative w-full max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className="text-[10px] text-gray-400">▼</div>
                    </div>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="w-full pl-8 pr-10 py-3 rounded-full border-[3px] border-[#A8A9AD] focus:outline-none text-sm shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="flex bg-[#5C4033] text-white py-4 text-center font-bold text-sm md:text-base">
                    <div className="w-16">NO</div>
                    <div className="flex-1">회원 이름</div>
                    <div className="flex-1">아이디</div>
                    <div className="flex-1">이메일</div>
                    <div className="flex-1">가입일</div>
                    <div className="w-32">회원 상태</div>
                    <div className="w-[280px]">회원 관리</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {MEMBERS.map((member) => (
                        <div key={member.id} className="flex items-center text-center py-4 hover:bg-gray-50 text-sm text-gray-700 font-medium">
                            <div className="w-16">{member.id}</div>
                            <div className="flex-1">{member.name}</div>
                            <div className="flex-1">{member.userId}</div>
                            <div className="flex-1">{member.email}</div>
                            <div className="flex-1">{member.joinDate}</div>
                            <div className="w-32 flex justify-center">
                                <span className="px-3 py-1 bg-[#5C4033] text-white rounded text-xs">
                                    {member.status}
                                </span>
                            </div>
                            <div className="w-[280px] flex justify-center gap-2">
                                <button className="px-3 py-1 bg-[#5C4033] text-white rounded text-xs hover:bg-[#4a332a]">상세보기</button>
                                <button className="px-3 py-1 bg-[#5C4033] text-white rounded text-xs hover:bg-[#4a332a]">등급</button>
                                <button className="px-3 py-1 bg-[#5C4033] text-white rounded text-xs hover:bg-[#4a332a]">삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500 pt-4">
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
