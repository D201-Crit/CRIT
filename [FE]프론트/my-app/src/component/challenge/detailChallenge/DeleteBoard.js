import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { SDeleteBoardButton } from "../../../styles/pages/SDeatilChallengePage";

const DeleteBoard = ({ boardId }) => {
  const user = useSelector((state) => state.users);
  const deleteBoard = () => {
    api
      .delete(`https://i9d201.p.ssafy.io/api/boards/delete/${boardId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <SDeleteBoardButton onClick={deleteBoard}>삭제</SDeleteBoardButton>;
};

export default DeleteBoard;
