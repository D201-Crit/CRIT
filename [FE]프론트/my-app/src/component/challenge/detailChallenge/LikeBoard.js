import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { useState } from "react";
import { SLikeBoardButton } from "../../../styles/pages/SDeatilChallengePage";

const LikeBoard = ({ boardId, getBoard }) => {
  const user = useSelector((state) => state.users);
  const [like, setLike] = useState(false);
  const likeCheck = () => {
    setLike(!like);
  };
  const onLikeBoard = () => {
    api
      .post(`https://i9d201.p.ssafy.io/api/boards/likes/${boardId}`, null, {
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
    <>
      {like === false ? (
        <SLikeBoardButton onClick={onLikeBoard}> 좋아요</SLikeBoardButton>
      ) : (
        <SLikeBoardButton onClick={onLikeBoard}> 좋아요 취소</SLikeBoardButton>
      )}
    </>
  );
};

export default LikeBoard;
