import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AiSelect = () => {
  const navigate = useNavigate();
  /* ================= 상태 관리 ================= */
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  // 스타일 데이터 리스트
  const styles = [
    { id: "daily", label: "데일리", desc: "매일 입기 좋은 편안하고 깔끔한 룩" },
    {
      id: "girlish",
      label: "걸리쉬",
      desc: "사랑스럽고 여성스러운 무드의 스타일",
    },
    {
      id: "classic",
      label: "클래식",
      desc: "유행을 타지 않는 정갈하고 차분한 무드",
    },
    { id: "street", label: "스트릿", desc: "개성 있고 자유로운 힙한 감성" },
    { id: "minimal", label: "미니멀", desc: "군더더기 없는 절제된 세련미" },
    {
      id: "vintage",
      label: "빈티지",
      desc: "아날로그 감성의 독특한 포인트 스타일",
    },
    {
      id: "office",
      label: "오피스",
      desc: "단정하고 세련된 출근룩 중심의 스타일",
    },
    {
      id: "romantic",
      label: "로맨틱",
      desc: "부드럽고 감성적인 분위기의 페미닌 룩",
    },
    {
      id: "sporty",
      label: "스포티",
      desc: "활동적이고 편안한 캐주얼 스포츠 감성",
    },
    {
      id: "luxury",
      label: "럭셔리",
      desc: "고급스럽고 세련된 무드의 스타일링",
    },
    {
      id: "casual",
      label: "캐주얼",
      desc: "부담 없이 입기 좋은 자연스러운 데일리 룩",
    },
    {
      id: "chic",
      label: "시크",
      desc: "도회적이고 세련된 분위기의 감각적인 스타일",
    },
  ];

  // 스타일 클릭
  const toggleStyle = (label: string) => {
    setSelectedStyles((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  /* ================= 가입/저장 핸들러 ================= */
  const handleSignup = async () => {
    // 실제 구현 시에는 SignUp 페이지에서 넘어온 회원 번호나 
    // 가입 성공 후 반환된 memberIdx 등을 사용해야 합니다.
    const memberIdx = 123; // 임시 ID

    const data = {
      memberIdx: memberIdx,
      height: height ? parseFloat(height) : null,
      weight: weight ? parseFloat(weight) : null,
      styles: selectedStyles // ["데일리", "시크"] 형태
    };

    try {
      // 1. (가정) 실제 회원가입 API 호출이 필요한 경우 여기서 먼저 진행
      // await axios.post('http://localhost:8080/signup', signUpData);

      // 2. AI 정보 저장
      // (기존 /api/member/save-ai-info 가 404이므로 /member/save-ai-info 로 시도)
      await axios.post('http://localhost:8080/save-ai-info', data);

      alert("맞춤 정보 저장이 완료되었습니다!");
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      console.error("저장 중 에러 발생:", error);
      alert("저장에 실패했습니다. 백엔드 엔드포인트를 확인해주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 제목 */}
      <div className="text-[30px] font-semibold text-[#000000] mt-[20px]">
        Ai 맞춤 정보
      </div>

      <div className="text-[16px] text-[#A8A9AD] mt-[5px] ">
        AI가 체형과 스타일을 분석해 추천 드려요
      </div>

      {/* 라인 */}
      <div className="w-[1360px] h-[1px] bg-[#5C4033] my-[30px]" />

      <div className="w-[1360px] flex justify-start ml-[24px]">
        <span className="text-[18px] font-medium">체형</span>
      </div>

      <div className="w-[1360px] flex justify-start ml-[24px] text-[#A8A9AD] text-[14px]">
        <div>나의 비슷한 체형의 후기를 모아볼 수 있어요 </div>
      </div>

      <div className="w-[1360px] flex justify-start ml-[24px] mt-[20px] gap-[60px]">
        {/* 키 */}
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

        {/* 몸무게 */}
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
        {/* 라벨 */}
        <span className="text-[16px] font-medium text-black">
          선호 스타일{" "}
          <span className="ml-[4px] text-[#A8A9AD] text-[14px]">
            (복수 선택 가능)
          </span>
        </span>

        {/* 스타일 버튼 그리드 */}
        <div className="grid grid-cols-4 gap-x-[20px] gap-y-[12px]">
          {styles.map((style) => (
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

      {/* 회원가입 버튼 */}
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
