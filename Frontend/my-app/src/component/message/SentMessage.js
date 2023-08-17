import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  SMessageList,
  SMessageItem,
  SDeleteIconButton,
} from "../../styles/pages/SMessage";
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/messages';
const SentMessage = (setMassageView) => {
  const user = useSelector((state) => state.users);
  const [sentMessage,setSentMessage] = useState([]);

  useEffect(() => {
     getSentMessage();
  }, []);


  const getSentMessage = () => {
    api
      .get(`${API_BASE_URL}/sent`,{
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        },
      })
      .then((res) => {
        console.log(res);
        setSentMessage(res.data.data.sort((a, b) => new Date(b.id) - new Date(a.id)))
      })
      .catch((err)=>{
        console.log(err)
      });
  };
  // 보낸 메시지 삭제
  const deleteSentMessage = (messageId) => {
    api
      .delete(`${API_BASE_URL}/sent/${messageId}`,{
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        },
      })
      .then((res) => {
        getSentMessage();
        console.log("삭제성공",res);
      })
      .catch((err)=>{
        console.log("삭제실패",err)
      });
  };


  return (
    <div>
      <h3 style={{margin: '20px 10px' }}>보낸 메시지</h3>
      <SMessageList>
        {sentMessage.length ? (
          sentMessage
            .filter((message) => {
              return user.nickname === message.senderName;
            })
            .map((message) => (
              <SMessageItem key={message.id}>
                제목 : {message.title}
                <br />
                받는사람 : {message.receiverName}
                <br />
                내용 : {message.content}
                <SDeleteIconButton
                  onClick={() => {
                    deleteSentMessage(message.id);
                  }}
                >
                  <RiDeleteBin5Fill />
                </SDeleteIconButton>
                <hr />
              </SMessageItem>
            ))
        ) : (
          <div>보낸 메시지가 없습니다</div>
        )}
      </SMessageList>
    </div>
  );
};

export default SentMessage;

