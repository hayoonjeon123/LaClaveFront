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
        IMP: any;
    }
}
interface OrderItem {
    id: number;
    cartItemIdx?: number;
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
            return new Promise((resolve, reject) => {
                // 이미 로드되어 있으면 즉시 resolve
                if (window.INIStdPay) {
                    console.log("이니시스 스크립트 이미 로드됨");
                    resolve(true);
                    return;
                }

                // 이미 스크립트 태그가 있는지 확인
                const existingScript = document.querySelector('script[src*="INIStdPay.js"]');
                if (existingScript) {
                    console.log("이니시스 스크립트 로딩 중...");
                    // 스크립트가 로드될 때까지 대기
                    existingScript.addEventListener('load', () => resolve(true));
                    existingScript.addEventListener('error', () => reject(new Error("스크립트 로드 실패")));
                    return;
                }

                // 새로운 스크립트 태그 생성
                const script = document.createElement('script');
                script.src = 'https://stgstdpay.inicis.com/stdjs/INIStdPay.js';
                script.type = 'text/javascript';
                script.charset = 'UTF-8';
                script.onload = () => {
                    console.log("이니시스 스크립트 로드 완료");
                    resolve(true);
                };
                script.onerror = () => {
                    console.error("이니시스 스크립트 로드 실패");
                    reject(new Error("스크립트 로드 실패"));
                };
                document.body.appendChild(script);
            });
        };

        loadInicisScript().catch(error => {
            console.error("이니시스 초기화 실패:", error);
        });

        // 회원 정보 가져오기
        const fetchMemberInfo = async () => {
            try {
                const response = await axios.get("/api/info", { withCredentials: true });
                setMemberInfo(response.data);
            } catch (error) {
                console.error("회원 정보 조회 실패:", error);
                alert("로그인 정보가 없거나 세션이 만료되었습니다.");
                navigate("/login");
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
            // [STEP 1] 주문 생성
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
            const orderNo = response.data;
            console.log("=== 주문 생성 성공, 번호:", orderNo);

            // [STEP 2] 포트원 결제 요청
            if (!window.IMP) {
                alert("포트원 SDK를 불러오지 못했습니다. 페이지를 새로고침 해주세요.");
                return;
            }

            // 포트원 가맹점 식별코드 (테스트용)
            const IMP = window.IMP;
            IMP.init("imp67574350"); // 포트원 공식 테스트 가맹점 식별코드

            // 결제 요청
            IMP.request_pay({
                pg: "html5_inicis",  // 이니시스 웹표준 (가장 안정적)
                pay_method: "card",             // 결제 수단
                merchant_uid: orderNo,          // 주문 번호
                name: orderItems[0].name + (orderItems.length > 1 ? ` 외 ${orderItems.length - 1}건` : ""),
                amount: 1,                    // ⚠️ 테스트용 100원 (실제 금액: finalAmount)
                buyer_email: memberInfo?.email || "test@test.com",
                buyer_name: memberInfo?.memberName || "구매자",
                buyer_tel: "01000000000",
                buyer_addr: memberInfo?.address || "",
                buyer_postcode: memberInfo?.postCode || "",
            }, async (rsp: any) => {
                // 결제 완료 콜백
                if (rsp.success) {
                    console.log("✅ 결제 성공 - 전체 응답:", rsp);
                    console.log("✅ imp_uid (externalTransaction):", rsp.imp_uid);
                    console.log("✅ merchant_uid:", rsp.merchant_uid);

                    try {
                        // [STEP 3] 백엔드 결제 승인 처리 (DB 저장)
                        const approveData = {
                            orderNo: orderNo,
                            externalTransaction: rsp.imp_uid,
                            payWay: rsp.pay_method,
                            amount: rsp.paid_amount
                        };

                        console.log("=== 결제 승인 요청 ===", approveData);
                        await axios.post("/api/orders/approve", approveData, { withCredentials: true });
                        console.log("=== DB 저장 완료 ===");

                        // [STEP 4] 장바구니 아이템 삭제 (장바구니에서 온 경우)
                        const deletePromises = orderItems
                            .filter(item => item.cartItemIdx)
                            .map(item =>
                                axios.post(
                                    "/api/cart/delete",
                                    { cartItemIdx: item.cartItemIdx },
                                    { withCredentials: true }
                                ).catch(err => console.warn(`장바구니 삭제 실패 (ID ${item.cartItemIdx})`))
                            );

                        if (deletePromises.length > 0) {
                            await Promise.all(deletePromises);
                            console.log("=== 장바구니 아이템 삭제 완료 ===");
                        }

                        // [STEP 5] 결제 완료 페이지로 이동
                        navigate("/order-complete", {
                            state: {
                                orderNo: orderNo,
                                impUid: rsp.imp_uid,
                                merchantUid: rsp.merchant_uid
                            }
                        });
                    } catch (error) {
                        console.error("DB 저장 실패:", error);
                        alert("결제는 완료되었으나 주문 정보 저장 중 오류가 발생했습니다. 고객센터에 문의해주세요.");
                    }

                } else {
                    console.error("❌ 결제 실패:", rsp);
                    alert(`결제에 실패했습니다.\n${rsp.error_msg}`);
                }
            });

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
        <div className="w-full max-w-[800px] mx-auto py-20 px-6 text-[#000]">
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
                                        {(memberInfo?.point || 0).toLocaleString()}원
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
                <button type="button"
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
