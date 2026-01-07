import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

const MemberRefund = () => {
  // 현재 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState("전체");

  // 탭 메뉴 리스트
  const tabs = [
    { label: "전체", value: "ALL" },
    { label: "환불 전", value: "APPLY" },
    { label: "환불완료", value: "PROCESSING" },
    { label: "환불거부", value: "COMPLETED" },
    { label: "환불철회", value: "REJECTED" },
  ];

  // 샘플 데이터
  const tableData = Array(10).fill({
    orderDate: "2025.06.18",
    refundRequestDate: "2025.06.20",
    orderNum: "20250620-123456",
    user: "홍길동",
    product: "빈티지 체크 셔츠 외 1건",
    totalRefund: "65,000원",
    actualRefund: "60,000원",
    pointRefund: "5,000원",
    payMethod: "카드",
    refundMethod: "카드",
    status: "환불완료",
  });

  return (
    <div className="flex-1 bg-[#F5F5F5] p-[20px] min-h-screen">
      {/* 페이지 타이틀 */}
      <h2 className="text-[24px] font-bold mb-[20px]">환불 관리</h2>

      {/* 검색 필터 영역 */}
      <div className="bg-white border border-[#D1D1D1] p-[20px] mb-[30px]">
        {/* 기간 선택 */}
        <div className="flex items-center mb-[15px]">
          <span className="w-[80px] text-[14px] font-medium">기간</span>
          <div className="flex gap-[8px]">
            {["1개월", "3개월", "6개월", "1년"].map((term) => (
              <button
                key={term}
                className="px-[15px] py-[4px] border border-[#D1D1D1] text-[13px] bg-white hover:bg-gray-50 transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        {/* 검색어 입력 */}
        <div className="flex items-center">
          <span className="w-[80px] text-[14px] font-medium">검색어</span>
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="주문번호를 입력하세요"
              className="w-full h-[32px] border border-[#D1D1D1] px-[10px] text-[13px] focus:outline-none"
            />
            <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex gap-[30px] mb-[15px] border-b border-[#D1D1D1]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.label)}
            className={`pb-[8px] text-[16px] transition-all relative ${
              activeTab === tab.label
                ? "font-bold text-black border-b-2 border-black" // 활성화 상태
                : "text-gray-500 border-b-2 border-transparent hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 테이블 영역 */}
      <div className="bg-white overflow-x-auto shadow-sm">
        <table className="w-full text-center border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#5C4033] text-white h-[45px]">
              <th className="border-r border-white/20 font-normal px-2">NO</th>
              <th className="border-r border-white/20 font-normal px-2">
                주문일
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                환불 신청일
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                주문번호
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                주문자
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                상품명
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                총 환불액
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                실 환불액
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                사용한 적립금/예치금 환불
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                결제 수단
              </th>
              <th className="border-r border-white/20 font-normal px-2">
                환불 수단
              </th>
              <th className="font-normal px-2">처리 상태</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr
                key={i}
                className="h-[48px] border-b border-[#EEEEEE] hover:bg-gray-50 transition-colors"
              >
                {/* 1. NO */}
                <td>{i + 1}</td>
                {/* 2. 주문일 */}
                <td>{row.orderDate}</td>
                {/* 3. 환불 신청일 */}
                <td>{row.refundRequestDate}</td>
                {/* 4. 주문번호 */}
                <td>{row.orderNum}</td>
                {/* 5. 주문자 */}
                <td>{row.user}</td>
                {/* 6. 상품명 */}
                <td>{row.product}</td>
                {/* 7. 총 환불액 */}
                <td>{row.totalRefund}</td>
                {/* 8. 실 환불액 */}
                <td>{row.actualRefund}</td>
                {/* 9. 적립금/예치금 환불 */}
                <td>{row.pointRefund}</td>
                {/* 10. 결제 수단 */}
                <td>{row.payMethod}</td>
                {/* 11. 환불 수단 */}
                <td>{row.refundMethod}</td>
                {/* 12. 처리 상태 */}
                <td>
                  <button className="bg-[#5C4033] text-white px-[12px] py-[2px] rounded-[5px] text-[13px] hover:bg-[#463127] transition">
                    {row.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
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
  );
};

export { MemberRefund };
