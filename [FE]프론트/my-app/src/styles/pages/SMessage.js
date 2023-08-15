import styled from "styled-components";
import { FiInbox, FiSend, FiMail } from 'react-icons/fi';

export const SMessageWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 880px;
  height: 800px;
  max-height: 630px;
  background: black;
  padding: 20px 20px 40px 20px;
  border-radius: 10px;
  box-shadow: 0 5px 30px rgba(255, 2550, 255, 0.25);
`;

export const SForm = styled.form`
  position: relative;
  align-items: center;
  max-height: 500px;
  max-width: 500px;
  font-family: "Pretendard";

  border-radius: 5px;
  margin: 6px 0;
  padding: 8px 15px;

`;
export const SInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: "Pretendard";
  margin: 6px 0;
  margin-top: 12px;
  padding: 8px 12px;
  width: 90%;
  font-weight : 1000;
`;

export const SInputContext = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 6px 0;
  font-family: "Pretendard";

  padding: 8px 12px;
  width: 90%;
  height: 200px;
  resize: none;
`;

export const SSubmitButton = styled.input`
  background-color: #3897f0;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 8px 16px;
  text-align: center;
  width: 20%;

  &:hover {
    background-color: #1877f2;
  }
`;

export const SMessageBox = styled.div`
  width: 800px;
  height: 500px;
  max-height: 500px;
  max-width: 800px;
  color: black;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


export const SDeleteIcon = styled.div`
color : #0000C5;

`


export const SMessageList = styled.div`
  width: 100%;
  height: auto;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 15px;
`;

export const SMessageItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative;
  word-wrap: break-word; 

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const SDeleteIconButton = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 5px;
  color: #0000c5;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  margin-top: 30px;

  justify-content: flex-end;
  width: 100%;
`;

export const StyledInbox = styled(FiInbox)`
  cursor: pointer;
  margin-right: 15px;
  font-size: 30px;
  color: white;
  &:hover {
    color: #1877f2;
  }
`;

export const StyledSent = styled(FiSend)`
  cursor: pointer;
  margin-right: 15px;
  font-size: 30px;
  color: white;

  &:hover {
    color: #1877f2;
  }
`;

export const StyledMail = styled(FiMail)`
  cursor: pointer;
  font-size: 30px;
  margin-right: 15px;
  color: white;

  &:hover {
    color: #1877f2;
  }
`;