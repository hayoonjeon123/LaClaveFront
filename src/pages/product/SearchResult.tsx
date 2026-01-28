import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
const SERVER_URL = "http://localhost:8080";

const COLOR_MAP: Record<string, string> = {
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

    // 데님 색상
    "light_denim": "#A8C1D8",
    "mid_denim": "#5A7A9C",
    "dark_denim": "#2B3E58",
    "black_denim": "#323232",
    "연청": "#A8C1D8",
    "중청": "#5A7A9C",
    "진청": "#2B3E58",
    "흑청": "#323232",

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
    if (colorName.startsWith("#")) return colorName;
    const cleanName = colorName.replace("색상", "").toLowerCase().trim();
    return COLOR_MAP[cleanName] || colorName;
};

export function SearchResult() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (keyword) {
            fetchSearchResults(keyword);
        }
    }, [keyword]);

    const fetchSearchResults = async (searchKeyword: string) => {
        setLoading(true);
        try {
            // 백엔드 SearchController: /api/search?keyword=...
            const response = await axiosInstance.get("/api/search", {
                params: { keyword: searchKeyword }
            });
            console.log("검색 결과:", response.data);
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("검색 실패:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: any) => {
        if (price === null || price === undefined) return "0원";
        return Number(price).toLocaleString() + "원";
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-12 font-['Inter',sans-serif]">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 tracking-tight text-gray-900">
                "{keyword}" 검색 결과
            </h1>

            <div className="w-full border-t border-gray-200 mb-12"></div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">검색 중입니다...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-16 mb-16">
                    {products && products.length > 0 ? (
                        products.map((product: any) => (
                            <Link to={`/product/${product.productIdx}`} key={product.productIdx} className="group block">
                                <div className="bg-gray-200 mb-4 overflow-hidden relative aspect-[3/4]">
                                    {/* 이미지 처리 로직 */}
                                    {(product.mainImageUrl) ? (
                                        <img
                                            src={`${SERVER_URL}${product.mainImageUrl}`}
                                            alt={product.productName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (product.images && product.images.length > 0) ? (
                                        <img
                                            src={`${SERVER_URL}${product.images[0].url || product.images[0].imagePath}`}
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
                                    {/* 색상 스와치 추가 */}
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
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            검색된 상품이 없습니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
