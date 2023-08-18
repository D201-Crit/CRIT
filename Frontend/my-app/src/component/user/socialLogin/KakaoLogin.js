import React from "react";
import { SKakaoLoginButton } from "../../../styles/pages/SLoginPage";

const KakaoLogin = () => {
  const CLIENT_ID = "abc570fb116bd926266e60e2e34149bb";
  const REDIRECT_URI = "https://i9d201.p.ssafy.io/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <SKakaoLoginButton
      alt="카카오 로그인"
      src="https://github.com/Jinga02/ChallengePJT/assets/110621233/914f29ff-f571-4109-9ee4-58feacbb5c09"
      onClick={() => (window.location.href = kakaoURL)}
    />
  );
};

export default KakaoLogin;
