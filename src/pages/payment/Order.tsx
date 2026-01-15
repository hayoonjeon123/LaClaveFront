@ -1, 246 + 0, 0 @@
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Order = () => {
    const [orderItems, setOrderItems] = useState([
        {
            id: 1,
            name: "플러피 부클 (2 color)",
            option: "ivory / M",
            quantity: 2,
            price: 300000,
            image: "/path/to/image.jpg",
        },
    ]);

    const [points, setPoints] = useState(0);
    const availablePoints = 5000; // 보유 적립금 현황
    const deliveryFee = 0;
    const couponDiscount = 20000;

    const [deliveryMessage, setDeliveryMessage] = useState("집 앞에 배송해주세요");
    const [selectedCoupon, setSelectedCoupon] = useState("아우터 5% 할인 쿠폰");
    const [paymentMethod, setPaymentMethod] = useState("카드 결제");

    const removeItem = (id: number) => {
        if (window.confirm("상품을 주문 목록에서 삭제하시겠습니까?")) {
            setOrderItems(orderItems.filter((item) => item.id !== id));
        }
    };

    const totalProductAmount = orderItems.reduce(
        (acc, item) => acc + item.price,
        0
    );
    const appliedPoints = points >= 1000 ? points : 0;
    const finalAmount =
        totalProductAmount + deliveryFee - couponDiscount - appliedPoints;

    return (
        <div className="w-full max-w-[800px] mx-auto py-20 px-6 font-sans text-[#000]">
            <h2 className="text-center text-[24px] font-bold mb-12 tracking-widest">
                ORDER
            </h2>

            {/* 배송지 섹션 */}
            <section className="mb-12">
                <div className="flex justify-between items-center border-b border-black pb-2 mb-6">
                    <h3 className="text-[16px] font-bold">배송지</h3>
                    <button className="border border-[#000000] px-3 py-1 text-[12px] rounded hover:bg-[#5C4033] hover:text-[#ffffff] cursor-pointer transition-colors">
                        배송지 변경
                    </button>
                </div>
                <div className="text-[14px] leading-relaxed space-y-1">
                    <p className="font-bold">| 기본 | ooo</p>
                    <p className="text-gray-600">
                        [ 16859 ] 부산광역시 수영구 망미동 000아파트, 501동 1702호
                    </p>
                    <p className="text-gray-600">연락처 : 010 - 0000 - 0000</p>
                    <Select value={deliveryMessage} onValueChange={setDeliveryMessage}>
                        <SelectTrigger className="!w-full !mt-4 !border !border-[#000000] !rounded !px-4 !h-[45px] !text-[14px] !justify-between focus:!ring-0 !outline-none">
                            <SelectValue placeholder="배송 메시지 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="집 앞에 배송해주세요">집 앞에 배송해주세요</SelectItem>
                            <SelectItem value="직접 수령하겠습니다">직접 수령하겠습니다</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </section>

            {/* 주문 상품 섹션 */}
            <section className="mb-12">
                <h3 className="text-[16px] font-bold border-b border-black pb-2 mb-6">
                    주문 상품
                </h3>
                {orderItems.length > 0 ? (
                    orderItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-6 items-center py-4 border-b border-gray-100 relative"
                        >
                            <div className="w-[100px] h-[120px] bg-gray-100 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="font-bold text-[16px]">{item.name}</p>
                                <p className="text-gray-400 text-[13px]">
                                    [옵션 : {item.option}]
                                </p>
                                <p className="text-gray-500 text-[13px]">
                                    수량 : {item.quantity}개
                                </p>
                                <p className="font-bold text-[16px]">
                                    {item.price.toLocaleString()}원
                                </p>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="absolute right-0 top-4 border border-gray-200 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:border-black cursor-pointer transition-all"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-10 text-gray-400 border-b border-gray-100">
                        주문할 상품이 없습니다.
                    </p>
                )}
            </section>

            {/* 적립금 / 쿠폰 사용 섹션 */}
            <section className="mb-14">
                <h3 className="text-[14px] font-bold pb-3 mb-8 border-b border-gray-200">
                    적립금 / 쿠폰 사용
                </h3>
                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-6">
                            <span className="w-20 text-[14px] font-bold">적립금</span>
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="text-[12px] text-gray-500 ml-1">
                                    보유 적립금{" "}
                                    <strong className="text-black ml-1">
                                        {availablePoints.toLocaleString()}원
                                    </strong>
                                </p>
                                <div className="flex border border-[#000000] rounded overflow-hidden h-[45px]">
                                    <input
                                        type="number"
                                        className="flex-1 px-4 text-right outline-none text-[14px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={points}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (value <= availablePoints) setPoints(value);
                                        }}
                                        placeholder="0"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPoints(availablePoints)}
                                        className="bg-[#f8f8f8] border-l border-[#000000] px-6 text-[13px] font-bold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                        전액 사용
                                    </button>
                                </div>
                            </div>
                        </div>
                        {points > 0 && points < 1000 && (
                            <p className="text-red-500 text-[11px] ml-[104px] mt-1">
                                * 적립금은 1,000원부터 사용 가능합니다.
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="w-20 text-[14px] font-bold">쿠폰</span>
                        <div className="flex-1">
                            <Select value={selectedCoupon} onValueChange={setSelectedCoupon}>
                                <SelectTrigger className="!w-full !border !border-[#000000] !rounded !px-4 !h-[45px] !text-[14px] !justify-between focus:!ring-0 !outline-none">
                                    <SelectValue placeholder="쿠폰 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="아우터 5% 할인 쿠폰">아우터 5% 할인 쿠폰</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* 적용 금액 요약 바 */}
            <div className="bg-[#5C4033] text-white p-5 flex justify-between items-center rounded-sm mb-12">
                <span className="font-semibold">적용 금액</span>
                <span className="text-[20px] font-semibold">
                    -{(couponDiscount + appliedPoints).toLocaleString()}원
                </span>
            </div>

            {/* 결제 정보 섹션 */}
            <section className="mb-12">
                <h3 className="text-[16px] font-semibold border-b border-[#000000] pb-2 mb-6">
                    결제 정보
                </h3>
                <div className="space-y-4 text-[15px]">
                    <div className="flex justify-between">
                        <span className="text-gray-500">상품 금액</span>
                        <span className="font-bold">
                            {totalProductAmount.toLocaleString()}원
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">배송비</span>
                        <span className="font-bold">+{deliveryFee.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-4">
                        <span className="text-gray-500">할인 / 쿠폰</span>
                        <span className="font-bold text-red-500">
                            -{(couponDiscount + appliedPoints).toLocaleString()}원
                        </span>
                    </div>
                    <div className="bg-[#5C4033] text-white p-5 flex justify-between items-center rounded-sm mb-12">
                        <span className="font-semibold">최종 결제 금액</span>
                        <span className="text-[20px] font-semibold">
                            {finalAmount.toLocaleString()}원
                        </span>
                    </div>
                </div>
            </section>

            {/* 결제 수단 및 버튼 */}
            <section>
                <h3 className="text-[16px] font-semibold border-b border-[#000000] pb-2 mb-6">
                    결제 수단
                </h3>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="!w-full !border !border-[#000000] !rounded !px-4 !h-[45px] !mb-6 !text-[14px] !font-semibold !justify-between focus:!ring-0 !outline-none">
                        <SelectValue placeholder="결제 수단 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="카드 결제">카드 결제</SelectItem>
                        <SelectItem value="무통장 입금">무통장 입금</SelectItem>
                    </SelectContent>
                </Select>
                <button
                    className="w-full h-16 border border-[#000000] rounded-[10px] text-[18px] font-semibold hover:bg-[#5C4033] hover:text-white transition-all cursor-pointer shadow-sm"
                    disabled={orderItems.length === 0}
                >
                    {finalAmount.toLocaleString()}원 결제 하기
                </button>
            </section>
        </div>
    );
};

export { Order };
