import { ArrowDownIcon, ArrowLeft, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import sampleImg from "../../assets/sample-product.jpg";
import { getMyOrders } from "../../api/ordersApi";
import type { Order } from "../../api/ordersApi";

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [openDeliveryIdx, setOpenDeliveryIdx] = useState<number | null>(null);

  // 회원 주문내역 불러오기
  useEffect(() => {
    getMyOrders()
      .then((orders) => {
        console.log("Orders:", orders); // 배열이 제대로 찍히는지 확인
        setOrders(orders); // orders.data가 아님
      })
      .catch(console.error);
  }, []);

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
          <h2 className="text-[24px] font-bold text-[#5C4033] tracking-tight">
            주문내역 조회
          </h2>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        {/* 주문 내역이 없으면 안내 문구 */}
        {orders.length === 0 ? (
          <p className="text-center font-bold text-gray-500 mt-10 text-[16px]">
            주문 내역이 없습니다.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.ordersIdx}
              className="border border-[#A8A9AD] rounded-[10px] p-5 mb-6"
            >
              {/* Order Header Info */}
              <div className="mb-2">
                <div className="font-bold text-[16px] mb-0.5">
                  주문번호 {order.ordersIdx}
                </div>
                <div className="text-[#A8A9AD] font-medium text-[13px]">
                  결제 날짜 :{" "}
                  {new Date(order.ordersDate).toLocaleString("ko-KR")}
                </div>
              </div>

              <Separator className="bg-[#A8A9AD] h-[1px] mb-4" />

              {/* Product Info Section */}
              {order.details.map((detail) => (
                <div
                  key={detail.productIdx}
                  className="flex gap-5 items-start mb-5 px-1"
                >
                  {/* Thumbnail */}
                  <div className="w-[100px] h-[100px] flex-shrink-0 overflow-hidden rounded-sm">
                    <img
                      src={sampleImg}
                      alt="상품 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 pt-0.5">
                    <p className="font-bold text-[16px] mb-1.5 leading-tight">
                      {detail.productName || "상품명 없음"}
                    </p>
                    <div className="space-y-0.5 text-[#333] text-[14px] font-medium">
                      <p>색상 : {detail.colorCode || "-"}</p>
                      <p>사이즈 : {detail.sizeCode || "-"}</p>
                      <p>수량 : {detail.quantity}개</p>
                    </div>
                  </div>

                  {/* Status & Price */}
                  <div className="text-right pt-1 min-w-[100px]">
                    <p className="text-[#333] text-[14px] mb-1 font-medium">
                      {order.ordersStatus === 1 ? "결제완료" : "처리중"}
                    </p>
                    <p className="font-bold text-[18px]">
                      {detail.totalPrice.toLocaleString()}원
                    </p>
                  </div>
                </div>
              ))}

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

              {/* Collapsible Delivery & Payment Info */}
              {order.delivery && (
                <div className="border border-[#A8A9AD] rounded-[10px] overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenDeliveryIdx(
                        openDeliveryIdx === order.ordersIdx
                          ? null
                          : order.ordersIdx
                      )
                    }
                    className="w-full h-[50px] px-6 flex items-center justify-between cursor-pointer"
                  >
                    <div className="font-bold text-[16px]">결제 정보</div>
                    {openDeliveryIdx === order.ordersIdx ? (
                      <ChevronUp size={24} className="text-gray-400" />
                    ) : (
                      <ArrowDownIcon size={24} className="text-gray-400" />
                    )}
                  </button>

                  {openDeliveryIdx === order.ordersIdx && (
                    <div className="relative border-t border-[#A8A9AD] px-5 pb-5 pt-4 animate-in slide-in-from-top-2 duration-200 space-y-5">
                      {/* Delivery Information Section */}
                      <div>
                        <h3 className="font-bold text-[16px] mb-2">
                          배송지 정보
                        </h3>
                        <p>
                          <span className="font-bold">수령인:</span>{" "}
                          {order.delivery.recipientName}
                        </p>
                        <p>
                          <span className="font-bold">휴대폰:</span>{" "}
                          {order.delivery.phone}
                        </p>
                        <p>
                          <span className="font-bold">주소:</span>{" "}
                          {order.delivery.address}{" "}
                          {order.delivery.addressDetail}
                        </p>
                      </div>

                      <Separator className="bg-[#EEEEEE]" />

                      {/* Payment Information Section */}
                      <div>
                        <h3 className="font-bold text-[16px] mb-3 text-[#333]">
                          결제정보
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[14px]">
                            <span className="font-bold">결제방법 :</span>
                            <span className="font-bold">BC카드</span>
                          </div>
                          <div className="flex justify-between text-[14px]">
                            <span className="font-bold">결제금액 :</span>
                            <span className="font-bold">
                              {order.totalPrice.toLocaleString()}원
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
