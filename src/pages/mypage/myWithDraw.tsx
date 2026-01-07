import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function MyWithDraw() {
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
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">회원 탈퇴</h2>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-[#5C4033] border-[1px] rounded-[10px] p-2 gap-6 mb-6">
          <div className="p-3 font-semibold text-2xl ">유의사항</div>
          <div className="p-3">
            <p className="font-semibold">탈퇴 후 처리되는 내용</p>
            <p className="font-semibold">1. 탈퇴 요청 후 5일간 유예 기간</p>·
            탈퇴 신청을 해도 5일간 계정이 유지되며 로그인하면 요청이 자동
            취소됩니다.
            <p>
              · 무신사 고객센터 이 기간 동안 탈퇴를 취소하고 서비스 이용을 다시
              할 수 있습니다.
            </p>
            <p className="font-semibold">2. 적립금/포인트</p>· 탈퇴하면 적립금
            및 사용 중인 혜택은 모두 소멸합니다.
            <p className="font-semibold">3. 재가입 가능 여부</p>· 일반적인 경우
            탈퇴 후 재가입이 가능합니다. 단, 약관 위반·강제 탈퇴 이력이 있는
            경우에는 재가입이 제한될 수 있습니다.
          </div>
        </div>

        <div className="flex gap-6 items-center justify-center">
          <label className="ml-6 p-3 font-semibold text-2xl w-48">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호"
            className="w-120 h-12 px-4 text-lg border border-[#5C4033] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#F2B5D4]"
          />
        </div>

        <div className="flex gap-6 items-center justify-center">
          <label className="ml-6 p-3 font-semibold text-2xl w-48">
            비밀번호 확인
          </label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-120 h-12 px-4 text-lg border border-[#5C4033] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#F2B5D4]"
          />
        </div>

        <div className="flex gap-6 justify-center my-5">
          <button className="bg-[#5C4033] text-white px-4 py-2 rounded-[10px] hover:bg-[#5C4033] hover:text-white w-48 h-12 cursor-pointer">
            탈퇴하기
          </button>
          <button className="bg-[#ffffff] text-[#5C4033] px-4 py-2 rounded-[10px] hover:bg-[#ffffff] hover:text-[#000000] w-48 h-12 cursor-pointer">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
