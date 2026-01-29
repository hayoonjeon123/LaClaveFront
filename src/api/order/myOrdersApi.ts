import axiosInstance from "../axiosInstance";

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
  productImageUrl?: string; //
}

// === 주문 타입 ===
export interface Order {
  ordersIdx: number;
  ordersDate: string; // ISO 문자열
  ordersStatus: number;
  totalPrice: number;
  deliveryMsg: string;
  details: OrderDetail[];
  orderNo: string;
  delivery?: {
    recipientName: string;
    phone: string;
    address: string;
    addressDetail: string;
  };
  payInfo?: PayInfo; // ⭐ 추가
}

// === 결제 정보 타입 ===
export interface PayInfo {
  paymentIdx: number;
  paymentDate: string; // ISO 문자열
  totalPrice: number;
  payStatus: number;
  payWay: number; // 결제 수단 코드
  payType: number; // 결제 유형
  payReference: number;
  externalTransaction?: string;

  payWayName?: string;
  payStatusName?: string;
  payTypeName?: string;
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
