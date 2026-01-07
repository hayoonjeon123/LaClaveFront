import { useState } from "react";
import Logo from "@/assets/Logo_brown.png";

const FindAccount = () => {
  const [activeTab, setActiveTab] = useState("id");

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-[600px] px-6">
        {/* 로고 영역 */}
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="LOGO" className="h-16" />
        </div>

        {/* 탭 메뉴 */}
        <div className="relative flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("id")}
            className={`flex-1 py-4 text-center font-bold text-[18px] transition-colors ${activeTab === "id" ? "text-[#5C4033]" : "text-gray-400"
              }`}
          >
            아이디 찾기
          </button>

          <div className="w-[2px] h-6 bg-gray-400 self-center" />

          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-4 text-center font-bold text-[18px] transition-colors ${activeTab === "password" ? "text-[#5C4033]" : "text-gray-400"
              }`}
          >
            비밀번호 찾기
          </button>

          {/* 이동하는 하단 바 */}
          <div
            className="absolute bottom-0 h-[3px] bg-[#5C4033] transition-all duration-300 ease-in-out"
            style={{
              width: "calc(50% - 0.5px)",
              left: activeTab === "id" ? "0" : "calc(50% + 0.5px)",
            }}
          />
        </div>

        {/* 입력 폼 컨테이너 */}
        <div className="border border-gray-300 rounded-[10px] p-8 space-y-4 w-full max-w-[800px] mx-auto">
          {/* 비밀번호 찾기일 때만 아이디 입력창 노출 */}
          {activeTab === "password" && (
            <div className="flex items-center gap-2">
              <label className="w-24 text-[16px] font-medium text-[#5C4033] shrink-0">
                아이디
              </label>
              <input
                type="text"
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
                className="flex-1 h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-[#5C4033]"
              />
              <button className="px-4 border border-gray-300 rounded-md text-[13px] hover:bg-[#5C4033] hover:text-white whitespace-nowrap">
                인증번호
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-24 shrink-0" /> {/* 레이블 간격 맞춤용 공백 */}
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="인증번호 입력"
                className="flex-1 h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-[#5C4033]"
              />
              <button className="px-6 border border-gray-300 rounded-md text-[13px] hover:bg-[#5C4033] hover:text-white whitespace-nowrap">
                확인
              </button>
            </div>
          </div>
        </div>

        {/* 최종 확인 버튼 */}
        <div className="mt-8 flex justify-center">
          <button className="w-[300px] h-14 border border-gray-300 rounded-md text-[16px] font-medium hover:bg-[#5C4033] hover:text-white transition-colors">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export { FindAccount };
