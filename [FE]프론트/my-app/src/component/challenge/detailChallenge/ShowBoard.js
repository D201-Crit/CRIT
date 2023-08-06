import { useSelector } from "react-redux";
import DeleteBoard from "./DeleteBoard";
import {
  SBoardWrapper,
  SBoardUl,
  SBoardLi,
} from "../../../styles/pages/SDeatilChallengePage";
import UpdateBoard from "./UpdateBoard";
import LikeBoard from "./LikeBoard";
import CreateBoard from "./CreateBoard";

const ShowBoard = ({ boards, challenge, getBoard }) => {
  const user = useSelector((state) => state.users);
  return (
    <SBoardWrapper>
      <CreateBoard
        getBoard={getBoard}
        classification={challenge.classification}
      />
      <SBoardUl>
        {boards.map((board) => (
          <SBoardLi key={board.id}>
            <p id="writer">{board.writer}</p>
            <div>
              <p id="content">{board.content}</p>
              {user.id === board.writer ? (
                <DeleteBoard getBoard={getBoard} boardId={board.id} />
              ) : (
                <LikeBoard getBoard={getBoard} boardId={board.id} />
              )}
            </div>
            {/* <UpdateBoard /> */}
          </SBoardLi>
        ))}
      </SBoardUl>
    </SBoardWrapper>
  );
};
export default ShowBoard;
