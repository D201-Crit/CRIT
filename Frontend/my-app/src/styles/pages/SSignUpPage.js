import styled from "styled-components";
export const SSignUpWrapper = styled.div`
  position: absolute;
  top: 480px;
  left: 52%;
  height: 700px;
  transform: translate(-50%, -50%);
`;

export const SForm = styled.form`
  span {
    display: block;
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    font-family: "Pretendard";
    font-weight: 500;
    type: text;
    width: 300px;
    height: 35px;
    padding: 0 10px 0 10px;
    border-radius: 5px;
  }
`;

export const SCheckButton = styled.button`
  background-color: #0000c5;
  color: white;
  border: none;
  width: 100px;
  height: 30px;
  margin: 0px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  font-family: "Pretendard";
`;

export const SButtonWrapper = styled.div`
  text-align: center;
`;

export const SSignUpbutton = styled.button`
  background-color: #33ff00;
  border: none;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  type: submit;
  font-size: 20px;
  font-weight: 500;
  font-family: "Pretendard";
  margin-top: 20px;
`;

export const ErrorWrapper = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
  font-size: 16px;
  font-family: "Pretendard";
`;

export const SuccessWrapper = styled.div`
  color: #2eb67d;
  font-weight: bold;
  font-size: 16px;
  font-family: "Pretendard";
`;
