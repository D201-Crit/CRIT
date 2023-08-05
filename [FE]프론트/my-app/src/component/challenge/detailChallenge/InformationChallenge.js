import { useLocation } from "react-router";
import JoinChallenge from "./../JoinChallenge";
import {
  SInformationWrapper,
  SImgaeWrapper,
} from "../../../styles/pages/SDeatilChallengePage";
import ParticipationChallenge from "../ParticipationChallenge";
import { SDiv } from "./../../../styles/pages/SDeatilChallengePage";

const InformationChallenge = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  return (
    <SInformationWrapper>
      <SImgaeWrapper>
        <img src={challenge.imgPath} alt="챌린지 썸네일" />
      </SImgaeWrapper>
      <SDiv>
        <p id="name">{challenge.name}</p>
      </SDiv>
      <ParticipationChallenge />
      <p id="cert">{challenge.cert}</p>
      <p id="info">{challenge.info}</p>
      <p id="date">
        {challenge.startDate} ~ {challenge.endDate}
      </p>
      <p id="category"> {challenge.category}</p>
      <p id="time">
        {challenge.startTime} ~ {challenge.endTime}
      </p>
      <p id="userList"> {challenge.userList}</p>
      <JoinChallenge challenge={challenge} />
    </SInformationWrapper>
  );
};
export default InformationChallenge;
