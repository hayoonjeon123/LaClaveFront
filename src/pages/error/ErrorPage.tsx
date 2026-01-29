import React from "react";
import { useNavigate } from "react-router-dom";
import LogoBrown from "@/assets/image/Logo_brown.png";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
            <div className="flex flex-col items-center text-center">
                {/* 로고 */}
                <img src={LogoBrown} alt="La Clave" className="w-[200px] mb-8" />

                {/* 에러 텍스트 */}
                <h1 className="text-[80px] font-black text-[#5C4033] leading-none mb-4 tracking-tighter">
                    ERROR
                </h1>

                <p className="text-[24px] font-medium text-[#5C4033] mb-12">
                    "예상치 못한 오류가 발생했습니다."
                </p>

                {/* 메인으로 이동 버튼 */}
                <button
                    onClick={() => navigate("/")}
                    className="px-12 py-5 rounded-[10px] border border-[#5C4033] text-[22px] font-bold hover:bg-[#5C4033] hover:text-white transition-colors shadow-sm cursor-pointer"
                >
                    메인화면으로 이동
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
