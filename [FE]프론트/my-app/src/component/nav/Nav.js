import React, { useState } from "react";
import {
  SNav,
  SMenuWrapper,
  SUserWrapper,
  SLogoWrapper,
} from "../../styles/SCommon";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiEnvelope } from "react-icons/bi";
import LogOut from "../user/LogOut";
import { useSelector } from "react-redux";
import MessageBox from "../message/MessageBox";

const Nav = () => {
  const user = useSelector((state) => state.users); // useSelector를 통해 userSlice의 상태를 가져옴
  const [view, setView] = useState(false);
  const [massageView, setMassageView] = useState(false);

  const MessageInfo = ({ massageView }) => (
    <div style={{ position: "fixed" }}>
      {massageView && <MessageBox setMassageView={setMassageView} />}
    </div>
  );

  const UserInfo = ({ view }) => (
    <div style={{ position: "absolute", top: "50px", left: "40px" }}>
      {view && (
        <>
          <NavLink to="/ProfilePage">
            <h3>내 정보</h3>
          </NavLink>
          <LogOut />
        </>
      )}
    </div>
  );

  return (
    <SNav>
      {user && user.accessToken ? (
        <SMenuWrapper>
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
        </SMenuWrapper>
      ) : (
        <SLogoWrapper>
          <ul>
            <li>
              <NavLink to="/IntroPage">CRIT</NavLink>
            </li>
            <li>
              <NavLink to="/LoginPage">로그인</NavLink>
            </li>
          </ul>
        </SLogoWrapper>
      )}
      <SUserWrapper>
        {/* 메시지 파트 */}
        {user && user.accessToken ? (
          <ul onClick={() => setMassageView(!massageView)}>
            <li>
              <BiEnvelope
                size={35}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "-15px",
                  left: "-30px",
                }}
              />{" "}
            </li>
          </ul>
        ) : (
          <div></div>
        )}
        <MessageInfo massageView={massageView} />

        {/* 내정보 파트 */}
        {user && user.accessToken ? (
          <ul onClick={() => setView(!view)}>
            <li>
              <FaRegUserCircle
                size={35}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "-15px",
                }}
              />{" "}
            </li>
          </ul>
        ) : (
          <div></div>
        )}
        <UserInfo view={view} />
      </SUserWrapper>
    </SNav>
  );
};

export default Nav;
