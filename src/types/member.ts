// 회원 관련 types

// 회원정보 수정 DTO
export interface MemberUpdateDto {
    memberName?: string;
    nickname?: string;
    birth?: string; // "YYYY-MM-DD" ISO 문자열
    postCode?: string;
    address?: string;
    addressDetail?: string;
}

// 비밀번호 변경 DTO
export interface PasswordUpdateDto {
    currentPassword: string;
    newPassword: string;
}

// 회원 탈퇴 DTO
export interface WithdrawRequestDto {
    password: string;
}

// 회원가입 정보 DTO (SignUp 및 AiSelect에서 공유)
export interface SignUpRequestDto {
    memberId: string;
    memberPw: string;
    memberName: string;
    email: string;
    gender: string;
    birth: string;
    postCode: string;
    address: string;
    addressDetail: string;
    marketingAgree: number;
    height?: number;
    weight?: number;
    prefStyles?: string[];
}

// 로그인 요청 DTO
export interface LoginRequest {
    memberId: string;
    memberPw: string;
}

// 이메일 인증 요청 DTO
export interface EmailVerifyRequest {
    email: string;
    authCode: string;
}

// 아이디 찾기 요청 DTO
export interface FindIdRequest {
    memberName: string;
    email: string;
}

// 비밀번호 찾기 요청 DTO
export interface FindPwRequest {
    memberId: string;
    memberName: string;
    email: string;
}

// 계정 찾기 결과 데이터 (FindResult 페이지에서 사용)
export interface FindResultData {
    name: string;
    id?: string;
    email: string;
    password?: string;
}
