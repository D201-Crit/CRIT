import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { useState } from "react";

const LikeBoard = ({ boardId, getBoard }) => {
  const user = useSelector((state) => state.users);
  const [like, setLike] = useState(false);
  const likeCheck = () => {
    setLike(!like);
  };
  const onLikeBoard = () => {
    api
      .post(`https://i9d201.p.ssafy.io/api/boards/likes/${boardId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        likeCheck();
        getBoard();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button onClick={onLikeBoard}>
      {like === false ? <h1>좋아요</h1> : <h1>좋아요 취소</h1>}
    </button>
  );
};

export default LikeBoard;
