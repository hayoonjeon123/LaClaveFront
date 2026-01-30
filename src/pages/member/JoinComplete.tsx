import Logo from "@/assets/image/Logo_brown.png";
import { useNavigate } from "react-router-dom";

const JoinComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[800px] mx-auto py-12 px-6 font-sans text-[#000]">
      <div className="flex justify-center mb-2">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="LOGO" className="h-16" />
        </div>
      </div>

      <section className="border border-gray-400 rounded-lg p-16 mb-12 flex flex-col items-center justify-center shadow-sm">
        <div className="w-24 h-24 border-2 border-gray-800 rounded-full flex items-center justify-center mb-8">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h2 className="text-[32px] font-semibold tracking-tight">
          회원가입이 완료되었습니다!
        </h2>
      </section>

      <div className="flex gap-4 max-w-[540px] mx-auto">
        <button
          className="flex-1 h-14 border border-[#A8A9AD] rounded-[10px] text-[18px] font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => navigate("/")}
        >
          메인화면으로 이동
        </button>
        <button
          className="flex-1 h-14 bg-[#634b41] border-2 border-[#A8A9AD] text-white text-[18px] rounded-[10px] font-bold hover:bg-[#4d3a32] transition-colors cursor-pointer shadow-md"
          onClick={() => navigate("/loginProc")}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export { JoinComplete };
