import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import LogoBrown from "../../assets/Logo_brown.png";

export default function PwEdit() {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="pb-17">
            {/* Header */}
            <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft size={28} strokeWidth={1.5} />
                </button>
            </div>

            {/* Logo Section */}
            <div className="flex justify-center mb-6">
                <img
                    src={LogoBrown}
                    alt="La Clave"
                    className="w-[220px] h-auto object-contain"
                />
            </div>

            {/* Password Form Card */}
            <div className="max-w-[800px] mx-auto border border-[#A8A9AD] rounded-[10px] p-10 shadow-sm mb-8">
                <div className="space-y-12">
                    {/* 현재 비밀번호 */}
                    <div className="relative">
                        <input
                            type="password"
                            name="current"
                            value={passwords.current}
                            onChange={handleChange}
                            placeholder="현재 비밀번호"
                            className="w-full text-[16px] pb-2 bg-transparent border-b border-gray-300 outline-none placeholder:text-[#A8A9AD] focus:border-[#5C4033] transition"
                        />
                    </div>

                    {/* 새 비밀번호 */}
                    <div className="relative">
                        <input
                            type="password"
                            name="new"
                            value={passwords.new}
                            onChange={handleChange}
                            placeholder="새 비밀번호"
                            className="w-full text-[16px] pb-2 bg-transparent border-b border-gray-300 outline-none placeholder:text-[#A8A9AD] focus:border-[#5C4033] transition"
                        />
                    </div>

                    {/* 새 비밀번호 확인 */}
                    <div className="relative">
                        <input
                            type="password"
                            name="confirm"
                            value={passwords.confirm}
                            onChange={handleChange}
                            placeholder="새 비밀번호 확인"
                            className="w-full text-[16px] pb-2 bg-transparent border-b border-gray-300 outline-none placeholder:text-[#A8A9AD] focus:border-[#5C4033] transition"
                        />
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => {
                        alert("비밀번호가 변경되었습니다.");
                        navigate("/myMemberEdit");
                    }}
                    className="w-[220px] h-[60px] bg-white border border-gray-300 rounded-[10px] text-[20px] font-bold text-black shadow-sm hover:bg-[#5C4033] hover:text-white hover:border-[#5C4033] transition cursor-pointer"
                >
                    변경하기
                </button>
            </div>
        </div>
    );
}
