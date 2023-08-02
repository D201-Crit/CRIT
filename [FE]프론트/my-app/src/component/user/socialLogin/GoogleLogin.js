import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// 나머지 import 생략...

const Google = () => {
  const CLIENT_ID =
    "654898016967-ga4did0cpou4r9ckv0r7ho42arkrtlc1.apps.googleusercontent.com";

  const handleGoogleLoginSuccess = (response) => {
    console.log("구글 로그인 성공", response);
    // 서버로 구글 로그인 정보를 전송하여 서버에서 처리할 수 있습니다.
    // 예를 들어, 서버에서 JWT 토큰을 발급하거나 사용자 정보를 저장할 수 있습니다.
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("구글 로그인 실패", error);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </GoogleOAuthProvider>
  );
};

export default Google;
