import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import LogoBrown from "../../assets/Logo_brown.png";
import { updatePassword, type PasswordUpdateDto } from "@/api/memberApi";

export default function PwEdit() {
  const navigate = useNavigate();

  // ✅ 필드별 상태 관리
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    // 1️⃣ 새 비밀번호 확인
    if (newPw !== confirm) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 2️⃣ 빈값 체크
    if (!current || !newPw) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const dto: PasswordUpdateDto = {
      currentPassword: current,
      newPassword: newPw,
    };

    try {
      setLoading(true);
      await updatePassword(dto);
      alert("비밀번호가 변경되었습니다.");
      navigate("/myMemberEdit");
    } catch (err: any) {
      setError(err.response?.data || "비밀번호 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-17">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-150"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={LogoBrown}
          alt="La Clave"
          className="w-[220px] h-auto object-contain"
        />
      </div>

      {/* Password Form */}
      <div className="max-w-[800px] mx-auto border border-[#A8A9AD] rounded-[10px] p-10 shadow-sm mb-8">
        <div className="space-y-12">
          <div className="relative">
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="현재 비밀번호"
              className="w-full text-[16px] pb-2 bg-transparent border-b border-gray-300 outline-none placeholder:text-[#A8A9AD] focus:border-[#5C4033] transition-colors duration-150"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="새 비밀번호"
              className="w-full text-[16px] pb-2 bg-transparent border-b border-gray-300 outline-none placeholder:text-[#A8A9AD] focus:border-[#5C4033] transition-colors duration-150"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="새 비밀번호 확인"
              className="w-full text-[16px] pb-2 bg-transparent border-b border-gray-300 outline-none placeholder:text-[#A8A9AD] focus:border-[#5C4033] transition-colors duration-150"
            />
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-[220px] h-[60px] bg-white border border-gray-300 rounded-[10px] text-[20px] font-bold text-black shadow-sm hover:bg-[#5C4033] hover:text-white hover:border-[#5C4033] transition-colors duration-150 cursor-pointer disabled:opacity-50"
        >
          {loading ? "변경 중..." : "변경하기"}
        </button>
      </div>
    </div>
  );
}
