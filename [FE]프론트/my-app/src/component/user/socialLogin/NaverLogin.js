import React from "react";
import { SNaverLoginButton } from "../../../styles/pages/SLoginPage";

const NaverLogin = () => {
  const CLIENT_ID = "L61z2MvnsWFQfYi7kRi2";
  const REDIRECT_URI = "https://i9d201.p.ssafy.io/login/oauth2/code/naver";
  const STATE = "RANDOM_STRING";
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  return (
    <SNaverLoginButton
      alt="네이버 로그인"
      src="https://github.com/Jinga02/ChallengePJT/assets/110621233/f4a3b544-c7ba-430a-9fb0-d0d158a66d71"
      onClick={() => (window.location.href = naverUrl)}
    />
  );
};

export default NaverLogin;
