import axios from "axios";

const api = axios.create({
  baseURL: "https://i9d201.p.ssafy.io/api",
});

const getNewAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "https://i9d201.p.ssafy.io/api/token/reissue",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    const newAccessToken = response.data.token;
    console.log("newAccessToken:", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("액세스 토큰을 새로고침하는 데 실패했습니다:", error);
    throw error;
  }
};

export { api, getNewAccessToken };
