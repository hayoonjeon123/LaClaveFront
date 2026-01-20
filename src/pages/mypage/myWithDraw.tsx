import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { withdrawMember } from "@/api/memberApi";
import { useState } from "react";

export default function MyWithDraw() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!password || !passwordCheck) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const confirmWithdraw = window.confirm(
      "정말로 회원 탈퇴하시겠습니까?\n탈퇴 후 복구할 수 없습니다."
    );
    if (!confirmWithdraw) return;

    try {
      setLoading(true);

      await withdrawMember({ password });

      alert("회원 탈퇴가 완료되었습니다.");

      // 🔐 로그아웃 처리
      localStorage.clear();
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data ?? "회원 탈퇴 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[32px] font-bold text-black tracking-tight">
            회원탈퇴
          </h2>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6">
        {/* 유의사항 박스 */}
        <div className=" border border-[#A8A9AD] rounded-[10px] p-6 shadow-sm">
          <h3 className="text-[20px] font-bold text-black mb-6">유의사항</h3>

          <div className="space-y-6 text-[15px] leading-relaxed text-[#333]">
            <div>
              <p className="font-bold mb-1">탈퇴 후 처리되는 내용</p>
              <p className="font-bold">1. 탈퇴 요청 후 5일간 유예 기간</p>
              <ul className="list-none pl-1 space-y-1">
                <li>
                  • 탈퇴 신청을 해도 5일간 계정이 유지되며 로그인하면 요청이
                  자동 취소됩니다.{" "}
                  <span className="underline cursor-pointer"></span>
                </li>
                <li>
                  • 이 기간 동안 탈퇴를 취소하고 서비스 이용을 다시 할 수
                  있습니다.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-1">2. 적립금/포인트</p>
              <ul className="list-none pl-1">
                <li>• 탈퇴하면 적립금 및 사용 중인 혜택은 모두 소멸합니다.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-1">3. 재가입 가능 여부</p>
              <ul className="list-none pl-1 space-y-1">
                <li>
                  • 일반적인 경우 탈퇴 후 재가입이 가능합니다.{" "}
                  <span className="text-gray-400">empty</span>
                </li>
                <li>
                  • 단, 약관 위반·강제 탈퇴 이력이 있는 경우에는 재가입이 제한될
                  수 있습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 비밀번호 입력 섹션 */}
        <div className="max-w-[650px] mx-auto space-y-6 mb-8 mt-8">
          <div className="flex items-center">
            <label className="w-[120px] text-[16px] font-bold text-black">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 h-[40px] px-[12px] text-[14px] border border-[#5C4033] placeholder:text-[#A8A9AD] focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
            />

            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className="flex-1 h-[40px] px-[12px] text-[14px] border border-[#5C4033] placeholder:text-[#A8A9AD] focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
            />
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-[200px] h-[60px] bg-white border border-[#A8A9AD] rounded-[12px] text-[20px] font-bold text-black hover:bg-gray-50 transition shadow-sm cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleWithdraw}
            disabled={loading}
            className="w-[200px] h-[60px] bg-[#5C4033] border border-[#A8A9AD] rounded-[12px] text-[20px] font-bold text-white hover:bg-[#4a3329] transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "처리 중..." : "탈퇴하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
