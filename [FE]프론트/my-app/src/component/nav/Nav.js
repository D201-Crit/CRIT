import React, { useState } from "react";
import { SNav, SMenuWrapper, SUserWrapper } from "../../styles/SCommon";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogOut from "../user/LogOut";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.users); // useSelector를 통해 userSlice의 상태를 가져옴
  const [view, setView] = useState(false);
  // console.log(user);

  return (
    <SNav>
      <SMenuWrapper>
        {user ? (
          <ul>
            <li>
              <NavLink to="/IntroPage">CRIT</NavLink>
            </li>
            <li>
              <NavLink to="/MainPage">메인</NavLink>
            </li>
            <li>
              <NavLink to="/ChallengePage">챌린지</NavLink>
            </li>
            <li>
              <NavLink to="/CommunityPage">커뮤니티</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/IntroPage">CRIT</NavLink>
            </li>
          </ul>
        )}
      </SMenuWrapper>
      <SUserWrapper>
        {user ? (
          <ul
            onClick={() => {
              setView(!view);
            }}
          >
            <li>
              <FaRegUserCircle size={35} style={{ cursor: "pointer" }} />{" "}
            </li>
            <li>
              <NavLink to="/">{view && <h3>내 정보</h3>}</NavLink>
            </li>
            <li>{view && <LogOut />}</li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/LoginPage">로그인</NavLink>
            </li>
          </ul>
        )}
        {/* </ul> */}
      </SUserWrapper>
    </SNav>
  );
};

export default Nav;
