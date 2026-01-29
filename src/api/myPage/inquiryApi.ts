import axiosInstance from "../axiosInstance";
import type { Order } from "../order/myOrdersApi";

const API_BASE_URL = "/api/inquiry";

export interface Inquiry {
  inquiryIdx: number;
  inquiryTitle: string;
  inquiryContent: string;
  inquiryType: string; // 공통코드 label로 내려주는 값
  inquiryStatus: "WAIT" | "DONE";
  createdAt: string;

  // ⭐ 관리자 답변
  answerContent?: string;
  answeredAt?: string;
}

// 문의 등록
export const createInquiry = (data: {
  inquiryTitle: string;
  inquiryContent: string;
  inquiryTypeCommonIdx: number;
}) => {
  return axiosInstance.post(`${API_BASE_URL}/create`, data);
};

export const getMyOrdersForInquiry = async (): Promise<Order[]> => {
  const response = await axiosInstance.get<Order[]>(`${API_BASE_URL}/orders`);
  return response.data; // 이제 호출하는 쪽에서 바로 Order[]
};

// 문의 목록 조회 (로그인 사용자 기준)
export const getInquiryList = () => {
  return axiosInstance.get(`${API_BASE_URL}/my`);
};

// 문의 삭제
export const deleteInquiry = (inquiryIdx: number) => {
  return axiosInstance.delete(`${API_BASE_URL}/${inquiryIdx}`);
};

// 문의 수정
export const updateInquiry = (
  inquiryIdx: number,
  data: {
    inquiryTitle: string;
    inquiryContent: string;
    inquiryTypeCommonIdx: number;
  },
) => {
  return axiosInstance.put(`${API_BASE_URL}/${inquiryIdx}`, data);
};
