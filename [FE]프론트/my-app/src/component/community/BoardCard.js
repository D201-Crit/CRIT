// BoardCard 컴포넌트
import React from 'react';
import { SBoardCard, SBoardTitle, SHr2 } from '../../styles/pages/SCommunityPage';

const BoardCard = ({ classification, boards }) => {
  const maxBoardArticle = 6;

  const handleGoToDetail = () => {
    // 자세히 보기 버튼을 누를 때 해당 경로로 이동합니다.
    // classification에 맞는 경로로 이동하도록 수정해주세요.
    // 예를 들어, /CommunityBoardPage/:classification 경로로 이동하도록 합니다.
    window.location.href = `/CommunityBoardPage/${classification}`;
  };

  return (
    <SBoardCard>
      <h1>{classification}</h1>
      <SBoardTitle />
      {boards
        .filter((board) => board.classification === classification)
        .slice(0, maxBoardArticle)
        .map((board, index) => (
          <div key={board.id}>
            <div className="board-item">
              <p>{board.title}</p>
              <p>작성자: {board.writer}</p>
              <p>조회수: {board.views}</p>
            </div>
            <SHr2 />
          </div>
        ))}
        {/* 자세히 보기 버튼을 누르면 handleGoToDetail 함수가 호출됩니다. */}
        <p className="gotodetail" onClick={handleGoToDetail}>자세히 보기</p>
    </SBoardCard>
  );
};

export default BoardCard;
