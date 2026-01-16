import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CLASS_CATEGORY } from "@/constants/category.constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const COLOR_MAP: Record<string, string> = {
    // 영문 색상명
    "black": "#000000",
    "white": "#FFFFFF",
    "gray": "#808080",
    "grey": "#808080",
    "red": "#FF0000",
    "blue": "#0000FF",
    "navy": "#000080",
    "beige": "#F5F5DC",
    "ivory": "#FFFFF0",
    "brown": "#A52A2A",

    // 한글 색상명
    "블랙": "#000000",
    "화이트": "#FFFFFF",
    "그레이": "#808080",
    "레드": "#FF0000",
    "블루": "#0000FF",
    "네이비": "#000080",
    "베이지": "#F5F5DC",
    "아이보리": "#FFFFF0",
    "브라운": "#A52A2A",
};

const getSafeColor = (colorName: any) => {
    if (!colorName || typeof colorName !== "string") return "transparent";

    // 이미 hex 코드면 그대로 반환
    if (colorName.startsWith("#")) {
        return colorName;
    }

    // 한글 색상명이나 영문 색상명을 hex로 변환
    const cleanName = colorName.replace("색상", "").toLowerCase().trim();
    return COLOR_MAP[cleanName] || colorName;
};


export function ProductPage() {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [searchParams] = useSearchParams();
    const subIdx = searchParams.get("subIdx");

    const [products, setProducts] = useState<any[]>([]);
    const [activeSort, setActiveSort] = useState("인기순");
    const [activeSubId, setActiveSubId] = useState<number | null>(null);

    const mainCategory = CLASS_CATEGORY.find(
        (c) => c.path === `category/${categoryName}`
    );

    useEffect(() => {
        if (!mainCategory) return;

        if (subIdx) {
            // URL에 subIdx가 있으면 해당 하위 카테고리 선택
            setActiveSubId(Number(subIdx));
        } else if (mainCategory.subItems && mainCategory.subItems.length > 0) {
            // 하위 카테고리가 있으면 첫 번째 하위 카테고리 자동 선택
            setActiveSubId(mainCategory.subItems[0].id);
        } else {
            // 하위 카테고리가 없으면 메인 카테고리 ID 사용 (베스트 등)
            setActiveSubId(mainCategory.id);
        }
    }, [categoryName, subIdx, mainCategory]);

    useEffect(() => {
        if (activeSubId) {
            fetchProducts(activeSubId);
        }
    }, [activeSubId]);

    const fetchProducts = async (productCategoryIdx: number) => {
        try {
            // 프록시 설정(/api -> http://localhost:8080)에 맞춰 호출
            const response = await axios.get(`/api/category/${productCategoryIdx}`);
            console.log("=== 서버 응답 전체 데이터 ===", response.data);

            // 첫 번째 상품의 구조를 자세히 확인
            if (response.data && response.data.length > 0) {
                console.log("=== 첫 번째 상품 데이터 ===", response.data[0]);
                console.log("mainImageUrl:", response.data[0].mainImageUrl);
                console.log("colors:", response.data[0].colors);
                console.log("전체 키 목록:", Object.keys(response.data[0]));
            }

            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            setProducts([]);
        }
    };

    if (!mainCategory) return <div className="py-20 text-center">카테고리를 찾을 수 없습니다.</div>;

    const formatPrice = (price: any) => {
        if (price === null || price === undefined) return "0원";
        return Number(price).toLocaleString() + "원";
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-12 font-['Inter',sans-serif]">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight text-gray-900 uppercase">
                {mainCategory.label}
            </h1>

            <div className="w-full border-t border-gray-200 mb-6"></div>

            <div className="relative flex justify-center items-center mb-12">
                <div className="flex gap-8 text-sm md:text-base text-gray-500 font-medium">

                    {mainCategory.subItems?.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => setActiveSubId(sub.id)}
                            className={`transition-colors cursor-pointer ${activeSubId === sub.id ? "text-black font-bold" : "hover:text-black"
                                }`}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>

                <div className="absolute right-0 text-xs md:text-sm text-gray-600">
                    <Select value={activeSort} onValueChange={setActiveSort}>
                        <SelectTrigger className="w-[100px] h-8 text-sm border-none shadow-none focus:ring-0">
                            <SelectValue placeholder="정렬" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="인기순">인기순</SelectItem>
                            <SelectItem value="최신순">최신순</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-16 mb-16">
                {products && products.length > 0 ? (
                    products.map((product: any) => (
                        <Link to={`/product/${product.productIdx}`} key={product.productName} className="group block">
                            <div className="bg-gray-200 mb-4 overflow-hidden relative aspect-[3/4]">
                                {/* DTO에서 mainImageUrl로 보내주고 있으니 하나만 써도 됩니다 */}
                                {product.mainImageUrl ? (
                                    <img
                                        src={product.mainImageUrl}
                                        alt={product.productName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 italic">No Image</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                                    {product.productName || "상품명 없음"}
                                </h3>
                                <div className="flex items-baseline gap-2">
                                    {product.discount > 0 && (
                                        <span className="text-red-500 font-bold text-lg">{product.discount}%</span>
                                    )}
                                    <span className="text-gray-900 font-bold text-lg">{formatPrice(product.productPrice)}</span>
                                </div>
                            </div>
                            <div className="flex gap-1.5 mt-2">
                                {product.colors && product.colors.length > 0 ? (
                                    product.colors.map((color: string, index: number) => (
                                        <div
                                            key={index}
                                            title={color}
                                            className="w-4 h-4 border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: getSafeColor(color) }}
                                        />
                                    ))
                                ) : (
                                    <span className="text-[10px] text-gray-400">옵션 없음</span>
                                )}
                            </div>


                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400">등록된 상품이 없습니다.</div>
                )}
            </div>
        </div>
    );
}
