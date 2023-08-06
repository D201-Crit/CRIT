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

const InformationChallenge = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  const user = useSelector((state) => state.users);
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
          <ParticipationChallenge />
        ) : (
          <JoinChallenge challenge={challenge} />
        )}
      </SButtonWrapper>
    </SInformationWrapper>
  );
};
export default InformationChallenge;
