// swiper
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

// 나머지
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  SPhotoModal,
  SStatusWrapper,
} from "../../styles/pages/SChallengePage";
import { useSelector } from "react-redux";
import { SImg } from "./../../styles/pages/SChallengePage";
import Swal from "sweetalert2";
import PhotoChallengeModal from "./PhotoChallengeModal";

const MyChallenge = () => {
  const user = useSelector((state) => state.users);
  const myChallenges = useSelector((state) => state.myChallenges);
  const ongoingChallenges = useSelector((state) => state.onGoingMyChallenges);
  const completeChallenges = useSelector((state) => state.completeMyChallenges);
  const plannedChallenges = useSelector((state) => state.plannedMyChallenges);
  const location = useLocation();
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [challengeData, setChallengeData] = useState(null); // 모달에 전달할 데이터 state 추가
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedStatus, setSelectedCategory] = useState(myChallenges); // 초기값: 전체
  const handleCategoryClick = (status) => {
    if (status == "전체") {
      if (myChallenges) {
        setSelectedCategory(myChallenges);
      }
      if (myChallenges.length == 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "아직 챌린지가 없습니다!. \n 챌린지에 참여해주세요!.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          width: "500px",
        });
      }
    }
    if (status == "진행 중") {
      if (ongoingChallenges) {
        setSelectedCategory(ongoingChallenges);
      }
      if (ongoingChallenges.length == 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "진행중인 챌린지가 없습니다.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          width: "500px",
        });
      }
    }
    if (status == "진행 예정") {
      if (plannedChallenges) {
        setSelectedCategory(plannedChallenges);
      }
      if (plannedChallenges.length == 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "진행 예정인 챌린지가 없습니다.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          width: "500px",
        });
      }
    }
    if (status == "종료") {
      if (completeChallenges) {
        setSelectedCategory(completeChallenges);
      }
      if (completeChallenges.length == 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "종료 된 챌린지가 없습니다.",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          width: "500px",
        });
      }
    }
  };

  const checkEnterTime = () => {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "챌린지 시간이 아닙니다!",
      text: "CRIT",
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
      width: "500px",
    });
  };
  const openVideoModal = (challenge) => {
    setChallengeData({ challenge, user }); // 모달에 전달할 데이터를 state에 저장
    setSelectedSessionId(challenge.id); // 선택한 챌린지의 세션 ID 저장
    setIsVideoOpen(true);
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "챌린지 입장 중!",
      text: "CRIT",
      showConfirmButton: false,
      timer: 2000,
      background: "#272727",
      color: "white",
      width: "500px",
    });
  };
  const openPhotoModal = (challenge) => {
    setChallengeData({ challenge, user }); // 모달에 전달할 데이터를 state에 저장
    setSelectedSessionId(challenge.id); // 선택한 챌린지의 세션 ID 저장
    setIsPhotoOpen(true);
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "챌린지 입장 중!",
      text: "CRIT",
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
      width: "500px",
    });
  };
  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };
  const closePhotoModal = () => {
    setIsPhotoOpen(false);
  };

  // 시작일 기준 오름차순 정렬
  const sortByStartDate = (a, b) => {
    const startDateA = new Date(a.startDate);
    const startDateB = new Date(b.startDate);
    return startDateA - startDateB;
  };
  const sortedMyChallenges = [...selectedStatus].sort(sortByStartDate);
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
  // 챌린지 입장가능 시간
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const Time = `${formattedHours}:${formattedMinutes}`;
  return (
    <>
      <SStatusWrapper>
        <ul id="myChallengeStatus">
          <a onClick={() => handleCategoryClick("전체")}>전체</a>
          <a onClick={() => handleCategoryClick("진행 중")}>진행 중</a>
          <a onClick={() => handleCategoryClick("진행 예정")}>진행 예정</a>
          <a onClick={() => handleCategoryClick("종료")}>종료</a>
        </ul>
      </SStatusWrapper>
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
            const daysInProgress = getDaysInProgress(
              challenge.startDate,
              challenge.endDate,
            );
            return (
              <SSwiperSlide key={challenge.id}>
                <STopWrapper>
                  <p id="name">{challenge.name}</p>
                  <p id="date">
                    {formatDate(challenge.startDate)} ~{" "}
                    {formatDate(challenge.endDate)}
                  </p>
                  <p id="time">
                    챌린지 시간 : {challenge.startTime} ~ {challenge.endTime}
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
                    challenge.endDate,
                  )?.includes("현재") ? (
                    challenge.startTime <= Time && Time <= challenge.endTime ? (
                      challenge.cert === "실시간" ? (
                        <button
                          id="enter"
                          onClick={() => openVideoModal(challenge)}
                        >
                          입장하기
                        </button>
                      ) : (
                        <button
                          id="photo"
                          onClick={() => openPhotoModal(challenge)}
                        >
                          사진인증
                        </button>
                      )
                    ) : challenge.cert === "실시간" ? (
                      <button id="enter" onClick={() => checkEnterTime()}>
                        입장하기
                      </button>
                    ) : (
                      <button id="photo" onClick={() => checkEnterTime()}>
                        사진인증
                      </button>
                    )
                  ) : null}

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
      <Modal style={SWebRTCModal} isOpen={isVideoOpen}>
        {/* 모달 내부에서 VideoRoomComponent 사용 */}
        <VideoRoomComponent
          closeVideoModal={closeVideoModal}
          challengeData={challengeData}
        />
        {/* <VideoRoomComponent /> */}
      </Modal>
      <Modal style={SPhotoModal} isOpen={isPhotoOpen}>
        <PhotoChallengeModal
          challengeData={challengeData}
          closePhotoModal={closePhotoModal}
        ></PhotoChallengeModal>
      </Modal>
    </>
  );
};

export default MyChallenge;
