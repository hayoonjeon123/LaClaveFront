import axiosInstance from "./axiosInstance";

// === 주문 상세 타입 ===
export interface OrderDetail {
  productIdx: number;
  quantity: number;
  price?: number;
  discountPrice?: number;
  totalPrice: number;
  colorCode?: number;
  sizeCode?: number;
  productName?: string; // 필요 시
  option?: string; // 필요 시

  // ⭐ 추가
  colorName?: string;
  sizeName?: string;
}

// === 주문 타입 ===
export interface Order {
  ordersIdx: number;
  ordersDate: string; // ISO 문자열
  ordersStatus: number;
  totalPrice: number;
  details: OrderDetail[];
  delivery?: {
    recipientName: string;
    phone: string;
    address: string;
    addressDetail: string;
  };
}

const API_BASE_URL = "/api/my"; // 프록시를 통해 백엔드로 전달

// === 마이페이지 주문 조회 API ===
export const getMyOrders = async (): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get<Order[]>(`${API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("마이페이지 주문 조회 실패:", error);
    throw error;
  }
};
