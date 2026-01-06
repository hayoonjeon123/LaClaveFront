
function StatusCard({ title, value }: { title: string, value: number }) {
    return (
        <div className="bg-white rounded-[5px] border border-[#5C4033] p-4 h-[120px] flex flex-col justify-between">
            <span className="font-medium font-bold">{title}</span>
            <span className="text-3xl text-s text-gray-900">{value}</span>
        </div>
    );
}

function DualStatusCard({ leftTitle, leftValue, rightTitle, rightValue }: { leftTitle: string, leftValue: number, rightTitle: string, rightValue: number }) {
    return (
        <div className="bg-white rounded-[5px] border border-[#5C4033] p-4 h-[120px] relative flex">
            <div className="flex-1 flex flex-col justify-between">
                <span className="font-medium font-bold">{leftTitle}</span>
                <span className="text-3xl  text-s text-gray-900">{leftValue}</span>
            </div>
            <div className="w-[1px] bg-gray-200 h-[60%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex-1 flex flex-col justify-between pl-6">
                <span className="font-medium font-bold">{rightTitle}</span>
                <span className="text-3xl text-s text-gray-900">{rightValue}</span>
            </div>
        </div>
    )
}

export function AdminHome() {
    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-12 font-['Inter',sans-serif]">
            {/* 오늘의 할 일 Section */}
            <div className="space-y-4">
                <div className="flex items-end gap-2">
                    <h2 className="font-bold text-gray-900 text-[30px]">오늘의 할 일</h2>
                    <span className="text-sm text-gray-500 mb-1">2025년 12월 18일 ~ 현재날짜</span>
                </div>

                <div className="bg-[#E5E5E5] p-8 rounded-lg">
                    <div className="grid grid-cols-5 gap-4 ">
                        <StatusCard title="입금 전" value={0} />
                        <StatusCard title="배송 준비중" value={0} />
                        <StatusCard title="배송 보류중" value={0} />
                        <StatusCard title="배송 대기" value={0} />
                        <StatusCard title="배송중" value={0} />
                    </div>
                </div>

                <div className="bg-[#E5E5E5] p-8 rounded-lg">
                    <div className="grid grid-cols-3 gap-4">
                        <DualStatusCard leftTitle="배송 신청" leftValue={0} rightTitle="배송 처리중" rightValue={0} />
                        <DualStatusCard leftTitle="취소신청" leftValue={0} rightTitle="처리중" rightValue={0} />
                        <DualStatusCard leftTitle="교환신청" leftValue={0} rightTitle="처리중" rightValue={0} />
                    </div>
                </div>

                <div className="bg-[#E5E5E5] p-8 rounded-lg">
                    <div className="grid grid-cols-3 gap-4">
                        <DualStatusCard leftTitle="반품신청" leftValue={0} rightTitle="처리중" rightValue={0} />
                        <StatusCard title="답변 대기중" value={0} />
                        <div></div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-end gap-2">
                    <h2 className="font-bold text-gray-900 text-[30px]">매출 통계</h2>
                    <span className="text-sm text-gray-500 mb-1">2025년 12월 18일 ~ 현재날짜</span>
                </div>

                <div className="bg-[#E5E5E5] p-8 rounded-lg">
                    <div className="bg-white rounded-[5px] border border-[#5C4033] p-8 h-[400px] flex items-end justify-between px-16 pb-12 relative">
                        {/* Simple Mock Line Chart using SVG */}
                        <svg className="w-full h-full absolute top-0 left-0 p-8" viewBox="0 0 1000 300" preserveAspectRatio="none">
                            {/* Grid Lines */}
                            <line x1="0" y1="0" x2="1000" y2="0" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="75" x2="1000" y2="75" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="150" x2="1000" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="225" x2="1000" y2="225" stroke="#f0f0f0" strokeWidth="1" />
                            <line x1="0" y1="300" x2="1000" y2="300" stroke="#f0f0f0" strokeWidth="1" />

                            {/* Chart Line */}
                            <polyline
                                fill="none"
                                stroke="#C8B6A6"
                                strokeWidth="2"
                                points="
                                    50,200
                                    150,150
                                    250,250
                                    350,270
                                    450,270
                                    550,200
                                    650,240
                                    750,180
                                    850,220
                                    950,100
                                "
                            />
                            {/* 통계 */}
                            <circle cx="50" cy="200" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="150" cy="150" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="250" cy="250" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="350" cy="270" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="450" cy="270" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="550" cy="200" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="650" cy="240" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="750" cy="180" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="850" cy="220" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                            <circle cx="950" cy="100" r="4" fill="white" stroke="#C8B6A6" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
