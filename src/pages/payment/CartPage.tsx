import { useState } from "react";

const Cart = () => {
  // 샘플 데이터
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "플러피 부클 (2 color)",
      option: "ivory / M",
      price: 150000,
      quantity: 2,
      image: "/path/to/image1.jpg", // 이미지 경로를 넣어주세요
    },
    {
      id: 2,
      name: "니트 머플러 (5 color)",
      option: "black / Free",
      price: 19900,
      originalPrice: 25000,
      quantity: 1,
      image: "/path/to/image2.jpg",
    },
  ]);

  // 총 상품 금액 계산
  const totalProductAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 0;
  const finalAmount = totalProductAmount + deliveryFee;

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
            defaultChecked
          />
          <span className="text-[15px]">전체 선택</span>
        </label>
        <button className="text-[15px] text-gray-600 hover:text-black">
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
                  defaultChecked
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
                  <p className="text-gray-400 text-[14px]">
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
                  className="border border-gray-300 rounded px-2 py-1 text-[14px] outline-none"
                  defaultValue={item.quantity}
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
                <button className="border border-gray-300 px-4 py-1 text-[13px] rounded hover:bg-gray-50">
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
      </div>

      {/* 결제 요약 박스 */}
      <div className="border-2 border-gray-200 rounded-xl p-10 mb-12">
        <div className="grid grid-cols-4 text-center items-center">
          <div>
            <p className="text-gray-500 mb-4 text-[16px]">총 상품 금액</p>
            <p className="text-[22px] font-bold">
              {totalProductAmount.toLocaleString()}원
            </p>
          </div>
          <div className="text-gray-300 text-[24px] font-light">
            -{" "}
            <span className="ml-10 text-gray-500 text-[16px] absolute mt-[-24px]">
              할인 금액
            </span>
            <p className="text-black font-bold">0원</p>
          </div>
          <div className="text-gray-300 text-[24px] font-light">
            +{" "}
            <span className="ml-10 text-gray-500 text-[16px] absolute mt-[-24px]">
              배송비
            </span>
            <p className="text-black font-bold">
              {deliveryFee.toLocaleString()}원
            </p>
          </div>
          <div className="border-l border-gray-100">
            <p className="text-gray-500 mb-4 text-[16px]">결제 금액</p>
            <p className="text-[26px] font-bold text-black">
              {finalAmount.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>

      {/* 주문 하기 버튼 */}
      <div className="flex justify-center">
        <button className="w-full max-w-[600px] h-16 bg-white border border-gray-300 rounded-lg text-[20px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
          주문 하기
        </button>
      </div>
    </div>
  );
};

export { Cart };
