import { SSelectChallengeWrapper } from "../../../styles/pages/SChallengePage";

const SelectChallenge = () => {
  return (
    <SSelectChallengeWrapper>
      <h4>챌린지 종류</h4>
      <li>
        <input type="radio" name="challengeType" />
        <label>챌린지</label>
      </li>
      <li>
        <input type="radio" name="challengeType" />
        <label>챌린지</label>
      </li>
    </SSelectChallengeWrapper>
  );
};

export default SelectChallenge;
