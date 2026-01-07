import React, { useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ProductRegister = () => {
  // --- 상태 관리 ---
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [selectedSubCat, setSelectedSubCat] = useState("");

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

  const categoryData = {
    아우터: ["패딩", "자켓", "코트", "가디건"],
    상의: ["티셔츠", "셔츠", "니트", "맨투맨"],
    하의: ["데님", "슬랙스", "스커트", "트레이닝"],
    악세사리: ["모자", "가방", "양말"],
    신발: ["운동화", "구두", "샌들"],
  };

  const handleImageClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

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
    <div className="w-full max-w-[1400px] mx-auto space-y-6 pb-12 px-4">
      <h2 className="text-[24px] font-bold text-gray-800 mb-2">상품 등록</h2>

      <div className="bg-white border border-[#D1D1D1] rounded-sm overflow-hidden">
        {/* 상품명 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            상품명
          </div>
          <div className="flex-1 p-[8px]">
            <input
              type="text"
              className="w-full h-[32px] border border-[#D1D1D1] px-[10px] text-[12px] focus:outline-none"
              placeholder="상품명"
            />
          </div>
        </div>

        {/* 상품 요약 설명 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            상품 요약 설명
          </div>
          <div className="flex-1 p-[8px]">
            <input
              type="text"
              placeholder="요약 설명"
              className="w-full h-[32px] border border-[#D1D1D1] px-[10px] text-[12px] focus:outline-none"
            />
          </div>
        </div>

        {/* 상품 상세 설명 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            상품 상세 설명
          </div>
          <div className="flex-1 p-[8px]">
            <input
              type="text"
              placeholder="상세 설명"
              className="w-full h-[32px] border border-[#D1D1D1] px-[10px] text-[12px] focus:outline-none"
            />
          </div>
        </div>

        {/* 판매가 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            판매가
          </div>
          <div className="flex-1 p-[8px]">
            <input
              type="text"
              className="w-[200px] h-[32px] border border-[#D1D1D1] px-[10px] text-[12px] focus:outline-none"
            />
          </div>
        </div>

        {/* 판매 상태 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            판매 상태
          </div>
          <div className="flex-1 p-[8px]">
            <Select defaultValue="new">
              <SelectTrigger className="cursor-pointer w-[120px] h-[32px] border border-[#D1D1D1] px-2 text-[12px] focus:ring-0 rounded-none">
                <SelectValue placeholder="판매 상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">신상품</SelectItem>
                <SelectItem value="selling">판매중</SelectItem>
                <SelectItem value="soldout">품절</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 상품 분류 선택 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            상품 분류 선택
          </div>
          <div className="flex-1 p-[8px]">
            <div className="w-[250px] border border-[#D1D1D1] h-[160px] overflow-y-auto bg-white">
              {(
                Object.keys(categoryData) as Array<keyof typeof categoryData>
              ).map((mainCat) => (
                <div key={mainCat}>
                  <div
                    onClick={() =>
                      setExpandedCat(expandedCat === mainCat ? null : mainCat)
                    }
                    className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="text-[15px] font-semibold">{mainCat}</span>
                    <span
                      className={`text-gray-400 text-[9px] transform transition-transform ${expandedCat === mainCat ? "rotate-180" : ""
                        }`}
                    >
                      ▼
                    </span>
                  </div>
                  {expandedCat === mainCat && (
                    <div className="bg-[#FDFDFD]">
                      {categoryData[mainCat].map((subCat: string) => (
                        <div
                          key={subCat}
                          onClick={() => setSelectedSubCat(subCat)}
                          className={`pl-6 pr-3 py-1 text-[14px] cursor-pointer hover:text-[#5C4033] ${selectedSubCat === subCat
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
              <p className="mt-1.5 text-[11px] text-[#5C4033]">
                선택된 카테고리: <strong>{selectedSubCat}</strong>
              </p>
            )}
          </div>
        </div>

        {/* 이미지 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            이미지
          </div>
          <div className="flex-1 p-[12px]">
            <div className="flex gap-[12px] mb-[12px] text-[15px]">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="imgType"
                  className="accent-[#5C4033]"
                  defaultChecked
                />{" "}
                대표이미지
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="imgType"
                  className="accent-[#5C4033]"
                />{" "}
                상세이미지
              </label>
            </div>
            <div className="flex gap-[8px]">
              {images.map((imgSrc, i) => (
                <div key={i} className="relative">
                  <div
                    onClick={() => handleImageClick(i)}
                    className="w-[110px] h-[140px] border border-[#D1D1D1] flex flex-col items-center justify-center bg-white cursor-pointer hover:border-[#5C4033] overflow-hidden transition"
                  >
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] text-gray-500">
                        이미지 선택
                      </span>
                    )}
                  </div>
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
            <p className="mt-1.5 text-[10px] text-gray-400">
              * 첫 번째 칸은 대표 이미지 권장 사이즈(500x500)입니다.
            </p>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex border-b border-[#D1D1D1]">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            카테고리
          </div>
          <div className="flex-1 p-[8px]">
            <Select defaultValue="main">
              <SelectTrigger className="cursor-pointer w-[120px] h-[32px] border border-[#D1D1D1] px-2 text-[15px] focus:ring-0 rounded-none">
                <SelectValue placeholder="진열 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">메인진열</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 상품코드 */}
        <div className="flex">
          <div className="w-[160px] bg-[#F9F9F9] p-[12px] text-[17px] font-bold text-gray-700 border-r border-[#D1D1D1] flex items-center">
            상품코드
          </div>
          <div className="flex-1 p-[12px] text-[15px] text-gray-400 italic">
            자동생성 (등록 시 부여됨)
          </div>
        </div>
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-center mt-[20px]">
        <button className="bg-[#5C4033] text-white w-[150px] h-[40px] cursor-pointer border-[#A8A9AD] border-[2px] rounded-[5px] font-semibold text-[15px] hover:bg-[#463127] transition shadow-sm">
          상품등록
        </button>
      </div>
    </div>
  );
};

export { ProductRegister };
