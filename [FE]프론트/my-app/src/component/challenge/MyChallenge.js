// swiper
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
// 나머지
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

// 스타일
import {
  SSwiper,
  SSwiperSlide,
  STopWrapper,
  SMidWrapper,
  SBotWrapper,
} from "../../styles/pages/SChallengePage";
import { useSelector } from "react-redux";
import { SImg } from "./../../styles/pages/SChallengePage";
import { useDispatch } from "react-redux";
import { setMyChallenge } from "../../slice/ChallengeSlice";

const MyChallenge = () => {
  const user = useSelector((state) => state.users);
  const myChallenges = useSelector((state) => state.myChallenges);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getMyChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/mine", {
        // .get("http://localhost:8080/challenge/list/mine", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(setMyChallenge(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(myChallenges);

  // 시작일 기준 오름차순 정렬
  const sortByStartDate = (a, b) => {
    const startDateA = new Date(a.startDate);
    const startDateB = new Date(b.startDate);
    return startDateA - startDateB;
  };
  const sortedMyChallenges = [...myChallenges].sort(sortByStartDate);

  // 상세보기 클릭
  const detailClick = (challenge) => {
    if (location.pathname === "/ChallengePage") {
      navigate(`/ChallengePage/${challenge.id}`, {
        state: { challenge },
      });
    }
  };
  // 입장하기 클릭
  const EntranceClick = (challenge) => {
    navigate(`/ChallengePage/${challenge.id}`, {
      state: { challenge },
    });
  };

  // 날짜 형식
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString().padStart(2, "0");
    const dayOfWeek = date.toLocaleString("ko-KR", { weekday: "short" });
    return `${month}.${day} (${dayOfWeek})`;
  };
  // 며칠째 진행 중인지 계산하는 함수
  const getDaysInProgress = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const timeDiff = today.getTime() - start.getTime();
    const daysInProgress = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return daysInProgress >= 0
      ? `현재 ${daysInProgress}일째 참여 중`
      : `D-day ${Math.abs(daysInProgress)}일`;
  };

  useEffect(() => {
    getMyChallenge();
  }, []);
  return (
    <>
      {sortedMyChallenges.length === 0 ? (
        <SSwiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SImg src="https://github.com/Jinga02/ChallengePJT/assets/110621233/8329c57e-d554-4956-803d-68508c07b007" />
        </SSwiper>
      ) : (
        <SSwiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {myChallenges.map((challenge) => {
            const daysInProgress = getDaysInProgress(challenge.startDate);

            return (
              <SSwiperSlide key={challenge.id}>
                <STopWrapper>
                  <p id="name">{challenge.name}</p>
                  <p id="date">
                    {formatDate(challenge.startDate)} ~{" "}
                    {formatDate(challenge.endDate)}
                  </p>
                  <p id="dday">{daysInProgress}</p>
                </STopWrapper>
                <SMidWrapper>
                  <img src={challenge.imgPath} alt="예상이미지" />
                  <p id="info">
                    {challenge.info.length > 150 ? (
                      <>{challenge.info.slice(0, 150) + "....."} </>
                    ) : (
                      challenge.info
                    )}
                  </p>
                </SMidWrapper>
                <SBotWrapper>
                  <p id="people">{challenge.userList.length}명 참여 중</p>
                  <button id="enter">입장하기</button>
                  <button
                    id="detail"
                    onClick={() => detailClick(challenge)} // 수정된 부분
                  >
                    {" "}
                    {location.pathname === "/ChallengePage"
                      ? "상세보기"
                      : "참여내역"}
                  </button>{" "}
                </SBotWrapper>
              </SSwiperSlide>
            );
          })}
        </SSwiper>
      )}
    </>
  );
};

export default MyChallenge;
