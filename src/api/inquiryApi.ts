import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/inquiry";

// 문의 등록
export const createInquiry = (data: {
  inquiryTitle: string;
  inquiryContent: string;
  inquiryTypeCommonIdx: number;
}) => {
  return axios.post(`${API_BASE_URL}/create`, data);
};

// 문의 목록 조회
export const getInquiryList = (memberIdx: number) => {
  return axios.get(`${API_BASE_URL}/${memberIdx}`);
};
// 문의 목록 삭제
export const deleteInquiry = (inquiryIdx: number) => {
  return axios.delete(`${API_BASE_URL}/${inquiryIdx}`);
};

//문의 목록 수정
export const updateInquiry = (
  inquiryIdx: number,
  data: {
    inquiryTitle: string;
    inquiryContent: string;
    inquiryTypeCommonIdx: number;
  }
) => {
  return axios.put(`${API_BASE_URL}/${inquiryIdx}`, data);
};
