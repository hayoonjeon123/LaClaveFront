import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: "",
    withCredentials: true,
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
        if (error.response && error.response.status === 401) {
            if (error.config?.skipRedirect) {
                return Promise.reject(error);
            }
            if (error.config.url && error.config.url.includes("/loginProc")) {
                return Promise.reject(error);
            }

            console.warn("세션이 만료되었습니다. 로그아웃 처리합니다.");

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("memberId");

            window.location.href = "/loginProc";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
