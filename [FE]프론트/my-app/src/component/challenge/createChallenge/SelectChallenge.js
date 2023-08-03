import { useState } from "react";
import { SSelectChallengeWrapper } from "../../../styles/pages/SChallengePage";

const SelectChallenge = ({ onChangeSelectChallenge }) => {
  const [select, setSelect] = useState("");
  const onSelectChallenge = (e) => {
    const newSelectChallenge = e.target.value;
    setSelect(newSelectChallenge);
    onChangeSelectChallenge(newSelectChallenge);
  };
  return (
    <SSelectChallengeWrapper>
      <h4>챌린지 종류</h4>
      <div>
        <label>
          <input
            type="radio"
            name="challengeType"
            value="운동"
            onChange={onSelectChallenge}
          />
          운동
        </label>
        <label>
          <input
            type="radio"
            name="challengeType"
            value="스트레칭"
            onChange={onSelectChallenge}
          />
          스트레칭
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="challengeType"
            value="공부"
            onChange={onSelectChallenge}
          />
          공부
        </label>
        <label>
          <input
            type="radio"
            name="challengeType"
            value="독서"
            onChange={onSelectChallenge}
          />
          독서
        </label>
      </div>
    </SSelectChallengeWrapper>
  );
};

export default SelectChallenge;
