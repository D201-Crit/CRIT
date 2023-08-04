import { useLocation } from "react-router";
import { SDetailChallengeWrapper } from "./../styles/pages/SDeatilChallengePage";
import CreateBoard from "./../component/challenge/detailChallenge/CreateBoard";
import GetBoard from "../component/challenge/detailChallenge/GetBoard";
import InformationChallenge from "../component/challenge/detailChallenge/InformationChallenge";

const DetailChallengePage = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  console.log(challenge);
  return (
    <SDetailChallengeWrapper>
      <InformationChallenge />
      <CreateBoard classification={challenge.classification}></CreateBoard>
      <GetBoard />
    </SDetailChallengeWrapper>
  );
};

export default DetailChallengePage;
