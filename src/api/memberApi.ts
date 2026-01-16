import axios from "axios";

const API_BASE_URL = "/api/member";

// === 회원정보 수정 DTO ===
export interface MemberUpdateDto {
  memberName?: string;
  nickname?: string;
  birth?: string; // "YYYY-MM-DD" ISO 문자열
  postCode?: string;
  address?: string;
  addressDetail?: string;
}

// === 비밀번호 변경 DTO ===
export interface PasswordUpdateDto {
  currentPassword: string;
  newPassword: string;
}

// === 회원정보 수정 ===
export const updateMemberInfo = async (
  data: MemberUpdateDto
): Promise<string> => {
  try {
    const response = await axios.put(`/api/update-info`, data, {
      withCredentials: true, // 세션 인증 포함
    });
    return response.data; // "회원정보가 수정되었습니다."
  } catch (error) {
    console.error("회원정보 수정 실패:", error);
    throw error;
  }
};

// === 회원정보 조회 ===
export const getMemberInfo = async () => {
  try {
    const response = await axios.get("/api/info", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("회원정보 수정 실패:", error);
    throw error;
  }
};

// === 비밀번호 변경 ===
export const updatePassword = async (
  data: PasswordUpdateDto
): Promise<string> => {
  try {
    const response = await axios.put("/api/update-password", data, {
      withCredentials: true,
    });
    return response.data; // "비밀번호가 변경되었습니다."
  } catch (error) {
    console.error("비밀번호 변경 실패:", error);
    throw error;
  }
};
