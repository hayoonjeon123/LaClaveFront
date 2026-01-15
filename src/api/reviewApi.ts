import axios from "axios";

const API_URL = "http://localhost:8080";

export interface Review {
  reviewIdx: number;
  memberIdx: number;
  ordersIdx: number;
  productIdx: number;
  createdAt: string;
  updatedAt?: string;
  content: string;
  score: number;
  status: string;
  productName: string;
  option: string;
}

//리뷰 등록
export const createReview = (reviewData: any) => {
  return axios.post(`${API_URL}/api/review`, reviewData);
};
// 리뷰 수정
export const updateReview = (reviewData: any) => {
  return axios.put(`${API_URL}/api/review`, reviewData);
};
// 리뷰 삭제
export const deleteReview = (reviewData: any) => {
  return axios.delete(`${API_URL}/api/review`, reviewData);
};
// 회원별 리뷰 조회
export const getMyReviews = async (): Promise<Review[]> => {
  const res = await axios.get<Review[]>(`${API_URL}/api/review/my`, {
    withCredentials: true,
  });
  return res.data;
};
// 상품별 리뷰 조회
export const getReviewsByProduct = async (
  productIdx: number,
  status: string = "ACTIVE"
): Promise<Review[]> => {
  const res = await axios.get<Review[]>(
    `${API_URL}/api/review/product/${productIdx}?status=${status}`
  );
  return res.data;
};

// 상품별 평균 평점 조회
export const getProductAverageScore = async (
  productIdx: number
): Promise<number> => {
  const res = await axios.get<number>(
    `${API_URL}/api/review/average/${productIdx}`
  );
  return res.data;
};
