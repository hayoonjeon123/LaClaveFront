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
  const [openPaymentIdx, setOpenPaymentIdx] = useState<number | null>(null);
  const [openDeliveryIdx, setOpenDeliveryIdx] = useState<number | null>(null);

  useEffect(() => {
    getMyOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <div className="text-black pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="flex-1 text-center text-[24px] font-bold text-[#5C4033]">
          주문내역 조회
        </h2>
      </div>

      <div className="max-w-[700px] mx-auto px-6">
        {orders.length === 0 ? (
          <p className="text-center font-bold text-gray-500 mt-10">
            주문 내역이 없습니다.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.ordersIdx}
              className="border border-[#A8A9AD] rounded-[10px] p-5 mb-6"
            >
              {/* 주문 헤더 */}
              <div className="mb-2">
                <p className="font-bold">주문번호 {order.ordersIdx}</p>
                <p className="text-sm text-gray-400">
                  결제 날짜 :{" "}
                  {new Date(order.ordersDate).toLocaleString("ko-KR")}
                </p>
              </div>

              <Separator className="mb-4" />

              {/* 상품 목록 */}
              {order.details.map((detail) => (
                <div
                  key={detail.productIdx}
                  className="flex gap-4 items-start mb-4"
                >
                  <img
                    src={sampleImg}
                    alt="상품 이미지"
                    className="w-[100px] h-[100px] object-cover"
                  />

                  <div className="flex-1 text-sm">
                    <p className="font-bold mb-1">{detail.productName}</p>
                    <p>색상 : {detail.colorName ?? detail.colorCode}</p>
                    <p>사이즈 : {detail.sizeName ?? detail.sizeCode}</p>
                    <p>수량 : {detail.quantity}개</p>
                    {/* 상품 액션 버튼 */}
                    <div className="mt-3 flex gap-2">
                      {/* 취소 */}
                      <button
                        className="flex-1 h-[34px] border border-[#5C4033] text-[#5C4033]
               rounded-md text-[13px] font-bold
               hover:bg-[#5C4033] hover:text-white transition"
                      >
                        취소
                      </button>

                      {/* 리뷰쓰기 */}
                      <button
                        onClick={() =>
                          navigate("/writeReview", {
                            state: {
                              ordersIdx: order.ordersIdx,
                              productIdx: detail.productIdx,
                              productName: detail.productName,
                              optionInfo: `색상: ${detail.colorCode}, 사이즈: ${detail.sizeCode}`,
                            },
                          })
                        }
                        className="flex-1 h-[34px] border border-[#5C4033] text-[#5C4033]
               rounded-md text-[13px] font-bold
               hover:bg-[#5C4033] hover:text-white transition"
                      >
                        리뷰쓰기
                      </button>

                      {/* 문의하기 */}
                      <button
                        onClick={() =>
                          navigate("/writeInquiry", {
                            state: {
                              productIdx: detail.productIdx,
                              productName: detail.productName,
                            },
                          })
                        }
                        className="flex-1 h-[34px] border border-[#5C4033] text-[#5C4033]
               rounded-md text-[13px] font-bold
               hover:bg-[#5C4033] hover:text-white transition"
                      >
                        문의하기
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-bold">
                    {detail.totalPrice.toLocaleString()}원
                  </div>
                </div>
              ))}

              {/* 배송지 / 결제 정보 */}
              {order.delivery && (
                <div className="space-y-3 mt-4">
                  {/* 배송지 */}
                  <div className="border rounded-[10px] overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenDeliveryIdx(
                          openDeliveryIdx === order.ordersIdx
                            ? null
                            : order.ordersIdx,
                        )
                      }
                      className="w-full h-[50px] px-6 flex items-center justify-between"
                    >
                      배송지 정보
                      {openDeliveryIdx === order.ordersIdx ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ArrowDownIcon size={20} />
                      )}
                    </button>

                    {openDeliveryIdx === order.ordersIdx && (
                      <div className="border-t px-5 py-4 text-sm space-y-1">
                        <p>수령인: {order.delivery.recipientName}</p>
                        <p>휴대폰: {order.delivery.phone}</p>
                        <p>
                          주소: {order.delivery.address}{" "}
                          {order.delivery.addressDetail}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* 결제 */}
                  <div className="border rounded-[10px] overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenPaymentIdx(
                          openPaymentIdx === order.ordersIdx
                            ? null
                            : order.ordersIdx,
                        )
                      }
                      className="w-full h-[50px] px-6 flex items-center justify-between"
                    >
                      결제 정보
                      {openPaymentIdx === order.ordersIdx ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ArrowDownIcon size={20} />
                      )}
                    </button>

                    {openPaymentIdx === order.ordersIdx && (
                      <div className="border-t px-5 py-4 text-sm space-y-1">
                        <p>결제방법: BC카드</p>
                        <p>결제금액: {order.totalPrice.toLocaleString()}원</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
