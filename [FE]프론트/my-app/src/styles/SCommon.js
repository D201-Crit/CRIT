import styled, { css } from "styled-components";

//Nav
export const SNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background: rgba(20, 20, 20, 20);
  font-size: 20px;
`;

// Menu
export const SMenuWrapper = styled.div`
  width: 70%;
  ul {
    list-style: none;
    display: flex;
    padding: 0;
  }
  li {
    margin: 0px 80px;
    width: 100%;
    color: white;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: white;
    &:hover {
      color: #ff007a;
    }

    &.active {
      color: #ff007a;
    }
  }
`;

// User
export const SUserWrapper = styled.div`
  position: relative;
  width: 12%;
  font-size: 17px;
  cursor: pointer;
  ul {
    list-style: none;
    position: absolute;
    top: -15px;
  }
  li {
    margin: 15px 10px;
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
  max-width: 1200px;
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
