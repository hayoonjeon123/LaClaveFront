// src/api/couponApi.ts
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "/api/coupon";

// Coupon 인터페이스
export interface Coupon {
  couponIdx: number;
  couponName: string;
  discountValue: number;
  minOrderPrice: number;
  startDate: string; // yyyy-MM-dd 형식
  endDate: string;
  usedStatus: string; // N: 사용전, Y: 사용함
  memberIdx?: number;
  createdAt?: string;
  updatedAt?: string;
}

// 내 쿠폰 목록 조회
export const getMyCoupons = async (): Promise<Coupon[]> => {
  const response = await axiosInstance.get<Coupon[]>(`${API_BASE_URL}/my`, {
    withCredentials: true, // 세션/쿠키 필요 시
  });
  return response.data;
};
