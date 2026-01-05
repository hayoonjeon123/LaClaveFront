import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import product from "@/assets/proudct.png";

function ProductDetail() {
    const { productId } = useParams();
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="w-[1420px] mx-auto py-20 px-[70px]">
            <div className="grid grid-cols-12 gap-12">
                {/* Left: Product Image */}
                <div className="col-span-6 bg-[#F5F5F5] flex items-center justify-center p-8">
                    {/* Using main_b2 as placeholder for the padded jacket */}
                    <img src={product} alt="Product Detail" className="w-full h-auto object-cover" />
                </div>

                {/* Right: Product Info */}
                <div className="col-span-6 flex flex-col pt-4">

                    {/* Brand & Title */}
                    <div className="mb-6">
                        <h3 className="text-[24px] font-['Luxurious_Script'] text-[#5C4033] mb-2 flex items-center gap-2">
                            La Clavé <span className="text-black font-['Gowun_Dodum'] text-base font-bold">La Clavé</span>
                        </h3>
                        <h1 className="text-[28px] font-bold text-[#5C4033] leading-tight">
                            배색 리버시블 컴포트핏 다운패딩(블랙)
                        </h1>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-8">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-[18px] font-medium">4.7</span>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                        <p className="text-gray-400 text-[18px] line-through">298,000원</p>
                        <div className="flex items-end gap-3">
                            <span className="text-red-600 text-[28px] font-bold">70%</span>
                            <span className="text-[28px] font-bold">89,400원</span>
                        </div>
                    </div>

                    {/* Options (Selectors) */}
                    <div className="space-y-4 mb-10">
                        <div className="relative">
                            <select className="w-full h-[50px] px-4 border border-gray-300 rounded-md text-gray-500 appearance-none bg-white focus:outline-none focus:border-[#5C4033]">
                                <option>사이즈</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                            </select>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-purple-500">
                                ▼
                            </div>
                        </div>
                        <div className="relative">
                            <select className="w-full h-[50px] px-4 border border-gray-300 rounded-md text-gray-500 appearance-none bg-white focus:outline-none focus:border-[#5C4033]">
                                <option>색상</option>
                                <option>Black</option>
                                <option>Ivory</option>
                            </select>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-400">
                                ▼
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
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
                        <button className="flex-1 h-[60px] border border-gray-300 rounded-lg text-lg font-bold hover:bg-gray-50 transition-colors">
                            장바구니
                        </button>
                        <button className="flex-1 h-[60px] bg-[#5C4033] text-white rounded-lg text-lg font-bold hover:bg-[#4a332a] transition-colors">
                            결제하기
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
