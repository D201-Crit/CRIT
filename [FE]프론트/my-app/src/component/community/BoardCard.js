import { SBoardCard, SBoardContainer , } from '../../styles/pages/SCommunityPage';
import React, { useState, useEffect } from 'react';
// 게시판 내용을 표시하는 별도의 컴포넌트를 생성합니다.

const BoardCard = ({ classification, boards }) => {
  return (
    <SBoardCard>
      <h1>{classification} 게시판</h1>
      {boards
        .filter((board) => board.classification === classification)
        .map((board) => (
         <div key={board.id} className="board-item">
          <p>{board.title}</p>
          <p>작성자: {board.writer}</p>
            <p>조회수: {board.views}</p>
            
          </div>
        ))}
    </SBoardCard>
  );
};

export default BoardCard;