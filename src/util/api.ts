import axios from 'axios';

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api`,
  timeout: 60000,
  withCredentials: true,
});

// Request interceptor to add the access token to every request
API.interceptors.request.use(
    async config => {
      // Retrieve the token from secure storage
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => {
      // Handle error
      return Promise.reject(error);
    },
);

// Response 인터셉터 추가
API.interceptors.response.use(
    (response) => {
      // 응답 데이터를 변환합니다.
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // 401 에러 처리 (토큰 만료)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 무한 루프 방지

        // refresh 요청이 아니고, 원래 요청이 401이면 갱신 시도
        if (!originalRequest.url.includes("/auth/refresh")) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return API(originalRequest); // 원래 요청 재시도
          }
        }
      }

      return Promise.reject(error);
    }
);

const refreshAccessToken = async () => {
  try {
    const res  = await API.post(`${import.meta.env.VITE_API_KEY}/api/auth/refresh`);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    localStorage.removeItem("accessToken");
    window.location.href = "/"; // 로그인 페이지로 이동
    return null;
  }
};
