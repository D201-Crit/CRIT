import { useState } from "react";
import { SMemberWrapper } from "../../../styles/pages/SChallengePage";

const ChallengeMember = () => {
  // 챌린지 모집인원
  const [members, setMembers] = useState(3);

  const handleMembersChange = (e) => {
    setMembers(parseInt(e.target.value));
  };
  const handleSelectChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setMembers(selectedValue);
  };
  return (
    <SMemberWrapper>
      <h4>인원수 설정</h4>
      <select value={members} onChange={handleSelectChange}>
        <option value="">인원수</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <input
        type="range"
        min="3"
        max="10"
        value={members}
        onChange={handleMembersChange}
      />
      <h5>{members}명</h5>
    </SMemberWrapper>
  );
};

export default ChallengeMember;
