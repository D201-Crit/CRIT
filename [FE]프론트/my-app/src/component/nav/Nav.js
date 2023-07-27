import React, { useState } from "react";
import {
  SNav,
  SMenuWrapper,
  SUserWrapper,
  SMenuNavLink,
  SMenuUl,
  SMenuLi,
  SUserUl,
  SUserLi,
  SUserNavLink,
} from "../../styles/SCommon";
import { FaRegUserCircle } from "react-icons/fa";

const Nav = () => {
  const token = localStorage.getItem("token");
  const nickName = localStorage.getItem("nickName");
  const [view, setView] = useState(false);

  return (
    <SNav>
      <SMenuWrapper>
        <SMenuUl>
          <SMenuLi>
            <SMenuNavLink to="/IntroPage">CRIT</SMenuNavLink>
          </SMenuLi>
          <SMenuLi>
            <SMenuNavLink to="/MainPage">메인</SMenuNavLink>
          </SMenuLi>
          <SMenuLi>
            <SMenuNavLink to="/ChallengePage">챌린지</SMenuNavLink>
          </SMenuLi>
          <SMenuLi>
            <SMenuNavLink to="/CommunityPage">커뮤니티</SMenuNavLink>
          </SMenuLi>
        </SMenuUl>
      </SMenuWrapper>
      <SUserWrapper>
        {token ? (
          <SUserUl
            onClick={() => {
              setView(!view);
            }}
          >
            <SUserLi>
              <FaRegUserCircle size={35} style={{ cursor: "pointer" }} />{" "}
            </SUserLi>
            <SUserLi>
              <SUserNavLink to="/">{view && <h3>내 정보</h3>}</SUserNavLink>
            </SUserLi>
            <SUserLi>{view && <h3>로그아웃</h3>}</SUserLi>
          </SUserUl>
        ) : (
          <SUserNavLink to="/LoginPage">로그인</SUserNavLink>
        )}
        {/* </SUserUl> */}
      </SUserWrapper>
    </SNav>
  );
};

export default Nav;
