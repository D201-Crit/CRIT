import styled from "styled-components";

// Pay Page
export const SPayWrapper = styled.div`
  max-width: 100%;
  height: 100%;
  padding: 30px;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  align-items: center;
  h1{
    font-size : 40px;
  }
`;

export const SPayPaymentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  
  div {
    position: absolute;
    transform: translate(15%,820%);
    z-index: 2;
  }
  input{
    font-family : "Pretendard";
    font-weight : 500;
    font-size : 24px;
    width : 250px;
    height : 25px;
    flex-direction: row;
    padding : 10px;
    border-radius: 15px;
  }
  span{    
    cursor : pointer;
    width : 70px;
    text-align : center;
    padding: 13px;
    font-size : 20px;
    border-radius: 15px;
    background : #0000c5;
    &:hover {
      background-color: #2980b9;
      box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);
  
      border-color: #2980b9;
  }

`
export const SPayButton = styled.button`
width : 100px;
height : 50px;
color: white;
font-size: 18px;
background: linear-gradient(180deg, #060DB3 0%, #FF1EB2 100%);
border-radius: 15px;

`
export const SPayImg = styled.div`
img {
  z-index: 1;
}
`



export const SPayInfoArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background: #2F2F2F;
  padding : 40px;
  width: 100%;
`;


export const SPayEmpty = styled.div`
  margin-top : 200px;
`


export const SPayInfo = styled.div`
max-width: 1200px;
padding: 30px;
max-height: 1100px;

`

export const PayInfomationWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow-y: auto;
`;
export const PaySuccessWrapper = styled.section`
  max-width: 800px;
  padding: 30px;
  color: white;
  margin: auto;
  border-radius: 18px;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.15) 0.01%, rgba(0, 0, 0, 0.01) 100%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Pretendard", sans-serif;
`;

export const PaySuccessTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

export const PaySuccessInfo = styled.div`
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 0.01%, rgba(0, 0, 0, 0.01) 100%);
  padding: 25px 30px;
  border-radius: 18px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
`;

export const PaySuccessParagraph = styled.p`
  font-size: 24px;
  line-height: 1.6;
  margin-top: 20px;
`;

export const PaySuccessPaymentInfo = styled.p`
  margin-top: 20px;
  padding : 30px;
  white-space: pre;
  font-size: 18px;
`;