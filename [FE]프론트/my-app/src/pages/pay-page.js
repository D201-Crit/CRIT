import {
  SHr,
  SEmpty,
  SCommunityWrapper,
} from "../styles/pages/SCommunityPage";


const PayPage = () => {
  return (
    <>
    <SCommunityWrapper>
      <SEmpty/>
      <h1>결제</h1>
      <p>고객님께서 이용하신 카드대금을 결제일 이전에 미리 납입하는 서비스입니다.
즉시출금 거래는 통장 출금기준으로 1일 3회 거래 가능하며 추가거래를 원하시는
이용 건별로 전액선결제 및 부분선결제거래 가능하며 연회비/수수료는
전액선결제거래만 가능합니다.

회차성 상품(할부, 장기카드대출)의 당월 청구금액 확정 전 부분선결제거래 시 
월불입금이 재조정되어 당월에 청구 될 수 있으므로 거래에 유의하시기 바랍니다.
즉시출금 결제 내역은 "입금내역조회"에서 확인하실 수 있습니다.
고객님의 카드 결제계좌 금융기관에 따라 선결제 거래가 제한될 수 있습니다.
즉시출금거래 제한은행 : 상호저축은행, 산림조합중앙회, HSBC, 도이치은행, 씨티, 
축협, 증권사 계좌, 국민은행 가상계좌, BOA, BNP파리바은행</p>

  
      <SHr/>
      </SCommunityWrapper>
    </>
  );
};

export default PayPage;
