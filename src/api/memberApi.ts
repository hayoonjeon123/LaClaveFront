import axiosInstance from "./axiosInstance";
import type {
  MemberUpdateDto,
  PasswordUpdateDto,
  WithdrawRequestDto,
  SignUpRequestDto
} from "../types/member";

const API_BASE_URL = "/api/member";

// === 회원정보 수정 ===
export const updateMemberInfo = async (
  data: MemberUpdateDto
): Promise<string> => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/update-info`, data, {
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
    const response = await axiosInstance.get(`${API_BASE_URL}/info`, {
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
    const response = await axiosInstance.put(`${API_BASE_URL}/update-password`, data, {
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
    const response = await axiosInstance.put(`${API_BASE_URL}/withdraw`, data, {
      withCredentials: true, // 세션 인증
    });
    return response.data; // "회원 탈퇴가 완료되었습니다."
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    throw error;
  }
};

// === 회원가입 전송 ===
export const signUp = async (data: SignUpRequestDto): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/signup", data);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

/**
 * 로그아웃 요청
 */
export const logout = async (): Promise<void> => {
  await axiosInstance.post("/api/logout");
};

/**
 * 현재 로그인한 회원 상태 확인 (헤더용)
 */
export const getMemberStatus = async (): Promise<any> => {
  const response = await axiosInstance.get("/api/info", {
    // @ts-ignore
    skipRedirect: true,
  });
  return response.data;
};
