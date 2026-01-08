import { ArrowDownIcon, ArrowLeft, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import sampleImg from "../../assets/sample-product.jpg";

export default function MyOrders() {
  const navigate = useNavigate();
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  return (
    <div className="text-black pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[24px] font-bold text-[#5C4033] tracking-tight">주문내역 조회</h2>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        {/* Main Content Box Wrapper */}
        <div className="border border-[#A8A9AD] rounded-[10px] p-5">
          {/* Order Header Info */}
          <div className="mb-2">
            <div className="font-bold text-[16px] mb-0.5">주문번호 20251603947</div>
            <div className="text-[#A8A9AD] font-medium text-[13px]">결제 날짜 : 2025.06.13 오후 15:33</div>
          </div>

          <Separator className="bg-[#A8A9AD] h-[1px] mb-4" />

          {/* Product Info Section */}
          <div className="flex gap-5 items-start mb-5 px-1">
            {/* Thumbnail */}
            <div className="w-[100px] h-[100px] flex-shrink-0 overflow-hidden rounded-sm">
              <img src={sampleImg} alt="상품 이미지" className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-[16px] mb-1.5 leading-tight">
                배색 리버시블 컴포트핏 다운패딩(블랙)
              </p>
              <div className="space-y-0.5 text-[#333] text-[14px] font-medium">
                <p>색상 : 블랙</p>
                <p>사이즈 : s</p>
                <p>수량 : 1개</p>
              </div>
            </div>

            {/* Status & Price */}
            <div className="text-right pt-1 min-w-[100px]">
              <p className="text-[#333] text-[14px] mb-1 font-medium">결제완료</p>
              <p className="font-bold text-[18px]">84,000원</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <button className="h-[48px] border border-[#A8A9AD] text-black rounded-[10px] text-[16px] font-bold hover:bg-[#5C4033] hover:text-white transition cursor-pointer">
              취소
            </button>
            <button
              onClick={() => navigate("/writeReview")}
              className="h-[48px] border border-[#A8A9AD] text-black rounded-[10px] text-[16px] font-bold hover:bg-[#5C4033] hover:text-white transition cursor-pointer"
            >
              리뷰쓰기
            </button>
            <button
              onClick={() => navigate("/myInquiryHistory")}
              className="h-[48px] border border-[#A8A9AD] text-black rounded-[10px] text-[16px] font-bold hover:bg-[#5C4033] hover:text-white transition cursor-pointer"
            >
              문의하기
            </button>
          </div>

          {/* Collapsible Section (Delivery & Payment Info) - INTERNAL to the parent box */}
          <div className="border border-[#A8A9AD] rounded-[10px] overflow-hidden">
            <button
              onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
              className={`w-full h-[50px] px-6 flex items-center justify-between cursor-pointer transition-colors "}`}
            >
              <div className="font-bold text-[16px] ">결제 정보</div>
              {isDeliveryOpen ? (
                <ChevronUp size={24} className="text-gray-400" />
              ) : (
                <ArrowDownIcon size={24} strokeWidth={1.5} className="text-gray-400" />
              )}
            </button>

            {isDeliveryOpen && (
              <div className="relative border-t border-[#A8A9AD] px-5 pb-5 pt-4 animate-in slide-in-from-top-2 duration-200 space-y-5">
                {/* Delivery Information Section */}
                <div>
                  <div className="mb-3 flex justify-between items-center">
                    <h3 className="font-bold text-[16px] ">배송지 정보</h3>
                    <button
                      onClick={() => navigate("/addressList")}
                      className="bg-[#5C4033] text-white px-4 py-1 rounded-full text-[12px] font-bold hover:opacity-90 transition"
                    >
                      배송지 변경
                    </button>
                  </div>
                  <div className="space-y-1 text-[14px]">
                    <p><span className="text-[#333] font-bold min-w-[70px] inline-block">수령인 :</span> <span className="font-medium">송은경</span></p>
                    <p><span className="text-[#333] font-bold min-w-[70px] inline-block">휴대폰 :</span> <span className="font-medium">010-1234-5678</span></p>
                    <p>
                      <span className="text-[#333] font-bold min-w-[70px] inline-block">주소지 :</span>
                      <span className="font-medium">부산시 부산진구 라클라베 12-4</span>
                    </p>
                    <p><span className="text-[#333] font-bold min-w-[70px] inline-block">배송메모 :</span> <span className="font-medium">문 앞에 놔둬주세요</span></p>
                  </div>
                </div>

                <Separator className="bg-[#EEEEEE]" />

                {/* Payment Information Section */}
                <div>
                  <h3 className="font-bold text-[16px] mb-3 text-[#333]">결제정보</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#333] font-bold">결제방법 :</span>
                      <span className="font-bold">BC카드</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#333] font-bold">결제금액 :</span>
                      <span className="font-bold">84,000원</span>
                    </div>
                    <div className="flex justify-between text-[13px] pl-3">
                      <span className="text-[#666] font-bold">- 상품금액 :</span>
                      <span className="font-bold">84,000원</span>
                    </div>
                    <div className="flex justify-between text-[13px] pl-3">
                      <span className="text-[#666] font-bold">- 배송비 :</span>
                      <span className="font-bold">무료배송</span>
                    </div>
                    <div className="flex justify-between text-[13px] pl-3">
                      <span className="text-[#666] font-bold">- 총 할인 금액 :</span>
                      <span className="font-bold">-</span>
                    </div>

                    <Separator className="bg-[#EEEEEE] my-2" />

                    <div className="pt-2 flex justify-between items-center">
                      <span className="font-bold text-[16px]">최종 결제 금액 :</span>
                      <span className="font-bold text-[20px]">84,000원</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
