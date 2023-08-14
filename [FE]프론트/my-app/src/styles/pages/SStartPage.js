import styled from "styled-components";

export const SStartPageWrapper = styled.div`
  color : white;
  margin-top: 200px; 
  padding-top: 100px;
  overflow-x: hidden;

  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    
    align-items: center;
    justify-content: center;

    img {
      width: 300px;
      margin-right: 50px;
    }
  }

  h1 {
    margin-bottom: 10px;
  }

  .intro-text {
    text-align: left;

    p {
      font-size: 20px;
      font-weight: 1;
      text-align: left;
      margin-bottom: 40px;
    }
  }

  &[data-aos="fade-up"] {
    transition-property: transform, opacity;
    &.aos-animate {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  .empty {
    margin-top: 300px;
  }
`;


export const SStartButton = styled.div`
  padding : 15px 30px;
  width : 50px;
  font-size : 25px;
  color : white;
  text-align : center;
  border : 1px solid grey;
  margin-top: 50px; 
  letter-spacing: 0.2px;
  line-height: 35px;
  &:hover {
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);
    border : 1px solid white;

  }
`

export const SLogoImage = styled.img`
  width: ${({ width }) => width || "360px"};
  height: ${({ height }) => height || "151px"};
  opacity: ${({ opacity }) => opacity || 1};
  position: relative;
  top: ${({ top }) => top || "0px"};
  left: ${({ left }) => left || "0px"};
`;

export const SStartImage = styled.img`
  width: ${({ width }) => width || "500px"};
  height: ${({ height }) => height || "550px"};
  opacity: ${({ opacity }) => opacity || 0.3};
  position: relative;
  top: ${({ top }) => top || "0px"};
  left: ${({ left }) => left || "600px"};
  
`;