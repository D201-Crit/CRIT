import React from "react";
import { SGoogleButton } from "../../../styles/pages/SLoginPage";

const Google = () => {
  const CLIENT_ID = "abc570fb116bd926266e60e2e34149bb";
  const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";
  const googleURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <SGoogleButton
      alt="구글 로그인"
      src="https://github.com/Jinga02/ChallengePJT/assets/110621233/d34e9cf1-b931-4236-aa31-efec76d9dfca"
      onClick={() => (window.location.href = googleURL)}
    />
  );
};

export default Google;
