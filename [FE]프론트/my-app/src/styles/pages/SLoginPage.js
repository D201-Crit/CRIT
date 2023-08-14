import styled from "styled-components";
import { Link } from "react-router-dom";

export const SLoginPageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const SForm = styled.form``;
export const SSpan = styled.span`
  display: block;
  margin: 20px 0;
  text-align: center;
  input {
    width: 200px;
    height: 50px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    font-family: "Pretendard";
  }
`;

export const SLoginButton = styled.button`
  background-color: #33ff00;
  border: none;
  width: 40%;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 1000;
  type: submit;
  font-size: 20px;
  font-weight: 600;
  font-family: "Pretendard";
`;

export const SMoveSignUp = styled(Link)`
  text-decoration: none;
  color: blue;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

export const SKakaoLoginButton = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
`;
export const SNaverLoginButton = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
`;
export const SGoogleButton = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  padding: 5px;
  background-color: white;
`;

export const Error = styled.div`
  color: #e01e5a;
  text-align: center;
  font-weight: bold;
  font-family: "Pretendard";
`;
