import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signUp } from "@/api/member/memberApi";
import { FASHION_STYLES } from "@/constants/style.constants";

const AiSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signUpData = location.state || {};
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");


  const toggleStyle = (label: string) => {
    setSelectedStyles((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSignup = async () => {
    if (!signUpData || !signUpData.memberId) {
      alert("회원가입 정보가 누락되었습니다. 다시 시도해주세요.");
      navigate("/signup");
      return;
    }

    const data = {
      ...signUpData,
      marketingAgree: signUpData.marketingAgree ? 1 : 0,
      height: height ? parseFloat(height) : 0,
      weight: weight ? parseFloat(weight) : 0,
      prefStyles: selectedStyles,
    };

    try {
      await signUp(data);
      navigate("/JoinComplete");
    } catch (error: any) {
      alert(error.response?.data?.message || "저장에 실패했습니다. 백엔드 서버 상태를 확인해주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-[30px] font-semibold text-[#000000] mt-[20px]">
        Ai 맞춤 정보
      </div>

      <div className="text-[16px] text-[#A8A9AD] mt-[5px] ">
        AI가 체형과 스타일을 분석해 추천 드려요
      </div>

      <div className="w-[1360px] h-[1px] bg-[#5C4033] my-[30px]" />

      <div className="w-[1360px] flex justify-start ml-[24px]">
        <span className="text-[18px] font-medium">체형</span>
      </div>

      <div className="w-[1360px] flex justify-start ml-[24px] text-[#A8A9AD] text-[14px]">
        <div>나의 비슷한 체형의 후기를 모아볼 수 있어요 </div>
      </div>

      <div className="w-[1360px] flex justify-start ml-[24px] mt-[20px] gap-[60px]">
        <div className="flex flex-col gap-[6px]">
          <span className="text-[16px] font-medium text-black">
            키{" "}
            <span className="ml-[4px] text-[#A8A9AD] text-[14px]">(선택)</span>
          </span>
          <div className="relative w-[280px]">
            <input
              type="text"
              placeholder="입력"
              value={height || ""}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full h-[40px] px-[12px] pr-[36px] border border-[#5C4033] text-[14px] placeholder:text-[#A8A9AD] focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
            />
            <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[14px] text-[#A8A9AD]">
              cm
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <span className="text-[16px] font-medium text-black">
            몸무게{" "}
            <span className="ml-[4px] text-[#A8A9AD] text-[14px]">(선택)</span>
          </span>
          <div className="relative w-[280px]">
            <input
              type="text"
              placeholder="입력"
              value={weight || ""}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full h-[40px] px-[12px] pr-[36px] border border-[#5C4033] text-[14px] placeholder:text-[#A8A9AD] focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
            />
            <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[14px] text-[#A8A9AD]">
              kg
            </span>
          </div>
        </div>
      </div>

      <div className="w-[1360px] flex justify-start ml-[24px] mt-[40px]">
        <span className="text-[18px] font-medium">패션</span>
      </div>

      <div className="w-[1360px] flex justify-start ml-[24px] text-[#A8A9AD] text-[14px]">
        <div>선호하는 패션 스타일을 다양하게 제안해 드릴게요 </div>
      </div>

      <div className="w-[1360px] flex flex-col items-start ml-[24px] mt-[20px] gap-[16px]">
        <span className="text-[16px] font-medium text-black">
          선호 스타일{" "}
          <span className="ml-[4px] text-[#A8A9AD] text-[14px]">
            (복수 선택 가능)
          </span>
        </span>

        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[12px]">
          {FASHION_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => toggleStyle(style.label)}
              className={`
                w-[320px] p-[16px] flex flex-col items-start border transition-all cursor-pointer
                ${selectedStyles.includes(style.label)
                  ? "border-[#5C4033] bg-[#F9F8F7]"
                  : "border-[#A8A9AD] hover:border-[#5C4033]"
                }
              `}
            >
              <span
                className={`text-[15px] font-bold ${selectedStyles.includes(style.label)
                  ? "text-[#5C4033]"
                  : "text-black"
                  }`}
              >
                {style.label}
              </span>
              <span className="text-[13px] text-[#A8A9AD] mt-[5px] text-left">
                {style.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center mt-[60px] mb-[80px]">
        <div className="w-full max-w-[1360px]">
          <button
            type="button"
            onClick={handleSignup}
            className="w-full h-[52px] flex items-center justify-center border border-[#5C4033] text-[16px] font-medium hover:bg-[#5C4033] hover:text-white transition cursor-pointer"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export { AiSelect };
