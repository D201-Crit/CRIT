// swiper
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
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

const MyChallenge = () => {
  const user = useSelector((state) => state.users);
  const [myChallenges, setMyChallenges] = useState([]);
  const getMyChallenge = () => {
    api
      .get("http://localhost:8080/challenge/list/mine", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMyChallenges(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const location = useLocation();
  const navigate = useNavigate();
  // 상세보기 클릭
  const detailClick = () => {
    navigate("/ChallengePage/:id");
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
  console.log(myChallenges);
  return (
    <>
      <SSwiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        <ul>
          {myChallenges.map((challenge) => {
            const daysInProgress = getDaysInProgress(
              challenge.challengeStartDate
            );

            return (
              <SSwiperSlide>
                <li>
                  <STopWrapper>
                    <p id="name">{challenge.challengeName}</p>
                    <p id="date">
                      {formatDate(challenge.challengeStartDate)} ~{" "}
                      {formatDate(challenge.challengeEndDate)}
                    </p>
                    <p id="dday">{daysInProgress}</p>
                  </STopWrapper>
                  <SMidWrapper>
                    <img
                      src="https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018"
                      alt="예상이미지"
                    />
                    <p id="info">
                      {challenge.challengeInfo.length > 150 ? (
                        <>{challenge.challengeInfo.slice(0, 150) + "....."} </>
                      ) : (
                        challenge.challengeInfo
                      )}
                    </p>
                  </SMidWrapper>
                  <SBotWrapper>
                    <p id="people">{challenge.challengePeople}명 참여 중</p>
                    <button id="enter">입장하기</button>
                    <button id="detail" onClick={detailClick}>
                      {" "}
                      {location.pathname === "/ChallengePage"
                        ? "상세보기"
                        : "참여내역"}
                    </button>{" "}
                  </SBotWrapper>
                </li>
              </SSwiperSlide>
            );
          })}
        </ul>
      </SSwiper>
    </>
  );
};

export default MyChallenge;
