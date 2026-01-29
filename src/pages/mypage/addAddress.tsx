import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/api/axiosInstance";

export default function AddAddress() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    recipientName: "",
    addressName: "",
    phone: "",
    postCode: "",
    address: "",
    addressDetail: "",
  });
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 🔹 다음 주소 API 호출
  const handlePostcodeSearch = () => {
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        setForm((prev) => ({
          ...prev,
          postCode: data.zonecode,
          address: data.address,
        }));
      },
    }).open();
  };

  // 🔹 저장
  const handleSave = async () => {
    if (
      !form.recipientName ||
      !form.addressName ||
      !form.phone ||
      !form.postCode ||
      !form.address ||
      !form.addressDetail
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        addressName: form.addressName + (isDefault ? " (기본)" : ""),
      };

      const response = await axiosInstance.post<number>(
        "http://localhost:8080/api/member/address",
        payload,
        { withCredentials: true }
      );

      if (response.data) {
        alert("배송지가 등록되었습니다.");
        navigate("/addressList");
      } else {
        alert("배송지 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("배송지 등록 실패:", error);
      alert("배송지 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto pb-20">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-12">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[24px] font-bold text-black tracking-tight">
            배송지 추가
          </h2>
        </div>
      </div>

      <div className="px-6">
        <div className="border border-[#A8A9AD] rounded-[20px] p-10 shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* 우편번호 + 검색 */}
            <div className="flex items-center">
              <label className="w-[120px] text-[16px] font-bold text-black">
                우편번호
              </label>
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  placeholder="우편번호"
                  value={form.postCode}
                  readOnly
                  className="flex-1 h-[44px] px-3 border border-[#A8A9AD] focus:outline-none placeholder:text-[#A8A9AD] text-[14px] "
                />
                <button
                  type="button"
                  onClick={handlePostcodeSearch}
                  className="w-[120px] h-[44px] border border-[#A8A9AD] rounded-[6px] text-[14px] font-bold text-black hover:bg-gray-50 transition"
                >
                  우편번호 검색
                </button>
              </div>
            </div>

            {/* 주소 */}
            <div className="flex items-center">
              <label className="w-[120px] text-[16px] font-bold text-black">
                주소
              </label>
              <input
                type="text"
                placeholder="기본주소"
                value={form.address}
                readOnly
                className="flex-1 h-[44px] px-3 border border-[#A8A9AD] focus:outline-none placeholder:text-[#A8A9AD] text-[14px]"
              />
            </div>

            {/* 상세 주소 */}
            <div className="flex items-center">
              <label className="w-[120px] text-[16px] font-bold text-black">
                상세 주소
              </label>
              <input
                type="text"
                placeholder="상세주소"
                value={form.addressDetail}
                onChange={(e) => handleChange("addressDetail", e.target.value)}
                className="flex-1 h-[44px] px-3 border border-[#A8A9AD] focus:outline-none placeholder:text-[#A8A9AD] text-[14px]"
              />
            </div>

            {/* 배송지명 */}
            <div className="flex items-center">
              <label className="w-[120px] text-[16px] font-bold text-black">
                배송지명
              </label>
              <input
                type="text"
                placeholder="집, 회사 등 배송지명을 입력해주세요"
                value={form.addressName}
                onChange={(e) => handleChange("addressName", e.target.value)}
                className="flex-1 h-[44px] px-3 border border-[#A8A9AD] focus:outline-none placeholder:text-[#A8A9AD] text-[14px]"
              />
            </div>

            {/* 수령인 */}
            <div className="flex items-center">
              <label className="w-[120px] text-[16px] font-bold text-black">
                수령인
              </label>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                value={form.recipientName}
                onChange={(e) => handleChange("recipientName", e.target.value)}
                className="flex-1 h-[44px] px-3 border border-[#A8A9AD] focus:outline-none placeholder:text-[#A8A9AD] text-[14px]"
              />
            </div>

            {/* 휴대폰 */}
            <div className="flex items-center">
              <label className="w-[120px] text-[16px] font-bold text-black">
                휴대폰
              </label>
              <input
                type="text"
                placeholder="'-' 없이 숫자만 입력해주세요"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="flex-1 h-[44px] px-3 border border-[#A8A9AD] focus:outline-none placeholder:text-[#A8A9AD] text-[14px]"
              />
            </div>

            {/* 기본 배송지 */}
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="default-address"
                  checked={isDefault}
                  onCheckedChange={(checked) => setIsDefault(!!checked)}
                  className="data-[state=checked]: border-[#5C4033] data-[state=checked]:bg-[#5C4033] data-[state=checked]:text-white"
                />
                <Label
                  htmlFor="default-address"
                  className="text-[15px] font-bold text-black cursor-pointer"
                >
                  기본 배송지로 설정
                </Label>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full max-w-[200px] h-[56px] border border-[#A8A9AD] rounded-[10px] text-[20px] font-bold text-black hover:bg-gray-50 transition shadow-sm"
        >
          {loading ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
}
