
import { useState } from "react";

interface CodeRow {
    id: number;
    groupId: string;
    codeId: string;
    codeName: string;
    parentCodeId: string;
}

export function CommonCodeAdd() {
    const [rows, setRows] = useState<CodeRow[]>([
        { id: 1, groupId: "", codeId: "", codeName: "", parentCodeId: "" }
    ]);

    const handleAddRow = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        setRows([...rows, {
            id: newId,
            groupId: "",
            codeId: "",
            codeName: "",
            parentCodeId: ""
        }]);
    };

    const handleDeleteRow = (id: number) => {
        setRows(rows.filter(row => row.id !== id));
    };

    return (
        <div className="w-full max-w-[1100px] mx-auto space-y-10">
            <div className="flex justify-between items-center mb-4">
            </div>

            <div className="space-y-6">
                <h3 className="text-[30px] font-bold text-gray-900">공통 코드 그룹 추가</h3>

                <div className="bg-[#F5F5F5] p-2 rounded-lg space-y-4">
                    <div className="grid grid-cols-[160px_1fr] gap-6 items-center">
                        <label className="text-xl font-bold text-gray-700 text-right pr-6">그룹이름</label>
                        <input
                            type="text"
                            className="w-full max-w-5xl px-6 py-4 text-lg border border-gray-300 rounded-[5px] focus:outline-none focus:border-[#5C4033]"
                        />
                    </div>
                    <div className="grid grid-cols-[160px_1fr] gap-6 items-center">
                        <label className="text-xl font-bold text-gray-700 text-right pr-6">그룹 설명</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="text"
                                className="w-full max-w-5xl px-6 py-4 text-lg border border-gray-300 rounded-[5px] focus:outline-none focus:border-[#5C4033]"
                            />
                            <button className="px-10 py-4 bg-[#5C4033] text-white text-lg rounded-[5px] font-bold border-[2px] border-[#A8A9AD] hover:bg-[#4a332a] transition-colors whitespace-nowrap">
                                그룹 저장
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300" />

            <div className="space-y-4">
                <h3 className="text-[30px] font-bold text-gray-900">공통코드 추가</h3>

                <div className="w-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    <div className="flex bg-[#5C4033] text-white py-6 text-center font-medium text-lg">
                        <div className="flex-1">그룹ID</div>
                        <div className="flex-1">코드ID</div>
                        <div className="flex-1">코드명</div>
                        <div className="flex-1">부모코드ID</div>
                        <div className="w-[120px]">관리</div>
                    </div>

                    <div className="divide-y divide-gray-200 bg-[#F9FAFB]">
                        {rows.map((row) => (
                            <div key={row.id} className="flex items-center text-center py-5 px-6 gap-6">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 text-lg text-center bg-white border border-gray-300 rounded-[5px] focus:outline-none focus:border-[#5C4033]"
                                        placeholder="그룹ID"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 text-lg text-center bg-white border border-gray-300 rounded-[5px] focus:outline-none focus:border-[#5C4033]"
                                        placeholder="코드ID"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 text-lg text-center bg-white border border-gray-300 rounded-[5px] focus:outline-none focus:border-[#5C4033]"
                                        placeholder="코드명"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 text-lg text-center bg-white border border-gray-300 rounded-[5px] focus:outline-none focus:border-[#5C4033]"
                                        placeholder="부모코드ID"
                                    />
                                </div>
                                <div className="w-[120px] flex justify-center">
                                    <button
                                        onClick={() => handleDeleteRow(row.id)}
                                        className="px-6 py-2 bg-[#5C4033] text-white text-base rounded-[5px] border-[2px] border-[#A8A9AD] hover:bg-[#4a332a]"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={handleAddRow}
                        className="px-8 py-3 bg-[#5C4033] text-white text-lg rounded-[5px] font-bold border-[2px] border-[#A8A9AD] hover:bg-[#4a332a] transition-colors"
                    >
                        행 추가
                    </button>
                    <button className="px-8 py-3 bg-[#5C4033] text-white text-lg rounded-[5px] font-bold border-[2px] border-[#A8A9AD] hover:bg-[#4a332a] transition-colors">
                        선택된 코드 저장
                    </button>
                </div>
            </div>
        </div>
    );
}
