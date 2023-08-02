import { useCallback, useState } from "react";
import {
  SSignUpWrapper,
  SForm,
  SButtonWrapper,
  SSignUpbutton,
  SCheckButton,
  ErrorWrapper,
  SuccessWrapper,
} from "../styles/pages/SSignUpPage";
import useInput from "../hooks/useInput";
import api from "../../api/api";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { api } from "../../api/api";
const SignUp = () => {
  returnconst[(id, onChangeId)] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const nav = useNavigate();
  // 비밀번호 확인
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    // 함수 기준 외부 변수만 deps[]에 작성
    [passwordCheck]
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password]
  );
  const [mismatchError, setMismatchError] = useState(false);
  // 가입 실패
  const [signUpError, setSignUpError] = useState("");
  // 가입 성공
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!mismatchError && nickname) {
        console.log("서버로 회원가입하기");
        // 요청 전 초기화
        // 요청을 여러번 할때 초기값이 이상할 수 있으니
        setSignUpError("");
        setSignUpSuccess(false);
        console.log("시발");
        api
          .post("http://localhost:8080/auth/signup", {
            id,
            password,
            email,
            nickname,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "회원가입 완료!",
              showConfirmButton: false,
              timer: 1500,
              // 먼지
              // imageUrl: 'https://unsplash.it/400/200',
              // imageWidth: 400,
              // imageHeight: 200,
              // imageAlt: 'Custom image',
            });
            nav("/LoginPage");
          })
          .catch((error) => {
            console.log(error);
            console.log(12321321321);
            setSignUpError(error.response.data);
          })
          // 성공하든 실패하든 실행
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck]
  );

  return (
    <SSignUpWrapper>
      <SForm onSubmit={onSubmit}>
        <span>
          <label>아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={onChangeId}
          />
          <SCheckButton>중복확인</SCheckButton>
        </span>
        <span>
          <label>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일형식(영문어아이디+ @이메일주소)"
          />
          <SCheckButton>중복확인</SCheckButton>
        </span>
        <span>
          <label>비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호는 8자이상 20자이하"
          />
        </span>
        <span>
          <label>비밀번호 확인</label>
          <input
            type="password"
            id="password-check"
            name="password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </span>

        <span>
          <label>닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={onChangeNickname}
            placeholder="2자 이상 10자 이하"
          />
          <SCheckButton>중복확인</SCheckButton>
        </span>
        {mismatchError && (
          <ErrorWrapper>비밀번호가 일치하지 않습니다.</ErrorWrapper>
        )}
        {!nickname && <ErrorWrapper>닉네임을 입력해주세요.</ErrorWrapper>}
        {signUpError && <ErrorWrapper>{signUpError}</ErrorWrapper>}
        {signUpSuccess && (
          <SuccessWrapper>회원가입되었습니다! 로그인해주세요.</SuccessWrapper>
        )}
        <SButtonWrapper>
          <SSignUpbutton>회원가입</SSignUpbutton>
        </SButtonWrapper>
      </SForm>
    </SSignUpWrapper>
  );
};
export default SignUp;
