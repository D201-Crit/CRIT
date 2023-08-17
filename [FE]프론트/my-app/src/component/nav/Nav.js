import React, { useEffect, useState } from "react";
import {
  SNav,
  SMenuWrapper,
  SUserWrapper,
  SLogoWrapper,
  SBtnAnimation,
} from "../../styles/SCommon";
import { StyledSent } from "../../styles/pages/SMessage";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiEnvelope } from "react-icons/bi";
import LogOut from "../user/LogOut";
import { useSelector } from "react-redux";
import MessageBox from "../message/MessageBox";
import { api } from "../../api/api";

const Nav = () => {
  const API_BASE_URL = "https://i9d201.p.ssafy.io/api/";
  const user = useSelector((state) => state.users); // useSelector를 통해 userSlice의 상태를 가져옴
  const [view, setView] = useState(false);
  const [massageView, setMassageView] = useState(false);
  const [profile, setProfile] = useState("");
  const MessageInfo = ({ massageView }) => (
    <div style={{ position: "fixed" }}>
      {massageView && <MessageBox setMassageView={setMassageView} />}
    </div>
  );

  const getProfile = async () => {
    if (user) {
      api
        .get(`${API_BASE_URL}/myProfile`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          console.log("프로필 정보", res);
          setProfile({ url: res.data.data.imageUrl, file: null });
        })
        .catch((error) => {
          console.log("에러받아오냐?", error);
        });
    }
  };

  const UserInfo = ({ view }) => (
    <div style={{ position: "absolute", top: "50px", left: "40px" }}>
      {view && (
        <>
          <NavLink to="/ProfilePage">
            <h3>내 정보</h3>
          </NavLink>
          <NavLink to="/PayPage">
            <h3>포인트 충전</h3>
          </NavLink>
          <LogOut />
        </>
      )}
    </div>
  );
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SNav>
      {user && user.accessToken ? (
        <SMenuWrapper>
          <ul>
            <li>
              <NavLink to="/IntroPage">
                {" "}
                <img
                  src={process.env.PUBLIC_URL + "/logo2.png"}
                  style={{ width: "80px", height: "40px" }}
                  alt="placeholder"
                />
              </NavLink>
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
              <NavLink to="/IntroPage">
                <img
                  src={process.env.PUBLIC_URL + "/logo2.png"}
                  style={{ width: "80px", height: "40px" }}
                  alt="placeholder"
                />
              </NavLink>
            </li>
            <li>
              <NavLink id="login" to="/LoginPage">
                로그인
              </NavLink>
            </li>
          </ul>
        </SLogoWrapper>
      )}
      <SUserWrapper>
        {/* 메시지 파트 */}
        {user && user.accessToken ? (
          <SBtnAnimation>
            <ul onClick={() => setMassageView(!massageView)}>
              <li>
                <StyledSent
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "-15px",
                    left: "-30px",
                  }}
                />
                {/* <BiEnvelope	
                  size={35}	
                  style={{	
                    cursor: "pointer",	
                    position: "absolute",	
                    top: "-15px",	
                    left: "-30px",	
                  }}	
                />{" "} */}
              </li>
            </ul>
          </SBtnAnimation>
        ) : (
          <div></div>
        )}
        <MessageInfo
          massageView={massageView}
          setMassageView={setMassageView}
        />

        {/* 내정보 파트 */}
        {user && user.accessToken ? (
          <ul onClick={() => setView(!view)}>
            <li>
              {profile.url ? (
                <img
                  src={profile.url}
                  style={{
                    width: "50px",
                    height:"50px",
                    objectFit: "cover",

                    borderRadius: "50%",
                    position: "absolute",
                    top: "-25px",
                  }}
                />
              ) : (
                <FaRegUserCircle
                  size={35}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "-18px",
                  }}
                />
              )}
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
