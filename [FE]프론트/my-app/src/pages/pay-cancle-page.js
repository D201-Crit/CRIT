
import React from 'react';

import { SPayWrapper, SPayInfoArea , SPayEmpty} from '../styles/pages/SPayPage';
import { SDividerLine } from '../styles/pages/SMainPage'
import PayInfomation from '../component/pay/PayInfomation';




const PayCanclePage = () => {
  return (
    <div>
    <SPayWrapper>
      <h1>결제가 취소되었습니다.</h1>
      <SDividerLine/>
    </SPayWrapper>

    </div>
  );
}


export default PayCanclePage;
