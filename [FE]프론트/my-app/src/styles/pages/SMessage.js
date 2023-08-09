import styled from "styled-components";

export const SMessageWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  color : black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 870px;
  height: 870px;
  max-height: 600px;
  
  background: #f8f8f8;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
export const SForm = styled.form`
  position: relative;
  max-height: 500px;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 6px 0;
  padding: 8px 12px;

`;
export const SInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 6px 0;
  padding: 8px 12px;
  width: 60%;
`;

export const SInputContext = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 6px 0;
  padding: 8px 12px;
  width: 60%;
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
  padding: 8px 16px;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: #1877f2;
  }
`;

export const SMessageBox = styled.div`
  width: 800px;
  height: 425px;
  max-height: 500px;
  max-width: 800px;
  margin-bottom : 30px;
  color : black;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
