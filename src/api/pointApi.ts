// src/api/pointApi.ts
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "/api/point";

// Point 인터페이스
export interface Point {
  pointIdx: number;
  pointAmount: number; // 적립(+), 사용(-)
  orderIdx?: number; // 사용 시 연결된 주문번호
  description?: string;
  createdAt?: string; // yyyy-MM-dd 형식
}

// 내 포인트 내역 조회
export const getMyPoints = async (): Promise<Point[]> => {
  const response = await axiosInstance.get<Point[]>(`${API_BASE_URL}/my`, {
    withCredentials: true, // 세션/쿠키 필요 시
  });
  return response.data;
};
