import { useState } from "react";
import { STextArea } from "../../../styles/pages/SChallengePage";

const IntroduceChallenge = ({ onChangeIntroduce }) => {
  const [introduce, setIntroduce] = useState("");
  const onIntroduceChallenge = (e) => {
    const newIntroduce = e.target.value;
    setIntroduce(newIntroduce);
    onChangeIntroduce(newIntroduce);
  };
  return (
    <STextArea
      id="introduce"
      value={introduce}
      onChange={onIntroduceChallenge}
      placeholder="소개글을 작성하세요"
    />
  );
};

export default IntroduceChallenge;
