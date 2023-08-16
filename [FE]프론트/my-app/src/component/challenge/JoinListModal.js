import { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
  SJoinListWrapper,
  SJoinWrapper,
  SJoinListExit,
  SJoinTitle,
} from "../../styles/pages/SDeatilChallengePage";

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
        }
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
      <SJoinTitle></SJoinTitle>
      {joinList.map((join) => (
        <>
          <SJoinWrapper key={join.id}>
            {join.certified ? <p id="success">완료</p> : <p id="fail">실패</p>}
            <p id="time">{join.certTime}</p>
          </SJoinWrapper>
          <hr />
        </>
      ))}
      {/* <SJoinListExit onClick={closeJoinListModal}></SJoinListExit> */}
    </SJoinListWrapper>
  );
};

export default JoinListModal;
