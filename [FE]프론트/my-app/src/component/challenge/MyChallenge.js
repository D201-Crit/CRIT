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
import Modal from "react-modal";
import VideoRoomComponent from "../VideoRoomComponent";

// 스타일
import {
  SSwiper,
  SSwiperSlide,
  STopWrapper,
  SMidWrapper,
  SBotWrapper,
  SWebRTCModal,
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
  const [isOpen, setIsOpen] = useState(false);
  const [challengeData, setChallengeData] = useState(null); // 모달에 전달할 데이터 state 추가
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const openModal = (challenge) => {
    setChallengeData({ challenge, user }); // 모달에 전달할 데이터를 state에 저장
    setSelectedSessionId(challenge.id); // 선택한 챌린지의 세션 ID 저장
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
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

  // 시작일 기준 오름차순 정렬
  const sortByStartDate = (a, b) => {
    const startDateA = new Date(a.startDate);
    const startDateB = new Date(b.startDate);
    return startDateA - startDateB;
  };
  // console.log(myChallenges);
  const sortedMyChallenges = [...myChallenges].sort(sortByStartDate);
  // 상세보기 클릭
  const detailClick = (challenge) => {
    if (location.pathname === "/ChallengePage") {
      navigate(`/ChallengePage/${challenge.id}`, {
        state: { challenge },
      });
    }
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
  // 며칠째 진행 중인지 계산하는 함수
  const getDaysInProgress = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 연, 월, 일만 비교
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (today < start) {
      // 아직 시작되지 않은 챌린지인 경우
      const timeDiff = start.getTime() - today.getTime() - 1;
      const daysToStart = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if (daysToStart - 1 === 0) {
        return `D-day`;
      }
      if (daysToStart - 1 > 0) {
        return `D-${daysToStart - 1}일`;
      }
    }
    if (today > end) {
      // 이미 종료된 챌린지인 경우
      return `종료됨`;
    }
    if (today.getTime() >= start.getTime()) {
      // 진행 중인 챌린지인 경우
      const timeDiff = today.getTime() - start.getTime();
      const daysInProgress = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return `현재 ${daysInProgress + 1}일째 참여 중`;
    }
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
          {sortedMyChallenges.map((challenge) => {
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
                  {getDaysInProgress(
                    challenge.startDate,
                    challenge.endDate
                  )?.includes("현재") && (
                    <button id="enter" onClick={() => openModal(challenge)}>
                      입장하기
                    </button>
                  )}
                  <button id="detail" onClick={() => detailClick(challenge)}>
                    {location.pathname === "/ChallengePage"
                      ? "상세보기"
                      : "참여내역"}
                  </button>
                </SBotWrapper>
              </SSwiperSlide>
            );
          })}
        </SSwiper>
      )}
      <Modal style={SWebRTCModal} isOpen={isOpen} onRequestClose={closeModal}>
        {/* 모달 내부에서 VideoRoomComponent 사용 */}
        <VideoRoomComponent users={user} challengeData={challengeData} />
        {/* <VideoRoomComponent /> */}
      </Modal>
    </>
  );
};

export default MyChallenge;
