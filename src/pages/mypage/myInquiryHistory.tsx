export default function MyInquiryHistory() {
  return (
    <div className=" my-10">
      <h2 className="text-center text-3xl font-bold text-[#5C4033] my-5">
        문의 내역
      </h2>
      <div className="max-w-5xl mx-auto px-6 my-5">
        <div className="border-[#5C4033] border-[3px] rounded-[10px] p-6 gap-6 cursor-pointer">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-[red] text-3xl mb-3">답변대기</h2>

            <div className="flex gap-2">
              <button className="bg-[#ffffff] text-[#000000] px-4 py-2 rounded-[10px] hover:bg-[#5C4033] hover:text-white">
                수정
              </button>
              <button className="bg-[#5C4033] text-white px-4 py-2 rounded-[10px] hover:bg-[#5C4033] hover:text-white">
                삭제
              </button>
            </div>
          </div>
          <div className="color-[#000000] font-semibold text-2xl mb-6 ">
            문의 유형
          </div>
          <div className="color-[#000000] font-semibold text-2xl mb-6">
            내용
          </div>
          <div className="text-[#A8A9AD] mb-3">2025.04.10</div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-[#5C4033] border-[3px] rounded-[10px] p-2 gap-6 cursor-pointer  hover:bg-[#5C4033] hover:text-white">
          <div className="text-center font-semibold text-2xl ">1:1문의하기</div>
        </div>
      </div>
    </div>
  );
}
