import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const getNewAccessToken = async (refreshToken) => {
  console.log(111);
  try {
    // 서버로 RefreshToken을 보내어 새로운 AccessToken을 받아옴
    console.log(222);
    console.log(refreshToken);
    const response = await axios
      .post("http://localhost:8080/api/auth/token", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const newAccessToken = response.data.token;
    console.log(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

export { api, getNewAccessToken };
