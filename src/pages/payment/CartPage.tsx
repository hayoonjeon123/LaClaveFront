import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CartItem {
    id: number;
    cartItemIdx: number;
    name: string;
    option: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
    checked: boolean;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [allChecked, setAllChecked] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("/api/cart/list", {
                    withCredentials: true,
                });

                // 응답이 배열인지 확인
                if (Array.isArray(response.data)) {
                    const data = response.data.map((item: any) => ({
                        id: item.cartItemIdx,
                        cartItemIdx: item.cartItemIdx,
                        name: item.productName,
                        option: `${item.colorName} / ${item.sizeName}`,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.imageUrl,
                        checked: true,
                    }));
                    setCartItems(data);
                }
            } catch (error: any) {
                console.error("장바구니 조회 실패:", error);

                // 401 에러면 로그인 페이지로 리다이렉트
                if (error.response?.status === 401) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/loginProc");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handleDelete = async (cartItemIdx: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.post(
                "/api/cart/delete",
                { cartItemIdx },
                { withCredentials: true }
            );
            setCartItems((items) => items.filter((i) => i.id !== cartItemIdx));
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제에 실패했습니다.");
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
        <div className="w-full max-w-[1200px] mx-auto py-20 px-6 font-sans">
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
                    onClick={() => {
                        setCartItems((items) => items.filter((item) => !item.checked));
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
                    <div key={item.id}>
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
                                                i.id === item.id ? { ...i, checked } : i
                                            )
                                        );
                                    }}
                                />
                            </div>

                            {/* 상품 정보 */}
                            <div className="flex items-center gap-6 text-left">
                                <div className="w-[100px] h-[130px] bg-gray-100 overflow-hidden rounded-sm">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-[16px] mb-2">{item.name}</p>
                                    <p className="text-gray-400 text-[14px] justify-center flex">
                                        [옵션 : {item.option}]
                                    </p>
                                </div>
                            </div>

                            {/* 판매가 */}
                            <div className="text-[16px]">
                                {item.originalPrice && (
                                    <p className="text-gray-400 line-through text-[14px] mb-1">
                                        {item.originalPrice.toLocaleString()}원
                                    </p>
                                )}
                                <p className="font-bold">{item.price.toLocaleString()}원</p>
                            </div>

                            {/* 수량 조절 */}
                            <div className="flex justify-center">
                                <select
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const quantity = Number(e.target.value);
                                        setCartItems((items) =>
                                            items.map((i) =>
                                                i.id === item.id ? { ...i, quantity } : i
                                            )
                                        );
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
                                {(item.price * item.quantity).toLocaleString()}원
                            </div>

                            {/* 삭제 버튼 */}
                            <div>
                                <button
                                    onClick={() => handleDelete(item.id)}
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
                        {/* 총 상품 금액 */}
                        <div className="text-[20px] font-semibold">
                            {totalProductAmount.toLocaleString()}원
                        </div>

                        {/* - 기호 */}
                        <div className="text-[24px] text-gray-400 font-light">-</div>

                        {/* 할인 금액 */}
                        <div className="text-[20px] font-semibold">0원</div>

                        {/* + 기호 */}
                        <div className="text-[24px] text-gray-400 font-light">+</div>

                        {/* 배송비 */}
                        <div className="text-[20px] font-semibold">
                            {deliveryFee.toLocaleString()}원
                        </div>

                        {/* = 기호 */}
                        <div className="text-[24px] text-gray-400 font-light">=</div>

                        {/* 최종 결제 금액 */}
                        <div className="text-[20px] font-semibold text-[#000]">
                            {finalAmount.toLocaleString()}원
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
