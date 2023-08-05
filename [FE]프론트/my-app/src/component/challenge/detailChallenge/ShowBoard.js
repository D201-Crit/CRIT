import { useSelector } from "react-redux";
import DeleteBoard from "./DeleteBoard";
import {
  SBoardWrapper,
  SBoardUl,
  SBoardLi,
} from "../../../styles/pages/SDeatilChallengePage";
import UpdateBoard from "./UpdateBoard";

const ShowBoard = ({ boards }) => {
  const user = useSelector((state) => state.users);
  return (
    <SBoardWrapper>
      <SBoardUl>
        {boards.map((board) => (
          <SBoardLi key={board.id}>
            <h1>{board.title}</h1>
            {user.id === board.writer ? (
              <DeleteBoard boardId={board.id} />
            ) : null}

            {/* <UpdateBoard /> */}
          </SBoardLi>
        ))}
      </SBoardUl>
    </SBoardWrapper>
  );
};
export default ShowBoard;
