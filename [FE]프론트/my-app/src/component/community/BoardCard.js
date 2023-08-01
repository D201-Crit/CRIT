import React, { useState, useEffect } from 'react';
import { SBoardCard, SBoardContainer, SBoardTitle } from '../../styles/pages/SCommunityPage';

const BoardCard = ({ classification, boards }) => {
  const maxBoardArticle = 6;
  return (
    <SBoardCard>
      <h1>{classification}</h1>
      <SBoardTitle />
      {boards
        .filter((board) => board.classification === classification)
        .slice(0, maxBoardArticle)
        .map((board, index) => (
          <div>
          <div key={board.id} className="board-item">
            <p>{board.title}</p>
            <p>작성자: {board.writer}</p>
            <p>조회수: {board.views}</p>
            
          </div>
          <hr></hr>
          </div>
        ))}
      <p className="gotodetail">자세히 보기</p>
    </SBoardCard>
  );
};

export default BoardCard;
