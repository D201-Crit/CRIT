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
    width: 60%;
    height: 50px;
    border-radius: 5px;
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
`;

export const SMoveSignUp = styled(Link)`
  text-decoration: none;
  color: blue;
  text-align: center;
`;

export const SKakaoLoginButton = styled.img`
  width: 40%;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;
export const SNaverLoginButton = styled.img`
  width: 40%;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;
export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;
