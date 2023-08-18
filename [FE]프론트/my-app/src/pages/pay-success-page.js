import { useLocation } from "react-router-dom";
import { api } from "../api/api";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  PaySuccessWrapper,
  PaySuccessTitle,
  PaySuccessInfo,
  PaySuccessParagraph,
  PaySuccessPaymentInfo,
} from "../styles/pages/SPayPage";

const API_BASE_URL = "https://i9d201.p.ssafy.io/api/payment";
const PaySuccessPage = () => {
  useEffect(() => {
    payComplete();
  }, []);

  const user = useSelector((state) => state.users);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pg_token = queryParams.get("pg_token");
  const [payresult, setPayResult] = useState({});

  const payComplete = () => {
    api
      .get(`${API_BASE_URL}/success`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        params: {
          pg_token: pg_token,
        },
      })
      .then((res) => {
        setPayResult(res.data);
      })
      .catch((res) => {
        console.log("페이 요청 에러", res);
      });
  };

  return (
    <PaySuccessWrapper>
      <PaySuccessTitle>포인트 결제가 완료되었습니다.</PaySuccessTitle>

      <PaySuccessInfo>
        <h3>결제 상세정보</h3>
        <PaySuccessPaymentInfo>
          결제일시: {payresult.approved_at}
          <br />
          주문번호: {payresult.partner_order_id}
          <br />
          상품명: {payresult.item_name}
          <br />
          결제금액: {payresult.amount?.total}
          <br />
          결제방법: {payresult.payment_method_type}
        </PaySuccessPaymentInfo>
        <PaySuccessParagraph>오늘 하루도 행복하세요.</PaySuccessParagraph>
      </PaySuccessInfo>
    </PaySuccessWrapper>
  );
};

export default PaySuccessPage;
