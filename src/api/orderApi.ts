import axiosInstance from "./axiosInstance";
import type { OrderRequest, OrderApprovalRequest } from "../types/order";

//주문 생성
export const createOrder = async (orderData: OrderRequest): Promise<string> => {
    const response = await axiosInstance.post<string>("/api/orders/create", orderData);
    return response.data;
};

//결제 승인
export const approvePayment = async (approveData: OrderApprovalRequest): Promise<any> => {
    const response = await axiosInstance.post("/api/orders/approve", approveData);
    return response.data;
};
