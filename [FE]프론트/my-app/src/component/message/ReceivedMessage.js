import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import { SButton } from '../../styles/SCommon';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SDeleteIcon } from '../../styles/pages/SMessage';
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
      <h3>받은 메시지</h3>
      {receivedMessage.length ? (
        <div>
          {receivedMessage
            .filter((message) => {
              console.log("Receiver: ", message.receiverName); // 각 메시지의 받는사람
              console.log("User nickname: ", user.nickname); // 로그인한 사용자의 닉네임
              return user.nickname === message.receiverName;
            })
          .map((message) => (
            <div key={message.id}>
              <div>
                제목 :{message.title}
                <br />
                보낸사람 : {message.senderName}
                <br />
                내용 :{message.content}
                <SDeleteIcon onClick={()=>{deleteReceivedMessage(message.id)}}><RiDeleteBin5Fill/></SDeleteIcon>
                <hr />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>받은 메시지가 없습니다</div>
      )}
    </div>
  );
  
};
export default ReceivedMessage;

