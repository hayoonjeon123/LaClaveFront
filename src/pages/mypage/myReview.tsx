import { useState } from "react";
import sampleImg from "../../assets/sample-product.jpg";

export default function MyReview() {
  const [activeTab, setActiveTab] = useState<"writable" | "written">(
    "writable"
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#5C4033] text-center my-10">
        리뷰 관리
      </h1>

      {/* 리뷰 상단 탭*/}
      <div className="grid grid-cols-2 border-b mb-8">
        <button
          onClick={() => setActiveTab("writable")}
          className={`w-full pb-3 font-semibold text-5xl transition cursor-pointer text-center
            ${
              activeTab === "writable"
                ? "text-[#5C4033] border-b-2 border-[#5C4033]"
                : "text-[#A8A9AD] hover:text-[#5C4033]"
            }`}
        >
          작성 가능 리뷰
        </button>

        <button
          onClick={() => setActiveTab("written")}
          className={`w-full pb-3 font-semibold text-5xl transition cursor-pointer text-center
            ${
              activeTab === "written"
                ? "text-[#5C4033] border-b-2 border-[#5C4033]"
                : "text-[#A8A9AD] hover:text-[#5C4033]"
            }`}
        >
          작성 완료 리뷰
        </button>
      </div>

      {/* 리뷰 내용 */}
      {activeTab === "writable" && (
        <div className="text-center font-semibold text-[#000000]">
          작성 가능한 리뷰가 없습니다.
        </div>
      )}

      {activeTab === "written" && (
        <div className="space-y-6">
          {/* 리뷰 카드 */}
          <div className="border-[#5C4033] border-[3px] rounded-[10px] p-6 flex gap-6 cursor-pointer">
            {/* 상품 이미지 */}
            <img
              src={sampleImg}
              alt="상품 이미지"
              className="w-[120px] h-[150px] object-cover rounded"
            />

            {/* 리뷰 정보 */}
            <div className="flex-1">
              {/* 상품명 */}
              <p className="font-semibold text-lg">
                배색 리버시블 컴포트핏 다운패딩(블랙)
              </p>

              {/* 옵션 정보 */}
              <p className="text-sm text-gray-500 mt-1">
                색상 : 블랙 <br />
                사이즈 : S <br />
                수량 : 1개
              </p>

              {/* 별점 */}
              <div className="flex items-center gap-2 mt-3">
                <div className="text-yellow-400 text-lg">★★★★☆</div>
                <span className="font-semibold">4</span>
              </div>

              {/* 리뷰 내용 */}
              <p className="mt-2 text-gray-800">
                완전 보들보들 따뜻하고 진짜 가벼워요!
              </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex flex-col gap-2 items-end">
              <span className="text-sm text-gray-400">작성일 : 2025.04.10</span>

              <button className="border px-4 py-1 rounded hover:bg-gray-100 cursor-pointer">
                수정
              </button>

              <button className="bg-[#5C4033] text-white px-4 py-1 rounded hover:opacity-90 cursor-pointer">
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
