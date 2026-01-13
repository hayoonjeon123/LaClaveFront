import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyInquiryHistory() {
  const navigate = useNavigate();

  const memberIdx = 1; // 임시 (로그인 연동되면 교체)

  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/inquiry/${memberIdx}`)
      .then((res) => {
        console.log("🔥 inquiry response:", res.data);
        setInquiries(res.data);
      })
      .catch((err) => {
        console.error("문의 목록 조회 실패");
        console.error("status:", err.response?.status);
        console.error("data:", err.response?.data);
        console.error("message:", err.message);
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
        {inquiries.map((inquiry) => (
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
                <span
                  className={`text-[16px] font-bold ${
                    inquiry.inquiryStatus === "답변대기"
                      ? "text-red-500"
                      : "text-[#87CEEB]"
                  }`}
                >
                  {inquiry.inquiryStatus}
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

            <div className="text-[13px] text-[#000000] font-medium">
              {inquiry.createdAt}
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
