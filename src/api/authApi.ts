//인증 전용 api
import axiosInstance from "./axiosInstance";
import type {
    LoginRequest,
    EmailVerifyRequest,
    FindIdRequest,
    FindPwRequest
} from "../types/member";

//로그인 요청
export const login = async (loginData: LoginRequest): Promise<any> => {
    const params = new URLSearchParams();
    params.append("memberId", loginData.memberId);
    params.append("memberPw", loginData.memberPw);

    const response = await axiosInstance.post("/api/loginProc", params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return response.data;
};

/**
 * 아이디 중복 확인
 */
export const checkIdDuplicate = async (memberId: string): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>("/api/check-id", { memberId });
    return response.data;
};

/**
 * 이메일 중복 확인
 */
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>("/api/check-email", { email });
    return response.data;
};

/**
 * 이메일 인증번호 발송
 */
export const sendEmailAuth = async (email: string): Promise<any> => {
    const response = await axiosInstance.post("/api/email-send", { email });
    return response.data;
};

/**
 * 이메일 인증번호 확인
 */
export const verifyEmailCode = async (verifyData: EmailVerifyRequest): Promise<any> => {
    const response = await axiosInstance.post("/api/email-verify", verifyData);
    return response.data;
};

/**
 * 아이디 찾기
 */
export const findMemberId = async (findData: FindIdRequest): Promise<string> => {
    const response = await axiosInstance.post<string>("/api/find-id", findData);
    return response.data;
};

/**
 * 비밀번호 찾기 (임시 비밀번호 발송 등)
 */
export const findMemberPw = async (findData: FindPwRequest): Promise<string> => {
    const response = await axiosInstance.post<string>("/api/find-pw", findData);
    return response.data;
};
