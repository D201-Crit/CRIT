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
      <li>
        <input
          id="sport"
          type="radio"
          name="challengeType"
          value="운동"
          onChange={onSelectChallenge}
        />
        <label htmlFor="sport">운동</label>
      </li>
      <li>
        <input
          id="stretching"
          type="radio"
          name="challengeType"
          value="스트레칭"
          onChange={onSelectChallenge}
        />
        <label htmlFor="stretching">스트레칭</label>
      </li>
      <li>
        <input
          id="study"
          type="radio"
          name="challengeType"
          value="공부"
          onChange={onSelectChallenge}
        />
        <label htmlFor="study">공부</label>
      </li>
      <li>
        <input
          id="book"
          type="radio"
          name="challengeType"
          value="독서"
          onChange={onSelectChallenge}
        />
        <label htmlFor="book">독서</label>
      </li>
    </SSelectChallengeWrapper>
  );
};

export default SelectChallenge;
