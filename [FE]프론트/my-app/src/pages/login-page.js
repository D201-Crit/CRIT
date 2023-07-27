import React from "react";
import SKakaoLoginButton from "../component/user/socialLogin/KakaoLogin";
import SNaverLoginButton from "../component/user/socialLogin/NaverLogin";
import {
  SLoginPageWrapper,
  SForm,
  SSpan,
  SInput,
  SLoginButton,
  SMoveSignUp,
} from "../styles/pages/SLoginPage";

const LoginPage = () => {
  return (
    <SLoginPageWrapper>
      <h1>CRIT</h1>
      <SForm>
        <SSpan>
          <SInput placeholder="아이디" />
        </SSpan>
        <SSpan>
          <SInput placeholder="비밀번호" />
        </SSpan>
      </SForm>
      <SSpan>
        <SLoginButton>로그인</SLoginButton>
      </SSpan>
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
