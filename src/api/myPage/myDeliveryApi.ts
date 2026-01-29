import axiosInstance from "../axiosInstance";

export interface MyDelivery {
  deliveryIdx: number;
  orderIdx: number;
  memberIdx: number;
  deliveryStatusCommonIdx: number;
  startDate: string;
  endDate: string | null;
  trackingNO: string;
  courier: string;
  updatedAt: string | null;
}

// // 로그인한 회원 기준 호출
// export const getMyDeliveryListByMember = async (): Promise<MyDelivery[]> => {
//   try {
//     const response = await axiosInstance.get<MyDelivery[]>(
//       `${API_BASE_URL}/member`,
//       {
//         withCredentials: true,
//       },
//     );

//     if (!Array.isArray(response.data)) {
//       console.warn("배송 데이터가 배열이 아님:", response.data);
//       return [];
//     }

//     return response.data;
//   } catch (error) {
//     console.error("배송 정보 조회 실패:", error);
//     return [];
//   }
// };
// myDeliveryApi.ts
const API_BASE_URL = "/api/myDelivery";

export const getDeliveryByOrder = async (orderIdx: number) => {
  const res = await axiosInstance.get(`${API_BASE_URL}/${orderIdx}/delivery`);
  return res.data;
};
