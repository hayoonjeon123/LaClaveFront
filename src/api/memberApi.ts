import axios from "axios";
import axiosInstance from "./axiosInstance";

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

// === 회원 탈퇴 DTO ===
export interface WithdrawRequestDto {
  password: string;
}

// === 회원정보 수정 ===
export const updateMemberInfo = async (
  data: MemberUpdateDto
): Promise<string> => {
  try {
    const response = await axiosInstance.put(`/api/update-info`, data, {
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
    const response = await axiosInstance.get("/api/info", {
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
    const response = await axiosInstance.put("/api/update-password", data, {
      withCredentials: true,
    });
    return response.data; // "비밀번호가 변경되었습니다."
  } catch (error) {
    console.error("비밀번호 변경 실패:", error);
    throw error;
  }
};

// === 회원 탈퇴 ===
export const withdrawMember = async (
  data: WithdrawRequestDto
): Promise<string> => {
  try {
    const response = await axiosInstance.put("/api/withdraw", data, {
      withCredentials: true, // 세션 인증
    });
    return response.data; // "회원 탈퇴가 완료되었습니다."
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    throw error;
  }
};
