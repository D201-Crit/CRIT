import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import DeleteBoard from "./DeleteBoard";
import {
  SBoardWrapper,
  SBoardUl,
  SBoardLi,
} from "../../../styles/pages/SDeatilChallengePage";
import UpdateBoard from "./UpdateBoard";

const GetBoard = () => {
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
        console.log(res.data.data.content);
        setBoards(res.data.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBoard();
  }, []);

  return (
    <SBoardWrapper>
      <SBoardUl>
        {boards.map((board) => (
          <SBoardLi key={board.id}>
            <h1>{board.title}</h1>
            <DeleteBoard boardId={board.id} />
            <UpdateBoard />
          </SBoardLi>
        ))}
      </SBoardUl>
    </SBoardWrapper>
  );
};
export default GetBoard;
