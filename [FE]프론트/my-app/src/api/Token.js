import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api, getNewAccessToken } from "./api";
import { setUser } from "../slice/UserSlice";
import { persistor } from "../store";

const Token = () => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 상태인 경우에만 인터셉터 설정
    if (user?.accessToken) {
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
                dispatch(
                  setUser({
                    id: user.id,
                    nickname: user.nickname,
                    accessToken: newAccessToken,
                    refreshToken: user.refreshToken,
                  })
                );
                persistor.flush(); // 상태를 영구적으로 저장
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                console.log(newAccessToken + "받아왔다 성공");
                return api.request(error.config);
              } catch (refreshError) {
                // RefreshToken으로 AccessToken 재발급에 실패한 경우
                console.error("Failed to get new access token:", refreshError);
                throw error;
              }
            }
            return Promise.reject(error);
          }
        );
      } else {
        console.log("No data found in localStorage.");
      }
    }
  }, [user?.accessToken, dispatch]);

  // ... (이하 생략)
};

export default Token;
