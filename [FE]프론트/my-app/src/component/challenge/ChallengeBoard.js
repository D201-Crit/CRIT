import {
  SChallengeBoardWrapper,
  SInput,
} from "../../styles/pages/SChallengePage";
const ChallengeBoard = () => {
  return (
    <SChallengeBoardWrapper>
      {/* <h1>챌린지 찾기</h1> */}
      <SInput placeholder="검색어를 입력하세요." />
      <hr />
      <div></div>
    </SChallengeBoardWrapper>
  );
};

export default ChallengeBoard;
