import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function WriteReview() {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);

    return (
        <div className="max-w-[700px] mx-auto pb-10">
            {/* Header */}
            <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft size={28} strokeWidth={1.5} />
                </button>
                <div className="flex-1 text-center">
                    <h2 className="text-[20px] font-bold text-black tracking-tight">리뷰 작성</h2>
                </div>
            </div>


            <div className="px-6 space-y-6 mb-[-10px]">
                {/* 별점 섹션 */}
                <section>
                    <h3 className="text-[15px] font-bold text-black mb-2">
                        별점을 입력해주세요 <span className="text-[#A8A9AD] font-medium">(필수)</span>
                    </h3>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="cursor-pointer transition-transform hover:scale-110"
                            >
                                <Star
                                    size={30}
                                    fill={star <= rating ? "#FACC15" : "none"}
                                    stroke={star <= rating ? "#FACC15" : "#D1D5DB"}
                                    strokeWidth={1.5}
                                />
                            </button>
                        ))}
                    </div>
                </section>

                <Separator className="bg-[#5C4033]" />

                {/* 리뷰 내용 섹션 */}
                <section className="mb-[-10px]">
                    <h3 className="text-[15px] font-bold text-black mb-2">
                        상품에 대해 남겨주세요 <span className="text-[#A8A9AD] font-medium">(필수)</span>
                    </h3>
                    <textarea
                        placeholder="20자 이상 작성해주세요."
                        className="w-full h-[140px] p-2 border border-[#A8A9AD] rounded-[8px] resize-none focus:outline-none focus:border-black placeholder:text-[#A8A9AD] text-[14px]"
                    />
                </section>

                <Separator className="bg-[#F5F5F5]" />

                {/* 사진 첨부 섹션 */}
                <section>
                    <h3 className="text-[15px] font-bold text-black mb-2">
                        사진 첨부 <span className="text-[#A8A9AD] font-medium">(선택)</span>
                    </h3>
                    <div className="w-[80px] h-[80px] border border-[#A8A9AD] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                        <Plus size={20} className="text-[#A8A9AD]" />
                    </div>
                </section>

                <Separator className="bg-[#F5F5F5]" />

                {/* 등록 버튼 */}
                <div className="pt-2">
                    <button className="w-full h-[46px] bg-[#F5F5F5] border border-[#A8A9AD] rounded-[8px] font-bold text-[15px] text-black hover:bg-gray-50 transition">
                        리뷰 등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}
