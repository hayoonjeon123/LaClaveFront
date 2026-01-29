import axiosInstance from "../axiosInstance";
import type { Product, ProductDetail } from "../../types/product";

//카테고리별 상품 조회
export const getProductsByCategory = async (categoryIdx: number): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>(`/api/category/${categoryIdx}`);
    return response.data;
};

//상품 상세 조회
export const getProductDetail = async (productIdx: number): Promise<ProductDetail> => {
    const response = await axiosInstance.get<ProductDetail>(`/api/product/${productIdx}`);
    return response.data;
};

//상품 찜 
export const toggleWishlist = async (productIdx: number): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>(`/api/Wishlist/toggle/${productIdx}`);
    return response.data;
};

//찜 상태 확인
export const getWishlistStatus = async (productIdx: number): Promise<boolean> => {
    const response = await axiosInstance.get<boolean>(`/api/Wishlist/status/${productIdx}`);
    return response.data;
};


//검색 결과
export const searchProducts = async (keyword: string): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>(`/api/search`, {
        params: { keyword: keyword }
    });
    return response.data;
};
