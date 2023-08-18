import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { SPayPaymentBox, SPayImg } from "../../styles/pages/SPayPage";
const Payment = () => {
  const API_BASE_URL = "https://i9d201.p.ssafy.io/api/payment";
  const user = useSelector((state) => state.users);
  const [amount, setAmount] = useState("");
  const [tid, setTid] = useState("");

  const token = user.accessToken;

  const handleAmountChange = (e) => {
    setAmount(e.target.value.toString());
  };

  const handleClickPay = () => {
    // console.log(typeof amount);
    api
      .get(`${API_BASE_URL}/pay`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          amount: amount,
        },
      })
      .then((res) => {
        // console.log("페이 요청 성공",res);
        window.location.href = res.data.next_redirect_pc_url;
        setTid(res.data.tid);
      })
      .catch((res) => {
        console.log("페이 요청 에러", res);
      });
  };

  return (
    <div>
      <SPayPaymentBox>
        <div>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <span onClick={handleClickPay}>결제 요청</span>
        </div>
      </SPayPaymentBox>
      <SPayImg>
        <img
          src={process.env.PUBLIC_URL + "/paymentImg.png"}
          alt="placeholder"
        />
      </SPayImg>
    </div>
  );
};

export default Payment;
