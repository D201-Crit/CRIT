// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchMessages } from './../../slice/PaySlice';

// function Pay() {
//   const dispatch = useDispatch();
//   const messages = useSelector((state) => state.messages);

//   const handleClick = () => {
//     dispatch(fetchMessages());
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>데이터 불러오기</button>
//       {messages.map((message, index) => (
//         <p key={index}>{message.content}</p>
//       ))}
//     </div>
//   );
// }

// export default Pay;