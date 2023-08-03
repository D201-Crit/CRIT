import { useLocation } from "react-router";
import JoinChallenge from "../component/challenge/JoinChallenge";
const DetailChallengePage = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  console.log(challenge);
  return (
    <>
      <h1>Detail Challenge Page 입니다.</h1>
      <h2 style={{ color: "white" }}>챌린지이름 : {challenge.name}</h2>
      <h2 style={{ color: "white" }}>챌린지 인증수단 : {challenge.cert}</h2>
      <h2 style={{ color: "white" }}>챌린지 내용 : {challenge.info}</h2>
      <h2 style={{ color: "white" }}>
        챌린지 기간 : {challenge.startDate} ~ {challenge.endDate}
      </h2>
      <h2 style={{ color: "white" }}>
        챌린지 시간 : {challenge.startTime} ~ {challenge.endTime}
      </h2>
      <h2 style={{ color: "white" }}>챌린지 참가자 : {challenge.userList}</h2>
      <JoinChallenge challenge={challenge} />
    </>
  );
};

export default DetailChallengePage;
