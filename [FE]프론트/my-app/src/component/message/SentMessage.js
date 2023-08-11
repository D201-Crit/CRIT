import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SDeleteIcon } from '../../styles/pages/SMessage';
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
      <h3>보낸 메시지</h3>
      {sentMessage.length ? (
        <div>
          {sentMessage
            .filter((message) => {
              console.log("senderName: ", message.receiverName); // 각 메시지의 받는사람
              console.log("User nickname: ", user.nickname); // 로그인한 사용자의 닉네임
              return user.nickname === message.senderName;
            })
          .map((message) => (
            <div key={message.id}>
              <div>
              <div>

                제목 :{message.title}
                <br />
                받는사람 : {message.receiverName}
                <br />
                내용 :{message.content}
                <SDeleteIcon onClick={()=>{deleteSentMessage(message.id)}}><RiDeleteBin5Fill/></SDeleteIcon>
                </div>

                <hr />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>보낸 메시지가 없습니다</div>
      )}
    </div>
  );
  
};
export default SentMessage;


//  // 분리된 조건을 사용하여 메시지 필터링
//  const filteredMessages = SentMessage.filter((message) => {
//   return user.nickname === message.receiverName;
// });

// return (
//   <div>
//     <h3>받은 메시지</h3>
//     {filteredMessages.length ? (
//       <div>
//         {filteredMessages.map((message) => (
//           <div key={message.id}>
//             <div>
//               제목: {message.title}
//               <br />
//               보낸사람: {message.senderName}
//               <br />
//               내용: {message.content}
//               <hr />
//             </div>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <div>받은 메시지가 없습니다</div>
//     )}
//   </div>
// );
// };

// export default SentMessage;





