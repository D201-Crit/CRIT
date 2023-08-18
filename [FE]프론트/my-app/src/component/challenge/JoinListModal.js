import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
  SJoinListWrapper,
  SJoinWrapper,
  SJoinTitle,
} from "../../styles/pages/SDeatilChallengePage";
import Loading from "../../component/Loading";

const JoinListModal = ({ challengeData, closeJoinListModal }) => {
  const [loading, setLoading] = useState(true);

  const [joinList, setJoinList] = useState([]);
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
        setJoinList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getJoinList();
  }, []);
  return (
    <SJoinListWrapper>
      {loading ? <Loading /> : null}
      <SJoinTitle></SJoinTitle>
      {joinList.length > 0 ? (
        joinList.reverse().map((join) => (
          <React.Fragment key={join.id}>
            <SJoinWrapper>
              {join.certified ? (
                <p id="success">완료</p>
              ) : (
                <p id="fail">실패</p>
              )}
              <p id="time">{join.certTime}</p>
            </SJoinWrapper>
            <hr />
          </React.Fragment>
        ))
      ) : (
        <h1>참여 내역이 없습니다.</h1>
      )}
    </SJoinListWrapper>
  );
};

export default JoinListModal;
