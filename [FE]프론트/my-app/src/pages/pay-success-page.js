import { useLocation } from 'react-router-dom';
import { api } from '../api/api';
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';


const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/payment';
const PaySuccessPage = () => {
  useEffect(() => {
    payComplete();
  }, []);

  const user = useSelector((state) => state.users);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pg_token = queryParams.get('pg_token');
  const [payresult,setPayResult] = useState({});

  const payComplete = () =>{
    api.get(`${API_BASE_URL}/success`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      params: {
        pg_token: pg_token,
      },
    })
    .then((res) => {
      console.log("페이 요청 성공",res);
      setPayResult(res.data)
    })
    .catch((res) => {
      console.log("페이 요청 에러",res);
    });
  }

  return (
    <>
      <h1>결제 성공!!!!!!!!!</h1>
      {/* 여기에 pg_token 사용 */}
      <p>PG 토큰: {pg_token}</p>

      <div>
        <h2>Result page</h2>
        <p>
          카카오페이 결제가 정상적으로 완료되었습니다.
        </p>
        <p>
          결제일시:    {payresult.approved_at}<br/>
          주문번호:    {payresult.partner_order_id}<br/>
          상품명:      {payresult.item_name}<br/>
          결제금액:    {payresult.amount?.total}<br/>
          결제방법:    {payresult.payment_method_type}<br/>
        </p>
      </div>

      <p>동일한 주문번호라도 2개 이상의 브랜드에서 주문하신 경우 출고지 주소가 달라 각각 출고됩니다. (택배 박스를 2개 이상 수령 가능)
      출고 완료 직후 교환 / 환불 요청을 하더라도 상품을 수령하신 후 택배 업체를 통해 보내주셔야 처리 가능합니다.
      별도의 구매 결정이 없더라도 상품 배송 완료 후 7일이 지난 경우에는 자동 구매확정, 적립금이 자동 지급됩니다.
      자세한 내용은 FAQ를 확인하여 주시기 바랍니다.</p>

    </>
  );
};

export default PaySuccessPage;
