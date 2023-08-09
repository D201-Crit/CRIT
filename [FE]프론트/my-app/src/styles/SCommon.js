import styled, { css } from "styled-components";

//Nav
export const SNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(20, 20, 20, 20);
  font-size: 20px;
  mbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: sticky;
  top: 0;
`;

export const SLogoWrapper = styled.div`
  height: 100%;
  margin: px;
  overflow-x: hidden;

  ul {
    list-style: none;
    display: flex;
  }
  a {
    width: 100%;
    margin-right: 1200px;
    height: auto;
    text-decoration: none;
    display: inline-block;

    color: white;
    &:hover {
      color: #ff007a;
    }
  }
`;

// Menu
export const SMenuWrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;

  ul {
    list-style: none;
    display: flex;
  }
  li {
    margin: 0px 50px;
    width: 100px;
    color: white;
  }

  a {
    text-decoration: none;
    display: inline-block;
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
  width: 120px;
  font-size: 17px;
  cursor: pointer;

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
