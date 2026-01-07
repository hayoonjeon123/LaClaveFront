import React, { useState, useRef } from "react";

const ProductEdit = () => {
  // --- 상태 관리 ---
  // 1. 카테고리 관련 상태
  const [expandedCat, setExpandedCat] = useState<string | null>(null); // 어떤 대분류가 열려있는지
  const [selectedSubCat, setSelectedSubCat] = useState(""); // 선택된 소분류

  // 2. 이미지 관련 상태 (4개 슬롯)
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // --- 데이터 ---
  const categoryData = {
    아우터: ["패딩", "자켓", "코트", "가디건"],
    상의: ["티셔츠", "셔츠", "니트", "맨투맨"],
    하의: ["데님", "슬랙스", "스커트", "트레이닝"],
    악세사리: ["모자", "가방", "양말"],
    신발: ["운동화", "구두", "샌들"],
  };

  // --- 핸들러 ---
  // 이미지 클릭 시 input 클릭 이벤트 발생
  const handleImageClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  // 파일 선택 시 미리보기 생성
  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 bg-[#F5F5F5] p-[20px] min-h-screen">
      <h2 className="text-[24px] font-bold mb-[20px]">상품 등록</h2>

      <div className="bg-white border border-[#D1D1D1]">
        {/* 상품명 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            상품명
          </div>
          <div className="flex-1 p-[10px]">
            <input
              type="text"
              className="w-full h-[35px] border border-[#D1D1D1] px-[10px] text-[13px] focus:outline-none"
              placeholder="상품명"
            />
          </div>
        </div>

        {/* 상품 요약 설명 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            상품 요약 설명
          </div>
          <div className="flex-1 p-[10px]">
            <input
              type="text"
              placeholder="요약 설명"
              className="w-full h-9 border border-[#D1D1D1] px-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* 상품 상세 설명 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            상품 상세 설명
          </div>
          <div className="flex-1 p-[10px]">
            <input
              type="text"
              placeholder="상세 설명"
              className="w-full h-9 border border-[#D1D1D1] px-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* 소비자 가 & 판매가  */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            판매가
          </div>
          <div className="flex-1 p-[10px]">
            <input
              type="text"
              className="w-[300px] h-[35px] border border-[#D1D1D1] px-[10px] text-[13px] focus:outline-none"
            />
          </div>
        </div>

        {/* 판매 상태 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            판매 상태
          </div>
          <div className="flex-1 p-[10px]">
            <select className="w-[140px] h-9 border border-[#D1D1D1] px-2 text-[13px] focus:outline-none">
              <option>신상품</option>
              <option>판매중</option>
              <option>품절</option>
            </select>
          </div>
        </div>

        {/* 상품 분류 선택 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            상품 분류 선택
          </div>
          <div className="flex-1 p-[10px]">
            <div className="w-[300px] border border-[#D1D1D1] h-[200px] overflow-y-auto bg-white">
              {(
                Object.keys(categoryData) as Array<keyof typeof categoryData>
              ).map((mainCat) => (
                <div key={mainCat}>
                  {/* 대분류 버튼 */}
                  <div
                    onClick={() =>
                      setExpandedCat(expandedCat === mainCat ? null : mainCat)
                    }
                    className="flex items-center justify-between px-3 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="text-[13px] font-semibold">{mainCat}</span>
                    <span
                      className={`text-gray-400 text-[10px] transform transition-transform ${
                        expandedCat === mainCat ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                  {/* 소분류 메뉴 */}
                  {expandedCat === mainCat && (
                    <div className="bg-[#FDFDFD]">
                      {categoryData[mainCat].map((subCat: string) => (
                        <div
                          key={subCat}
                          onClick={() => setSelectedSubCat(subCat)}
                          className={`pl-6 pr-3 py-1.5 text-[12px] cursor-pointer hover:text-[#5C4033] ${
                            selectedSubCat === subCat
                              ? "text-[#5C4033] font-bold bg-gray-50"
                              : "text-gray-600"
                          }`}
                        >
                          • {subCat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedSubCat && (
              <p className="mt-2 text-[12px] text-[#5C4033]">
                선택된 카테고리: <strong>{selectedSubCat}</strong>
              </p>
            )}
          </div>
        </div>

        {/* 이미지 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            이미지
          </div>
          <div className="flex-1 p-[15px]">
            <div className="flex gap-[15px] mb-[15px] text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="imgType"
                  className="accent-[#5C4033]"
                  defaultChecked
                />{" "}
                대표이미지
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="imgType"
                  className="accent-[#5C4033]"
                />{" "}
                상세이미지
              </label>
            </div>
            <div className="flex gap-[10px]">
              {images.map((imgSrc, i) => (
                <div key={i} className="relative">
                  <div
                    onClick={() => handleImageClick(i)}
                    className="w-[140px] h-[180px] border border-[#D1D1D1] flex flex-col items-center justify-center bg-white cursor-pointer hover:border-[#5C4033] overflow-hidden transition"
                  >
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[12px] text-gray-500">
                        이미지 선택
                      </span>
                    )}
                  </div>
                  {/* 숨겨진 파일 인풋 */}
                  <input
                    type="file"
                    ref={fileInputRefs[i]}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(i, e)}
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              * 첫 번째 칸은 대표 이미지 권장 사이즈(500x500)입니다.
            </p>
          </div>
        </div>

        {/* 카테고리 (dropdown) */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            카테고리
          </div>
          <div className="flex-1 p-[10px]">
            <select className="w-[140px] h-9 border border-[#D1D1D1] px-2 text-[13px] focus:outline-none">
              <option>메인진열</option>
            </select>
          </div>
        </div>

        {/* 상품코드 */}
        <div className="flex">
          <div className="w-[200px] bg-[#F9F9F9] p-[15px] text-[14px] font-medium border-r border-[#D1D1D1] flex items-center">
            상품코드
          </div>
          <div className="flex-1 p-[15px] text-[13px] text-gray-400 italic">
            자동생성 (등록 시 부여됨)
          </div>
        </div>
      </div>

      {/* 수정 삭제 버튼 */}
      <div className="flex justify-center mt-[40px] mb-[40px] gap-[30px]">
        <button className="border-[#A8A9AD] border text-[#5C4033] w-[180px] h-[45px] cursor-pointer rounded-[5px] font-semibold text-[16px] transition shadow-md">
          삭제
        </button>
        <button className="bg-[#5C4033] text-white w-[180px] h-[45px] cursor-pointer rounded-[5px] font-semibold text-[16px] hover:bg-[#463127] transition shadow-md">
          수정
        </button>
      </div>
    </div>
  );
};

export { ProductEdit };
