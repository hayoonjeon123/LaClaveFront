import { useState } from "react";
import Logo from "@/assets/image/Logo_brown.png";
import { useNavigate } from "react-router-dom";
import { findMemberId, findMemberPw, sendEmailAuth, verifyEmailCode } from "@/api/member/authApi";

const FindAccount = () => {
  const [activeTab, setActiveTab] = useState("id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      await sendEmailAuth(email);
      alert("인증번호가 전송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      alert("이메일 전송에 실패했습니다.");
    }
  };

  const handleCheckCode = async () => {
    if (!authCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    try {
      await verifyEmailCode({ email, authCode });
      alert("이메일 인증이 완료되었습니다.");
      setIsVerified(true);
    } catch (error: any) {
      alert(error.response?.data || "인증번호가 틀렸습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!isVerified) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }

    try {
      if (activeTab === "id") {
        const resultString = await findMemberId({ memberName: name, email });
        const resultId = resultString.match(/\[(.*?)\]/)?.[1] || resultString;
        navigate("/find-result/id", { state: { name, email, id: resultId } });
      } else {
        if (!memberId) {
          alert("아이디를 입력해주세요.");
          return;
        }
        const resultString = await findMemberPw({ memberId, memberName: name, email });
        const tempPw = resultString.match(/\[(.*?)\]/)?.[1] || resultString;
        navigate("/find-result/password", { state: { name, email, id: memberId, password: tempPw } });
      }
    } catch (error: any) {
      alert(error.response?.data || "정보를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-[600px] px-6">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="LOGO" className="h-16" />
        </div>

        <div className="relative flex border-b border-gray-200 mb-8">
          <button
            onClick={() => { setActiveTab("id"); setIsVerified(false); }}
            className={`flex-1 py-4 text-center font-bold text-[18px] transition-colors cursor-pointer ${activeTab === "id" ? "text-[#5C4033]" : "text-gray-400"
              }`}
          >
            아이디 찾기
          </button>

          <div className="w-[2px] h-6 bg-gray-400 self-center" />

          <button
            onClick={() => { setActiveTab("password"); setIsVerified(false); }}
            className={`flex-1 py-4 text-center font-bold text-[18px] transition-colors cursor-pointer ${activeTab === "password" ? "text-[#5C4033]" : "text-gray-400"
              }`}
          >
            비밀번호 찾기
          </button>

          <div
            className="absolute bottom-0 h-[3px] bg-[#5C4033] transition-all duration-300 ease-in-out"
            style={{
              width: "calc(50% - 0.5px)",
              left: activeTab === "id" ? "0" : "calc(50% + 0.5px)",
            }}
          />
        </div>

        <div className="border border-gray-300 rounded-[10px] p-8 space-y-4 w-full max-w-[800px] mx-auto">
          {activeTab === "password" && (
            <div className="flex items-center gap-2">
              <label className="w-24 text-[16px] font-medium text-[#5C4033] shrink-0">
                아이디
              </label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="flex-1 h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-[#5C4033]"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="w-24 text-[16px] font-medium text-[#000000] shrink-0">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-[#5C4033]"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-24 text-[16px] font-medium text-[#000000] shrink-0">
              이메일
            </label>
            <div className="flex-1 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-[#5C4033]"
              />
              <button
                onClick={handleSendEmail}
                className="px-4 border border-gray-300 rounded-md text-[13px] hover:bg-[#5C4033] hover:text-white whitespace-nowrap cursor-pointer"
              >
                인증번호
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-24 shrink-0" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="인증번호 입력"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="flex-1 h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-[#5C4033]"
              />
              <button
                onClick={handleCheckCode}
                className="px-6 border border-gray-300 rounded-md text-[13px] hover:bg-[#5C4033] hover:text-white whitespace-nowrap cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
          {isVerified && (
            <div className="flex items-center gap-2">
              <div className="w-24 shrink-0" />
              <span className="text-xs text-blue-600 font-bold font-['Inter'] flex items-center gap-1">
                ✓ 이메일 인증이 완료되었습니다.
              </span>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-[300px] h-14 border border-gray-300 rounded-md text-[16px] font-medium hover:bg-[#5C4033] hover:text-white transition-colors cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export { FindAccount };
