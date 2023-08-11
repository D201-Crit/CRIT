import React from "react";
import { SKakaoLoginButton } from "../../../styles/pages/SLoginPage";

const KakaoLogin = () => {
  const CLIENT_ID = "abc570fb116bd926266e60e2e34149bb";
  const REDIRECT_URI = "https://i9d201.p.ssafy.io/api/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <SKakaoLoginButton
      alt="카카오 로그인"
      src="https://github.com/Jinga02/ChallengePJT/assets/110621233/9d33d4e5-fc99-438f-99f4-6c3fc27a63b5"
      onClick={() => (window.location.href = kakaoURL)}
    />
  );
};

export default KakaoLogin;
