import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyInquiryHistory() {
  const navigate = useNavigate();

  const inquiries = [
    {
      id: 1,
      status: "답변대기",
      statusColor: "text-red-500",
      type: "문의 유형",
      content: "내용",
      date: "2025-12-19 12:24",
    },
    {
      id: 2,
      status: "답변 완료",
      statusColor: "text-[#87CEEB]", // Light blue for completed
      type: "문의 유형",
      content: "내용",
      date: "2025-12-19 12:24",
    }
  ];

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[24px] font-bold text-[#5C4033] tracking-tight">1:1문의 내역</h2>
        </div>
      </div>

      {/* Inquiry List */}
      <div className="max-w-[700px] mx-auto px-6 space-y-4 mb-8">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="border border-[#A8A9AD] rounded-[10px] p-5 shadow-sm relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                {/* Q Icon */}
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white font-bold text-[13px]">
                  Q
                </div>
                <span className={`text-[16px] font-bold ${inquiry.statusColor}`}>
                  {inquiry.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1.5">
                <button className="px-3 py-1 border border-[#A8A9AD] rounded-[6px] text-[12px] font-bold hover:bg-[#5C4033] hover:text-white transition cursor-pointer text-[#333]">
                  수정
                </button>
                <button className="px-3 py-1 bg-[#5C4033] border border-[#A8A9AD] text-white rounded-[6px] text-[12px] font-bold hover:bg-[#4a3329] transition cursor-pointer">
                  삭제
                </button>
              </div>
            </div>

            <div className="space-y-0.5 mb-4">
              <h3 className="text-[16px] font-bold text-black">{inquiry.type}</h3>
              <p className="text-[14px] text-[#A8A9AD] font-medium">{inquiry.content}</p>
            </div>

            <div className="text-[13px] text-[#A8A9AD] font-medium">
              {inquiry.date}
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Button */}
      <div className="max-w-[700px] mx-auto px-6">
        <button
          onClick={() => navigate("/writeInquiry")}
          className="w-full h-[54px] border border-[#A8A9AD] rounded-[10px] text-[18px] font-bold text-black shadow-sm hover:bg-[#5C4033] hover:text-white transition cursor-pointer flex items-center justify-center"
        >
          1:1 문의하기
        </button>
      </div>
    </div>
  );
}
