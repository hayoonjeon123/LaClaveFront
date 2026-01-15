import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInquiryList, updateInquiry } from "../../api/inquiryApi";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";

export default function EditInquiry() {
  const navigate = useNavigate();
  const { inquiryIdx } = useParams<{ inquiryIdx: string }>();

  const [inquiryType, setInquiryType] = useState<string>(""); // 문의 유형
  const [title, setTitle] = useState<string>(""); // 문의 제목
  const [content, setContent] = useState<string>(""); // 문의 내용
  const [loading, setLoading] = useState<boolean>(true);

  const inquiryTypeMap: Record<string, string> = {
    "101": "배송",
    "102": "결제",
    "103": "환불",
    "104": "계정",
    "105": "기타",
  };

  useEffect(() => {
    // 기존 문의 내용 불러오기
    getInquiryList() // 임시 memberIdx=1
      .then((res) => {
        const inquiry = res.data.find(
          (i: any) => i.inquiryIdx === Number(inquiryIdx)
        );
        if (inquiry) {
          setInquiryType(
            Object.entries(inquiryTypeMap).find(
              ([, v]) => v === inquiry.inquiryTitle
            )?.[0] || ""
          );
          setTitle(inquiry.inquiryTitle);
          setContent(inquiry.inquiryContent);
          setInquiryType(String(inquiry.inquiryTypeCommonIdx));
        }
      })
      .catch((err) => {
        console.error("문의 불러오기 실패", err);
        alert("문의 불러오기에 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, [inquiryIdx]);

  const handleUpdate = async () => {
    if (!inquiryType || !title || !content) {
      alert("문의 유형, 제목, 내용을 모두 입력해주세요.");
      return;
    }
    if (!confirm("정말 수정하시겠습니까?")) return;
    try {
      await updateInquiry(Number(inquiryIdx), {
        inquiryTitle: title,
        inquiryContent: content,
        inquiryTypeCommonIdx: Number(inquiryType),
      });
      alert("수정 완료되었습니다.");
      navigate("/myInquiryHistory");
    } catch (error) {
      console.error(error);
      alert("수정 실패!");
    }
  };

  if (loading) return <div className="p-6 text-center">불러오는 중...</div>;

  return (
    <div className="pb-15">
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
            문의 수정
          </h2>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6 space-y-6">
        {/* 유형 선택 */}
        <div className="space-y-2">
          <label className="block text-[18px] font-bold text-black">
            유형 선택
          </label>
          <Select
            onValueChange={(val) => {
              setInquiryType(val);
              setTitle(inquiryTypeMap[val]);
            }}
            value={inquiryType}
          >
            <SelectTrigger className="w-full !h-[56px] border-[#A8A9AD] rounded-[6px] text-[18px] focus:ring-0 focus:ring-offset-0 px-4">
              <SelectValue placeholder="문의 유형을 선택해주세요" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded shadow-lg z-50 mt-1">
              {Object.entries(inquiryTypeMap).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 내용 입력 */}
        <div className="space-y-1">
          <label className="text-[16px] font-semibold">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="문의 내용을 입력해주세요"
            className="w-full h-[220px] border border-[#A8A9AD] rounded-[6px] p-4 text-[16px] outline-none focus:border-[#5C4033] resize-none"
          />
        </div>

        {/* 유의사항 */}
        <div className="border border-[#A8A9AD] rounded-[6px] p-5 min-h-[140px]">
          <h4 className="text-[18px] font-bold text-black mb-4">유의사항</h4>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            1. 욕설, 비방, 부적절한 내용이 포함된 문의는 사전 안내 없이 삭제될
            수 있습니다. <br />
            2. 이미 처리된 문의는 수정이 제한될 수 있습니다.
            <br />
            3. 개인정보(주민등록번호, 카드번호 등)는 입력하지 마세요.
            <br />
            4. 문의 내용은 마이페이지 1:1 문의 내역에서 확인할 수 있습니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-[180px] h-[56px] bg-[#F3F3F3] border border-[#A8A9AD] rounded-[8px] text-[18px] font-bold text-black hover:bg-gray-200 transition cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleUpdate}
            className="w-[180px] h-[56px] bg-[#5C4033] border border-[#A8A9AD] rounded-[8px] text-[18px] font-bold text-white hover:bg-[#4a3329] transition cursor-pointer"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
