import { useState } from "react";
import Logo from "@/assets/Logo_brown.png";
import Naver from "@/assets/Naver_login.png";
import Kakao from "@/assets/Kakao_login.png";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const AppLogin = () => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* 컨테이너 너비 설정 */}
      <div className="w-full max-w-[450px] px-6">
        {/* 로고 영역 */}
        <div className=" mb-10">
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="h-14" />
          </div>
        </div>

        {/* 로그인 폼 */}
        <div className="space-y-4">
          {/* ID 입력 */}
          <div className="relative border-b border-black pb-1">
            <label className="block text-[11px] font-bold mb-1">ID</label>
            <input
              type="text"
              className="w-full outline-none text-sm py-1"
              autoComplete="off"
            />
          </div>

          {/* Password 입력 */}
          <div className="relative border-b border-black pb-1">
            <label className="block text-[11px] font-bold mb-1">PASSWORD</label>
            <input
              type="password"
              className="w-full outline-none text-sm py-1"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            className="w-full h-[52px] flex items-center justify-center
        border border-[#5C4033] cursor-pointer
        text-[16px] font-medium
        hover:bg-[#5C4033] hover:text-white
        transition"
          >
            LOGIN
          </button>

          {/* 하단 옵션 (아이디 저장 / 찾기) */}
          <div className="flex justify-between items-center text-[12px] text-gray-700 mt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="data-[state=checked]:border border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white w-[14px] h-[14px]"
              />
              <Label
                htmlFor="remember-me"
                className="text-[12px] cursor-pointer font-medium text-gray-700"
              >
                아이디 저장
              </Label>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Link to="/findaccount">
                <button className="cursor-pointer">아이디 </button>
                <span className="text-gray-500">|</span>
                <button className="cursor-pointer">비밀번호 찾기</button>
              </Link>
            </div>
          </div>
        </div>

        {/* 구분선 (점선) */}
        <div className="my-6 border-t border-dotted border-gray-400"></div>

        {/* 소셜 로그인 버튼 영역 */}
        <div className="space-y-3">
          {/* 네이버 - 배경색을 직접 주고 이미지를 가운데 정렬 */}
          <button className="w-full h-[52px] bg-[#02A94D] flex justify-center items-center rounded-sm overflow-hidden cursor-pointer">
            <img
              src={Naver}
              alt="Naver"
              className="h-full w-full object-contain"
            />
          </button>

          {/* 카카오 - 배경색(#FEE500)을 주고 이미지를 가운데 정렬 */}
          <button className="w-full h-[52px] bg-[#FEE500] flex justify-center items-center rounded-sm overflow-hidden cursor-pointer">
            <img
              src={Kakao}
              alt="Kakao"
              className="h-full w-full object-contain"
            />
          </button>
        </div>

        {/* 회원가입 안내 */}
        <div className="mt-10 text-center text-[13px]">
          <span className="text-gray-600">신규 가입 즉시 할인 쿠폰 지급</span>
          <Link to="/signup">
            <button className="ml-4 font-semibold border-b border-black pb-0.5 cursor-pointer">
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { AppLogin };
