import {
  SSignUpWrapper,
  SForm,
  SLabel,
  SSpan,
  SInput,
  SButtonWrapper,
  SSignUpbutton,
  SCheckButton,
} from "../../styles/pages/SignUpPageStyle";
const SignUp = () => {
  return (
    <SSignUpWrapper>
      <h1>CRIT</h1>
      <SForm>
        <SSpan>
          <SLabel>이메일</SLabel>
          <SInput placeholder="이메일형식(영문어아이디+ @이메일주소)" />
          <SCheckButton>중복확인</SCheckButton>
        </SSpan>
        <SSpan>
          <SLabel>비밀번호</SLabel>
          <SInput placeholder="비밀번호는 8자이상 20자이하" />
        </SSpan>
        <SSpan>
          <SLabel>비밀번호 확인</SLabel>
          <SInput />
        </SSpan>
        <SSpan>
          <SLabel>이름</SLabel>
          <SInput />
        </SSpan>
        <SSpan>
          <SLabel>닉네임</SLabel>
          <SInput placeholder="2자 이상 10자 이하" />
          <SCheckButton>중복확인</SCheckButton>
        </SSpan>
      </SForm>
      <SButtonWrapper>
        <SSignUpbutton>회원가입</SSignUpbutton>
      </SButtonWrapper>
    </SSignUpWrapper>
  );
};

export default SignUp;
