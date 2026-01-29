// src/api/recentApi.ts
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "/api/RecentProduct";

// 최근 본 상품 DTO
export interface RecentProduct {
  productIdx: number;
  viewedAt: string;
  productName?: string;
  price?: string;
  productImageUrl?: string;
  isLiked?: boolean;
}

// ✅ 내 최근 본 상품 조회
export const getRecentProducts = async (): Promise<RecentProduct[]> => {
  const response = await axiosInstance.get(`${API_BASE_URL}/recent`, {
    withCredentials: true,
  });
  return response.data;
};

// 최근 본 상품 추가
export const addRecentProduct = async (productIdx: number): Promise<void> => {
  await axiosInstance.post(
    `${API_BASE_URL}/add/${productIdx}`,
    {},
    {
      withCredentials: true,
    }
  );
};
