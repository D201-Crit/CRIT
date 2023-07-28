import {
  SHr,
  SEmpty,
  SCommunityWrapper,
} from "../styles/pages/SCommunityPage";
import { SPayButton } from "../styles/pages/SPayPage";
import axios from "axios";
import React from "react";

class PayPage extends React.Component {
  // state = {
  //   // 응답에서 가져올 값들
  //   next_redirect_pc_url: "",
  //   tid: "",
  //   // 요청에 넘겨줄 매개변수들
  //   params: {
  //     cid: "TC0ONETIME",
  //     partner_order_id: "partner_order_id",
  //     partner_user_id: "partner_user_id",
  //     item_name: "초코파이",
  //     quantity: 1,
  //     total_amount: 2200,
  //     vat_amount: 200,
  //     tax_free_amount: 0,
  //     approval_url: "http://localhost:3000/",
  //     fail_url: "http://localhost:3000/",
  //     cancel_url: "http://localhost:3000/",
  //   },
  // };

  // componentDidMount() {
  //   const { params } = this.state;
  //   axios({
  //     // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
  //     url: "/v1/payment/ready",
  //     // 결제 준비 API는 POST 메소드라고 한다.
  //     method: "POST",
  //     headers: {
  //       // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
  //       Authorization: "KakaoAK de0e3076b485b703b1f1a40123456789",
  //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //     },
  //     // 설정한 매개변수들
  //     params,
  //   }).then((response) => {
  //     // 응답에서 필요한 data만 뽑는다.
  //     const {
  //       data: { next_redirect_pc_url, tid }
  //     } = response;

  //     console.log(next_redirect_pc_url);
  //     console.log(tid);
  //     // 응답 data로 state 갱신
  //     this.setState({ next_redirect_pc_url, tid });
  //   });
  // }

  // render() {
  //   const { next_redirect_pc_url } = this.state;

  
  render() {
    return (
    
    <div>
      <SCommunityWrapper>
      <SEmpty/>
      <h2>Pay page</h2>

      <SEmpty/>
      <SPayButton>결제하기</SPayButton>
      {/* <a href={ next_redirect_pc_url }> */}
        {/* { next_redirect_pc_url } */}
      {/* </a> */}
      </SCommunityWrapper>
      </div>
      );
  }
}
export default PayPage;


// const PayPage = () => {
  
//   return (
//     <>
//     <SCommunityWrapper>
//       <SEmpty/>
//       <h1>결제</h1>
//       <p>고객님께서 이용하신 카드대금을 결제일 이전에 미리 납입하는 서비스입니다.
//         즉시출금 거래는 통장 출금기준으로 1일 3회 거래 가능하며 추가거래를 원하시는
//         이용 건별로 전액선결제 및 부분선결제거래 가능하며 연회비/수수료는
//         전액선결제거래만 가능합니다.
//         <br/><br/>
//         회차성 상품(할부, 장기카드대출)의 당월 청구금액 확정 전 부분선결제거래 시 
//         월불입금이 재조정되어 당월에 청구 될 수 있으므로 거래에 유의하시기 바랍니다.
//         즉시출금 결제 내역은 "입금내역조회"에서 확인하실 수 있습니다.
//         고객님의 카드 결제계좌 금융기관에 따라 선결제 거래가 제한될 수 있습니다.
//         즉시출금거래 제한은행 : 상호저축은행, 산림조합중앙회, HSBC, 도이치은행, 씨티, 
//         축협, 증권사 계좌, 국민은행 가상계좌, BOA, BNP파리바은행
//       </p>

      
//       <SHr/>
//       <SEmpty/>
//       <SPayButton>결제하기</SPayButton>
//       <a href={next_redirect_pc_url}></a>
//       </SCommunityWrapper>
//     </>
//   );
// };

// export default PayPage;
