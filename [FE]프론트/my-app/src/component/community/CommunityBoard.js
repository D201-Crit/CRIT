import React from "react";
import BoardCard from "./BoardCard.js";
import {
  SHr,
  SEmpty,
  SBoardArticleCol,
  SBoardContainer,
} from "../../styles/pages/SCommunityPage";

const CommunityBoard = () => {
  const boards = [
    { title: "자유 게시판", imagePath: "/board3.png" },
    { title: "자랑게시판", imagePath: "/board2.png" },
    { title: "운동 게시판", imagePath: "/board1.png" },
    { title: "반려동물 게시판", imagePath: "/board4.png" },
  ];

  return (
    <div>
      <SHr />
      <SEmpty />
      <SBoardContainer>
        {boards.map((board, index) => (
          <SBoardArticleCol key={index}>
            <BoardCard board={board.title} imagePath={board.imagePath} />
          </SBoardArticleCol>
        ))}
      </SBoardContainer>
    </div>
  );
};

export default CommunityBoard;
