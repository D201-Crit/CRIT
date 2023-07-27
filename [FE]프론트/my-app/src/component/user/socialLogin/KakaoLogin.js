import React from "react";
import { SKakaoLoginButton } from "../../../styles/pages/SLoginPage";

const KakaoLogin = () => {
  const CLIENT_ID = "abc570fb116bd926266e60e2e34149bb";
  const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <SKakaoLoginButton
      alt="카카오 로그인"
      src="https://github.com/Jinga02/React/assets/110621233/ae318c12-05f7-4318-947d-d60f181bf2c1"
      onClick={() => (window.location.href = kakaoURL)}
    />
  );
};

export default KakaoLogin;
