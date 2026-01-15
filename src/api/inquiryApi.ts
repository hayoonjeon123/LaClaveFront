import axios, { type AxiosResponse } from "axios";
import type { Order } from "./ordersApi";

const API_BASE_URL = "http://localhost:8080/api/inquiry";

// 문의 등록
export const createInquiry = (data: {
  inquiryTitle: string;
  inquiryContent: string;
  inquiryTypeCommonIdx: number;
}) => {
  return axios.post(`${API_BASE_URL}/create`, data, {
    withCredentials: true,
  });
};

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`, {
    withCredentials: true,
  });
  return response.data; // 이제 호출하는 쪽에서 바로 Order[]
};

// 문의 목록 조회 (로그인 사용자 기준)
export const getInquiryList = () => {
  return axios.get(`${API_BASE_URL}/my`, {
    withCredentials: true,
  });
};

// 문의 삭제
export const deleteInquiry = (inquiryIdx: number) => {
  return axios.delete(`${API_BASE_URL}/${inquiryIdx}`, {
    withCredentials: true,
  });
};

// 문의 수정
export const updateInquiry = (
  inquiryIdx: number,
  data: {
    inquiryTitle: string;
    inquiryContent: string;
    inquiryTypeCommonIdx: number;
  }
) => {
  return axios.put(`${API_BASE_URL}/${inquiryIdx}`, data, {
    withCredentials: true,
  });
};
