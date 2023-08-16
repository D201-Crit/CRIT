import { useEffect, useState } from "react";
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
        if (res.data.data > 0) {
          setJoinList(res.data.data);
        }
        if (res.data.data.length == 0) {
          closeJoinListModal();
          Swal.fire({
            position: "center",
            icon: "error",
            title: "완료한 챌린지가 없습니다.",
            text: "CRIT",
            showConfirmButton: false,
            timer: 1500,
            background: "#272727",
            color: "white",
            width: "500px",
            // 먼지
            // imageUrl: 'https://unsplash.it/400/200',
            // imageWidth: 400,
            // imageHeight: 200,
            // imageAlt: 'Custom image',
          });
        }
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
      {joinList.reverse().map((join) => (
        <>
          <SJoinWrapper key={join.id}>
            {join.certified ? <p id="success">완료</p> : <p id="fail">실패</p>}
            <p id="time">{join.certTime}</p>
          </SJoinWrapper>
          <hr />
        </>
      ))}
    </SJoinListWrapper>
  );
};

export default JoinListModal;
