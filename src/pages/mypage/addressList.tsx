import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getMyAddressList, removeAddress } from "@/api/myPage/memberAddressApi"; // API import
import type { MemberAddressDto } from "@/api/myPage/memberAddressApi";

export default function AddressList() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<MemberAddressDto[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 주소 목록 조회
  const fetchAddresses = async () => {
    setLoading(true);
    const list = await getMyAddressList();
    setAddresses(list);
    setLoading(false);
  };

  // 최초 로딩 시 목록 불러오기
  useEffect(() => {
    fetchAddresses();
  }, []);

  // 🔹 삭제
  const handleRemove = async (addressIdx: number) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const success = await removeAddress(addressIdx);
    if (success) {
      setAddresses((prev) => prev.filter((a) => a.addressIdx !== addressIdx));
      alert("주소가 삭제되었습니다.");
    } else {
      alert("삭제에 실패했습니다.");
    }
  };

  // 🔹 수정
  const handleModify = (addressIdx: number) => {
    navigate(`/editAddress/${addressIdx}`);
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
            배송지 목록
          </h2>
        </div>
      </div>

      <div className="px-6">
        {/* 배송지 추가 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/addAddress")}
            className="px-3 py-1.5 border border-[#A8A9AD] rounded-[6px] cursor-pointer font-bold text-[13px] text-black hover:bg-[#5C4033] hover:text-white transition cu"
          >
            배송지 추가
          </button>
        </div>

        {/* 배송지 카드 */}
        {loading ? (
          <div>주소를 불러오는 중...</div>
        ) : addresses.length === 0 ? (
          <div>등록된 주소가 없습니다.</div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.addressIdx}
              className="border border-[#A8A9AD] rounded-[10px] p-5 mb-2 shadow-sm bg-[#F5F5F5]"
            >
              <div className="space-y-1.5 mb-2 text-left">
                <div className="text-[16px] font-bold text-[#5C4033]">
                  {addr.addressName}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold">
                    {addr.recipientName}
                  </span>
                  {/* 기본 배송지 표시, 필요하면 조건 추가 */}
                </div>
                <div className="text-[14px] font-medium text-[#333]">
                  {addr.address}
                </div>
                <div className="text-[14px] font-medium text-[#333]">
                  {addr.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleModify(addr.addressIdx)}
                  className="cursor-pointer px-4 py-1.5 bg-[#F5F5F5] border border-[#A8A9AD] rounded-[6px] font-bold text-[13px] text-[#333] transition"
                >
                  수정
                </button>
                <button
                  onClick={() => handleRemove(addr.addressIdx)}
                  className="cursor-pointer px-4 py-1.5 bg-[#5C4033] text-white border border-[#5C4033] rounded-[6px] font-bold text-[13px] transition"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}

        {/* 저장하기 버튼 */}
        <div className="flex justify-center mt-12"></div>
      </div>
    </div>
  );
}
