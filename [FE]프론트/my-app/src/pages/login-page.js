import Login from "../component/user/Login";
import KakaoLoginButton from "../component/user/socialLogin/KakaoLogin";
import NaverLoginButton from "../component/user/socialLogin/NaverLogin";
import GoogleLoginButton from "../component/user/socialLogin/GoogleLogin";

import {
  SGoogleButton,
  SLoginPageWrapper,
  SMoveSignUp,
  SSpan,
} from "../styles/pages/SLoginPage";

const LoginPage = () => {
  return (
    <SLoginPageWrapper>
      <img
        src={process.env.PUBLIC_URL + "/logo2.png"}
        style={{ width: "400px", height: "200px" }}
        alt="placeholder"
      />
      <Login />
      <SSpan>
        <h3>혹시 가입된 아이디가 없으신가요?</h3>
        <SMoveSignUp to="/SignUpPage">회원가입</SMoveSignUp>
      </SSpan>
      <SSpan>
        <NaverLoginButton />
        <KakaoLoginButton />
        {/* <GoogleLoginButton /> */}
      </SSpan>
    </SLoginPageWrapper>
  );
};

export default LoginPage;
