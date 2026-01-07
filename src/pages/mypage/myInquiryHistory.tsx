import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyInquiryHistory() {
  const navigate = useNavigate();
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">문의 내역</h2>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 my-5">
        <div className="border-[#5C4033] border-[3px] rounded-[10px] p-6 gap-6 cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-[red] text-3xl mb-3">답변대기</h2>

            <div className="flex gap-2">
              <button className="bg-[#ffffff] text-[#000000] px-4 py-2 rounded-[10px] hover:bg-[#5C4033] hover:text-white">
                수정
              </button>
              <button className="bg-[#5C4033] text-white px-4 py-2 rounded-[10px] hover:bg-[#5C4033] hover:text-white">
                삭제
              </button>
            </div>
          </div>
          <div className="color-[#000000] font-semibold text-2xl mb-6 ">
            문의 유형
          </div>
          <div className="color-[#000000] font-semibold text-2xl mb-6">
            내용
          </div>
          <div className="text-[#A8A9AD] mb-3">2025.04.10</div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-[#5C4033] border-[3px] rounded-[10px] p-2 gap-6 cursor-pointer  hover:bg-[#5C4033] hover:text-white">
          <div className="text-center font-semibold text-2xl ">1:1문의하기</div>
        </div>
      </div>
    </div>
  );
}
