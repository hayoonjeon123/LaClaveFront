import React from "react";
import { Search } from "lucide-react";

const ProductList = () => {
  const statusCards = [
    { title: "전체 등록 상품", count: 0 },
    { title: "판매중인 상품", count: 0 },
    { title: "품절상품", count: 0 },
    { title: "삭제 상품", count: 0 },
  ];

  const tableData = Array(10).fill({
    no: 1,
    type: "기본상품",
    code: "P00000BD",
    name: "아노락",
    price: "25,000",
    discountPrice: "25,000",
  });

  return (
    <div className="p-[30px] bg-[#F5F5F5] min-h-screen">
      <div className="max-w-[1480px] mx-auto">
        {/* 1. 상품 현황 섹션 */}
        <h2 className="text-[18px] font-bold mb-[15px]">상품 현황</h2>
        <div className="grid grid-cols-4 gap-[15px] mb-[30px]">
          {statusCards.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-[#CCCCCC] p-[20px] h-[100px] flex flex-col justify-between shadow-sm rounded-sm"
            >
              <span className="text-[13px] text-[#333] font-medium">
                {card.title}
              </span>
              <span className="text-[14px] text-[#333]">{card.count}</span>
            </div>
          ))}
        </div>

        {/* 2. 검색 필터 섹션 */}
        <div className="bg-white border border-[#CCCCCC] mb-[30px] rounded-sm shadow-sm overflow-hidden">
          {/* 상품 등록일 */}
          <div className="flex border-b border-[#EEEEEE]">
            <div className="w-[150px] bg-[#F9F9F9] p-4 text-[13px] font-bold border-r border-[#EEEEEE] flex items-center">
              상품 등록일
            </div>
            <div className="flex-1 p-3 flex gap-2">
              {["1개월", "3개월", "6개월", "1년"].map((period) => (
                <button
                  key={period}
                  className="px-5 py-1.5 border border-[#CCCCCC] bg-white text-[12px] hover:bg-gray-50 transition"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          {/* 검색어 */}
          <div className="flex">
            <div className="w-[150px] bg-[#F9F9F9] p-4 text-[13px] font-bold border-r border-[#EEEEEE] flex items-center">
              검색어
            </div>
            <div className="flex-1 p-3 flex gap-2 items-center">
              <select className="h-9 border border-[#D1D1D1] px-3 text-[12px] min-w-[120px] focus:outline-none">
                <option>상품명</option>
              </select>
              <div className="relative flex-1 max-w-[400px]">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full h-9 border border-[#D1D1D1] px-3 pr-10 text-[12px] focus:outline-none"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. 상품 목록 테이블 섹션 */}
        <div className="bg-white overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#5C4033] text-white">
                <th className="border-r border-white/20 font-normal py-3 px-4 text-[13px]">
                  NO
                </th>
                <th className="border-r border-white/20 font-normal py-3 px-4 text-[13px]">
                  상품 구분
                </th>
                <th className="border-r border-white/20 font-normal py-3 px-4 text-[13px]">
                  상품 코드
                </th>
                <th className="border-r border-white/20 font-normal py-3 px-4 text-[13px]">
                  상품명
                </th>
                <th className="border-r border-white/20 font-normal py-3 px-4 text-[13px]">
                  판매가
                </th>
                <th className="border-r border-white/20 font-normal py-3 px-4 text-[13px]">
                  할인가
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[#EEEEEE] text-center hover:bg-gray-50"
                >
                  <td className="py-3 text-[13px] ">{i + 1}</td>
                  <td className="py-3 text-[13px] ">{row.type}</td>
                  <td className="py-3 text-[13px] underline cursor-pointer">
                    {row.code}
                  </td>
                  <td className="py-3 text-[13px] ">{row.name}</td>
                  <td className="py-3 text-[13px] ">{row.price}</td>
                  <td className="py-3 text-[13px] ">{row.discountPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. 페이지네이션 */}
        <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500 pt-8 pb-8">
          <button className="w-8 h-8 flex items-center justify-center text-black font-bold cursor-pointer">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:text-black cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:text-black cursor-pointer">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:text-black cursor-pointer">
            4
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:text-black cursor-pointer">
            5
          </button>
          <button className="flex items-center hover:text-black tracking-widest text-xs cursor-pointer">
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductList };
