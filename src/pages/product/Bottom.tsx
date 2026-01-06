import { useState } from "react";
import outer1 from "@/assets/proudct/outer.png";
import outer2 from "@/assets/proudct/outer2.png";
import outer3 from "@/assets/proudct/outer3.png";
import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    discount?: number;
    colors: string[];
}

const PRODUCTS: Product[] = [
    {
        id: 1,
        image: outer1,
        title: "수페리어 다운 파카-BLAK",
        price: 289000,
        colors: ["#1e1e1e", "#5d4037", "#1a237e"],
    },
    {
        id: 2,
        image: outer2,
        title: "우먼 크롭 패딩 자켓",
        price: 289000,
        colors: ["#1e1e1e", "#5d4037"],
    },
    {
        id: 3,
        image: outer3,
        title: "Soft Collar fur Jacket (Ash ivory)",
        price: 194000,
        discount: 30,
        colors: ["#d7ccc8"],
    },
    {
        id: 4,
        image: outer1,
        title: "레이스 플리스 배색 리버시블 점퍼 블랙",
        price: 98580,
        discount: 38,
        colors: ["#9e9e9e"],
    },
    {
        id: 5,
        image: outer2,
        title: "T Sherpa Fleece Jacket Grey",
        price: 165000,
        discount: 30,
        colors: ["#616161", "#424242"],
    },
    {
        id: 6,
        image: outer3,
        title: "T.S FLEECE JACKET - CHARCOAL",
        price: 90300,
        discount: 30,
        colors: ["#616161", "#424242", "#000000"],
    },
];

export function Bottom() {
    const [activeSort, setActiveSort] = useState("인기순");
    const [activeCategory, setActiveCategory] = useState("슬랙스");
    const categories = ["슬랙스", "데님", "숏팬츠", "트레이닝", "팬츠"];

    const formatPrice = (price: number) => {
        return price.toLocaleString() + "원";
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto px-4 py-12 font-['Inter',sans-serif]">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight text-gray-900">
                BOTTOM
            </h1>

            <div className="w-full border-t border-gray-200 mb-6"></div>

            <div className="relative flex justify-center items-center mb-12">
                <div className="flex gap-8 text-sm md:text-base text-gray-500 font-medium">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`transition-colors cursor-pointer ${activeCategory === category
                                ? "text-black font-bold"
                                : "hover:text-black"
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
                        <SelectContent>
                            <SelectItem value="인기순" className="text-sm">인기순</SelectItem>
                            <SelectItem value="최신순" className="text-sm">최신순</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-16 mb-16">
                {PRODUCTS.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group block">
                        <div className="bg-gray-50 mb-4 overflow-hidden relative aspect-[3/4]">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2 min-h-[3rem]">
                                {product.title}
                            </h3>

                            <div className="flex items-baseline gap-2">
                                {product.discount && (
                                    <span className="text-red-500 font-bold text-lg">
                                        {product.discount}%
                                    </span>
                                )}
                                <span className="text-gray-900 font-bold text-lg">
                                    {formatPrice(product.price)}
                                </span>

                            </div>

                            {/* Color Swatches */}
                            <div className="flex gap-2 pt-1">
                                {product.colors.map((color, idx) => (
                                    <div
                                        key={idx}
                                        className="w-3 h-3 rounded-none border border-gray-200"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {/* 페이징 */}
            <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500">
                <button className="w-8 h-8 flex items-center justify-center text-black">1</button>
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
