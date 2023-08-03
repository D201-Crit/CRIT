import React, { useState, useEffect } from "react";
import axios from "axios";

const PayResultPage = (props) => {
  const {
    location: { search },
  } = props;

  const pg_token = search.split("=")[1];
  const tid = window.localStorage.getItem("tid");

  const [params, setParams] = useState({
    cid: "TC0ONETIME",
    tid,
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    pg_token,
  });

  useEffect(() => {
    axios({
      url: "/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      console.log(response);
    });
  }, []);

  return (
    <div>
      <h2>Result page</h2>
    </div>
  );
};

export default PayResultPage;
