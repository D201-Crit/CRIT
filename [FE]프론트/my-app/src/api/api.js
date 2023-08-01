import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const getNewAccessToken = async (refreshToken) => {
  try {
    // 서버로 RefreshToken을 보내어 새로운 AccessToken을 받아옴
    const response = await api.post("/refresh", { refreshToken });
    const newAccessToken = response.data.accessToken;
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

export { api, getNewAccessToken };
