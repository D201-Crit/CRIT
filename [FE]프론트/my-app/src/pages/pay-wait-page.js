import React, { useState, useEffect } from "react";
import axios from "axios";

const PayWaitPage = () => {
  const [state, setState] = useState({
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/payresult",
      fail_url: "http://localhost:3000/payresult",
      cancel_url: "http://localhost:3000/payresult",
    },
  });

  useEffect(() => {
    const { params } = state;
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      const {
        data: { next_redirect_pc_url, tid },
      } = response;

      console.log(next_redirect_pc_url);
      console.log(tid);
      window.localStorage.setItem("tid", tid);
      setState((prevState) => ({
        ...prevState,
        next_redirect_pc_url,
        tid,
      }));
    });
  }, []);

  const { next_redirect_pc_url } = state;
  return (
    <div>
      <h2>Pay page</h2>
      <a href={next_redirect_pc_url}>{next_redirect_pc_url}</a>
    </div>
  );
};
export default PayWaitPage;
