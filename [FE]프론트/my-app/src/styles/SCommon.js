import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";

//Nav
export const SNav = styled.nav`
  height: 60px;
  padding: 7px;
  margin: 15px;
  border-radius: 10px;
  background-color: black;
  font-size: 20px;
  mbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: sticky;
  top: 0;
  left: 50%;
`;

export const SLogoWrapper = styled.div`
  position: absolute;

  top: 10px;
  width: 96%;
  overflow-x: hidden;

  ul {
    list-style: none;
    display: flex;
  }
  img {
    width: 100px;
    margin: -10px;
  }
  #login {
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 25px;
    text-decoration: none;
    color: white;
    &:hover {
      color: #ff007a;
    }
  }
`;

// Menu
export const SMenuWrapper = styled.div`
  margin: 0 auto;
  overflow-x: hidden;

  ul {
    list-style: none;
    display: flex;
  }
  li {
    margin: 0px 80px;
    width: px;
    color: white;
  }

  a {
    text-decoration: none;
    display: inline-block;
    color: white;
    &:hover {
      color: #ff007a;
      font-size: 21px;
    }

    &.active {
      color: #ff007a;
    }
  }
  img {
    width: 100px;
    margin: -10px;
  }
`;

// User
export const SUserWrapper = styled.div`
  position: absolute;
  width: 120px;
  font-size: 17px;
  cursor: pointer;
  right: 10px;
  top: 35px;

  ul {
    list-style: none;
    position: absolute;
    top: -15px;
    margin: 15px;
  }
  li {
    margin: 15px;
    list-style: none;
    margin-left: auto;
    text-decoration: none;
  }
  a {
    text-decoration: none;
    color: white;

    :hover {
      color: #ff007a;
    }
  }
`;

export const Sfont = styled.div`
  src: url("./styles/fonts/Pretendard-Medium.woff2") format("woff2");
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-display: fallback;
`;

export const SWrapper = styled.div`
  height: 100%;
  padding: 30px;
  margin: 0 auto;
  overflow-x: hidden;
`;

export const SHr = styled.hr`
  margin: 30px 0px -40px 0px;
`;

export const SEmpty = styled.div`
  margin: 120px 0px 0px 0px;
`;

export const SEmpty2 = styled.div`
  margin: 60px 0px 0px 0px;
`;

export const STitle = styled.h1`
  text-align: center;
  margin: 20px;
`;

export const SButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background: #0000c5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3333ff;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 1400;
  width: 100%;
  height: 100%;
`;

export const SBtnAnimation = styled.div`
  color: linear-gradient(90deg, red, blue);
  :hover {
  animation: gradient-animation 1s infinite linear alternate; 
  @keyframes gradient-animation {
    0% {
      color: linear-gradient(90deg, red, blue);
    }
    100% {
      color: linear-gradient(90deg, yellow, green);
    }
}
`;

export const SLoadingBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.727);
  z-index: 1559;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SLoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
  font-weight: 1000;
  text-align: center;
`;
