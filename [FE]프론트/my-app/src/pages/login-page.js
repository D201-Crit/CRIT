import React, { useCallback, useState } from "react";
import SKakaoLoginButton from "../component/user/socialLogin/KakaoLogin";
import SNaverLoginButton from "../component/user/socialLogin/NaverLogin";
import useInput from "../hooks/useInput";
import {
  SLoginPageWrapper,
  SForm,
  SSpan,
  SLoginButton,
  SMoveSignUp,
  Error,
} from "../styles/pages/SLoginPage";
import axios from "axios";

const LoginPage = () => {
  const [logInError, setLogInError] = useState(false);
  const [id, onChangeid] = useInput("");
  const [password, onChangePassword] = useInput("");
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post("http://localhost:8080/api/auth/login", {
          id,
          password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.dir(error);
          setLogInError(error.response?.status === 400);
        });
    },
    [id, password]
  );

  return (
    <SLoginPageWrapper>
      <h1>CRIT</h1>
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
      </SForm>
      {logInError && (
        <Error>이메일 또는 비밀번호 조합이 일치하지 않습니다.</Error>
      )}
      <SSpan>
        <h3>혹시 가입된 아이디가 없으신가요?</h3>
        <SMoveSignUp to="/SignUpPage">회원가입</SMoveSignUp>
      </SSpan>
      <SSpan>
        <SNaverLoginButton />
        <SKakaoLoginButton />
      </SSpan>
    </SLoginPageWrapper>
  );
};

export default LoginPage;
