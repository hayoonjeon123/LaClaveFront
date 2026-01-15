import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import axios from "axios";
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

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "FREE"];

const COLOR_TO_EN: Record<string, string> = {
    "블랙": "Black",
    "화이트": "White",
    "그레이": "Gray",
    "네이비": "Navy",
    "브라운": "Brown",
    "아이보리": "Ivory",
    "베이지": "Beige",
};

const sortSizes = (sizes: string[]) => {
    if (!sizes) return [];
    return [...sizes].sort((a, b) => {
        const indexA = SIZE_ORDER.indexOf(a.toUpperCase());
        const indexB = SIZE_ORDER.indexOf(b.toUpperCase());
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
};

const getDisplayColor = (name: string) => {
    if (!name) return "";
    const cleanName = name.replace("색상", "").trim();
    return COLOR_TO_EN[cleanName] || cleanName;
};

function ProductDetail() {
    const { productIdx } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState("info");
    const [productData, setProductData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        setSelectedSize("");
        setSelectedColor("");
    }, [productIdx]);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setIsLoading(true);
                // 백엔드 API 호출 (프록시 설정 /api -> http://localhost:8080 가정)
                const response = await axios.get(`/api/product/${productIdx}`);
                console.log("=== 상품 상세 데이터 ===", response.data);
                setProductData(response.data);
            } catch (error) {
                console.error("상품 상세 정보를 가져오는데 실패했습니다:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (productIdx) {
            fetchProductDetail();
        }
    }, [productIdx]);

    useEffect(() => {
        if (!productData) return;

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                setActiveTab("inquiry");
                return;
            }

            const headerOffset = 100;
            const currentScrollPos = window.scrollY + headerOffset;
            const tabs = ["info", "size", "review", "inquiry"];

            for (const tabId of tabs) {
                const element = document.getElementById(tabId);
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    const elementTop = window.scrollY + top;
                    const elementBottom = window.scrollY + bottom;

                    if (currentScrollPos >= elementTop && currentScrollPos < elementBottom) {
                        setActiveTab(tabId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [productData]);

    if (isLoading) return <div className="py-20 text-center text-gray-500">상품 정보를 불러오는 중입니다...</div>;
    if (!productData) return <div className="py-20 text-center text-gray-500">상품 정보를 찾을 수 없습니다.</div>;

    // 메인 이미지 및 상세 이미지 배열 구성
    const mainImages = productData.mainImageUrl ? [productData.mainImageUrl] : [];
    const detailImages = productData.detailImages || [];

    // 탭 설정 (서버 데이터 기반)
    const tabConfig = [
        { id: "info", label: "정보", type: "image", content: detailImages },
        { id: "size", label: "사이즈", type: "content", content: <div className="p-8 text-center text-gray-400">준비된 사이즈 표가 없습니다.</div> },
        { id: "review", label: "리뷰", type: "component", content: <ProductReviews /> },
        { id: "inquiry", label: "문의", type: "component", content: <ProductInquiries /> },
    ];

    const formatPrice = (price: any) => {
        return Number(price).toLocaleString() + "원";
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto py-8 px-4">
            <div className="grid grid-cols-12 gap-8">
                {/* 왼쪽: 상품 이미지 캐러셀 */}
                <div className="col-span-6 bg-[#F5F5F5] flex items-center justify-center p-8 rounded-lg overflow-hidden">
                    {mainImages.length > 0 ? (
                        <Carousel className="w-full h-full flex flex-col justify-center">
                            <CarouselContent>
                                {mainImages.map((img, index) => (
                                    <CarouselItem key={index}>
                                        <div className="flex items-center justify-center h-full">
                                            <img src={img} alt={`Product ${index + 1}`} className="w-full h-[600px] object-contain" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {mainImages.length > 1 && (
                                <>
                                    <CarouselPrevious className="left-4 z-10" />
                                    <CarouselNext className="right-4 z-10" />
                                </>
                            )}
                        </Carousel>
                    ) : (
                        <div className="w-full h-[600px] flex items-center justify-center text-gray-400">No Image</div>
                    )}
                </div>

                {/* 오른쪽: 상품 정보 및 옵션 선택 */}
                <div className="col-span-6 pt-4">
                    <div className="flex flex-col max-w-[500px] w-full mx-auto">
                        <div className="mb-6">
                            <h3 className="text-[24px] font-['Luxurious_Script'] text-[#5C4033] mb-2 flex items-center gap-2">
                                La Clavé <span className="text-black text-base font-bold uppercase tracking-wider">Laclave</span>
                            </h3>
                            <h1 className="text-[28px] font-bold text-[#000000] leading-tight">
                                {productData.productName}
                            </h1>
                        </div>

                        <div className="flex items-center gap-1 mb-8">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-[18px] font-bold">{productData.averageRating || 0}</span>
                        </div>

                        <div className="mb-8">
                            {productData.discount > 0 && (
                                <p className="text-gray-400 text-[18px] line-through">
                                    {(productData.productPrice * (1 + productData.discount / 100)).toLocaleString()}원
                                </p>
                            )}
                            <div className="flex items-end gap-3">
                                {productData.discount > 0 && (
                                    <span className="text-red-600 text-[28px] font-bold">{productData.discount}%</span>
                                )}
                                <span className="text-[28px] font-bold">{formatPrice(productData.productPrice)}</span>
                            </div>
                        </div>

                        <div className="space-y-6 mb-12">
                            {/* 사이즈 선택 */}
                            <Select value={selectedSize} onValueChange={setSelectedSize}>
                                <SelectTrigger className="w-full !h-[50px] text-lg text-gray-500 focus:ring-[#5C4033]">
                                    <SelectValue placeholder="사이즈 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortSizes(productData.sizes).map((size: string) => (
                                        <SelectItem key={size} value={size.toLowerCase()}>{size.toUpperCase()}</SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>

                            {/* 색상 선택 */}
                            <Select value={selectedColor} onValueChange={setSelectedColor}>
                                <SelectTrigger className="w-full !h-[50px] text-lg text-gray-500 focus:ring-[#5C4033]">
                                    <SelectValue placeholder="색상 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productData.colors?.map((color: string) => (
                                        <SelectItem key={color} value={color.toLowerCase()}>
                                            {getDisplayColor(color)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>
                        </div>


                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="w-[60px] h-[60px] flex items-center justify-center relative group"
                            >
                                <div className="flex flex-col items-center">
                                    <Heart
                                        className={`w-8 h-8 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-[#5C4033] group-hover:text-red-400"}`}
                                    />
                                    <span className="text-[12px] font-bold mt-1 text-gray-600">0</span>
                                </div>
                            </button>
                            <button className="flex-1 h-[60px] border border-[#A8A9AD] rounded-lg border-2 text-lg font-bold hover:bg-gray-50 transition-colors cursor-pointer">
                                장바구니
                            </button>
                            <button className="flex-1 h-[60px] bg-[#5C4033] border-[#A8A9AD] border-2 text-white rounded-lg text-lg font-bold hover:bg-[#4a332a] transition-colors cursor-pointer">
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
                                    const yOffset = -80;
                                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: 'auto' });
                                    setActiveTab(tab.id);
                                }
                            }}
                            className={`flex-1 h-full text-[16px] font-bold transition-all 
                                ${index !== tabConfig.length - 1 ? "border-r border-[#A8A9AD]" : ""}
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
                            {tab.type === "image" && Array.isArray(tab.content) && tab.content.length > 0 ? (
                                <div className="flex flex-col items-center gap-0 w-full">
                                    {tab.content.map((img, index) => (
                                        <img key={index} src={img} alt={`${tab.label} ${index + 1}`} className="w-full object-cover" />
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full">{tab.content}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { ProductDetail };