import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

const Payment = () => {
  const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/payment';
  const user = useSelector((state) => state.users);
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleClickPay = async () => {
    try {
      const token = user.accessToken;
      const response = await axios.get(`${API_BASE_URL}/pay`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          amount: amount,
        },
      });
      console.log(response)
      const { next_redirect_pc_url } = response.data;
      window.location.href = next_redirect_pc_url;
    } catch (error) {
      console.error("카카오페이 요청에 문제가 발생했습니다.", error);
    }
  };

  return (
    <>
      <h1>결제하기</h1>
      <label htmlFor="amount">금액: </label>
      <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
      <button onClick={handleClickPay}>결제 요청</button>
    </>
  );
};

export default Payment;
