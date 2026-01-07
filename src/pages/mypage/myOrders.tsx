import { ArrowDownIcon, ArrowLeft, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import sampleImg from "../../assets/sample-product.jpg";

export default function MyOrders() {
  const navigate = useNavigate();
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto px-6 pt-10 flex items-center relative mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[30px] font-bold text-[#5C4033] tracking-tight">주문내역 조회</h2>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6">
        {/* Main Content Box Wrapper */}
        <div className="border border-[#A8A9AD] rounded-[10px] p-8 bg-white">
          {/* Order Header Info */}
          <div className="mb-3">
            <div className="font-bold text-[18px] mb-0.5">주문번호 20251603947</div>
            <div className="text-[#A8A9AD] font-medium text-[14px]">결제 날짜 : 2025.06.13 오후 15:33</div>
          </div>

          <hr className="border-[#A8A9AD] border-t-[1px] mb-6" />

          {/* Product Info Section */}
          <div className="flex gap-6 items-start mb-8 px-1">
            {/* Thumbnail */}
            <div className="w-[120px] h-[120px] flex-shrink-0 overflow-hidden rounded-sm">
              <img src={sampleImg} alt="상품 이미지" className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-[18px] mb-1.5 leading-tight">
                배색 리버시블 컴포트핏 다운패딩(블랙)
              </p>
              <div className="space-y-0.5 text-[#333] text-[15px] font-medium">
                <p>색상 : 블랙</p>
                <p>사이즈 : s</p>
                <p>수량 : 1개</p>
              </div>
            </div>

            {/* Status & Price */}
            <div className="text-right pt-1 min-w-[120px]">
              <p className="text-[#333] text-[16px] mb-1 font-medium">결제완료</p>
              <p className="font-bold text-[20px]">84,000원</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <button className="h-[52px] bg-[#5C4033] text-white border border-[#A8A9AD] rounded-[10px] text-[18px] font-bold hover:opacity-90 transition cursor-pointer">
              취소
            </button>
            <button className="h-[52px] bg-white border border-[#A8A9AD] text-black rounded-[10px] text-[18px] font-bold hover:bg-gray-50 transition cursor-pointer">
              리뷰쓰기
            </button>
            <button className="h-[52px] bg-white border border-[#A8A9AD] text-black rounded-[10px] text-[18px] font-bold hover:bg-gray-50 transition cursor-pointer">
              문의하기
            </button>
          </div>

          {/* Collapsible Section (Delivery Info) */}
          <div className="border border-[#A8A9AD] rounded-[10px] overflow-hidden">
            <button
              onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
              className={`w-full h-[64px] px-6 flex items-center justify-between transition-colors ${isDeliveryOpen ? "bg-white" : "bg-[#F9F9F9]"
                }`}
            >
              <div className="font-bold text-[18px]">배송지 정보</div>
              {isDeliveryOpen ? (
                <ChevronUp size={24} className="text-gray-400" />
              ) : (
                <ArrowDownIcon size={24} strokeWidth={1.5} className="text-gray-400" />
              )}
            </button>

            {isDeliveryOpen && (
              <div className="relative border-t border-gray-200 bg-white px-8 pb-8 pt-6 animate-in slide-in-from-top-2 duration-200">
                {/* Information Header with Button */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-3 text-[17px] font-bold">
                    <p><span className="text-[#333] min-w-[100px] inline-block">수령인 :</span> 송은경</p>
                    <p><span className="text-[#333] min-w-[100px] inline-block">휴대폰 :</span> 010-1234-5678</p>
                    <p>
                      <span className="text-[#333] min-w-[100px] inline-block">주소지 :</span>
                      <span className="underline decoration-[#007AFF] underline-offset-4 decoration-2">부산시 부산진구 라클라베 12-4</span>
                    </p>
                    <p><span className="text-[#333] min-w-[100px] inline-block">배송메모 :</span> 문 앞에 놔둬주세요</p>
                  </div>
                  <button className="bg-[#5C4033] text-white px-6 py-2 rounded-full text-[14px] font-bold hover:opacity-90 transition">
                    배송지 변경
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
