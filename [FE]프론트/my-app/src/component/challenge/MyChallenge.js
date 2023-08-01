// swiper
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// 나머지
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 스타일
import {
  SSwiper,
  SSwiperSlide,
  STopWrapper,
  SMidWrapper,
  SBotWrapper,
} from "../../styles/pages/SChallengePage";
import axios from "axios";
import { useSelector } from "react-redux";

const MyChallenge = () => {
  const user = useSelector((state) => state.users);
  const [myChallenges, setMyChallenges] = useState([]);
  const getMyChallenge = () => {
    axios
      .get("http://localhost:8080/challenge/list/all", {
        header: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setMyChallenges(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 테스트용
  const [overView] = useState(
    "내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글내가 참여중인 챌린지 소개글 내가 참여중인 챌린지 소개글"
  );

  const location = useLocation();
  const navigate = useNavigate();
  // 상세보기 클릭
  const detailClick = () => {
    navigate("/ChallengePage/:id");
  };

  useEffect(() => {
    getMyChallenge();
  }, []);
  return (
    <>
      <SSwiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        <SSwiperSlide>
          <STopWrapper>
            <h1>나의 챌린지</h1>
            <h2>7/11(화) ~ 8/15(화)</h2>
            <h3>현재 3일째 참여 중</h3>
          </STopWrapper>
          <SMidWrapper>
            <img
              src="https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018"
              alt="예싱이미지"
            />
            <p>
              {overView.split(" ").length > 32 ? (
                <>{overView.split(" ").slice(0, 32)} </>
              ) : (
                overView
              )}
            </p>
          </SMidWrapper>
          <SBotWrapper>
            <h2>15/15</h2>
            <button id="enter">입장하기</button>
            <button id="detail" onClick={detailClick}>
              {" "}
              {location.pathname === "/ChallengePage" ? "상세보기" : "참여내역"}
            </button>{" "}
          </SBotWrapper>
        </SSwiperSlide>
      </SSwiper>
    </>
  );
};

export default MyChallenge;
