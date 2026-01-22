import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMemberInfo, updateMemberInfo } from "@/api/memberApi";
import type { MemberUpdateDto } from "@/api/memberApi";
import { ArrowLeft, Smile, ChevronRight } from "lucide-react";

export default function MemberEdit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<MemberUpdateDto>({
    memberName: "",
    nickname: "",
    birth: "",
    postCode: "",
    address: "",
    addressDetail: "",
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMemberInfo();
        setFormData({
          memberName: data.memberName || "",
          nickname: data.nickname || "",
          birth: data.birth || "",
          postCode: data.postCode || "",
          address: data.address || "",
          addressDetail: data.addressDetail || "",
        });
      } catch (error) {
        console.error("회원 정보 가져오기 실패:", error);
      }
    };
    fetchMember();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // name을 formData key와 맞추기
    let key: keyof MemberUpdateDto;
    switch (name) {
      case "name":
        key = "memberName";
        break;
      case "birthdate":
        key = "birth";
        break;
      default:
        key = name as keyof MemberUpdateDto;
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSave = async () => {
    try {
      await updateMemberInfo(formData); // PUT API 호출
      alert("회원정보가 수정되었습니다.");
      navigate("/myPage"); // 수정 후 마이페이지 이동
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("회원정보 수정 실패");
    }
  };

  return (
    <div className="pb-4 bg-white">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-6 flex items-center relative mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[32px] font-bold text-[#5C4033] tracking-tighter">
            회원정보 수정
          </h2>
        </div>
      </div>

      {/* 정보 수정 카드 */}
      <div className="max-w-[800px] mx-auto bg-white border border-gray-200 rounded-[20px] p-8 shadow-sm">
        {/* 프로필 요약 */}
        <div className="flex items-center gap-6 mb-8 px-4">
          <div className="w-[80px] h-[80px] flex items-center justify-center border-2 border-[#5C4033] rounded-full">
            <Smile size={55} className="text-[#5C4033]" />
          </div>
          <span className="text-[24px] font-bold text-[#5C4033]">
            {formData.nickname}님
          </span>
        </div>

        {/* 입력 폼 리스트 */}
        <div className="space-y-4 px-4">
          {/* 이름 */}
          <div className="border-b border-gray-300 pb-2">
            <label className="block text-[16px] font-bold text-[#5C4033] mb-1 ">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.memberName}
              onChange={handleChange}
              readOnly
              className="w-full text-[18px] font-medium text-black bg-transparent outline-none"
            />
          </div>

          {/* 닉네임 */}
          <div className="border-b border-gray-300 pb-2">
            <label className="block text-[16px] font-bold text-[#5C4033] mb-1">
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full text-[18px] font-medium text-black bg-transparent outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div
            className="border-b border-gray-300 pb-2 flex justify-between items-end group cursor-pointer"
            onClick={() => navigate("/myPwEdit")}
          >
            <div className="flex-1">
              <label className="block text-[16px] font-bold text-[#5C4033] mb-1">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                // value={formData.password}
                onChange={handleChange}
                placeholder="********************"
                readOnly
                className="w-full text-[18px] font-medium text-black bg-transparent outline-none placeholder:text-black tracking-widest cursor-pointer"
              />
            </div>
            <ChevronRight
              size={28}
              className="text-gray-900 mb-1 group-hover:translate-x-1 transition-transform"
            />
          </div>

          {/* 생년월일 */}
          <div className="border-b border-gray-300 pb-2">
            <label className="block text-[16px] font-bold text-[#5C4033] mb-1 ">
              생년월일
            </label>
            <input
              type="text"
              name="birthdate"
              value={formData.birth}
              onChange={handleChange}
              readOnly
              className="w-full text-[18px] font-medium text-black bg-transparent outline-none"
            />
          </div>

          {/* 주소 */}
          <div className="border-b border-gray-300 pb-2">
            <label className="block text-[16px] font-bold text-[#5C4033] mb-1">
              주소
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full text-[17px] font-medium text-black bg-transparent outline-none"
            />
          </div>

          {/* 배송지 목록 */}
          <div
            className="border-b border-gray-300 pb-2 flex justify-between items-end group cursor-pointer"
            onClick={() => navigate("/addressList")}
          >
            <div>
              <p className="text-[18px] font-medium text-black">배송지 목록</p>
            </div>
            <ChevronRight
              size={28}
              className="text-gray-900 mb-1 group-hover:translate-x-1 transition-transform"
            />
          </div>

          {/* 회원 탈퇴 */}
          <div
            className="border-b border-gray-300 pb-2 flex justify-between items-end group cursor-pointer"
            onClick={() => navigate("/myWithDraw")}
          >
            <div>
              <p className="text-[18px] font-medium text-black">회원 탈퇴</p>
            </div>
            <ChevronRight
              size={28}
              className="text-gray-900 mb-1 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="max-w-[800px] mx-auto mt-8 flex justify-center mb-15">
        <button
          onClick={handleSave}
          className="w-[240px] h-[60px] border border-[#A8A9AD] rounded-[15px] text-[20px] font-bold text-black shadow-sm hover:bg-[#5C4033] hover:text-white transition cursor-pointer"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
