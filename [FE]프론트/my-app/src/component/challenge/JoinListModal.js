import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
  SJoinListWrapper,
  SJoinWrapper,
  SJoinTitle,
} from "../../styles/pages/SDeatilChallengePage";
import Swal from "sweetalert2";

const JoinListModal = ({ challengeData, closeJoinListModal }) => {
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
        console.log(res.data.data);

        setJoinList(res.data.data);
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
