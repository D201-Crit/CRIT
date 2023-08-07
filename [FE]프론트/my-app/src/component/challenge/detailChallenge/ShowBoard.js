import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteBoard from "./DeleteBoard";
import {
  SBoardWrapper,
  SBoardUl,
  SBoardLi,
} from "../../../styles/pages/SDeatilChallengePage";
import LikeBoard from "./LikeBoard";
import CreateBoard from "./CreateBoard";
import UpdateBoard from "./UpdateBoard";

const ShowBoard = ({ boards, challenge, getBoard }) => {
  const user = useSelector((state) => state.users);
  console.log(boards);
  console.log(boards);
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
              {user.nickname === board.writer ? (
                <>
                  <DeleteBoard getBoard={getBoard} boardId={board.id} />
                  <UpdateBoard
                    boardId={board.id}
                    classification={challenge.classification}
                  />
                </>
              ) : (
                <LikeBoard getBoard={getBoard} board={board} />
              )}
            </div>
            <img src={board.imageUrl} alt="" />
          </SBoardLi>
        ))}
      </SBoardUl>
    </SBoardWrapper>
  );
};
export default ShowBoard;
