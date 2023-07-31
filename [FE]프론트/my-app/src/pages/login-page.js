import Login from "../component/user/Login";
import SKakaoLoginButton from "../component/user/socialLogin/KakaoLogin";
import SNaverLoginButton from "../component/user/socialLogin/NaverLogin";
import {
  SLoginPageWrapper,
  SMoveSignUp,
  SSpan,
} from "../styles/pages/SLoginPage";

const LoginPage = () => {
  return (
    <SLoginPageWrapper>
      <Login />
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
