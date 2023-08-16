import Login from "../component/user/Login";
import KakaoLoginButton from "../component/user/socialLogin/KakaoLogin";

import {
  SLoginPageWrapper,
  SMoveSignUp,
  SSpan,
  SImg,
} from "../styles/pages/SLoginPage";

const LoginPage = () => {
  return (
    <SLoginPageWrapper>
      <SImg src={process.env.PUBLIC_URL + "/logo2.png"} alt="placeholder" />
      <Login />
      <SSpan>
        <h3>혹시 가입된 아이디가 없으신가요?</h3>
        <SMoveSignUp to="/SignUpPage">회원가입</SMoveSignUp>
      </SSpan>
      <SSpan>
        <KakaoLoginButton />
      </SSpan>
    </SLoginPageWrapper>
  );
};

export default LoginPage;
