import React from "react";
import styled from "styled-components";

const FooterList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) -20%,
    rgba(0, 0, 0, 100) 100%
  );
  color: white;
  font-weight: 100;
  height: 300px;
  padding: 40px;
  // z-index: 1;
  margin-top: 800px;
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

const StyledItem = styled.span`
  margin: 0 10px;
`;

const CopyRight = styled.p`
  font-size: 15px;
  padding-top: 10px;
`;

const Footer = () => {
  return (
    <FooterList>
      <Line>
        <StyledItem>(주)크릿</StyledItem>
        <StyledItem>|</StyledItem>
        <StyledItem>054-259-2939</StyledItem>
      </Line>
      <Line>경상북도 구미시 임수동 94-1 번지 삼성전자2공장 2층</Line>
      <Line>사업자등록번호: 777-77-77777</Line>
      <Line>통신판매업신고: 2023-경북구미-05626</Line>
      <Line>
        <StyledItem>대표: 강강김이조진</StyledItem>
        <StyledItem>|</StyledItem>
        <StyledItem>개인정보책임자: 강강김이조진</StyledItem>
      </Line>
      <Line>이메일: support@crit.com</Line>
      <CopyRight>copyright 2023. crit. All rights reserved.</CopyRight>
    </FooterList>
  );
};

export default Footer;
