import { useLocation } from "react-router";
import JoinChallenge from "./../JoinChallenge";
import {
  SInformationWrapper,
  SImgWrapper,
  SInfoWrapper,
  SButtonWrapper,
} from "../../../styles/pages/SDeatilChallengePage";
import ParticipationChallenge from "../ParticipationChallenge";

import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useState } from "react";

const InformationChallenge = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  const user = useSelector((state) => state.users);
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
              challenge.endDate
            )?.includes("현재") && (
              <>
                <button id="detailEnter" onClick={() => openModal(challenge)}>
                  입장하기
                </button>
                <ParticipationChallenge />
              </>
            )}
          </>
        ) : (
          <JoinChallenge challenge={challenge} />
        )}
      </SButtonWrapper>
    </SInformationWrapper>
  );
};
export default InformationChallenge;
