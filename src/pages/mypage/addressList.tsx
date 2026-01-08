import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddressList() {
    const navigate = useNavigate();

    return (
        <div className="max-w-[700px] mx-auto pb-20">
            {/* Header */}
            <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-12">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft size={28} strokeWidth={1.5} />
                </button>
                <div className="flex-1 text-center">
                    <h2 className="text-[24px] font-bold text-black tracking-tight">배송지 목록</h2>
                </div>
            </div>

            <div className="px-6">
                {/* 배송지 추가 버튼 */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => navigate("/addAddress")}
                        className="px-3 py-1.5 border border-[#A8A9AD] rounded-[6px] cursor-pointer font-bold text-[13px] text-black hover:bg-[#5C4033] hover:text-white transition cu"
                    >
                        배송지 추가
                    </button>
                </div>

                {/* 배송지 카드 */}
                <div className="border border-[#A8A9AD] rounded-[10px] p-5 mb-2 shadow-sm bg-[#F5F5F5]">
                    <div className="space-y-1.5 mb-2 text-left">
                        <div className="text-[16px] font-bold text-[#5C4033]">집</div>
                        <div className="flex items-center gap-2">
                            <span className="text-[18px] font-bold">송은경</span>
                            <span className="px-2 py-0.5 border border-[#A8A9AD] rounded-full text-[10px] text-[#5C4033] font-medium">기본 배송지</span>
                        </div>
                        <div className="text-[14px] font-medium text-[#333]">
                            부산광역시 수영구 광안대로 560-3
                        </div>
                        <div className="text-[14px] font-medium text-[#333]">
                            010-1234-5678
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button className="cursor-pointer px-4 py-1.5 bg-[#F5F5F5] border border-[#A8A9AD] rounded-[6px] font-bold text-[13px] text-[#333] transition">
                            수정
                        </button>
                        <button className="cursor-pointer px-4 py-1.5 bg-[#5C4033] text-white border border-[#A8A9AD] rounded-[6px] font-bold text-[13px] transition">
                            삭제
                        </button>
                    </div>
                </div>

                {/* 저장하기 버튼 */}
                <div className="flex justify-center mt-12">
                    <button className="w-[140px] h-[44px] border border-[#A8A9AD] rounded-[6px] font-bold text-[15px] text-black hover-[#5C4033] hover:border-[#5C4033] hover:text-white hover:bg-[#5C4033] transition shadow-sm cursor-pointer">
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}
