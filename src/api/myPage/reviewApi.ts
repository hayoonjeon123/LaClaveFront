import axiosInstance from "../axiosInstance";

const API_BASE_URL = "/api/review";

export interface Review {
  reviewIdx: number;
  productIdx: number;
  productName: string;
  imageUrl: string; // 상품 대표 이미지
  reviewImageUrl?: string; // 추가: 리뷰 이미지
  optionInfo: string; // 구매 옵션 정보
  content: string;
  score: number;
  createdAt: string;
  ordersIdx?: number; // 수정/삭제 시 필요
  ordersDetailIdx?: number;

  // 선택사항: 상세조회 등
  memberIdx?: number;
  status?: string;
  updatedAt?: string;
}

export interface WritableReview {
  ordersIdx: number;
  productIdx: number;
  productName: string;
  productImageUrl: string;
  optionInfo: string;
  ordersDetailIdx: number;
}

// 리뷰 등록
export const createReview = (reviewData: FormData) => {
  return axiosInstance.post(`${API_BASE_URL}`, reviewData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 리뷰 수정
export const updateReview = (reviewIdx: number, reviewData: FormData) => {
  return axiosInstance.put(`${API_BASE_URL}/${reviewIdx}`, reviewData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 리뷰 삭제
export const deleteReview = (reviewIdx: number) => {
  return axiosInstance.delete(`${API_BASE_URL}/${reviewIdx}`);
};

// [마이페이지] 회원별 리뷰 조회
export const getMyReviews = async (): Promise<Review[]> => {
  const res = await axiosInstance.get<Review[]>(`${API_BASE_URL}/my`);
  return res.data;
};

// [마이페이지] 작성 가능 리뷰 조회
export const getWritableReviews = async (): Promise<WritableReview[]> => {
  const res = await axiosInstance.get<WritableReview[]>(
    `${API_BASE_URL}/writable`,
  );
  return res.data;
};

// [상품상세] 상품별 리뷰 조회
export const getReviewsByProduct = async (
  productIdx: number,
  status: string = "ACTIVE",
): Promise<Review[]> => {
  const res = await axiosInstance.get<Review[]>(
    `${API_BASE_URL}/product/${productIdx}?status=${status}`,
  );
  return res.data;
};

// 상품별 평균 평점 조회
export const getProductAverageScore = async (
  productIdx: number,
): Promise<number> => {
  const res = await axiosInstance.get<number>(
    `${API_BASE_URL}/average/${productIdx}`,
  );
  return res.data;
};
