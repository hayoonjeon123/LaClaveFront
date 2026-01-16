import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Best() {
    const [products, setProducts] = useState<any[]>([]);
    const [activeSort, setActiveSort] = useState("인기순");
    const [activeCategory, setActiveCategory] = useState("베스트");

    const categories = ["베스트", "상의", "하의", "아우터", "ACC"];

    // 카테고리별 ID 매핑 (category.constants.tsx 참고)
    const categoryIds: Record<string, number> = {
        "상의": 86,
        "하의": 87,
        "아우터": 88,
        "ACC": 90
    };

    useEffect(() => {
        fetchProducts();
    }, [activeCategory, activeSort]);

    const fetchProducts = async () => {
        try {
            let url = "";
            if (activeCategory === "베스트") {
                url = "/api/products/best"; // 베스트 상품 엔드포인트
            } else {
                const categoryId = categoryIds[activeCategory];
                url = `/api/category/${categoryId}`; // 카테고리별 엔드포인트
            }

            const response = await axios.get(url, {
                params: { sort: activeSort }
            });
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            setProducts([]);
        }
    };

    const formatPrice = (price: any) => {
        if (price === null || price === undefined) return "0원";
        return Number(price).toLocaleString() + "원";
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-12 font-['Inter',sans-serif]">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight text-gray-900">
                BEST
            </h1>
            <div className="w-full border-t border-gray-200 mb-6"></div>

            <div className="relative flex justify-center items-center mb-12">
                <div className="flex gap-8 text-sm md:text-base text-gray-500 font-medium">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`transition-colors cursor-pointer ${activeCategory === category ? "text-black font-bold" : "hover:text-black"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="absolute right-0 text-xs md:text-sm text-gray-600">
                    <Select value={activeSort} onValueChange={setActiveSort}>
                        <SelectTrigger className="w-[100px] h-8 text-sm focus:ring-0 focus:ring-offset-0 border-none shadow-none">
                            <SelectValue placeholder="정렬" />
                        </SelectTrigger>
                        <SelectContent drop-shadow-md>
                            <SelectItem value="인기순" className="text-sm">인기순</SelectItem>
                            <SelectItem value="최신순" className="text-sm">최신순</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-16 mb-16">
                {products && products.length > 0 ? (
                    products.map((product, idx) => (
                        <Link to={`/product/${product.productIdx}`} key={product.productIdx} className="group block relative">
                            {/* 베스트 탭일 경우 순위 표시 */}
                            {activeCategory === "베스트" && (
                                <div className="absolute top-0 left-0 z-10 bg-black text-white w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </div>
                            )}

                            <div className="bg-gray-200 mb-4 overflow-hidden relative aspect-[3/4]">
                                {product.mainImageUrl ? (
                                    <img
                                        src={product.mainImageUrl}
                                        alt={product.productName}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 italic bg-gray-100">No Image</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                                    {product.productName || "상품명 없음"}
                                </h3>
                                <div className="flex items-baseline gap-2">
                                    {product.discount > 0 && (
                                        <span className="text-red-500 font-bold text-lg">
                                            {product.discount}%
                                        </span>
                                    )}
                                    <span className="text-gray-900 font-bold text-lg">
                                        {formatPrice(product.productPrice)}
                                    </span>
                                </div>
                                {/* Color Swatches */}
                                <div className="flex gap-1.5 mt-2">
                                    {product.colors && product.colors.length > 0 ? (
                                        product.colors.map((color: string, index: number) => (
                                            <div
                                                key={index}
                                                className="w-3 h-3 border border-gray-300"
                                                style={{ backgroundColor: color }}
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
                    <div className="col-span-full py-20 text-center text-gray-400">등록된 상품이 없습니다.</div>
                )}
            </div>

            {/* 페이징 (선택 사항) */}
            <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500">
                <button className="w-8 h-8 flex items-center justify-center text-black">1</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">2</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">3</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">4</button>
                <button className="w-8 h-8 flex items-center justify-center hover:text-black">5</button>
                <button className="flex items-center hover:text-black tracking-widest text-xs">&gt;&gt;</button>
            </div>
        </div>
    );
}
