import {
  SCreateChallengeModalWrapper,
  SInfoChallenge,
} from "../../styles/pages/SChallengePage";

import "react-calendar/dist/Calendar.css"; // css import
import ChallengeAuthentication from "./createChallenge/ChallengeAuthentication";
import ChallengeCalendar from "./createChallenge/ChallengeCalendar";
import ChallengeMember from "./createChallenge/ChallengeMember";
import ChallengeTime from "./createChallenge/ChallengeTime";
import SelectChallenge from "./createChallenge/SelectChallenge";
import IntroduceChallenge from "./createChallenge/IntroduceChallenge";
import TitleChallenge from "./createChallenge/TitleChallenge";

const CreateChallengeModal = () => {
  return (
    <SCreateChallengeModalWrapper>
      <TitleChallenge />
      <SInfoChallenge>
        <IntroduceChallenge />
        <SelectChallenge />
        <ChallengeTime />
        <ChallengeAuthentication />
        <ChallengeMember />
        <ChallengeCalendar />
      </SInfoChallenge>
    </SCreateChallengeModalWrapper>
  );
};

export default CreateChallengeModal;
