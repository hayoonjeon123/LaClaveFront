import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
declare global {
    interface Window {
        INIStdPay: any;
    }
}
interface OrderItem {
    id: number;
    name: string;
    option: string;
    quantity: number;
    price: number;
    image: string;
    colorCommonIdx: number;
    sizeCommonIdx: number;
}

interface MemberInfo {
    memberName: string;
    memberId: string;
    email: string;
    postCode: string;
    address: string;
    addressDetail: string;
    point: number;
}

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // CartPage에서 넘겨준 선택 상품들
    const selectedItemsFromCart = location.state?.selectedItems || [];

    const [orderItems, setOrderItems] = useState<OrderItem[]>(selectedItemsFromCart);
    const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
    const [pointsToUse, setPointsToUse] = useState(0);
    const [deliveryMessage, setDeliveryMessage] = useState("집 앞에 배송해주세요");
    const [selectedCoupon, setSelectedCoupon] = useState("선택 안함");
    const [paymentMethod, setPaymentMethod] = useState("카드 결제");

    useEffect(() => {
        // 상품이 없으면 장바구니로 리다이렉트
        if (orderItems.length === 0) {
            alert("주문할 상품이 없습니다.");
            navigate("/cart");
            return;
        }

        // 이니시스 스크립트 동적 로드
        const loadInicisScript = () => {
            // 이미 로드되어 있으면 스킵
            if (window.INIStdPay) {
                console.log("이니시스 스크립트 이미 로드됨");
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js';
            script.type = 'text/javascript';
            script.charset = 'UTF-8';
            script.onload = () => {
                console.log("이니시스 스크립트 로드 완료");
            };
            script.onerror = () => {
                console.error("이니시스 스크립트 로드 실패");
            };
            document.body.appendChild(script);
        };

        loadInicisScript();

        // 회원 정보 가져오기
        const fetchMemberInfo = async () => {
            try {
                const response = await axios.get("/api/info", { withCredentials: true });
                setMemberInfo(response.data);
            } catch (error) {
                console.error("회원 정보 조회 실패:", error);
                // 임시 더미 데이터 사용 (개발용)
                setMemberInfo({
                    memberName: "홍길동",
                    memberId: "test123",
                    email: "test@example.com",
                    postCode: "12345",
                    address: "서울시 강남구",
                    addressDetail: "테헤란로 123",
                    point: 5000
                });
            }
        };
        fetchMemberInfo();
    }, [orderItems, navigate]);

    const removeItem = (id: number) => {
        if (window.confirm("상품을 주문 목록에서 삭제하시겠습니까?")) {
            setOrderItems(orderItems.filter((item) => item.id !== id));
        }
    };

    const handlePaymentSubmit = async () => {
        if (orderItems.length === 0) {
            alert("주문할 상품이 없습니다.");
            return;
        }

        try {
            // [STEP 1] 백엔드 주문 생성 (기존 코드)
            const orderData = {
                addrIdx: 1,
                usedPoint: appliedPoints,
                totalPrice: finalAmount,
                deliveryMsg: deliveryMessage,
                orderItems: orderItems.map(item => ({
                    productIdx: item.id,
                    productName: item.name,
                    colorCode: item.colorCommonIdx,
                    sizeCode: item.sizeCommonIdx,
                    quantity: item.quantity,
                    price: item.price,
                    discountPrice: 0
                }))
            };

            console.log("=== 주문 생성 요청 ===", orderData);
            const response = await axios.post("/api/orders/create", orderData, { withCredentials: true });
            const orderNo = response.data; // 예: "20260116-2530142d"
            console.log("=== 주문 생성 성공, 번호:", orderNo);

            // [STEP 2] 백엔드에서 이니시스 결제 데이터 가져오기 (추가되는 부분)
            // 주의: 백엔드에 이 API가 만들어져 있어야 합니다!
            const payInfoRes = await axios.get(`/api/orders/payment/ini-request/${orderNo}`);
            const data = payInfoRes.data;

            console.log("=== 이니시스 결제 데이터 ===", data);

            // [STEP 3] 이니시스 결제창 호출
            if (window.INIStdPay) {
                // 기존 폼 삭제 (중복 방지)
                const oldForm = document.getElementById('SendPayForm_id');
                if (oldForm) oldForm.remove();

                const form = document.createElement('form');
                form.id = 'SendPayForm_id';
                form.method = 'POST';
                form.style.display = 'none';

                const params: any = {
                    version: "1.0",
                    mid: data.mid || "",
                    oid: data.orderNo || "",
                    price: String(data.price || "0"),
                    timestamp: data.timestamp || "",
                    signature: data.signature || "",
                    mKey: data.mKey || "",
                    currency: "WON",
                    goodname: data.productName || "상품",
                    buyername: data.buyerName || "",
                    buyertel: data.buyerTel || "01000000000",
                    buyeremail: data.buyerEmail || "",
                    acceptmethod: "HPP(1):below1000:va_receipt",
                    payMethod: "Card",
                    returnUrl: "http://localhost:8080/api/payment/callback",
                };

                console.log("=== 이니시스 파라미터 ===", params);

                Object.keys(params).forEach(key => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = String(params[key] || ""); // 명시적으로 문자열 변환
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                window.INIStdPay.pay('SendPayForm_id'); // 🚀 팝업창 실행!
            } else {
                alert("결제 모듈을 불러오지 못했습니다. 페이지를 새로고침 해주세요.");
            }

        } catch (error: any) {
            console.error("결제 프로세스 에러:", error);
            alert("결제 준비 중 오류가 발생했습니다.");
        }
    };

    const totalProductAmount = orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const deliveryFee = totalProductAmount >= 100000 || totalProductAmount === 0 ? 0 : 3000;
    const couponDiscount = 0;
    const appliedPoints = pointsToUse >= 1000 ? pointsToUse : 0;
    const finalAmount = totalProductAmount + deliveryFee - couponDiscount - appliedPoints;

    if (!memberInfo) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

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
                    <p className="font-bold">| 기본 | {memberInfo.memberName}</p>
                    <p className="text-gray-600">
                        [ {memberInfo.postCode} ] {memberInfo.address} {memberInfo.addressDetail}
                    </p>
                    <p className="text-gray-600">이메일 : {memberInfo.email}</p>
                    <Select value={deliveryMessage} onValueChange={setDeliveryMessage}>
                        <SelectTrigger className="!w-full !mt-4 !border !border-[#000000] !rounded !px-4 !h-[45px] !text-[14px] !justify-between focus:!ring-0 !outline-none">
                            <SelectValue placeholder="배송 메시지 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="집 앞에 배송해주세요">집 앞에 배송해주세요</SelectItem>
                            <SelectItem value="직접 수령하겠습니다">직접 수령하겠습니다</SelectItem>
                            <SelectItem value="경비실에 맡겨주세요">경비실에 맡겨주세요</SelectItem>
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
                                    {(item.price * item.quantity).toLocaleString()}원
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
                                        {memberInfo.point.toLocaleString()}원
                                    </strong>
                                </p>
                                <div className="flex border border-[#000000] rounded overflow-hidden h-[45px]">
                                    <input
                                        type="number"
                                        className="flex-1 px-4 text-right outline-none text-[14px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={pointsToUse}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (value <= memberInfo.point) setPointsToUse(value);
                                        }}
                                        placeholder="0"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPointsToUse(memberInfo.point)}
                                        className="bg-[#f8f8f8] border-l border-[#000000] px-6 text-[13px] font-bold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                        전액 사용
                                    </button>
                                </div>
                            </div>
                        </div>
                        {pointsToUse > 0 && pointsToUse < 1000 && (
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
                                    <SelectItem value="선택 안함">선택 안함</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

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
                        <span className="text-gray-500">할인 / 적립금</span>
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
                    onClick={handlePaymentSubmit}
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
