// src/api/recentApi.ts
import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:8080/api/recent";

// 최근 본 상품 DTO
export interface RecentProduct {
  productIdx: number;
  viewedAt: string; // ISO 문자열
}

// 내 최근 본 상품 조회
export const getRecentProducts = async (
  memberIdx: number,
): Promise<RecentProduct[]> => {
  const response = await axiosInstance.get<RecentProduct[]>(
    `${API_URL}/${memberIdx}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

// 최근 본 상품 등록/업데이트
export const addRecentProduct = async (
  memberIdx: number,
  productIdx: number,
): Promise<void> => {
  await axiosInstance.get(`${API_URL}/add/${memberIdx}/${productIdx}`, {
    withCredentials: true,
  });
};
