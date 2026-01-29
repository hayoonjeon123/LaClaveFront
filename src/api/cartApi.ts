import axiosInstance from "./axiosInstance";
import type { CartItemRequest, CartItemResponse } from "../types/cart";

/**
 * 장바구니에 아이템 추가
 */
export const addToCart = async (cartData: CartItemRequest): Promise<any> => {
    const response = await axiosInstance.post("/api/cart/add", cartData);
    return response.data;
};

/**
 * 장바구니 목록 조회
 */
export const getCartItems = async (): Promise<CartItemResponse[]> => {
    const response = await axiosInstance.get<CartItemResponse[]>("/api/cart/list");
    return response.data;
};

/**
 * 장바구니 아이템 수량 수정
 */
export const updateCartItemQuantity = async (cartItemIdx: number, quantity: number): Promise<any> => {
    const response = await axiosInstance.post(`/api/cart/update`, {
        cartItemIdx,
        quantity
    });
    return response.data;
};

/**
 * 장바구니 아이템 삭제
 */
export const deleteCartItem = async (cartItemIdx: number): Promise<any> => {
    const response = await axiosInstance.post(`/api/cart/delete`, {
        cartItemIdx
    });
    return response.data;
};
