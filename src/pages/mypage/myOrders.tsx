import { ArrowDownIcon } from "lucide-react";
import sampleImg from "../../assets/sample-product.jpg";
export default function MyOrders() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Gowun_Dodum'] text-black">
      {/* Title */}
      <div className="text-center my-10">
        <h2 className="text-3xl font-bold text-[#5C4033]">주문내역 조회</h2>
      </div>

      <div className="max-w-5xl mx-auto font-semibold">주문번호 20124103</div>

      <div className="max-w-5xl mx-auto text-[#A8A9AD] font-semibold">
        결제날짜 2026-01-05
      </div>
      <hr className="max-w-5xl mx-auto border-black border-t-[1px] my-3" />
      <div className="max-w-5xl mx-auto p-4 flex gap-4 items-start">
        {/* 상품 이미지 */}
        <img
          src={sampleImg}
          alt="상품 이미지"
          className="w-28 h-28 object-cover rounded"
        />

        {/* 상품 정보 */}
        <div className="flex-1 text-sm">
          <p className="font-medium mb-1">
            백색 리버시블 점퍼또 다운패딩(블랙)
          </p>
          <p className="text-gray-600">색상: 블랙</p>
          <p className="text-gray-600">사이즈: S</p>
          <p className="text-gray-600">수량: 1개</p>

          {/* 버튼 영역 */}
          <div className="flex gap-5 mt-4">
            <button className="px-4 py-2 border-2 w-[250px] border-[#A8A9AD] rounded-[5px] text-sm">
              취소
            </button>
            <button className="px-4 py-2 border-2 w-[250px] border-[#A8A9AD] rounded-[5px] text-sm font-medium">
              리뷰쓰기
            </button>
            <button className="px-4 py-2 border-2 w-[250px] border-[#A8A9AD] rounded-[5px] text-sm">
              문의하기
            </button>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="text-right text-sm whitespace-nowrap">
          <p className="text-gray-600 mb-1">결제완료</p>
          <p className="font-semibold">84,000원</p>
        </div>
      </div>
      <hr className="max-w-5xl mx-auto border-black border-t-[1px] my-3" />
      <div className="max-w-5xl h-15 rounded-[10px] p-6 mx-auto border-black border-[1px] my-3  items-center flex  justify-between">
        <div className="font-semibold text-[20px]">배송지 정보</div>
        <ArrowDownIcon size={20} strokeWidth={2} className="cursor-pointer" />
      </div>
      <div className="max-w-5xl h-15 rounded-[10px] p-6 mx-auto border-black border-[1px] my-3  items-center flex  justify-between">
        <div className="font-semibold text-[20px]">결제 정보</div>
        <ArrowDownIcon size={20} strokeWidth={2} className="cursor-pointer" />
      </div>
    </div>
  );
}
