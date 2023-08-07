import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { useState } from "react";
import { SLikeBoardButton } from "../../../styles/pages/SDeatilChallengePage";

const LikeBoard = ({ board, getBoard }) => {
  const user = useSelector((state) => state.users);
  const onLikeBoard = () => {
    api
      .post(`https://i9d201.p.ssafy.io/api/boards/likes/${board.id}`, null, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        getBoard();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUnLikeBoard = () => {
    api
      .delete(`https://i9d201.p.ssafy.io/api/boards/likes/${board.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        getBoard();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {board.liked.includes(user.nickname) === false ? (
        <SLikeBoardButton onClick={onLikeBoard}> 좋아요</SLikeBoardButton>
      ) : (
        <SLikeBoardButton onClick={onUnLikeBoard}>
          {" "}
          좋아요 취소
        </SLikeBoardButton>
      )}
    </>
  );
};

export default LikeBoard;
