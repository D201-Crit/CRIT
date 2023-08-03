// MyComponent.js (예시 컴포넌트)

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { api, getNewAccessToken } from "./api";

const MyComponent = () => {
  const user = useSelector((state) => state.users);

  useEffect(() => {
    const storedData = localStorage.getItem("persist:root");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const usersData = JSON.parse(parsedData.users);
      const accessToken = usersData.accessToken;
      const refreshToken = usersData.refreshToken;

      // Request Interceptor 추가
      api.interceptors.request.use(
        async (config) => {
          // accessToken이 있으면 요청에 헤더에 포함하여 보냄
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }

          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      // Response Interceptor 추가
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          // 응답이 에러인 경우
          if (error.response && error.response.status === 401) {
            // 만료된 AccessToken으로 인증 실패한 경우
            try {
              // 새로운 AccessToken을 받아와서 다시 요청을 보냄
              const newAccessToken = await getNewAccessToken(refreshToken);
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              console.log("됨?");
              return api.request(error.config);
            } catch (refreshError) {
              // RefreshToken으로 AccessToken 재발급에 실패한 경우
              console.error("Failed to get new access token:", refreshError);
              throw error;
            }
          }

          // 그 외의 에러 처리
          return Promise.reject(error);
        }
      );
    } else {
      console.log("No data found in localStorage.");
    }
  }, [user.accessToken, user.refreshToken]);

  // ... (컴포넌트의 나머지 코드)
};

export default MyComponent;
