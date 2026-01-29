import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, deleteCartItem, updateCartItemQuantity } from "@/api/cartApi";
import type { CartItemResponse } from "@/types/cart";
import { formatPrice, SERVER_URL } from "@/utils/productUtils";

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [allChecked, setAllChecked] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") !== "true") {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/loginProc");
            return;
        }

        const fetchCartData = async () => {
            try {
                const data = await getCartItems();
                // 모든 아이템의 초기 체크 상태를 true로 설정 및 옵션 객체 처리
                const itemsWithChecked = data.map(item => {
                    console.log("CartItem raw data:", item);
                    // 데이터 안전성 확보 (객체 혹은 문자열 혼용 대비, null 체크 포함)
                    const colorObj = (item.color && typeof item.color === 'object') ? item.color : null;
                    const sizeObj = (item.size && typeof item.size === 'object') ? item.size : null;

                    const mappedItem = {
                        ...item,
                        checked: true,
                        // 백엔드에서 imageUrl로 오든 mainImageUrl로 오든 mainImageUrl로 통일
                        mainImageUrl: item.mainImageUrl || (item as any).imageUrl,
                        // UI 표시용 문자열
                        colorName: colorObj ? colorObj.codeName : (typeof item.color === 'string' ? item.color : ""),
                        sizeName: sizeObj ? sizeObj.codeName : (typeof item.size === 'string' ? item.size : ""),
                        // 주문 시 필요한 공통코드 ID (Order.tsx 연동용)
                        colorCommonIdx: colorObj ? colorObj.commonIdx : item.colorCommonIdx,
                        sizeCommonIdx: sizeObj ? sizeObj.commonIdx : item.sizeCommonIdx
                    };
                    console.log(`Mapped Item ${mappedItem.cartItemIdx} image:`, mappedItem.mainImageUrl);
                    return mappedItem;
                });
                console.log("Mapped cart items:", itemsWithChecked);
                setCartItems(itemsWithChecked);
            } catch (error: any) {
                console.error("장바구니 조회 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, [navigate]);

    const handleDelete = async (cartItemIdx: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            console.log("아이템 삭제 시도:", cartItemIdx);
            await deleteCartItem(cartItemIdx);
            setCartItems((items) => items.filter((i) => i.cartItemIdx !== cartItemIdx));
        } catch (error: any) {
            console.error("삭제 실패:", error);
            alert(`삭제에 실패했습니다. (${error.response?.data?.message || error.message})`);
        }
    };

    const totalProductAmount = cartItems
        .filter((item) => item.checked)
        .reduce((acc, item) => acc + item.price * item.quantity, 0);

    const deliveryFee = totalProductAmount >= 100000 || totalProductAmount === 0 ? 0 : 3000;
    const finalAmount = totalProductAmount + deliveryFee;

    if (loading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto py-20 px-6">
            <h2 className="text-center text-[32px] font-bold mb-16 tracking-tight">
                장바구니
            </h2>

            {/* 헤더 컨트롤 */}
            <div className="flex justify-between items-center pb-4 border-b border-[#000000]">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        className="w-5 h-5 accent-gray-500"
                        checked={allChecked}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setAllChecked(checked);
                            setCartItems((items) =>
                                items.map((item) => ({ ...item, checked }))
                            );
                        }}
                    />
                    <span className="text-[15px]">전체 선택</span>
                </label>
                <button
                    onClick={async () => {
                        const checkedItems = cartItems.filter(item => item.checked);
                        if (checkedItems.length === 0) {
                            alert("삭제할 상품을 선택해주세요.");
                            return;
                        }
                        if (!window.confirm(`선택한 ${checkedItems.length}개의 상품을 삭제하시겠습니까?`)) return;

                        try {
                            console.log("선택 삭제 시작:", checkedItems.map(i => i.cartItemIdx));
                            // 병렬로 삭제 요청 보내기
                            const results = await Promise.allSettled(
                                checkedItems.map(item => deleteCartItem(item.cartItemIdx))
                            );

                            const failed = results.filter(r => r.status === 'rejected');
                            if (failed.length > 0) {
                                console.error("일부 삭제 실패:", failed);
                                alert(`${failed.length}건의 상품 삭제에 실패했습니다.`);
                            }

                            // 성공한 것들만 필터링하거나, 전체를 다시 불러오기
                            // 여기서는 안전하게 전체를 다시 불러오는 것을 추천하지만, 일단 로컬 상태 업데이트
                            setCartItems(prev => prev.filter(item => !item.checked ||
                                results[checkedItems.indexOf(item)].status === 'rejected'));

                            alert("처리가 완료되었습니다.");
                        } catch (error) {
                            console.error("선택 삭제 전체 프로세스 에러:", error);
                        }
                    }}
                    className="text-[15px] text-gray-600 hover:text-black cursor-pointer"
                >
                    선택 삭제
                </button>
            </div>

            {/* 상품 테이블 헤더 */}
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1.2fr_0.8fr] py-4 text-center text-[15px] border-b border-[#000000] ">
                <div></div>
                <div>상품 정보</div>
                <div>판매가</div>
                <div>수량</div>
                <div>합계</div>
                <div></div>
            </div>

            {/* 상품 리스트 */}
            <div className="mb-16">
                {cartItems.map((item, index) => (
                    <div key={item.cartItemIdx}>
                        {/* 상품 row */}
                        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1.2fr_0.8fr] py-8 items-center text-center">
                            {/* 체크박스 */}
                            <div className="flex justify-center">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-gray-500"
                                    checked={item.checked}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setCartItems((items) =>
                                            items.map((i) =>
                                                i.cartItemIdx === item.cartItemIdx ? { ...i, checked } : i
                                            )
                                        );
                                    }}
                                />
                            </div>

                            {/* 상품 정보 */}
                            <div className="flex items-center gap-6 text-left">
                                <div className="w-[100px] h-[130px] bg-gray-100 overflow-hidden rounded-sm">
                                    <img
                                        src={item.mainImageUrl?.startsWith("http")
                                            ? item.mainImageUrl
                                            : `${SERVER_URL}${item.mainImageUrl}`}
                                        alt={item.productName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // 이미지 로드 실패 시 대체 이미지 처리
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null; // 무한 루프 방지
                                            target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22130%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20130%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%22%20height%3D%22130%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20fill%3D%22%23999%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-[16px] mb-2">{item.productName}</p>
                                    <p className="text-gray-400 text-[14px]">
                                        [옵션 : {item.colorName || "옵션없음"} / {item.sizeName || "옵션없음"}]
                                    </p>
                                </div>
                            </div>

                            {/* 판매가 */}
                            <div className="text-[16px]">
                                <p className="font-bold">{formatPrice(item.price)}</p>
                            </div>

                            {/* 수량 조절 */}
                            <div className="flex justify-center">
                                <select
                                    value={item.quantity}
                                    onChange={async (e) => {
                                        const quantity = Number(e.target.value);
                                        console.log(`수량 변경 시도: idx=${item.cartItemIdx}, qty=${quantity}`);
                                        try {
                                            const res = await updateCartItemQuantity(item.cartItemIdx, quantity);
                                            console.log("수량 변경 성공:", res);
                                            setCartItems((items) =>
                                                items.map((i) =>
                                                    i.cartItemIdx === item.cartItemIdx ? { ...i, quantity } : i
                                                )
                                            );
                                        } catch (error: any) {
                                            console.error("수량 수정 실패:", error);
                                            alert(`수량 수정에 실패했습니다. (${error.message})`);
                                        }
                                    }}
                                    className="border border-gray-300 rounded px-2 py-1 text-[14px] outline-none cursor-pointer"
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 합계 */}
                            <div className="text-[18px] font-bold">
                                {formatPrice(item.price * item.quantity)}
                            </div>

                            {/* 삭제 버튼 */}
                            <div>
                                <button
                                    onClick={() => handleDelete(item.cartItemIdx)}
                                    className="border border-gray-300 px-4 py-1 text-[13px] rounded hover:bg-gray-50 cursor-pointer"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>

                        {/* 상품 사이 라인 (마지막 상품 제외) */}
                        {index !== cartItems.length - 1 && (
                            <div className="w-full h-[1px] bg-[#A8A9AD] my-6" />
                        )}
                    </div>
                ))}
                {cartItems.length === 0 && (
                    <div className="py-20 text-center text-gray-400">
                        장바구니가 비어 있습니다.
                    </div>
                )}
            </div>

            {/* 결제 요약 박스 */}
            <div className="border border-black rounded-xl overflow-hidden mb-12 shadow-sm">
                <div className="py-10 px-4">
                    {/* 상단: 항목 이름*/}
                    <div className="grid grid-cols-[1.5fr_0.2fr_1fr_0.2fr_1fr_0.2fr_1.5fr] text-center text-[18px] font-bold mb-8">
                        <div>총 상품 금액</div>
                        <div></div>
                        <div>할인 금액</div>
                        <div></div>
                        <div>배송비</div>
                        <div></div>
                        <div>결제 금액</div>
                    </div>
                    {/* 구분선 (점선) */}
                    <div className="my-6 border-t border-dotted border-gray-400"></div>
                    {/* 하단: 실제 금액 및 기호 */}
                    <div className="grid grid-cols-[1.5fr_0.2fr_1fr_0.2fr_1fr_0.2fr_1.5fr] text-center items-center">
                        <div className="text-[20px] font-semibold">
                            {formatPrice(totalProductAmount)}
                        </div>
                        <div className="text-[24px] text-gray-400 font-light">-</div>
                        <div className="text-[20px] font-semibold">0원</div>
                        <div className="text-[24px] text-gray-400 font-light">+</div>
                        <div className="text-[20px] font-semibold">
                            {formatPrice(deliveryFee)}
                        </div>
                        <div className="text-[24px] text-gray-400 font-light">=</div>
                        <div className="text-[20px] font-semibold text-[#000]">
                            {formatPrice(finalAmount)}
                        </div>
                    </div>
                </div>
            </div>

            {/* 주문 하기 버튼 */}
            <div className="flex justify-center">
                <button
                    onClick={() => {
                        const selectedItems = cartItems.filter((item) => item.checked);
                        if (selectedItems.length === 0) {
                            alert("주문할 상품을 선택해주세요.");
                            return;
                        }
                        navigate("/order", { state: { selectedItems } });
                    }}
                    className="w-full h-16 border border-[#000000] rounded-lg text-[20px] font-bold hover:bg-[#5C4033] hover:text-white cursor-pointer transition-colors shadow-sm"
                >
                    {cartItems.filter((item) => item.checked).length}개 상품 주문 하기
                </button>
            </div>
        </div>
    );
};

export { Cart };
