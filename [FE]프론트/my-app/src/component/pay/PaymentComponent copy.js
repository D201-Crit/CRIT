import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PaymentComponent from './PaymentComponent';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../api/api';



const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/payment';

const Pay = () => {
  const user = useSelector((state) => state.users);
  const [amount, setAmount] = useState('');
  const handlePaymentSuccess = (pg_token) => {
    api.get(`${API_BASE_URL}/success`,
      {params:{
        pg_token: pg_token
      }},
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log('결제 승인 완료:', res.data);
        // 추가 처리나 리다이렉트 등이 필요하면 이곳에서 처리합니다.
      })
      .catch((res) => {
        console.log(res);
        console.log("결제 승인 도중 에러 발생");
      });
  };
  
  const handlePaymentFail = () => {
    console.log("결제 실패");
    // 실패 시 알맞은 처리를 이곳에서 수행합니다.
  };
  
  const handlePaymentCancel = () => {
    console.log("결제 취소");
    // 취소 시 맞은 처리를 이곳에서 수행합니다.
  };
    api.get(`${API_BASE_URL}/refund`,
      {params:{
        amount : amount
      }},
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log('환불 처리 완료:', res.data);
        // 환불 처리 완료 후, 추가적인 동작을 이곳에서 수행합니다.
      })
      .catch((res) => {
        console.log(res);
        console.log("환불 처리 도중 에러 발생");
      });
  
  return (
    <div>
    <Router>
      <Switch>
        // 기타 라우팅
        <Route path="payment/success" component={PaymentSuccessComponent} />
        <Route path="/payment/fail" component={PaymentFailComponent} />
        <Route path="/payment/cancel" component={PaymentCancelComponent} />
      </Switch>
    </Router>
    </div>

  );
  };

export default Pay;