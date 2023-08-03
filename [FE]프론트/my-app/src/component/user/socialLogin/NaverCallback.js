import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NaverCallback = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const registrationId = "naver";
  const state = "200";

  const naverLogin = () => {
    axios({
      method: "GET",
      // url: `http://i9d201.p.ssafy.io/api/oauth/login/oauth2/code/${registrationId}?code=${code}&state=${state}`,
      url: `http://localhost:8080/oauth/login/oauth2/code/${registrationId}?code=${code}&state=${state}`,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("nickName", res.data.nickname);
        navigate("/IntroPage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    naverLogin();
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

export default NaverCallback;
