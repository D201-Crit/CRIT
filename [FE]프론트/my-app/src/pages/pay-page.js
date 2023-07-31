import {
  SHr,
  SEmpty,
  SCommunityWrapper,
} from "../styles/pages/SCommunityPage";
import { SPayButton } from "../styles/pages/SPayPage";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PayPage = () => {
  const user = useSelector((state) => state.users); // useSelector를 사용하여 Redux 스토어의 사용자 상태 가져오기
  const [state, setState] = useState({
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "crit_order_id",
      partner_user_id: user.id, // 사용자 ID가 Redux 스토어에 올바르게 설정되었는지 확인
      item_name: "챌린지결제",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      next_redirect_pc_url: "",
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/PaySuccessPage",
      fail_url: "http://localhost:3000/PayConflictPage",
      cancel_url: "http://localhost:3000/PayCanclePage",
    },
  });

  const onPayButtonClick = async () => {
    const { params } = state;
    try {
      const response = await axios.get("http://localhost:8080/payment/pay", {
        headers: {
          Authorization: "KakaoAK 91918b0021b9bfad4201f53f12584d2c", // 실제 액세스 토큰으로 대체해야 합니다.
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params, // Axios 구성에 params 객체를 params 속성으로 전송
      });

      if (response.data) {
        const { next_redirect_pc_url, tid } = response.data;
        setState({ ...state, next_redirect_pc_url, tid });
        window.location.href = next_redirect_pc_url;
      }
    } catch (error) {
      console.error("결제 요청 오류:", error);
    }
  };

  return (
    <>
      <SCommunityWrapper>
        <SEmpty />
        <h1>결제</h1>
        <p>고객님께서 이용하신 카드대금을 결제일 이전에 미리 납입하는 서비스입니다.</p>
        {/* ... */}
        <SHr />
        <SEmpty />
        <SPayButton onClick={onPayButtonClick}>결제하기</SPayButton>
        <a href={state.next_redirect_pc_url}></a>
      </SCommunityWrapper>
    </>
  );
};

export default PayPage;
