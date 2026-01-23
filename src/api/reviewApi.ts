import axios from "axios";

const API_URL = "http://localhost:8080";

export interface Review {
  reviewIdx: number;
  productIdx: number;
  productName: string;
  imageUrl: string; // 추가: 상품 이미지 경로
  optionInfo: string; // 수정: option -> optionInfo (백엔드 필드명과 일치)
  content: string;
  score: number;
  createdAt: string;
  ordersIdx?: number; // 추가: 수정/삭제 시 필요할 수 있음

  // 아래 필드들은 상세조회 등 다른 API에서 올 수 있으므로 선택사항(?)으로 유지
  memberIdx?: number;
  status?: string;
  updatedAt?: string;
}

export interface WritableReview {
  ordersIdx: number;
  productIdx: number;
  productName: string;
  imageUrl: string;
  optionInfo: string;
}
// 리뷰 등록
export const createReview = (reviewData: any) => {
  return axios.post(`${API_URL}/api/review`, reviewData, {
    withCredentials: true,
  });
};

// 리뷰 수정
// reviewApi.ts
export const updateReview = (reviewIdx: number, reviewData: FormData) => {
  return axios.put(`${API_URL}/api/review/${reviewIdx}`, reviewData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 리뷰 삭제
export const deleteReview = (reviewIdx: number) => {
  return axios.delete(`${API_URL}/api/review/${reviewIdx}`, {
    withCredentials: true,
  });
};

// [마이페이지] 회원별 리뷰 조회
export const getMyReviews = async (): Promise<Review[]> => {
  const res = await axios.get<Review[]>(`${API_URL}/api/review/my`, {
    withCredentials: true,
  });
  return res.data;
};

// [마이페이지] 작성 가능 리뷰 조회
export const getWritableReviews = async (): Promise<Review[]> => {
  const res = await axios.get<Review[]>(`${API_URL}/api/review/writable`, {
    withCredentials: true,
  });
  return res.data;
};

// [상품상세] 상품별 리뷰 조회
export const getReviewsByProduct = async (
  productIdx: number,
  status: string = "ACTIVE",
): Promise<Review[]> => {
  const res = await axios.get<Review[]>(
    `${API_URL}/api/review/product/${productIdx}?status=${status}`,
  );
  return res.data;
};

// 상품별 평균 평점 조회
export const getProductAverageScore = async (
  productIdx: number,
): Promise<number> => {
  const res = await axios.get<number>(
    `${API_URL}/api/review/average/${productIdx}`,
  );
  return res.data;
};
