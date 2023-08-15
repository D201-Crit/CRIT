import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteBoard from "./DeleteBoard";
import {
  SBoardsWrapper,
  SBoardWrapper,
  SDetailButtonWrapper,
} from "../../../styles/pages/SDeatilChallengePage";
import LikeBoard from "./LikeBoard";
import CreateBoard from "./CreateBoard";
import UpdateBoard from "./UpdateBoard";

const ShowBoard = ({ boards, challenge, getBoard }) => {
  const user = useSelector((state) => state.users);
  const reversedBoards = boards?.slice().reverse();
  console.log(reversedBoards);
  return (
    <SBoardsWrapper>
      {challenge.challengeStatus === "END" ? (
        <h1>종료 된 챌린지 입니다</h1>
      ) : challenge.challengeStatus === "WAIT" ? (
        <h1>진행 예정인 챌린지 입니다</h1>
      ) : (
        <CreateBoard
          getBoard={getBoard}
          classification={challenge.classification}
        />
      )}

      {reversedBoards?.map((board) => (
        <SBoardWrapper key={board.id}>
          <span id="writer">{board.writer}</span>
          <span id="content">{board.content}</span>
          {/* {board.imageUrl.length > 0 ? (
            <img src={board.imageUrl} alt="" />
          ) : null} */}
          {user.nickname === board.writer ? (
            // <SDetailButtonWrapper>
            //  <UpdateBoard
            //                 boardId={board.id}
            //                 classification={challenge.classification}
            //                 getBoard={getBoard}
            //               />
            <>
              <DeleteBoard getBoard={getBoard} boardId={board.id} />
            </>
          ) : (
            // </SDetailButtonWrapper>
            <LikeBoard getBoard={getBoard} board={board} />
          )}
        </SBoardWrapper>
      ))}
    </SBoardsWrapper>
  );
};
export default ShowBoard;
