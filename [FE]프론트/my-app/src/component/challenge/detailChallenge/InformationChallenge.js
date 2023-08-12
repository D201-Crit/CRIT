import { useLocation } from "react-router";
import JoinChallenge from "./../JoinChallenge";
import {
  SInformationWrapper,
  SImgWrapper,
  SInfoWrapper,
  SButtonWrapper,
} from "../../../styles/pages/SDeatilChallengePage";
import PhotoChallengeModal from "../PhotoChallengeModal";

import ParticipationChallenge from "../ParticipationChallenge";

import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { SWebRTCModal } from "../../../styles/pages/SChallengePage";

const InformationChallenge = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  const user = useSelector((state) => state.users);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const [challengeData, setChallengeData] = useState(null); // 모달에 전달할 데이터 state 추가
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const checkEnterTime = () => {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "챌린지 시간이 아닙니다!.",
      text: "CRIT",
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
      width: "500px",

      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
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

      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
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

      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
    });
  };
  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };
  const closePhotoModal = () => {
    setIsPhotoOpen(false);
  };
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

  // 참여하기 startDate 2일전까지만 보이게

  const twoDaysBefore = new Date(challenge.startDate);
  twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);

  return (
    <SInformationWrapper>
      <SImgWrapper>
        <p id="name">{challenge.name}</p>
        <img id="img" src={challenge.imgPath} alt="챌린지 썸네일" />
        <p id="date">
          {challenge.startDate} ~ {challenge.endDate}
        </p>
        <p id="time">
          {challenge.startTime} ~ {challenge.endTime}
        </p>
      </SImgWrapper>
      <SInfoWrapper>
        <h1 id="CATEGORY">챌린지 종류</h1>
        <p id="category"> {challenge.category}과 관련된 챌린지에요!</p>
        <h1 id="CERT">인증방식</h1>
        <p id="cert">{challenge.cert}인증 방식을 사용해요!</p>
        <h1 id="INFO">소개글</h1>
        <p id="info">{challenge.info}</p>
        <h1 id="USERLIST">참여중인 사람들</h1>
        <p id="userList">{challenge.userList.join(", ")}</p>
      </SInfoWrapper>
      <SButtonWrapper>
        {challenge.userList.includes(user.nickname) === true ? (
          <>
            {getDaysInProgress(
              challenge.startDate,
              challenge.endDate,
            )?.includes("현재") ? (
              new Date(challenge.startTime) <= new Date() &&
              new Date() <= new Date(challenge.endTime) ? (
                challenge.cert === "실시간" ? (
                  <button id="enter" onClick={() => openVideoModal(challenge)}>
                    입장하기
                  </button>
                ) : (
                  <button id="photo" onClick={() => openPhotoModal(challenge)}>
                    사진인증
                  </button>
                )
              ) : challenge.cert === "실시간" ? (
                <button id="join" onClick={() => checkEnterTime()}>
                  입장하기
                </button>
              ) : (
                // <button id="join" onClick={() => checkEnterTime()}>
                <button id="photo" onClick={() => openPhotoModal(challenge)}>
                  사진인증
                </button>
              )
            ) : null}
          </>
        ) : (
          <>
            {twoDaysBefore >= new Date() && (
              <JoinChallenge challenge={challenge} />
            )}
          </>
        )}
      </SButtonWrapper>
      <Modal style={SWebRTCModal} isOpen={isPhotoOpen}>
        <PhotoChallengeModal
          challengeData={challengeData}
          closePhotoModal={closePhotoModal}
        ></PhotoChallengeModal>
      </Modal>
    </SInformationWrapper>
  );
};
export default InformationChallenge;
