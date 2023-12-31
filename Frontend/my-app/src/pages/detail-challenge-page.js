import { useLocation } from "react-router";
import { SDetailChallengeWrapper } from "./../styles/pages/SDeatilChallengePage";
import ShowBoard from "../component/challenge/detailChallenge/ShowBoard";
import InformationChallenge from "../component/challenge/detailChallenge/InformationChallenge";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../component/Loading";
import GetAllChallenge from "../component/challenge/GetAllChallenge";

const DetailChallengePage = () => {
  const location = useLocation();
  const challenge = location.state?.challenge;
  const user = useSelector((state) => state.users);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checkUser, setCheckUser] = useState(false);
  const checkedUser = () => {
    if (challenge.userList.includes(user.nickname)) {
      setCheckUser(true);
    }
  };
  const getBoard = () => {
    api
      .get(
        `https://i9d201.p.ssafy.io/api/boards/challengeWhole/${challenge.classification}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        },
      )
      .then((res) => {
        setLoading(false);
        setBoards(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBoard();
    checkedUser();
  }, []);
  return (
    <SDetailChallengeWrapper>
      {loading ? <Loading /> : null}
      <InformationChallenge setCheckUser={setCheckUser} />
      {checkUser ? (
        <ShowBoard boards={boards} challenge={challenge} getBoard={getBoard} />
      ) : challenge.challengeStatus === "END" ? (
        <h1>종료된 챌린지 입니다.</h1>
      ) : (
        <h1>참여하지 않은 챌린지 입니다.</h1>
      )}
      <GetAllChallenge />
    </SDetailChallengeWrapper>
  );
};

export default DetailChallengePage;
