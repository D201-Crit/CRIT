import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import { SButton } from '../../styles/SCommon';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { 
        SMessageList,
        SMessageItem,
        SDeleteIconButton,
        } 
from '../../styles/pages/SMessage';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/messages';
const ReceivedMessage = (setMassageView) => {
  const user = useSelector((state) => state.users);
  const [receivedMessage,setReceivedMessage] = useState([]);

  useEffect(() => {
    getReceivedMessage();
  }, []);


  const getReceivedMessage = () => {
    api
      .get(`${API_BASE_URL}/received`,{
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        },
      })
      .then((res) => {
        console.log(res);
        setReceivedMessage(res.data.data.sort((a, b) => new Date(b.id) - new Date(a.id)))
      })
      .catch((err)=>{
        console.log(err)
      });
  };
  
  // 보낸 메시지 삭제
  const deleteReceivedMessage = (messageId) => {
    api
      .delete(`${API_BASE_URL}/received/${messageId}`,{
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        },
      })
      .then((res) => {
        getReceivedMessage();
        console.log("삭제성공",res);
      })
      .catch((err)=>{
        console.log("삭제실패",err)
      });
  };

  return (
  <div>
    <h3 style={{margin: '20px 10px' }}>받은 메시지</h3>
    <SMessageList>
      {receivedMessage.length ? (
        receivedMessage
          .filter((message) => {
            return user.nickname === message.receiverName;
          })
          .map((message) => (
            <SMessageItem key={message.id}>
              제목 : {message.title}
              <br />
              보낸사람 : {message.senderName}
              <br />
              내용 : {message.content}
              <SDeleteIconButton
                onClick={() => {
                  deleteReceivedMessage(message.id);
                }}
              >
                <RiDeleteBin5Fill />
              </SDeleteIconButton>
              <hr />
            </SMessageItem>
          ))
      ) : (
        <div>받은 메시지가 없습니다</div>
      )}
    </SMessageList>
  </div>
);

  
};
export default ReceivedMessage;

