import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createReview, updateReview } from "../../api/reviewApi";

export default function WriteReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  // 🔒 잘못된 접근 방어
  if (
    !state ||
    (state.mode === "edit" && !state.reviewIdx) ||
    (state.mode !== "edit" && (!state.ordersIdx || !state.productIdx))
  ) {
    return <div className="text-center py-20">잘못된 접근입니다.</div>;
  }

  const isEdit = state.mode === "edit";

  const [rating, setRating] = useState<number>(state.score ?? 0);
  const [content, setContent] = useState<string>(state.content ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("별점을 선택해주세요");
      return;
    }

    if (content.length < 10) {
      alert("10자 이상 작성해주세요");
      return;
    }

    const formData = new FormData();

    // ⭐ 수정/작성 분기 명확히
    const reviewPayload = isEdit
      ? {
          reviewIdx: state.reviewIdx,
          score: rating,
          content,
        }
      : {
          ordersIdx: state.ordersIdx,
          productIdx: state.productIdx,
          score: rating,
          content,
        };

    formData.append(
      "review",
      new Blob([JSON.stringify(reviewPayload)], {
        type: "application/json",
      }),
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEdit) {
        const ok = window.confirm("리뷰를 수정하시겠습니까?");
        await updateReview(state.reviewIdx, formData);
        alert("리뷰가 수정되었습니다!");
        if (!ok) return;
      } else {
        await createReview(formData);
        alert("리뷰가 등록되었습니다!");
      }

      navigate(-1);
    } catch (e) {
      console.error(e);
      alert("처리 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto pb-10">
      {/* Header */}
      <div className="px-6 pt-6 flex items-center relative mb-4">
        <button onClick={() => navigate(-1)} className="absolute left-[-40px]">
          <ArrowLeft size={28} />
        </button>
        <h2 className="flex-1 text-center font-bold">
          {isEdit ? "리뷰 수정" : "리뷰 작성"}
        </h2>
      </div>

      <div className="px-6 space-y-6">
        {/* ⭐ 이미 작성한 리뷰 안내 */}
        {isEdit && (
          <div className="p-3 text-sm rounded bg-yellow-50 text-yellow-800 border border-yellow-200">
            이미 작성한 리뷰가 있습니다. 수정만 가능합니다.
          </div>
        )}

        {/* 별점 */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              <Star
                size={30}
                fill={star <= rating ? "#FACC15" : "none"}
                stroke={star <= rating ? "#FACC15" : "#D1D5DB"}
              />
            </button>
          ))}
        </div>

        <Separator />

        {/* 내용 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="상품에 대한 후기를 10자 이상 작성해주세요."
          className="w-full h-[140px] border rounded p-2 resize-none"
        />

        <Separator />

        {/* 이미지 */}
        <input
          type="file"
          hidden
          id="reviewImage"
          accept="image/*"
          onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
        />
        <label
          htmlFor="reviewImage"
          className="w-[80px] h-[80px] border rounded flex items-center justify-center cursor-pointer"
        >
          <Plus />
        </label>

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full h-[46px] border rounded font-bold"
        >
          {isEdit ? "리뷰 수정하기" : "리뷰 등록하기"}
        </button>
      </div>
    </div>
  );
}
