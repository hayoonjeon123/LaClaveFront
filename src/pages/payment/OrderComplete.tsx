import Logo from "@/assets/Logo_brown.png";

const OrderComplete = () => {
  const orderInfo = {
    orderNumber: "20251603947",
    date: "2025.06.13 오후 15:33",
    productName: "배색 리버시블 컴포트핏 다운패딩(블랙)",
    amount: "280,000원",
    image: "/path/to/product-image.jpg",
  };

  return (
    <div className="w-full max-w-[800px] mx-auto py-12 px-6 font-sans text-[#000]">
      <div className="flex justify-center mb-2">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="LOGO" className="h-16" />
        </div>
      </div>

      {/* 2. 완료 메시지 */}
      <h2 className="text-center text-[28px] font-bold mb-6 tracking-tight">
        주문이 성공적으로 완료되었습니다!
      </h2>

      {/* 3. 주문 정보 박스 */}
      <section className="border border-gray-300 rounded-xl p-8 mb-6 flex gap-8 items-center">
        {/* 상품 이미지 */}
        <div className="w-[120px] h-[150px] bg-gray-100 rounded overflow-hidden">
          <img
            src={orderInfo.image}
            alt="주문 상품"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 세부 주문 정보 */}
        <div className="flex-1 space-y-2 text-[18px]">
          <p className="flex gap-3">
            <span className="font-medium">주문번호</span>
            <span>{orderInfo.orderNumber}</span>
          </p>
          <p className="flex gap-3">
            <span className="font-medium">결제 날짜 :</span>
            <span>{orderInfo.date}</span>
          </p>
          <p className="font-medium mt-4">{orderInfo.productName}</p>
          <p className="flex gap-3">
            <span className="font-medium">결제 금액 :</span>
            <span>{orderInfo.amount}</span>
          </p>
        </div>
      </section>

      {/* 4. 하단 버튼 영역 */}
      <div className="flex gap-4">
        <button
          className="flex-1 h-14 border border-[#A8A9AD] rounded-[10px] text-[18px] font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          홈으로
        </button>
        <button
          className="flex-1 h-14 bg-[#634b41] border-2 border-[#A8A9AD] text-white text-[18px] rounded-[10px] font-bold hover:bg-[#4d3a32] transition-colors cursor-pointer shadow-md"
          onClick={() => (window.location.href = "/myPage/orders")}
        >
          주문내역
        </button>
      </div>
    </div>
  );
};

export { OrderComplete };
