import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteBoard from "./DeleteBoard";
import LikeBoard from "./LikeBoard";
import CreateBoard from "./CreateBoard";
import {
  SBoardsWrapper,
  SBoardWrapper,
  SDiv,
} from "../../../styles/pages/SDeatilChallengePage";

const ShowBoard = ({ boards, challenge, getBoard }) => {
  const user = useSelector((state) => state.users);
  const [groupedBoards, setGroupedBoards] = useState({});
  const formattedToday = new Date().toISOString().split("T")[0];
  useEffect(() => {
    // 게시물을 생성일별로 그룹화
    const groupByDate = () => {
      const groups = {};
      boards.forEach((board) => {
        const createDate = board.createTime.substring(0, 10);
        if (!groups[createDate]) {
          groups[createDate] = [];
        }
        groups[createDate].push(board);
      });
      return groups;
    };
    const grouped = groupByDate();
    setGroupedBoards(grouped);
  }, [boards]);

  return (
    <SBoardsWrapper>
      {challenge.challengeStatus === "END" ? (
        <h1>종료 된 챌린지 입니다</h1>
      ) : challenge.challengeStatus === "WAIT" ? (
        <h1>진행 예정인 챌린지 입니다</h1>
      ) : (
        <CreateBoard
          boards={groupedBoards[formattedToday]}
          getBoard={getBoard}
          classification={challenge.classification}
        />
      )}

      {Object.keys(groupedBoards)
        .reverse()
        .map((date) => (
          <SDiv key={date}>
            <h2>{date}</h2>
            {groupedBoards[date].map((board) => (
              <SBoardWrapper key={board.id}>
                <span id="writer">{board.writer}</span>
                <span id="content">{board.content}</span>
                {user.nickname === board.writer ? (
                  <DeleteBoard getBoard={getBoard} boardId={board.id} />
                ) : (
                  <LikeBoard getBoard={getBoard} board={board} />
                )}
              </SBoardWrapper>
            ))}
          </SDiv>
        ))}
    </SBoardsWrapper>
  );
};

export default ShowBoard;
