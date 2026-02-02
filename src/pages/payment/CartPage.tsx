import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCartItems, deleteCartItem, updateCartItemQuantity } from "@/api/order/cartApi";
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
                const itemsWithChecked = data.map(item => {
                    const colorObj = (item.color && typeof item.color === 'object') ? item.color : null;
                    const sizeObj = (item.size && typeof item.size === 'object') ? item.size : null;
                    const mappedItem = {
                        ...item,
                        checked: true,
                        mainImageUrl: item.mainImageUrl || (item as any).imageUrl,
                        colorName: colorObj ? colorObj.codeName : (typeof item.color === 'string' ? item.color : ""),
                        sizeName: sizeObj ? sizeObj.codeName : (typeof item.size === 'string' ? item.size : ""),
                        colorCommonIdx: colorObj ? colorObj.commonIdx : item.colorCommonIdx,
                        sizeCommonIdx: sizeObj ? sizeObj.commonIdx : item.sizeCommonIdx
                    };
                    return mappedItem;
                });
                setCartItems(itemsWithChecked);
            } catch (error: any) {
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, [navigate]);

    const handleDelete = async (cartItemIdx: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteCartItem(cartItemIdx);
            setCartItems((items) => items.filter((i) => i.cartItemIdx !== cartItemIdx));
        } catch (error: any) {
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
            <div className="max-w-[700px] mx-auto flex items-center relative mb-16">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                    <ArrowLeft size={28} />
                </button>
                <h2 className="flex-1 text-center text-[32px] font-bold tracking-tight">
                    장바구니
                </h2>
            </div>

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
                            const results = await Promise.allSettled(
                                checkedItems.map(item => deleteCartItem(item.cartItemIdx))
                            );

                            const failed = results.filter(r => r.status === 'rejected');
                            if (failed.length > 0) {
                                alert(`${failed.length}건의 상품 삭제에 실패했습니다.`);
                            }

                            setCartItems(prev => prev.filter(item => !item.checked ||
                                results[checkedItems.indexOf(item)].status === 'rejected'));

                            alert("처리가 완료되었습니다.");
                        } catch (error) {
                        }
                    }}
                    className="text-[15px] text-gray-600 hover:text-black cursor-pointer"
                >
                    선택 삭제
                </button>
            </div>

            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1.2fr_0.8fr] py-4 text-center text-[15px] border-b border-[#000000] ">
                <div></div>
                <div>상품 정보</div>
                <div>판매가</div>
                <div>수량</div>
                <div>합계</div>
                <div></div>
            </div>

            <div className="mb-16">
                {cartItems.map((item, index) => (
                    <div key={item.cartItemIdx}>
                        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1.2fr_0.8fr] py-8 items-center text-center">
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

                            <div className="flex items-center gap-6 text-left">
                                <div className="w-[100px] h-[130px] bg-gray-100 overflow-hidden rounded-sm">
                                    <img
                                        src={item.mainImageUrl?.startsWith("http")
                                            ? item.mainImageUrl
                                            : `${SERVER_URL}${item.mainImageUrl}`}
                                        alt={item.productName}
                                        className="w-full h-full object-cover"

                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-[16px] mb-2">{item.productName}</p>
                                    <p className="text-gray-400 text-[14px]">
                                        [옵션 : {item.colorName || "옵션없음"} / {item.sizeName || "옵션없음"}]
                                    </p>
                                </div>
                            </div>

                            <div className="text-[16px]">
                                <p className="font-bold">{formatPrice(item.price)}</p>
                            </div>
                            <div className="flex justify-center">
                                <select
                                    value={item.quantity}
                                    onChange={async (e) => {
                                        const quantity = Number(e.target.value);
                                        try {
                                            const res = await updateCartItemQuantity(item.cartItemIdx, quantity);
                                            setCartItems((items) =>
                                                items.map((i) =>
                                                    i.cartItemIdx === item.cartItemIdx ? { ...i, quantity } : i
                                                )
                                            );
                                        } catch (error: any) {
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

                            <div className="text-[18px] font-bold">
                                {formatPrice(item.price * item.quantity)}
                            </div>
                            <div>
                                <button
                                    onClick={() => handleDelete(item.cartItemIdx)}
                                    className="border border-gray-300 px-4 py-1 text-[13px] rounded hover:bg-gray-50 cursor-pointer"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>

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

            <div className="border border-black rounded-xl overflow-hidden mb-12 shadow-sm">
                <div className="py-10 px-4">
                    <div className="grid grid-cols-[1.5fr_0.2fr_1fr_0.2fr_1fr_0.2fr_1.5fr] text-center text-[18px] font-bold mb-8">
                        <div>총 상품 금액</div>
                        <div></div>
                        <div>할인 금액</div>
                        <div></div>
                        <div>배송비</div>
                        <div></div>
                        <div>결제 금액</div>
                    </div>
                    <div className="my-6 border-t border-dotted border-gray-400"></div>
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
