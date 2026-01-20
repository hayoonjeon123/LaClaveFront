import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:8080";

export interface Wishlist {
  wishlistIdx?: number;
  productIdx: number;
  productName?: string;
  imageUrl?: string;
  createdAt?: string;
}

// 찜 목록 조회 (memberIdx ❌)
export const getWishlistByMember = async (): Promise<Wishlist[]> => {
  const res = await axiosInstance.get<Wishlist[]>(`${API_URL}/api/Wishlist`);
  return res.data;
};

// 찜 추가
export const addWishlist = async (productIdx: number) => {
  return axiosInstance.post(`${API_URL}/api/Wishlist/${productIdx}`, {});
};

// 찜 삭제
export const deleteWishlist = async (productIdx: number) => {
  return axiosInstance.delete(`${API_URL}/api/Wishlist/${productIdx}`);
};
