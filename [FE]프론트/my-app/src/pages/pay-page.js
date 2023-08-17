
import React from 'react';
import Payment from '../component/pay/PaymentComponent';
import { SPayWrapper } from '../styles/pages/SPayPage';
function PayPage() {
  return (
    <SPayWrapper>
      <h1>결제</h1>
      <Payment />
    </SPayWrapper>
  );
}

export default PayPage;
