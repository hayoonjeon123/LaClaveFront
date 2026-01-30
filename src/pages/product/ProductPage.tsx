import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { CLASS_CATEGORY } from "@/constants/category.constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getProductsByCategory } from "@/api/product/productApi";
import type { Product } from "@/types/product";
import { formatPrice, getSafeColor, SERVER_URL } from "@/utils/productUtils";


export function ProductPage() {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [searchParams] = useSearchParams();
    const subIdx = searchParams.get("subIdx");

    const [products, setProducts] = useState<Product[]>([]);
    const [activeSort, setActiveSort] = useState("인기순");
    const [activeSubId, setActiveSubId] = useState<number | null>(null);

    const mainCategory = CLASS_CATEGORY.find(
        (c) => c.path === `category/${categoryName}`
    );

    useEffect(() => {
        if (!mainCategory) return;

        if (subIdx) {
            setActiveSubId(Number(subIdx));
        } else if (mainCategory.subItems && mainCategory.subItems.length > 0) {
            setActiveSubId(mainCategory.subItems[0].id);
        } else {
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
            const data = await getProductsByCategory(productCategoryIdx);
            setProducts(data);
        } catch (error) {
            setProducts([]);
        }
    };

    if (!mainCategory) return <div className="py-20 text-center">카테고리를 찾을 수 없습니다.</div>;


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
                    products.map((product: Product) => (
                        <Link to={`/product/${product.productIdx}`} key={product.productIdx} className="group block">
                            <div className="bg-gray-200 mb-4 overflow-hidden relative aspect-[3/4]">
                                {product.mainImageUrl ? (
                                    <img
                                        key={product.productIdx}
                                        src={`${SERVER_URL}${product.mainImageUrl}`}
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
