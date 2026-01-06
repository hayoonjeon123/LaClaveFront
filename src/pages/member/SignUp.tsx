import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  /* ================= 약관 상태 ================= */
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false); // 필수
  const [agreePrivacy, setAgreePrivacy] = useState(false); // 필수
  const [agreeMarketing, setAgreeMarketing] = useState(false); // 선택

  /* 전체 동의 클릭 */
  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  /* 개별 동의 변경 시 전체 동의 상태 동기화 */
  useEffect(() => {
    if (agreeTerms && agreePrivacy && agreeMarketing) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [agreeTerms, agreePrivacy, agreeMarketing]);

  /* 필수 약관 체크 여부 */
  const isRequiredAgreed = agreeTerms && agreePrivacy;

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
      {/* ================= 약관 동의 영역 ================= */}
      <div className="w-full flex justify-center mt-[40px]">
        <div className="w-full max-w-[1000px]">
          {/* 전체 동의 */}
          <label className="flex items-center gap-3 border border-[#5C4033] px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-[18px] h-[18px]"
              onChange={(e) => handleAgreeAll(e.target.checked)}
            />
            <span className="text-[15px]">
              이용 약관 및 개인정보 수집 및 이용, 쇼핑정보 수신(선택)에 모두
              동의합니다.
            </span>
          </label>

          {/* 약관 박스 3개 */}
          <div className="grid grid-cols-3 gap-[24px]">
            {/* 이용약관 */}
            <div className="border border-[#5C4033] mt-[20px] flex flex-col h-[260px]">
              <div className="px-3 py-2 text-[14px] font-medium border-b border-[#5C4033]">
                [필수] 이용약관 동의
              </div>

              <div className="flex-1 px-3 py-2 text-[13px] overflow-y-auto leading-[1.6] whitespace-pre-line">
                <p>
                  제1조 (목적) 본 약관은 회사가 제공하는 서비스의 이용과
                  관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을
                  목적으로 합니다.
                </p>
                <p>
                  제2조 (회원가입) 회원은 본 약관에 동의함으로써 회원가입을
                  신청할 수 있으며, 회사는 이에 대해 승낙함으로써 회원가입이
                  완료됩니다.
                </p>
                <p>
                  제3조 (회원의 의무) 회원은 관계 법령, 본 약관의 규정, 이용
                  안내 및 서비스와 관련하여 회사가 공지한 사항을 준수하여야
                  하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다.
                </p>
                <p>
                  제4조 (서비스 이용 제한) 회사는 회원이 본 약관을 위반하거나
                  서비스의 정상적인 운영을 방해한 경우, 사전 통지 없이 서비스
                  이용을 제한하거나 회원자격을 박탈할 수 있습니다.
                </p>
                <p>
                  제5조 (책임의 제한) 회사는 천재지변, 불가항력적 사유로 인해
                  서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
                </p>
              </div>

              <label className="flex justify-end items-center gap-2 px-3 py-2 border-t border-[#5C4033] text-[13px]">
                <span>동의함</span>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              </label>
            </div>

            {/* 개인정보 */}
            <div className="border border-[#5C4033] mt-[20px] flex flex-col h-[260px]">
              <div className="px-3 py-2 text-[14px] font-medium border-b border-[#5C4033]">
                [필수] 개인정보 수집 및 이용 동의
              </div>

              <div className="flex-1 px-3 py-2 text-[13px] overflow-y-auto leading-[1.6]">
                <p>
                  회사는 회원가입 및 서비스 제공을 위해 아래와 같이 개인정보를
                  수집 및 이용합니다.
                </p>
                <p>
                  1. 수집 항목 - 필수 항목: 아이디, 비밀번호, 이름, 성별,
                  생년월일, 이메일, 주소
                </p>
                <p>
                  2. 수집 목적 - 회원 관리 및 본인 확인 - 서비스 제공 및 고객
                  지원 - 불법 이용 방지 및 서비스 안정성 확보
                </p>
                <p>
                  3. 보유 및 이용 기간 - 회원 탈퇴 시까지 보유하며, 관계 법령에
                  따라 일정 기간 보관할 수 있습니다.
                </p>
                <p>
                  4. 동의 거부 권리 - 개인정보 수집 및 이용에 대한 동의를 거부할
                  수 있으나, 동의하지 않을 경우 회원가입 및 서비스 이용이 제한될
                  수 있습니다.
                </p>
              </div>

              <label className="flex justify-end items-center gap-2 px-3 py-2 border-t border-[#5C4033] text-[13px]">
                <span>동의함</span>
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                />
              </label>
            </div>

            {/* 쇼핑정보 */}
            <div className="border border-[#5C4033] mt-[20px] flex flex-col h-[260px]">
              <div className="px-3 py-2 text-[14px] font-medium border-b border-[#5C4033]">
                [선택] 쇼핑정보 수신 동의
              </div>

              {/* 내용 */}
              <div className="flex-1 px-3 py-2 text-[13px] overflow-y-auto leading-[1.6]">
                <p>
                  회사는 회원에게 다양한 혜택과 정보를 제공하기 위해 마케팅
                  정보를 발송할 수 있습니다.
                </p>
                <p>
                  1. 수신 정보 - 이벤트 및 할인 혜택 - 신규 서비스 및 상품 안내
                </p>
                <p>2. 발송 방법 - 이메일, 문자메시지(SMS) 등</p>
                <p>
                  3. 동의 철회 - 회원은 언제든지 마케팅 정보 수신 동의를 철회할
                  수 있으며, 철회 시 관련 정보 발송은 즉시 중단됩니다.
                </p>
                <p>
                  ※ 본 동의는 선택 사항이며, 동의하지 않더라도 서비스 이용에는
                  제한이 없습니다.
                </p>
              </div>

              {/* 하단 동의 */}
              <label className="flex justify-end items-center gap-2 px-3 py-2 border-t border-[#5C4033] text-[13px]">
                <span>동의함</span>
                <input
                  type="checkbox"
                  checked={agreeMarketing}
                  onChange={(e) => setAgreeMarketing(e.target.checked)}
                />
              </label>
            </div>
          </div>
          {/* 이전 버튼 */}
          <div className="mt-[40px] mb-[10px]">
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
              className={`
    w-full h-[52px]
    flex items-center justify-center
    border border-[#5C4033]
    text-[16px] font-medium
    hover:bg-[#5C4033] hover:text-white
    transition
  `}
            >
              이전
            </button>
          </div>
          {/* 다음 버튼 */}
          <div className="mb-[60px]">
            <button
              type="button"
              onClick={() => {
                if (!isRequiredAgreed) {
                  alert("필수 약관에 동의하셔야 가입이 가능합니다.");
                  return;
                }
                navigate("/aiselect");
              }}
              className={`
    w-full h-[52px]
    flex items-center justify-center
    border border-[#5C4033]
    text-[16px] font-medium
    hover:bg-[#5C4033] hover:text-white
    transition
  `}
            >
              다음
            </button>

            {!isRequiredAgreed && (
              <p className="mt-3 text-[13px] text-red-500 text-center">
                필수 약관에 동의하셔야 가입이 가능합니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
