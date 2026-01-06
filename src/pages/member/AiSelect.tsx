const AiSelect = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 제목 */}
      <div className="text-[30px] font-semibold text-[#000000] mt-[20px]">
        Ai 맞춤 정보
      </div>

      <div className="text-[16px] text-[#A8A9AD] mt-[20px] ">
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
          {/* 라벨 */}
          <span className="text-[16px] font-medium text-black">
            키
            <span className="ml-[4px] text-[#A8A9AD] text-[14px]">(선택)</span>
          </span>

          {/* 인풋 */}
          <div className="relative w-[280px]">
            <input
              type="text"
              placeholder="입력"
              className="
          w-full h-[40px] px-[12px] pr-[36px]
          border border-[#5C4033]
          text-[14px]
          placeholder:text-[#A8A9AD]
          focus:outline-none focus:ring-1 focus:ring-[#5C4033]
        "
            />
            <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[14px] text-[#A8A9AD]">
              cm
            </span>
          </div>
        </div>

        {/* 몸무게 */}
        <div className="flex flex-col gap-[6px]">
          {/* 라벨 */}
          <span className="text-[16px] font-medium text-black">
            몸무게
            <span className="ml-[4px] text-[#A8A9AD] text-[14px]">(선택)</span>
          </span>

          {/* 인풋 */}
          <div className="relative w-[280px]">
            <input
              type="text"
              placeholder="입력"
              className="
          w-full h-[40px] px-[12px] pr-[36px]
          border border-[#5C4033]
          text-[14px]
          placeholder:text-[#A8A9AD] 
          focus:outline-none focus:ring-1 focus:ring-[#5C4033]
        "
            />
            <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[14px] text-[#A8A9AD]">
              kg
            </span>
          </div>
        </div>
      </div>
      <div className="w-[1360px] flex justify-start ml-[24px] mt-[20px]">
        <span className="text-[18px] font-medium">패션</span>
      </div>

      <div className="w-[1360px] flex justify-start ml-[24px] text-[#A8A9AD] text-[14px]">
        <div>선호하는 패션 스타일을 다양하게 제안해 드릴게요 </div>
      </div>
      <div className="w-[1360px] flex justify-start ml-[24px] mt-[20px] gap-[60px]">
        {/* 패션 */}
        <div className="flex flex-col gap-[6px]">
          {/* 라벨 */}
          <span className="text-[16px] font-medium text-black">
            선호 스타일
            <span className="ml-[4px] text-[#A8A9AD] text-[14px]">
              (복수 선택 가능)
            </span>
          </span>
        </div>
      </div>
      {/* 회원가입 버튼 */}
      <div className="w-full flex justify-center mt-[60px] mb-[80px]">
        <div className="w-full max-w-[1360px]">
          <button
            type="button"
            className="
        w-full h-[52px]
        flex items-center justify-center
        border border-[#5C4033]
        text-[16px] font-medium
        hover:bg-[#5C4033] hover:text-white
        transition
      "
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export { AiSelect };
