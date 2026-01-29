import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInquiryList, deleteInquiry } from "../../api/myPage/inquiryApi";

export default function MyInquiryHistory() {
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    getInquiryList()
      .then((res) => {
        console.log("inquiry response:", res.data);
        setInquiries(res.data);
      })
      .catch((err) => {
        console.error("문의 목록 조회 실패", err);
      });
  }, []);

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
          <h2 className="text-[24px] font-bold text-[#5C4033] tracking-tight">
            1:1문의 내역
          </h2>
        </div>
      </div>

      {/* Inquiry List */}
      <div className="max-w-[700px] mx-auto px-6 space-y-4 mb-8">
        {inquiries.map((inquiry) => {
          const statusText = inquiry.answerContent ? "답변완료" : "답변대기";
          const statusColor = inquiry.answerContent
            ? "text-[#87CEEB]"
            : "text-red-500";
          return (
            <div
              key={inquiry.inquiryIdx}
              className="border border-[#A8A9AD] rounded-[10px] p-5 shadow-sm relative"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  {/* Q Icon */}
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white font-bold text-[13px]">
                    Q
                  </div>
                  <span className={`text-[16px] font-bold ${statusColor}`}>
                    {statusText}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5">
                  <button
                    className="px-3 py-1 border border-[#A8A9AD] rounded-[6px] text-[12px] font-bold hover:bg-[#5C4033] hover:text-white transition cursor-pointer text-[#333]"
                    onClick={() =>
                      navigate(`/editInquiry/${inquiry.inquiryIdx}`)
                    }
                  >
                    수정
                  </button>
                  <button
                    className="px-3 py-1 bg-[#5C4033] border border-[#A8A9AD] text-white rounded-[6px] text-[12px] font-bold hover:bg-[#4a3329] transition cursor-pointer"
                    onClick={async () => {
                      if (!confirm("정말 삭제하시겠습니까?")) return;

                      try {
                        await deleteInquiry(inquiry.inquiryIdx);
                        alert("문의가 삭제되었습니다.");

                        // 삭제 후 목록 다시 조회
                        const res = await getInquiryList();
                        setInquiries(res.data);
                      } catch (error) {
                        console.error(error);
                        alert("삭제에 실패했습니다.");
                      }
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>

              {/* Inquiry Content */}
              <div className="space-y-0.5 mb-4">
                <h3 className="text-[16px] font-bold text-black">
                  {inquiry.inquiryType}
                </h3>
                <h4 className="text-[14px] font-semibold text-[#000000]">
                  {inquiry.inquiryTitle}
                </h4>
                <p className="text-[14px] text-[#000000] font-medium">
                  {inquiry.inquiryContent}
                </p>
              </div>

              {/* Created At */}
              <div className="text-[13px] text-[#000000] font-medium">
                {inquiry.createdAt.split("T")[0]}
              </div>

              {/* Admin Answer */}
              {inquiry.answerContent && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    {/* A Icon */}
                    <div className="w-6 h-6 bg-[#5C4033] rounded-full flex items-center justify-center text-white font-bold text-[13px]">
                      A
                    </div>
                    <span className="text-[14px] font-bold text-[#5C4033]">
                      관리자 답변
                    </span>
                  </div>

                  {/* 답변 내용 */}
                  <p className="text-[14px] text-[#333] font-medium whitespace-pre-line ml-8">
                    {inquiry.answerContent}
                  </p>

                  {/* 답변일 */}
                  {inquiry.answeredAt && (
                    <p className="text-[12px] text-[#A8A9AD] mt-1 ml-8">
                      답변일 {inquiry.answeredAt.split("T")[0]}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
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
