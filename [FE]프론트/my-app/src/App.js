import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import StartPage from "./pages/start-page";
import IntroPage from "./pages/intro-page";
import Nav from "./component/nav/Nav";
import MainPage from "./pages/main-page";
import ChallengePage from "./pages/challenge-page";
import LoginPage from "./pages/login-page";
import SignUpPage from "./pages/signup-page";
import CommunityPage from "./pages/community-page";
import ProfilePage from "./pages/profile-page";
import KakaoCallback from "./component/user/socialLogin/KaKaoCallback";
import { Sfont } from "./styles/SCommon";
import DetailChallengePage from "./pages/detail-challenge-page";
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

  // StartPage Nav를 숨김
  const showNav = location.pathname !== "/";
  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login/oauth2/code/kakao" element={<KakaoCallback />} />
        <Route path="/IntroPage" element={<IntroPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/ChallengePage" element={<ChallengePage />} />
        <Route path="/ChallengePage/:id" element={<DetailChallengePage />} />
        <Route path="/CommunityPage" element={<CommunityPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
