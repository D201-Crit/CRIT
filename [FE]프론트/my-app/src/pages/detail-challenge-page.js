import { useLocation } from "react-router";
import { SDetailChallengeWrapper } from "./../styles/pages/SDeatilChallengePage";
import CreateBoard from "./../component/challenge/detailChallenge/CreateBoard";
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
  const getBoard = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/boards/whole", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        // 해당 challenge의 게시글만 불러오기 위한 필터
        const filteredBoards = res.data.data.content.filter((data) =>
          data.classification.includes(`${challenge.classification}`),
        );
        setBoards(filteredBoards);
        console.log(filteredBoards);
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
      <CreateBoard classification={challenge.classification} />
      <ShowBoard boards={boards} classification={challenge.classification} />
    </SDetailChallengeWrapper>
  );
};

export default DetailChallengePage;
