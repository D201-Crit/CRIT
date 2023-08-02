import { useLocation } from "react-router";
const DetailChallengePage = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  console.log(challenge);
  return (
    <>
      <h1>Detail Challenge Page 입니다.</h1>
      <h2 style={{ color: "white" }}>챌린지이름 : {challenge.challengeName}</h2>
      <h2 style={{ color: "white" }}>
        챌린지 인증수단 : {challenge.challengeCert}
      </h2>
      <h2 style={{ color: "white" }}>
        챌린지 내용 : {challenge.challengeInfo}
      </h2>
      <h2 style={{ color: "white" }}>
        챌린지 기간 : {challenge.challengeStartDate} ~{" "}
        {challenge.challengeEndDate}
      </h2>
      <h2 style={{ color: "white" }}>
        챌린지 시간 : {challenge.challengeStartTime} ~{" "}
        {challenge.challengeEndTime}
      </h2>
      <h2 style={{ color: "white" }}>
        챌린지 참가자 : {challenge.challengeUserList}
      </h2>
    </>
  );
};

export default DetailChallengePage;
