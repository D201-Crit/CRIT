import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../../slice/UserSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../../../store";
import Swal from "sweetalert2";

const KakaoCallback = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  const registrationId = "kakao";
  const state = "200";
  const kakaoLogin = () => {
    axios({
      method: "POST",
      // url: `http://localhost:8080/oauth/login/oauth2/code/${registrationId}?code=${code}&state=${state}`,
      url: `https://i9d201.p.ssafy.io/api/oauth/login/oauth2/code/${registrationId}?code=${code}&state=${state}`,
    })
      .then((res) => {
        console.log(res);
        dispatch(
          setUser({
            id: res.data.id,
            nickname: res.data.nickname,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          }),
        );
        persistor.flush(); // 상태를 영구적으로 저장
        Swal.fire({
          position: "center",
          icon: "success",
          title: "로그인 완료",
          text: "CRIT 시작~",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          // width: "500px",
          // 먼지
          // imageUrl: 'https://unsplash.it/400/200',
          // imageWidth: 400,
          // imageHeight: 200,
          // imageAlt: 'Custom image',
        });

        nav("/MainPage");
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
