import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { ArrowLeft } from "lucide-react";

export default function MyAi() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            // 프록시 설정(/api -> http://localhost:8080)에 맞춰 호출
            // withCredentials: true 로 세션 정보(로그인 여부) 전달
            const response = await axiosInstance.get("/api/ai/recommend");
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error: any) {
            console.error("데이터 로딩 실패:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    // 세션 만료 시에만 로그아웃 처리
                    alert("로그인이 필요한 서비스입니다.");
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("memberId");
                    window.location.href = "/loginProc";
                } else if (error.response.status === 500) {
                    // 서버 에러는 로그아웃 하지 않음
                    alert("AI 서비스 응답 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                }
            }
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
            <div className="relative flex items-center justify-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft size={32} strokeWidth={1.5} />
                </button>
                <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-gray-900">
                    AI 추천 상품
                </h1>
            </div>
            <p className="text-center text-gray-500 mb-10">
                고객님의 취향을 분석하여 딱 맞는 상품을 찾아드려요.
            </p>
            <div className="w-full border-t border-gray-200 mb-12"></div>

            {loading ? (
                <div className="text-center py-20 text-lg">AI가 고객님의 취향을 분석하고 있습니다...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-16 mb-16">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Link to={`/product/${product.productIdx}`} key={product.productIdx} className="group block relative">
                                <div className="bg-gray-200 mb-4 overflow-hidden relative aspect-[3/4]">
                                    {/* DTO에서 mainImageUrl로 가정 (실제 응답구조 확인 필요, Item 엔티티 기준 images 리스트 사용시 수정 필요) */}
                                    {/* 백엔드 Item 엔티티는 images Set을 가짐. JSON 변환 시 images 리스트가 됨. */}
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0].imagePath}
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
                                        {product.productDiscountRate > 0 && (
                                            <span className="text-red-500 font-bold text-lg">
                                                {product.productDiscountRate}%
                                            </span>
                                        )}
                                        <span className="text-gray-900 font-bold text-lg">
                                            {formatPrice(product.productPrice)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            추천할 상품을 찾지 못했습니다. <br />
                            취향 정보를 다시 설정하거나 조금만 기다려주세요.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
