import LogoBrown from "@/assets/image/Logo_brown.png";

const FAQ_ITEMS = [
    { id: 1, title: "La Clave 이용 안내", date: "2025.12.20" },
    { id: 2, title: "배송 안내", date: "2025.12.20" },
    { id: 3, title: "교환반품 안내", date: "2025.12.20" },
];

export function FAQ() {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-16 flex flex-col items-center font-['Inter',sans-serif]">
            <img src={LogoBrown} alt="La Clave" className="w-[180px] mb-12" />

            <div className="w-full bg-[#5C4033] text-white py-4 text-center text-xl font-bold rounded-[5px] mb-2 tracking-wide">
                자주 묻는 질문
            </div>

            <div className="w-full flex flex-col mb-16">
                {FAQ_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center py-6 border-b hover:bg[#5C4033] cursor-pointer transition-colors"
                    >
                        <div className="w-16 text-center text-[#000000] font-bold text-lg">{item.id}</div>
                        <div className="flex-1 text-left font-bold text-gray-600 px-4 text-sm md:text-base">
                            {item.title}
                        </div>
                        <div className="w-32 text-center text-[#A8A9AD] text-sm font-semibold">{item.date}</div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500">
                <button className="w-8 h-8 flex items-center justify-center text-black font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">2</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">3</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">4</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">5</button>
                <button className="flex items-center hover:text-black tracking-widest text-xs">
                    {">>"}
                </button>
            </div>
        </div>
    );
}
