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
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SignUp = () => {
  const [id, onChangeId] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [checkId, setCheckId] = useState(false);
  const [checkNickname, setcheckNickname] = useState(false);
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
  const onCheckId = (userId) => {
    if (userId.length > 20 || userId.length < 5) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "아이디는 \n5자이상 20이하여야 합니다.",
        text: "CRIT",
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
      });
    } else {
      axios
        .post(
          `https://i9d201.p.ssafy.io/api/auth/valid/userId?userId=${userId}`
        )
        .then((res) => {
          if (
            res.data
              ? Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "사용가능한 아이디입니다.",
                  text: "CRIT",
                  showConfirmButton: false,
                  timer: 1500,
                  background: "#272727",
                  color: "white",
                })
              : Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "이미 사용중인 아이디입니다.",
                  text: "CRIT",
                  showConfirmButton: false,
                  timer: 1500,
                  background: "#272727",
                  color: "white",
                })
          )
            // 중복 확인 성공한 경우 id 중복 상태를 false로 변경
            setCheckId(true);
        })
        .catch((err) => {
          console.log(err);
          // 중복 확인 실패한 경우 id 중복 상태를 true로 변경
          setCheckId(false);
        });
    }
  };

  const onCheckNickname = (nickname) => {
    if (nickname.length > 10 || nickname.length < 2) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "닉네임은\n2자이상 10이하여야 합니다.",
        text: "CRIT",
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
      });
    } else {
      axios
        .post(
          `https://i9d201.p.ssafy.io/api/auth/valid/nickname?nickname=${nickname}`
        )
        .then((res) => {
          if (
            res.data
              ? Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "사용가능한 닉네임입니다.",
                  text: "CRIT",
                  showConfirmButton: false,
                  timer: 1500,
                  background: "#272727",
                  color: "white",
                })
              : Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "이미 사용중인 닉네임입니다.",
                  text: "CRIT",
                  showConfirmButton: false,
                  timer: 1500,
                  background: "#272727",
                  color: "white",
                })
          )
            // 중복 확인 성공한 경우 nickname 중복 상태를 false로 변경
            setcheckNickname(true);
        })
        .catch((err) => {
          console.log(err);
          // 중복 확인 실패한 경우 nickname 중복 상태를 true로 변경
          setcheckNickname(false);
        });
    }
  };

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

      if (!checkId) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "아이디 중복체크를 해주세요.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      }
      if (!checkNickname) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "닉네임 중복체크를 해주세요.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      }
      if (id.length > 20 || id.length < 5) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "아이디는 \n5자이상 20이하여야 합니다.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      }
      if (nickname.length > 10 || nickname.length < 2) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "닉네임은\n2자이상 10이하여야 합니다.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      }
      if (password.length > 20 || password.length < 8) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "비밀번호는 \n8자이상 20이하여야 합니다.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      }
      if (email === "") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "이메일을 입력해주세요.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      }
      if (
        !mismatchError &&
        checkId &&
        checkNickname &&
        nickname &&
        email &&
        password
      ) {
        console.log("서버로 회원가입하기");
        // 요청 전 초기화
        // 요청을 여러번 할때 초기값이 이상할 수 있으니
        setSignUpError("");
        setSignUpSuccess(false);
        axios
          .post("https://i9d201.p.ssafy.io/api/auth/signup", {
            id,
            password,
            email,
            nickname,
          })
          .then((response) => {
            setSignUpSuccess(true);
            nav("/LoginPage");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "회원가입 완료!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [email, nickname, password, passwordCheck, checkId, checkNickname]
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
            placeholder="아이디는 5자이상 20자이하"
          />
          <SCheckButton type="button" onClick={() => onCheckId(id)}>
            중복확인
          </SCheckButton>
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
          <SCheckButton type="button" onClick={() => onCheckNickname(nickname)}>
            중복확인
          </SCheckButton>
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
