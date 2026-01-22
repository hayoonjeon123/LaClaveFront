import axiosInstance from "./axiosInstance";

export interface Wishlist {
  wishlistIdx?: number;
  productIdx: number;
  productName?: string;
  imageUrl?: string;
  wishlistDate?: string;
}

// 찜 목록 조회
export const getWishlistByMember = async (): Promise<Wishlist[]> => {
  const res = await axiosInstance.get<Wishlist[]>("/api/Wishlist");
  return res.data;
};

// 찜 추가 (토글)
export const addWishlist = async (productIdx: number) => {
  return axiosInstance.post(`/api/Wishlist/toggle/${productIdx}`, {});
};

// 찜 삭제 (하트 취소)
export const deleteWishlist = async (productIdx: number) => {
  return axiosInstance.delete(`/api/Wishlist/${productIdx}`);
};
