import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { SJoinListWrapper } from "../../styles/pages/SChallengePage";

const JoinListModal = ({ challengeData, closeJoinListModal }) => {
  const [joinList, setJoinList] = useState([]);
  console.log(challengeData);
  const getJoinList = () => {
    api
      .get(
        `https://i9d201.p.ssafy.io/api/cert/list/${challengeData.challenge.id}`,
        {
          headers: {
            Authorization: `Bearer ${challengeData.user.accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        setJoinList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getJoinList();
  }, []);
  console.log(joinList);
  return (
    <SJoinListWrapper>
      <h1>참여내역</h1>
      {joinList.map((join) => (
        <ul>
          <li key={join.id}>
            <p id="time">{join.certTime}</p>
            <p id="certified">{join.certified ? "완료" : "실패"}</p>
          </li>
        </ul>
      ))}
      <button onClick={closeJoinListModal}>X</button>
    </SJoinListWrapper>
  );
};

export default JoinListModal;
