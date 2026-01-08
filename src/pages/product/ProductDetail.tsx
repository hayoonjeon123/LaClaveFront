import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import product from "@/assets/proudct/proudct.png";
import info from "@/assets/proudct/info.png";
import info2 from "@/assets/proudct/info2.png";
import SiZebpay from "@/assets/proudct/size.png";
import tip from "@/assets/proudct/tip.png";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductInquiries } from "@/components/product/ProductInquiries";


function ProductDetail() {
    const { productId } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState("info");



    // 이미지 배열 (상세컷 추가)
    const images = [product, product, product];

    // 상세 정보 이미지 배열 (데모용)
    const detailImages = [product, info, info2, SiZebpay, tip];



    // 탭 설정
    const tabConfig = [
        { id: "info", label: "정보", type: "image", content: detailImages },
        { id: "size", label: "사이즈", type: "image", content: [SiZebpay] },
        { id: "review", label: "리뷰", type: "component", content: <ProductReviews /> },
        { id: "inquiry", label: "문의", type: "component", content: <ProductInquiries /> },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Check if we are at the bottom of the page
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                setActiveTab(tabConfig[tabConfig.length - 1].id);
                return;
            }

            const headerOffset = 100; // Adjust based on sticky header height
            const currentScrollPos = window.scrollY + headerOffset;

            for (const tab of tabConfig) {
                const element = document.getElementById(tab.id);
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    const elementTop = window.scrollY + top;
                    const elementBottom = window.scrollY + bottom;

                    if (currentScrollPos >= elementTop && currentScrollPos < elementBottom) {
                        setActiveTab(tab.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // 상품 입력란
        <div className="w-full max-w-[1200px] mx-auto py-8 px-4">
            <div className="grid grid-cols-12">
                <div className="col-span-6 bg-[#F5F5F5] flex items-center justify-center p-8">
                    <Carousel className="w-full h-full flex flex-col justify-center">
                        <CarouselContent>
                            {images.map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="flex items-center justify-center h-full">
                                        <img src={img} alt={`Product ${index + 1}`} className="w-full h-[600px] object-contain" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-12 z-10" />
                        <CarouselNext className="right-12 z-10" />
                    </Carousel>
                </div>

                <div className="col-span-6 pt-4">
                    <div className="flex flex-col max-w-[500px] w-full mx-auto">
                        <div className="mb-6">
                            <h3 className="text-[24px] font-['Luxurious_Script'] text-[#5C4033] mb-2 flex items-center gap-2">
                                La Clavé <span className="text-black text-base font-bold">La Clavé</span>
                            </h3>
                            <h1 className="text-[28px] font-bold text-[#000000] leading-tight">
                                배색 리버시블 컴포트핏 다운패딩(블랙)
                            </h1>
                        </div>

                        <div className="flex items-center gap-1 mb-8">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-[18px] font-bold">4.7</span>
                        </div>

                        <div className="mb-8">
                            <p className="text-gray-400 text-[18px] line-through">298,000원</p>
                            <div className="flex items-end gap-3">
                                <span className="text-red-600 text-[28px] font-bold">70%</span>
                                <span className="text-[28px] font-bold">89,400원</span>
                            </div>
                        </div>

                        <div className="space-y-6 mb-12">
                            <Select>
                                <SelectTrigger className="w-full !h-[50px] text-lg text-gray-500 focus:ring-[#5C4033]">
                                    <SelectValue placeholder="선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="s">S</SelectItem>
                                    <SelectItem value="m">M</SelectItem>
                                    <SelectItem value="l">L</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-full !h-[50px] text-lg text-gray-500 focus:ring-[#5C4033]">
                                    <SelectValue placeholder="선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="black">Black</SelectItem>
                                    <SelectItem value="ivory">Ivory</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="w-[60px] h-[60px] flex items-center justify-center relative"
                            >
                                <div className="flex flex-col items-center">
                                    <Heart
                                        className={`w-8 h-8 ${isLiked ? "fill-red-500 text-red-500" : "text-[#5C4033]"}`}
                                    />
                                    <span className="text-[12px] font-bold mt-1">165</span>
                                </div>
                            </button>
                            <button className="flex-1 h-[60px] border border-gray-300 rounded-lg border-2 text-lg font-bold hover:bg-gray-50 transition-colors ">
                                장바구니
                            </button>
                            <button className="flex-1 h-[60px] bg-[#5C4033] text-white rounded-lg text-lg font-bold hover:bg-[#4a332a] transition-colors">
                                결제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상품 정보 및 네비게이션 */}
            <div className="mt-20">
                {/* Sticky Navigation */}
                <div className="sticky top-0 z-50 w-full h-[60px] bg-white p-0 rounded-[10px] border border-[#A8A9AD] overflow-hidden flex shadow-sm">
                    {tabConfig.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                const element = document.getElementById(tab.id);
                                if (element) {
                                    const yOffset = -80; // Header height + padding
                                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: 'auto' });
                                    setActiveTab(tab.id);
                                }
                            }}
                            className={`flex-1 h-full text-[16px] font-bold transition-colors 
                                ${index !== tabConfig.length - 1 ? "border-r-2 border-[#A8A9AD]" : ""}
                                ${activeTab === tab.id ? "bg-[#5C4033] text-white" : "bg-white text-black hover:bg-gray-50"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Sections (Vertically Stacked) */}
                <div className="flex flex-col gap-12 mt-12 mb-20">
                    {tabConfig.map((tab) => (
                        <div key={tab.id} id={tab.id} className="scroll-mt-[100px]">
                            {/* Section Header (Hidden visually but useful for semantic structure or debugging, optional) */}

                            {tab.type === "image" && Array.isArray(tab.content) ? (
                                <div className="flex flex-col items-center gap-0 w-full">
                                    {tab.content.map((img, index) => (
                                        <img key={index} src={img} alt={`${tab.label} ${index + 1}`} className="w-full object-cover" />
                                    ))}
                                </div>
                            ) : (
                                <div>{tab.content}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { ProductDetail };   