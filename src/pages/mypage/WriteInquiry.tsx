import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";
import { createInquiry } from "../../api/inquiryApi";

export default function WriteInquiry() {
  const navigate = useNavigate();

  const [inquiryType, setInquiryType] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const inquiryTypeMap: Record<string, string> = {
    "101": "배송",
    "102": "결제",
    "103": "환불",
    "104": "계정",
    "105": "기타",
  };

  const handleSubmit = async () => {
    if (!confirm("등록하시겠습니까?")) return;
    if (!inquiryType || !content) {
      alert("문의 유형과 내용을 입력해주세요.");
      return;
    }
    try {
      await createInquiry({
        inquiryTitle: inquiryTypeMap[inquiryType],
        inquiryContent: content,
        inquiryTypeCommonIdx: Number(inquiryType),
      });

      alert("문의가 접수되었습니다.");
      navigate("/myInquiryHistory");
    } catch (error) {
      console.error(error);
      alert("문의 등록에 실패했습니다.");
    }
  };

  return (
    <div className="pb-15 ">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[32px] font-bold text-black tracking-tighter">
            문의하기
          </h2>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6 space-y-6">
        {/* 유형선택 */}
        <div className="space-y-2">
          <label className="block text-[18px] font-bold text-black">
            유형선택
          </label>
          <Select onValueChange={setInquiryType}>
            <SelectTrigger className="w-full !h-[56px] border-[#A8A9AD] rounded-[6px] text-[18px] focus:ring-0 focus:ring-offset-0 px-4">
              <SelectValue placeholder="문의 유형을 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="101">배송</SelectItem>
              <SelectItem value="102">결제</SelectItem>
              <SelectItem value="103">환불</SelectItem>
              <SelectItem value="104">계정</SelectItem>
              <SelectItem value="105">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 내용 입력 */}
        {/* <div className="space-y-2 mb-[10px]">
          <textarea
            placeholder="내용"
            className="w-full h-[220px] p-6 border border-[#A8A9AD] rounded-[6px] text-[16px] outline-none focus:border-[#5C4033] resize-none placeholder:text-[#A8A9AD]"
          />
        </div> */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          className="w-full h-[220px] p-6 border border-[#A8A9AD] rounded-[6px] text-[16px] outline-none focus:border-[#5C4033] resize-none placeholder:text-[#A8A9AD]"
        />

        {/* 사진 첨부
        <div className="space-y-2">
          <label className="block text-[18px] font-bold text-black">사진</label>
          <div className="w-[100px] h-[100px] border border-[#A8A9AD] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition group">
            <Plus
              size={32}
              className="text-[#A8A9AD] group-hover:text-black transition"
            />
          </div>
        </div> */}

        {/* 유의사항 */}
        <div className="border border-[#A8A9AD] rounded-[6px] p-5 min-h-[140px]">
          <h4 className="text-[18px] font-bold text-black mb-4">유의사항</h4>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            1. 욕설, 비방, 부적절한 내용이 포함된 문의는 사전 안내 없이 삭제될
            수 있습니다. <br />
            2.이미 처리된 문의는 수정이 제한될 수 있습니다.
            <br /> 3.개인정보(주민등록번호, 카드번호 등)는 입력하지 마세요.{" "}
            <br />
            4.문의 내용은 마이페이지 1:1 문의 내역에서 확인할 수 있습니다.
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
            onClick={handleSubmit}
            className="w-[180px] h-[56px] bg-[#5C4033] border border-[#A8A9AD] rounded-[8px] text-[18px] font-bold text-white hover:bg-[#4a3329] transition cursor-pointer"
          >
            문의하기
          </button>

          {/* <button
            onClick={async () => {  
              alert("문의가 접수되었습니다.");
              navigate("/myInquiryHistory");
            }}
            className="w-[180px] h-[56px] bg-[#5C4033] border border-[#A8A9AD] rounded-[8px] text-[18px] font-bold text-white hover:bg-[#4a3329] transition cursor-pointer"
          >
            문의하기
          </button> */}
        </div>
      </div>
    </div>
  );
}
