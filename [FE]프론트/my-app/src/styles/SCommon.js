import { NavLink } from "react-router-dom";
import styled from "styled-components";

//Nav
export const SNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: black;
  font-size: 20px;
`;

// Menu
export const SMenuWrapper = styled.div`
  width: 70%;
`;
export const SMenuUl = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
`;
export const SMenuLi = styled.li`
  margin: 0px 80px;
  width: 100%;
  color: white;
`;
export const SMenuNavLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  color: white;
  &:hover {
    color: #ff007a;
  }

  &.active {
    color: gray;
  }
`;

// User
export const SUserWrapper = styled.div`
  position: relative;
  width: 10%;
  font-size: 20px;
  cursor: pointer;
`;
export const SUserUl = styled.ul`
  list-style: none;
  position: absolute;
  top: -15px;
`;
export const SUserLi = styled.li`
  margin: 15px 10px;
  text-decoration: none;
`;
export const SUserNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  :hover {
    color: #ff007a;
  }
`;
export const Sfont = styled.div`
  src: url("./styles/fonts/Pretendard-Medium.woff2") format("woff2");
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-display: fallback;
`;
