import axios from "axios";

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
  const res = await axios.get<Wishlist[]>(`${API_URL}/api/Wishlist`, {
    withCredentials: true,
  });
  return res.data;
};

// 찜 추가
export const addWishlist = async (productIdx: number) => {
  return axios.post(
    `${API_URL}/api/Wishlist/${productIdx}`,
    {},
    { withCredentials: true }
  );
};

// 찜 삭제
export const deleteWishlist = async (productIdx: number) => {
  return axios.delete(`${API_URL}/api/Wishlist/${productIdx}`, {
    withCredentials: true,
  });
};
