import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const registrationId = "kakao";
  const state = "200";

  const kakaoLogin = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/login/oauth2/code/${registrationId}?code=${code}&state=${state}`,
    })
      .then((res) => {
        console.log(res);
        navigate("/IntroPage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    kakaoLogin();
  }, [code]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default KakaoCallback;
