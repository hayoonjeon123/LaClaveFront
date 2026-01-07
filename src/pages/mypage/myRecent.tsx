import sampleImg from "../../assets/sample-product.jpg";
export default function MyRecent() {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-[#5C4033] text-center my-10">
        최근 본 상품
      </h1>
      {/* 최근 본 날짜 */}
      <div className="max-w-5xl mx-auto font-semibold">2026-01-05</div>
      <hr className="max-w-5xl mx-auto border-black border-t-[1px]" />
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto p-4 flex gap-10">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />
        <div className="flex-1 text-sm">
          {/* 상품 정보 */}
          <p className="font-medium font-semibold mb-1 color-[#000000]">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="color-[#000000]">색상: 블랙</p>

          <p className="color-[#000000]">가격: 84,000원</p>
        </div>
      </div>
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto p-4 flex gap-10">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />
        <div className="flex-1 text-sm">
          {/* 상품 정보 */}
          <p className="font-medium font-semibold mb-1 color-[#000000]">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="color-[#000000]">색상: 블랙</p>

          <p className="color-[#000000]">가격: 84,000원</p>
        </div>
      </div>
      {/* 최근 본 날짜 */}
      <div className="max-w-5xl mx-auto font-semibold">2026-01-05</div>
      <hr className="max-w-5xl mx-auto border-black border-t-[1px]" />
      {/* 상품 영역 */}
      <div className="max-w-5xl mx-auto p-4 flex gap-10">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />
        <div className="flex-1 text-sm">
          {/* 상품 정보 */}
          <p className="font-medium font-semibold mb-1 color-[#000000]">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="color-[#000000]">색상: 블랙</p>

          <p className="color-[#000000]">가격: 84,000원</p>
        </div>
      </div>
    </div>
  );
}
