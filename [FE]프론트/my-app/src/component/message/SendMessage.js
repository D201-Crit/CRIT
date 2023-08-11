import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import { SSubmitButton, SForm, SInput, SInputContext, SMessageBox } from '../../styles/pages/SMessage';


const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/messages';
const SendMessage = (setMassageView) => {
  const user = useSelector((state) => state.users);
  
  const [messageTosend,setMessageToSend] = useState({
    title: "",
    content: "",
    receiverName: ""
  }); // 댓글 목록 State

  // 입력 변화 감지
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setMessageToSend(prevMessage => ({
      ...prevMessage,
      [name]: value
    }));
  };
  
  // 공백 제거 및 입력 변화 감지
const handleReceiverNameChange = (event) => {
  const { name, value } = event.target;
  const trimmedValue = value.replace(/\s/g, ''); // 공백 제거

  setMessageToSend(prevMessage => ({
    ...prevMessage,
    [name]: trimmedValue
  }));
};


  // 메시지 보내기
  const sendMessage = async (event) => {
    event.preventDefault();
    api.post(`${API_BASE_URL}`,
    {
      title: messageTosend.title,
      content: messageTosend.content,
      receiverName: messageTosend.receiverName
    },
    console.log(messageTosend.title,messageTosend.content,messageTosend.receiverName),
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      setMessageToSend({
        title: "",
        content: "",
        receiverName: ""
      }); // 상태를 초기 상태로 설정
      console.log(res)
      console.log('메시지 보내기 성공!');
    })

    .catch((error) => {
      console.log(error)
      console.log('메시지 보내기 실패');
    })
  };
  return (
    <div>
      <h3>메시지 보내기</h3>
      <SForm onSubmit={sendMessage}>
        <label htmlFor="receiverName">받는 사람</label>
        <br/>
        <SInput
          id="receiverName"
          name="receiverName"
          type="text"
          value={messageTosend.receiverName}
          onChange={handleReceiverNameChange}
        />
        <SInput
          id="title"
          name="title"
          type="text"
          value={messageTosend.title}
          onChange={handleTextChange}
        />
        <SInputContext
          id="content"
        name="content"
          value={messageTosend.content}
          onChange={handleTextChange}
        />

         <br/>
          <SSubmitButton type="submit" value={"작성완료"}></SSubmitButton>
      </SForm>
    </div>
  );
};
export default SendMessage;
