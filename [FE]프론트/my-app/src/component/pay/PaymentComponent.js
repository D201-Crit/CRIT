import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
const Payment = () => {
  const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/payment';
  const user = useSelector((state) => state.users);
  const [amount, setAmount] = useState("");
  const [tid, setTid] = useState("");

  const token = user.accessToken;

  const handleAmountChange = (e) => {
    setAmount(e.target.value.toString());
  };
 
  const handleClickPay =  () => {
    console.log(typeof amount);
    api.get(`${API_BASE_URL}/pay`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        amount: amount,
      },
    })
    .then((res) => {
      console.log("페이 요청 성공",res);
      window.location.href = res.data.next_redirect_pc_url;
      setTid(res.data.tid)
    })
    .catch((res) => {
      console.log("페이 요청 에러",res);
    });

    
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

// approval_url이 백에서 주어져있냐?
