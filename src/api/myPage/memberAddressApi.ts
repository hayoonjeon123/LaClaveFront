import axiosInstance from "../axiosInstance";

export interface MemberAddress {
  addressIdx?: number;
  recipientName: string;
  addressName: string;
  phone: string;
  postCode: string;
  address: string;
  addressDetail: string;
  isDefault?: boolean;
}

export interface MemberAddressDto {
  addressIdx: number;
  recipientName: string;
  addressName: string;
  phone: string;
  postCode: string;
  address: string;
  addressDetail: string;
  isDefault?: boolean;
}

const API_BASE_URL = "/api/member/address";

// ✅ 1. 주소 등록
export const registerAddress = async (
  address: MemberAddress,
): Promise<number | null> => {
  try {
    const response = await axiosInstance.post<number>(API_BASE_URL, address, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("주소 등록 실패:", error);
    return null;
  }
};

// ✅ 2. 회원 주소 목록 조회
export const getMyAddressList = async (): Promise<MemberAddressDto[]> => {
  try {
    const response = await axiosInstance.get<MemberAddressDto[]>(API_BASE_URL, {
      withCredentials: true,
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("주소 목록 조회 실패:", error);
    return [];
  }
};

// ✅ 3. 특정 주소 조회
export const getAddress = async (
  addressIdx: number,
): Promise<MemberAddressDto | null> => {
  try {
    const response = await axiosInstance.get<MemberAddressDto>(
      `${API_BASE_URL}/${addressIdx}`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("주소 조회 실패:", error);
    return null;
  }
};

// ✅ 4. 주소 수정
export const modifyAddress = async (
  addressIdx: number,
  updatedAddress: MemberAddress,
): Promise<boolean> => {
  try {
    await axiosInstance.put(`${API_BASE_URL}/${addressIdx}`, updatedAddress, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.error("주소 수정 실패:", error);
    return false;
  }
};

// ✅ 5. 주소 삭제
export const removeAddress = async (addressIdx: number): Promise<boolean> => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/${addressIdx}`, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.error("주소 삭제 실패:", error);
    return false;
  }
};
