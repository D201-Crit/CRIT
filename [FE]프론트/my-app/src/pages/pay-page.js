
import React from 'react';
import Payment from '../component/pay/PaymentComponent';

import { SPayWrapper, SPayInfoArea , SPayEmpty} from '../styles/pages/SPayPage';
import { SDividerLine } from '../styles/pages/SMainPage'
import PayInfomation from '../component/pay/PayInfomation';


function PayPage() {
  return (
    <div>
    <SPayWrapper>
      <h1>포인트 충전</h1>
      <SDividerLine/>
      <SPayEmpty/>
      <Payment />
      <SPayEmpty/>

    </SPayWrapper>

    <SPayInfoArea>
    <SDividerLine/>
    <PayInfomation/>
    </SPayInfoArea>
    </div>
  );
}

export default PayPage;
