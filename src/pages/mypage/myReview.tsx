import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getMyReviews,
  deleteReview,
  getWritableReviews,
} from "../../api/reviewApi";
import type { Review, WritableReview } from "../../api/reviewApi";

export default function MyReview() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"writable" | "written">("written");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [writableReviews, setWritableReviews] = useState<WritableReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const [written, writable] = await Promise.all([
          getMyReviews(),
          getWritableReviews(),
        ]);

        setReviews(written);
        setWritableReviews(writable);
        setActiveTab("written");
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

  return (
    <div className="max-w-[700px] mx-auto pb-10">
      {/* Header */}
      <div className="px-4 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <h2 className="flex-1 text-center text-[24px] font-bold text-[#5C4033] tracking-tight">
          리뷰 관리
        </h2>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 border-b mb-6 border-[#A8A9AD] max-w-[650px] mx-auto">
        <button
          onClick={() => setActiveTab("writable")}
          className={`w-full pb-2 font-bold text-[18px] ${
            activeTab === "writable"
              ? "text-[#5C4033] border-b-2 border-[#5C4033]"
              : "text-[#A8A9AD]"
          }`}
        >
          작성 가능 리뷰
        </button>
        <button
          onClick={() => setActiveTab("written")}
          className={`w-full pb-2 font-bold text-[18px] ${
            activeTab === "written"
              ? "text-[#5C4033] border-b-2 border-[#5C4033]"
              : "text-[#A8A9AD]"
          }`}
        >
          작성 완료 리뷰
        </button>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-400">불러오는 중...</div>
      )}

      {/* 작성 가능 리뷰 */}
      {!loading && activeTab === "writable" && (
        <div className="space-y-4 px-6">
          {writableReviews.length === 0 ? (
            <div className="text-center text-[#A8A9AD] py-10">
              작성 가능한 리뷰가 없습니다.
            </div>
          ) : (
            writableReviews.map((review) => (
              <div
                key={review.ordersIdx}
                className="border rounded-[10px] bg-white shadow-sm"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-[8px] bg-gray-50 overflow-hidden">
                    {review.productImageUrl && (
                      <img
                        src={`http://localhost:8080${review.productImageUrl}`}
                        alt={review.productName}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[14px] truncate">
                      {review.productName}
                    </p>
                    <p className="text-[12px] text-[#A8A9AD] mt-0.5">
                      {review.optionInfo}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/writeReview", {
                        state: {
                          mode: "write",
                          ordersIdx: review.ordersIdx,
                          productIdx: review.productIdx,
                          productName: review.productName,
                          optionInfo: review.optionInfo,
                        },
                      })
                    }
                    className="border px-3 h-7 rounded-[5px] text-[11px] font-bold"
                  >
                    작성
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 작성 완료 리뷰 (❗ 건드리지 않음) */}
      {!loading && activeTab === "written" && (
        <div className="space-y-4 px-6">
          {reviews.length === 0 ? (
            <div className="text-center text-[#A8A9AD] py-10">
              작성 완료된 리뷰가 없습니다.
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.reviewIdx}
                className="border rounded-[10px] bg-white shadow-sm"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-[8px] bg-gray-50 overflow-hidden">
                    <img
                      src={`http://localhost:8080${review.reviewImageUrl}`}
                      alt={review.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[14px] truncate">
                      {review.productName}
                    </p>
                    <p className="text-[12px] text-[#A8A9AD] mt-0.5">
                      {review.optionInfo}
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        navigate("/writeReview", {
                          state: {
                            mode: "edit",
                            reviewIdx: review.reviewIdx,
                            score: review.score,
                            content: review.content,
                            productName: review.productName,
                            optionInfo: review.optionInfo,
                            reviewImageUrl: review.reviewImageUrl,
                          },
                        })
                      }
                      className="border px-3 h-7 rounded-[5px] text-[11px] font-bold"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(review.reviewIdx)}
                      className="border bg-[#5C4033] text-white px-3 h-7 rounded-[5px] text-[11px] font-bold"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
