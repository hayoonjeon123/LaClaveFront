const SignUp = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 제목 */}
      <div className="text-[30px] font-semibold text-[#000000] mt-[20px]">
        회원가입
      </div>

      {/* 아이디 입력 */}
      <div className="w-full max-w-md mt-[40px] flex items-center">
        {/* 라벨 */}
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          아이디
        </label>

        {/* 인풋 */}
        <input
          type="text"
          placeholder="영문, 숫자, 특수문자 / 4~20자리"
          className="flex-1 h-[40px] px-[12px] text-[14px] 
                     border border-[#5C4033] placeholder:text-[#A8A9AD]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div className="w-full max-w-md mt-[30px] flex items-center">
        {/* 라벨 */}
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          비밀번호
        </label>

        {/* 인풋 */}
        <input
          type="password"
          placeholder="영문 대소문자, 숫자, 특수문자 조합 / 8~16자리"
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033] placeholder:text-[#A8A9AD]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className="w-full max-w-md mt-[30px] flex items-center">
        {/* 라벨 */}
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          비밀번호 확인
        </label>

        {/* 인풋 */}
        <input
          type="password"
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {/* 이름 입력 */}
      <div className="w-full max-w-md mt-[30px] flex items-center">
        {/* 라벨 */}
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          이름
        </label>

        {/* 인풋 */}
        <input
          type="text"
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {/* 성별 */}
      <div className="w-full max-w-md mt-[30px] flex items-center">
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          성별
        </label>

        {/* 라디오 그룹 */}
        <div className="w-full flex max-w-md justify-center mt-[4px] gap-[20px]">
          <label className="flex items-center gap-[6px] cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="M"
              className="w-[16px] h-[16px]"
            />
            <span className="text-[14px]">Man</span>
          </label>

          <label className="flex items-center gap-[6px] cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="F"
              className="w-[16px] h-[16px]"
            />
            <span className="text-[14px]">Woman</span>
          </label>
        </div>
      </div>

      {/* 생년월일 */}
      <div className="w-full max-w-md mt-[30px] flex items-center">
        {/* 라벨 */}
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          생년월일
        </label>

        {/* 인풋 */}
        <input
          type="date"
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {/* 주소 */}
      <div className="w-full max-w-md mt-[30px] flex items-center">
        {/* 라벨 */}
        <label className="w-[120px] text-[16px] font-medium text-[#000000]">
          주소
        </label>

        <div className="flex gap-[8px] flex-1">
          <input
            type="text"
            placeholder="우편번호"
            className="flex-1 h-[44px] px-[12px] text-[14px]
                 border border-[#5C4033] 
                 focus:outline-none"
          />

          <button
            type="button"
            className="h-[44px] px-[16px] text-[14px] 
                 border border-[#5C4033] cursor-pointer
                 font-medium hover:bg-[#5C4033] hover:text-[#fff]"
          >
            주소검색
          </button>
        </div>
      </div>

      {/* 주소 */}
      <div className="w-full max-w-md mt-[10px] flex items-center">
        <div className="w-[120px]" />
        {/* 인풋 */}
        <input
          type="text"
          placeholder="기본주소"
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033] placeholder:text-[#A8A9AD]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {/* 주소 */}
      <div className="w-full max-w-md mt-[10px] flex items-center">
        <div className="w-[120px]" />
        {/* 인풋 */}
        <input
          type="text"
          placeholder="상세주소"
          className="flex-1 h-[40px] px-[12px] text-[14px] 
                     border border-[#5C4033] placeholder:text-[#A8A9AD]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>

      {/* 이메일 입력 */}
      <div className="w-full max-w-md mt-[40px] flex items-center relative">
        {/* 라벨 */}
        <label className="w-[135px] text-[16px] font-medium text-[#000000] ">
          이메일
        </label>
        {/* 인풋 */}
        <input
          type="email"
          placeholder="이메일"
          className="flex-1 h-[40px] px-[12px] text-[14px]
                 border border-[#5C4033]
                 focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
        <span className="text-[14px] mx-[5px]">@</span>
        {/* 도메인 선택 */}
        <select
          className="w-[150px] h-[40px] px-[8px] text-[14px]
                 border border-[#5C4033]
                 focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        >
          <option value="">선택</option>
          <option value="naver">naver.com</option>
          <option value="gmail">gmail.com</option>
          <option value="daum">daum.net</option>
          <option value="kakao">kakao.com</option>
        </select>{" "}
        {/* 버튼 영역 */}
        <div className="absolute right-[-102px] top-0 flex flex-col gap-[12px]">
          <button
            type="button"
            className="w-[90px] h-[40px] cursor-pointer
               border border-[#5C4033] hover:bg-[#5C4033] hover:text-[#fff]
               text-[14px] font-medium"
          >
            인증번호
          </button>
          <button
            type="button"
            className="w-[90px] h-[40px] mt-[-2px]
               border border-[#5C4033] cursor-pointer
               text-[14px] font-medium hover:bg-[#5C4033] hover:text-[#fff]"
          >
            확인
          </button>
        </div>
      </div>
      {/* 인증번호 확인 */}
      <div className="w-full max-w-md mt-[10px] flex items-center">
        <div className="w-[120px]" />
        {/* 인풋 */}
        <input
          type="text"
          placeholder="인증번호"
          className="flex-1 h-[40px] px-[12px] text-[14px]
                     border border-[#5C4033] placeholder:text-[#A8A9AD]
                     focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
        />
      </div>
    </div>
  );
};

export { SignUp };
