import Logo from "@/assets/image/Logo_brown.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const FindResult = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = location.state || {
    name: "정보 없음",
    id: "정보 없음",
    email: "정보 없음",
    password: "정보 없음",
  };

  return (
    <div className="flex flex-col items-center justify-center py-14">
      <div className="w-full max-w-[800px] px-6">
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="La Clave"
            className="h-16 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <h2 className="text-center text-[32px] font-bold mb-6 tracking-tight text-[#5C4033]">
          {type === "id" ? "아이디 찾기 결과" : "비밀번호 찾기 결과"}
        </h2>
        <div className="border border-gray-300 rounded-[20px] p-12 mb-12 flex items-center justify-center gap-16 shadow-sm">
          <div className="w-[180px] h-[180px] bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <svg
              className="w-2/3 h-2/3 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <div className="space-y-5 text-[20px]">
            <div className="flex items-center">
              <span className="w-24 font-bold text-[#5C4033]">이름</span>
              <span className="mr-6">:</span>
              <span className="text-gray-700">{userData.name}</span>
            </div>

            {type === "id" && (
              <div className="flex items-center">
                <span className="w-24 font-bold text-[#5C4033]">아이디</span>
                <span className="mr-6">:</span>
                <span className="text-gray-800 font-semibold">
                  {userData.id}
                </span>
              </div>
            )}

            <div className="flex items-center">
              <span className="w-24 font-bold text-[#5C4033]">이메일</span>
              <span className="mr-6">:</span>
              <span className="text-gray-700">{userData.email}</span>
            </div>

            {type === "password" && (
              <div className="flex items-center">
                <span className="w-24 font-bold text-[#5C4033]">비밀번호</span>
                <span className="mr-6">:</span>
                <span className="text-gray-800 font-semibold">
                  {userData.password}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/loginProc")}
            className="w-[280px] h-16 border-2 border-[#A8A9AD] text-[#5C4033] text-[22px] font-semibold cursor-pointer rounded-[15px] hover:bg-gray-50 transition-colors"
          >
            로그인
          </button>

          {type === "id" ? (
            <button
              onClick={() => navigate("/findaccount")}
              className="w-[280px] h-16 bg-[#5C4033] border-2 border-[#A8A9AD] text-white text-[22px] font-semibold cursor-pointer rounded-[15px] hover:bg-[#4a3329] transition-colors shadow-md"
            >
              비밀번호 찾기
            </button>
          ) : (
            <button
              onClick={() => navigate("/loginProc")}
              className="w-[280px] h-16 bg-[#5C4033] text-white text-[22px] font-semibold cursor-pointer rounded-[15px] hover:bg-[#4a3329] transition-colors shadow-md"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { FindResult };
