import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import sampleImg from "../../assets/sample-product.jpg";
import { useEffect, useState } from "react"; // ⭐ 중요
import {
  getMyReviews,
  deleteReview,
  getWritableReviews,
} from "../../api/reviewApi";
import type { Review, WritableReview } from "../../api/reviewApi";
import axios from "axios";

export default function MyReview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"writable" | "written">(
    "written", // 보통 마이페이지 진입 시 작성한 리뷰를 먼저 보여주는 경우가 많아 변경했습니다.
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [writableReviews, setWritableReviews] = useState<Review[]>([]);

  const getWritableReviews = async () => {
    const res = await axios.get("http://localhost:8080/api/review/writable", {
      withCredentials: true,
    });
    return res.data;
  };
  // 회원 리뷰 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const [written, writable] = await Promise.all([
          getMyReviews(), // 작성 완료 리뷰
          getWritableReviews(), // 작성 가능 리뷰
        ]);

        setReviews(written);
        setWritableReviews(writable);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewIdx: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteReview(reviewIdx);
      setReviews((prev) => prev.filter((r) => r.reviewIdx !== reviewIdx));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
    }
  };

  /**
   * [중요] 필터링 로직 수정
   * 백엔드 getMyReviews API가 이미 작성된 리뷰만 반환한다면 별도의 status 필터는 필요 없습니다.
   * 만약 DTO에 status가 없다면 아래처럼 reviews 전체를 사용하세요.
   */
  const writtenReviews = reviews;

  return (
    <div className="max-w-[700px] mx-auto pb-10">
      {/* Header */}
      <div className="max-w-[700px] mx-auto px-4 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[24px] font-bold text-[#5C4033] tracking-tight">
            리뷰 관리
          </h2>
        </div>
      </div>

      {/* 리뷰 상단 탭 */}
      <div className="grid grid-cols-2 border-b mb-6 border-[#A8A9AD] max-w-[650px] mx-auto">
        <button
          onClick={() => setActiveTab("writable")}
          className={`w-full pb-2 font-bold text-[18px] transition cursor-pointer text-center ${
            activeTab === "writable"
              ? "text-[#5C4033] border-b-2 border-[#5C4033]"
              : "text-[#A8A9AD] hover:text-[#5C4033]"
          }`}
        >
          작성 가능 리뷰
        </button>
        <button
          onClick={() => setActiveTab("written")}
          className={`w-full pb-2 font-bold text-[18px] transition cursor-pointer text-center ${
            activeTab === "written"
              ? "text-[#5C4033] border-b-2 border-[#5C4033]"
              : "text-[#A8A9AD] hover:text-[#5C4033]"
          }`}
        >
          작성 완료 리뷰
        </button>
      </div>

      {/* 로딩 표시 */}
      {loading && (
        <div className="text-center py-10 text-gray-400">불러오는 중...</div>
      )}

      {/* 작성 가능 리뷰 */}
      {!loading && activeTab === "writable" && (
        <div className="space-y-4 px-6">
          {writableReviews.length === 0 ? (
            <div className="text-center font-medium text-[#A8A9AD] py-10 text-[16px]">
              작성 가능한 리뷰가 없습니다.
            </div>
          ) : (
            writableReviews.map((review) => (
              <div
                key={review.ordersIdx} // 혹은 productIdx
                className="border border-[#EEEEEE] rounded-[10px] shadow-sm overflow-hidden bg-white"
              >
                <div className="p-4 py-3 flex items-center gap-4">
                  <div className="w-[52px] h-[52px] flex-shrink-0 overflow-hidden rounded-[8px] bg-gray-50">
                    <img
                      src={review.imageUrl || sampleImg}
                      alt={review.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[14px] text-[#333] truncate">
                      {review.productName}
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-[#A8A9AD] font-medium mt-0.5">
                      <span>{review.optionInfo}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 min-w-fit">
                    <button
                      onClick={() =>
                        navigate("/review/write", {
                          state: { mode: "write", ...review },
                        })
                      }
                      className="border border-[#A8A9AD] px-3 h-7 py-0.5 rounded-[5px]
             text-[11px] font-bold transition cursor-pointer text-[#333]
             hover:bg-gray-50"
                    >
                      작성
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 작성 완료 리뷰 */}
      {!loading && activeTab === "written" && (
        <div className="space-y-4 px-6">
          {writtenReviews.length === 0 ? (
            <div className="text-center font-medium text-[#A8A9AD] py-10 text-[16px]">
              작성 완료된 리뷰가 없습니다.
            </div>
          ) : (
            writtenReviews.map((review) => (
              <div
                key={review.reviewIdx}
                className="border border-[#EEEEEE] rounded-[10px] shadow-sm overflow-hidden bg-white"
              >
                {/* 상단: 상품 정보 및 액션 버튼 */}
                <div className="p-4 py-3 flex items-center gap-4">
                  <div className="w-[52px] h-[52px] flex-shrink-0 overflow-hidden rounded-[8px] bg-gray-50">
                    <img
                      // 백엔드에서 준 imageUrl을 사용하고, 없으면 sampleImg 사용
                      src={review.imageUrl || sampleImg}
                      alt={review.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = sampleImg;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[14px] text-[#333] truncate">
                      {review.productName}
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-[#A8A9AD] font-medium mt-0.5">
                      {/* 필드명 optionInfo로 수정 */}
                      <span>{review.optionInfo}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 min-w-fit">
                    <button
                      onClick={() => {
                        if (!review || !review.reviewIdx) {
                          alert("리뷰 정보를 불러오는 데 실패했습니다.");
                          return;
                        }

                        navigate("/writeReview", {
                          state: {
                            mode: "edit",
                            reviewIdx: review.reviewIdx,
                            score: review.score,
                            content: review.content,
                            productName: review.productName,
                          },
                        });
                      }}
                      className="border border-[#A8A9AD] px-3 h-7 py-0.5 rounded-[5px]
             text-[11px] font-bold transition cursor-pointer text-[#333]
             hover:bg-gray-50"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(review.reviewIdx)}
                      className="border border-[#A8A9AD] bg-[#5C4033] text-white px-3 h-7 py-0.5 rounded-[5px] text-[11px] font-bold transition cursor-pointer hover:bg-[#4a3329]"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <hr className="border-[#F5F5F5] mx-4" />

                {/* 하단: 리뷰 내용 및 별점 */}
                <div className="p-4 pt-3">
                  <div className="mb-2.5">
                    <div className="text-yellow-400 text-sm mb-0.5">
                      {"★".repeat(Math.floor(review.score)) +
                        "☆".repeat(5 - Math.floor(review.score))}
                    </div>
                    <p className="text-[12px] text-[#A8A9AD] font-medium">
                      작성일 {review.createdAt?.split("T")[0]}
                    </p>
                  </div>
                  <p className="text-[14px] text-[#333] font-medium leading-relaxed whitespace-pre-line">
                    {review.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
