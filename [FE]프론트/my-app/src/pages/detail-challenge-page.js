import { useLocation } from "react-router";
import { SDetailChallengeWrapper } from "./../styles/pages/SDeatilChallengePage";
import ShowBoard from "../component/challenge/detailChallenge/ShowBoard";
import InformationChallenge from "../component/challenge/detailChallenge/InformationChallenge";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const DetailChallengePage = () => {
  const location = useLocation();
  const challenge = location.state.challenge;
  const user = useSelector((state) => state.users);
  const [boards, setBoards] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  const getBoard = () => {
    api
      .get(
        `https://i9d201.p.ssafy.io/api/boards/challengeWhole/${challenge.classification}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setBoards(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <SDetailChallengeWrapper>
      <InformationChallenge />
      <ShowBoard boards={boards} challenge={challenge} getBoard={getBoard} />
    </SDetailChallengeWrapper>
  );
};

export default DetailChallengePage;
