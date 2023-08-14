import React, { useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Nav from "./component/nav/Nav";
import KakaoCallback from "./component/user/socialLogin/KaKaoCallback";
import ChallengePage from "./pages/challenge-page";
import CommunityPage from "./pages/community-page";
import CommunityArticleDetailPage from "./pages/community-article-detail-page";
import CommunityBoardPage from "./pages/community-board-page";
import DetailChallengePage from "./pages/detail-challenge-page";
import IntroPage from "./pages/intro-page";
import LoginPage from "./pages/login-page";
import MainPage from "./pages/main-page";
import MyPage from "./pages/my-page";
import PayPage from "./pages/pay-page";
import PaySuccessPage from "./pages/pay-success-page";
import PayCanclePage from "./pages/pay-cancle-page";
import PayConflictPage from "./pages/pay-conflict-page";
import ProfilePage from "./pages/profile-page";
import SignUpPage from "./pages/signup-page";
import StartPage from "./pages/start-page";
import { Sfont } from "./styles/SCommon";
import Swal from "sweetalert2";
import GoogleCallback from "./component/user/socialLogin/GoogleCallback";
import NaverCallback from "./component/user/socialLogin/NaverCallback";
import Footer from './component/footer/footer';

import styled from "styled-components";


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
`;


function App() {
  return (
    <Sfont>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Sfont>
  );
}

function AppRoutes() {
  
  const location = useLocation();

  const user = useSelector((state) => state.users);

  const showNav = location.pathname !== "/";

  const authorizedPages = [
    "/",
    "/IntroPage",
    "/LoginPage",
    "/SignUpPage",
    "/login/oauth2/code/kakao",
    "/login/oauth2/code/naver",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  const isAuthorizedPage = !authorizedPages.includes(location.pathname) & !user;
  // 로그인하지 않은 상태에서 보지 못해야할 페이지로 접근하려 하면 로그인 페이지로 Redirect
  if (isAuthorizedPage) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "로그인 필수!",
      text: "로그인 해주세요~",
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
      // width: "500px",
      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
    });
    
    return <Navigate to="/LoginPage" />;
  }

  return (
    <>
      <AppContainer>

      {showNav && <Nav />}
      <ContentWrapper>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login/oauth2/code/kakao" element={<KakaoCallback />} />
        <Route path="/login/oauth2/code/naver" element={<NaverCallback />} />
        <Route path="/login/oauth2/code/google" element={<GoogleCallback />} />
        <Route path="/IntroPage" element={<IntroPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/ChallengePage" element={<ChallengePage />} />
        <Route path="/ChallengePage/:id" element={<DetailChallengePage />} />
        <Route path="/CommunityPage" element={<CommunityPage />} />
        <Route
          path="/CommunityBoardPage/:id"
          element={<CommunityBoardPage />}
        />
        <Route
          path="/CommunityBoardPage/:classification/:articleid"
          element={<CommunityArticleDetailPage />}
        />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/PayPage" element={<PayPage />} />
        <Route path="/payment/success" element={<PaySuccessPage />} />
        <Route path="/PayCanclePage" element={<PayCanclePage />} />
        <Route path="/PayConflictPage" element={<PayConflictPage />} />
      </Routes>
      </ContentWrapper>
      <Footer/>
      </AppContainer>
    </>
  );
}

export default App;
