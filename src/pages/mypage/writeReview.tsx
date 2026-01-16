import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createReview, updateReview } from "../../api/reviewApi";

export default function WriteReview() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate(-1);
    return null;
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

    // ✅ DTO 하나로 묶어서 JSON Blob
    const reviewPayload: any = {
      score: rating,
      content,
    };

    if (isEdit) {
      reviewPayload.reviewIdx = state.reviewIdx;
    } else {
      reviewPayload.productIdx = state.productIdx;
      reviewPayload.ordersIdx = state.ordersIdx;
    }

    formData.append(
      "review",
      new Blob([JSON.stringify(reviewPayload)], {
        type: "application/json",
      })
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEdit) {
        await updateReview(formData);
        alert("리뷰가 수정되었습니다!");
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
      <div className="max-w-[700px] mx-auto px-6 pt-6 flex items-center relative mb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[-40px] p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[20px] font-bold text-black tracking-tight">
            {isEdit ? "리뷰 수정" : "리뷰 작성"}
          </h2>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* 별점 */}
        <section>
          <h3 className="text-[15px] font-bold mb-2">
            별점을 입력해주세요 <span className="text-[#A8A9AD]">(필수)</span>
          </h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="hover:scale-110 transition"
              >
                <Star
                  size={30}
                  fill={star <= rating ? "#FACC15" : "none"}
                  stroke={star <= rating ? "#FACC15" : "#D1D5DB"}
                />
              </button>
            ))}
          </div>
        </section>

        <Separator />

        {/* 내용 */}
        <section>
          <h3 className="text-[15px] font-bold mb-2">
            상품에 대해 남겨주세요{" "}
            <span className="text-[#A8A9AD]">(필수)</span>
          </h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="20자 이상 작성해주세요."
            className="w-full h-[140px] p-2 border rounded-[8px] resize-none"
          />
        </section>

        <Separator />

        {/* 사진 */}
        <section>
          <h3 className="text-[15px] font-bold mb-2">
            사진 첨부 <span className="text-[#A8A9AD]">(선택)</span>
          </h3>

          <input
            type="file"
            accept="image/*"
            hidden
            id="reviewImage"
            onChange={(e) => {
              if (e.target.files) {
                setImageFile(e.target.files[0]);
              }
            }}
          />

          <label
            htmlFor="reviewImage"
            className="w-[80px] h-[80px] border rounded-[8px]
                       flex items-center justify-center cursor-pointer"
          >
            <Plus size={20} />
          </label>
        </section>

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full h-[46px] border rounded-[8px] font-bold"
        >
          {isEdit ? "리뷰 수정하기" : "리뷰 등록하기"}
        </button>
      </div>
    </div>
  );
}
