import { useState } from "react";
import { SMoneyWrapper } from "../../../styles/pages/SChallengePage";

const ChallengeMoney = ({ onChangeMoney }) => {
  const [money, setMoney] = useState();
  const onMoneyChange = (e) => {
    const newMoney = parseInt(e.target.value);
    setMoney(newMoney);
    onChangeMoney(newMoney);
  };
  return (
    <SMoneyWrapper>
      <h4>참여비 설정</h4>
      <select value={money} onChange={onMoneyChange}>
        <option value="">참여비</option>
        <option value="3000">3,000원</option>
        <option value="5000">5,000원</option>
        <option value="7000">7,000원</option>
        <option value="10000">10,000원</option>
      </select>
    </SMoneyWrapper>
  );
};

export default ChallengeMoney;
