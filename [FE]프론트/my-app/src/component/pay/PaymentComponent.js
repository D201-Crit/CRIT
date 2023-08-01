// PaymentComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PaymentComponent = () => {
  const user = useSelector((state) => state.users);
  const [amount, setAmount] = useState('');
  const [tid, setTid] = useState('');
  
  const handlePayment = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payment/pay', {
        params: { amount: amount },
        headers: {Authorization: `Bearer ${user.accessToken}`
        // headers: {Authorization:"KakaoAK abc570fb116bd926266e60e2e34149bb",
        // 'Content-type':"application/x-www-form-urlencoded;charset=utf-8"
       
        },
      });

      // tid를 상태(state)에 저장합니다.
      setTid(response.data.tid);

      // 리다이렉트 URL이 담긴 팝업을 엽니다.
      window.open(response.data.next_redirect_pc_url, '_blank');
    } catch (error) {
      console.error('결제 도중 에러 발생:', error);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await axios.get('/payment/success', {
        params: { pg_token: 'aaaaaaa' }, // 'aaaaaaa'를 실제 URL에서 받은 pg_token으로 대체하세요.
      });

      console.log('결제 승인 완료:', response.data);
      // 추가 처리나 리다이렉트 등이 필요하면 이곳에서 처리합니다.
    } catch (error) {
      console.error('결제 승인 도중 에러 발생:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="금액을 입력하세요"
      />
      <button onClick={handlePayment}>결제하기</button>
      <button onClick={handleApprove}>결제 승인하기</button>
    </div>
  );
};

export default PaymentComponent;
