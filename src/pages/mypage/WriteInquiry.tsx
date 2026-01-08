import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";

export default function WriteInquiry() {
    const navigate = useNavigate();

    return (
        <div className="pb-15 ">
            {/* Header */}
            <div className="max-w-[1000px] mx-auto px-6 pt-6 flex items-center relative mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft size={28} strokeWidth={1.5} />
                </button>
                <div className="flex-1 text-center">
                    <h2 className="text-[32px] font-bold text-black tracking-tighter">문의하기</h2>
                </div>
            </div>

            <div className="max-w-[700px] mx-auto px-6 space-y-6">
                {/* 유형선택 */}
                <div className="space-y-2">
                    <label className="block text-[18px] font-bold text-black">유형선택</label>
                    <Select>
                        <SelectTrigger className="w-full !h-[56px] border-[#A8A9AD] rounded-[6px] text-[18px] focus:ring-0 focus:ring-offset-0 px-4">
                            <SelectValue placeholder="문의 유형을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="order">주문/결제</SelectItem>
                            <SelectItem value="delivery">배송</SelectItem>
                            <SelectItem value="cancel">취소/반품/교환</SelectItem>
                            <SelectItem value="product">상품문의</SelectItem>
                            <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* 내용 입력 */}
                <div className="space-y-2 mb-[10px]">
                    <textarea
                        placeholder="내용"
                        className="w-full h-[220px] p-6 border border-[#A8A9AD] rounded-[6px] text-[16px] outline-none focus:border-[#5C4033] resize-none placeholder:text-[#A8A9AD]"
                    />
                </div>

                {/* 사진 첨부 */}
                <div className="space-y-2">
                    <label className="block text-[18px] font-bold text-black">사진</label>
                    <div className="w-[100px] h-[100px] border border-[#A8A9AD] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition group">
                        <Plus size={32} className="text-[#A8A9AD] group-hover:text-black transition" />
                    </div>
                </div>

                {/* 유의사항 */}
                <div className="border border-[#A8A9AD] rounded-[6px] p-5 min-h-[140px]">
                    <h4 className="text-[18px] font-bold text-black mb-4">유의사항</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                        {/* 유의사항 내용을 필요에 따라 추가할 수 있습니다 */}
                    </p>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-[180px] h-[56px] bg-[#F3F3F3] border border-[#A8A9AD] rounded-[8px] text-[18px] font-bold text-black hover:bg-gray-200 transition cursor-pointer"
                    >
                        취소하기
                    </button>
                    <button
                        onClick={() => {
                            alert("문의가 접수되었습니다.");
                            navigate("/myInquiryHistory");
                        }}
                        className="w-[180px] h-[56px] bg-[#5C4033] border border-[#A8A9AD] rounded-[8px] text-[18px] font-bold text-white hover:bg-[#4a3329] transition cursor-pointer"
                    >
                        문의하기
                    </button>
                </div>
            </div>
        </div>
    );
}
