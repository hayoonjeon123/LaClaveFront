import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: "", // 프록시가 설정되어 있으므로 빈 문자열 또는 생략 가능
    withCredentials: true, // 세션 쿠키 포함
    headers: {
        "Content-Type": "application/json",
    },
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 401 Unauthorized 에러 처리 (세션 만료 등)
        if (error.response && error.response.status === 401) {
            // @ts-ignore
            if (error.config?.skipRedirect) {
                return Promise.reject(error);
            }

            // 로그인 요청에서 발생한 401은 리다이렉트 하지 않음 (비밀번호 틀림 등)
            if (error.config.url && error.config.url.includes("/loginProc")) {
                return Promise.reject(error);
            }

            console.warn("세션이 만료되었습니다. 로그아웃 처리합니다.");

            // 로컬 스토리지 정리
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("memberId");

            // 사용자에게 알림 (선택 사항 - 너무 자주 뜨면 방해될 수 있음)
            // alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");

            // 로그인 페이지로 리다이렉트
            // React Router의 navigate를 사용할 수 없는 곳이므로 window.location 사용
            window.location.href = "/loginProc";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
