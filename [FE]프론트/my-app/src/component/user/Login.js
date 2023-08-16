import { api } from "../../api/api";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useInput from "../../hooks/useInput";
import {
  Error,
  SForm,
  SLoginButton,
  SSpan,
} from "../../styles/pages/SLoginPage";
import { setUser } from "../../slice/UserSlice";
import { persistor } from "../../store";
const Login = () => {
  const [logInError, setLogInError] = useState(false);
  const [id, onChangeid] = useInput("");
  const [password, onChangePassword] = useInput("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      api
        .post("https://i9d201.p.ssafy.io/api/auth/login", {
          id,
          password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.cashPoint);
          dispatch(
            setUser({
              id: res.data.id,
              nickname: res.data.nickname,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            })
          );
          persistor.flush(); // 상태를 영구적으로 저장
          nav("/MainPage");
        })
        .catch((error) => {
          console.log(error);
          setLogInError(error.response?.status === 400);
        });
    },
    [id, password]
  );
  return (
    <SForm onSubmit={onSubmit}>
      <SSpan>
        <input
          type="id"
          id="id"
          name="id"
          value={id}
          onChange={onChangeid}
          placeholder="아이디"
        />
      </SSpan>
      <SSpan>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
        />
      </SSpan>
      <SSpan>
        <SLoginButton>로그인</SLoginButton>
      </SSpan>
      {logInError && <Error>아이디 또는 비밀번호가 일치하지 않습니다.</Error>}
    </SForm>
  );
};
export default Login;
