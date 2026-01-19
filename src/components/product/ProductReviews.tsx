import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ProductReviews() {
    const { productIdx } = useParams();
    const [reviews, setReviews] = useState<any[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            console.log("fetchReviews 실행 - productIdx:", productIdx);

            if (!productIdx) {
                console.warn("productIdx가 존재하지 않아 리뷰를 불러오지 않습니다.");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                // 1. 통합 리뷰 데이터 가져오기 (리뷰 리스트 + 평점)
                // API URL: /api/items/{itemIdx}/reviews
                console.log(`API 호출 시작: /api/items/${productIdx}/reviews`);
                const response = await axios.get(`/api/items/${productIdx}/reviews`);
                console.log("=== 상품 리뷰 API 응답 ===", response.data);

                // DTO null 체크 및 기본값 설정
                const data = response.data || {};
                const list = data.reviewList || [];
                const score = data.averageScore || 0;

                console.log(`리뷰 개수: ${list.length}, 평균 평점: ${score}`);

                setReviews(list);
                setAverageRating(score);

            } catch (error) {
                console.error("리뷰 정보를 가져오는데 실패했습니다:", error);
                setReviews([]); // 에러 시 빈 리스트로 초기화
                setAverageRating(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [productIdx]);

    if (isLoading) return <div className="py-10 text-center text-gray-400">후기를 불러오는 중입니다...</div>;

    return (
        <div className="w-full">
            {/* 상단 요약 바 */}
            <div className="w-full h-[50px] bg-[#5C4033] rounded-[5px] flex items-center px-4 mb-4">
                <span className="text-white text-lg font-bold mr-2">후기</span>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                <span className="text-white text-lg font-bold">
                    {typeof averageRating === 'number' ? averageRating.toFixed(1) : "0.0"}
                </span>
            </div>

            {/* 정렬 셀렉트 (기능 미구현 UI 표시만) */}
            <div className="flex justify-end mb-3">
                <Select defaultValue="newest">
                    <SelectTrigger className="w-[100px] h-8 text-sm">
                        <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest" className="text-sm">최신순</SelectItem>
                        <SelectItem value="high-rating" className="text-sm">별점높은순</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* 리뷰 리스트 */}
            <div className="flex flex-col gap-6">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={review.reviewIdx || index} className="animate-in fade-in duration-500">
                            <div className="flex flex-col gap-2">
                                {/* 작성자 및 날짜 */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <h4 className="text-[16px] font-bold text-gray-900">
                                            {/* 변경된 API 필드: nickname */}
                                            {review.nickname || "익명"}
                                        </h4>
                                        {/* <div className="text-[12px] text-gray-400">
                                            날짜 정보 없음
                                        </div> */}
                                    </div>
                                    {/* 별점 표시 */}
                                    <div className="flex items-center gap-1">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    // DB 필드명: score
                                                    className={`w-3.5 h-3.5 ${i < Math.floor(review.score || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 ml-1">
                                            {review.score}
                                        </span>
                                    </div>
                                </div>

                                {/* 리뷰 내용 - DB 필드명: content */}
                                <p className="text-[14px] text-gray-700 whitespace-pre-line leading-relaxed mt-1">
                                    {review.content}
                                </p>

                                {/* 구분선 */}
                                {index < reviews.length - 1 && <Separator className="mt-6 bg-gray-100" />}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center text-gray-400 border-y border-gray-50 border-dashed">
                        아직 작성된 후기가 없습니다.
                    </div>
                )}
            </div>
            <div className="h-10" />
        </div>
    );
}
