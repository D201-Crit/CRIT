import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  SHr,
  SCommunityWrapper,
  SEmpty,
  SBoardArticleCol,
  SBoardArticleRow,
} from '../../styles/pages/SCommunityPage';
import { api, getNewAccessToken } from '../../api/api';

const API_BASE_URL = 'http://localhost:8080/api/boards';

const CommunityBoardDetail = ({ classification }) => {
  const user = useSelector((state) => state.users);
  const [boards, setBoards] = useState([]); // 모든 게시글 목록
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [newBoard, setNewBoard] = useState({
    title: '',
    content: '',
    classification: classification,
    writer: user.nickname,
  }); // 새로운 게시글 입력 폼 상태
  const [editBoard, setEditBoard] = useState(null); // 수정할 게시글 상태
  const [filteredBoards, setFilteredBoards] = useState([]); // classification에 따라 필터링된 게시글 배열
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

  useEffect(() => {
    fetchBoards();
  }, [classification, page]); // classification과 page를 useEffect의 의존성(dependency)으로 추가합니다.

  // 서버에서 모든 게시글을 가져오는 함수
  const fetchBoards = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}?page=${page}&classification=${classification}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const fetchedBoards = response.data.data.content;
      if (Array.isArray(fetchedBoards)) {
        // 모든 게시글을 상태로 업데이트하면서 liked 속성 추가
        const boardsWithLiked = fetchedBoards.map((board) => ({
          ...board,
          liked: false, // 초기에는 좋아요가 되지 않은 상태로 설정
        }));
        setBoards(boardsWithLiked);
  
        // classification에 따라 게시글을 필터링하여 filteredBoards 상태에 저장합니다.
        const filteredBoards = boardsWithLiked.filter(
          (board) => board.classification === classification
        );
        setFilteredBoards(filteredBoards);
      } else {
        setBoards([]);
      }
      setTotalPages(response.data.data.totalPages); // 전체 페이지 수를 상태로 업데이트
    } catch (error) {
      console.error(error);
      console.log('전체 게시글 조회 실패');
    }
  };


  const handleGoToDetail = (id) => {
    // 자세히 보기 버튼을 누를 때 해당 경로로 이동합니다.
    // classification에 맞는 경로로 이동하도록 수정해주세요.
    // 예를 들어, /CommunityBoardPage/:classification 경로로 이동하도록 합니다.
    window.location.href = `/CommunityBoardPage/${classification}/${id}`;
  };

  const handleCreatePost = () => {
    // 새로운 게시글 작성 모달 열기
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setShowModal(false);
    // 모달 닫을 때 입력 폼 초기화
    setNewBoard({
      title: '',
      content: '',
      classification: '',
      writer: user.nickname,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBoard({
      ...newBoard,
      [name]: value,
      classification: classification, // classification 값을 고정시킴
    });
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/write`, newBoard, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      // 새로운 게시글 작성 성공 시, 모달 닫기 및 게시글 목록에 추가
      fetchBoards();
      setShowModal(false);
      setBoards([...boards, response.data.data]);
      // 입력 폼 초기화
      setNewBoard({
        title: '',
        content: '',
        classification: '',
        writer: user.nickname,
      });
    } catch (error) {
      console.error(error);
      console.log('게시글 작성 실패');
    }
  };


  
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };


const handleLikeClick = async (boardId) => {
  try {
    await api.post(`${API_BASE_URL}/likes/${boardId}`, null, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    // 좋아요 성공 시 해당 게시글의 liked를 true로 업데이트
    setBoards((boards) =>
      boards.map((board) =>
        board.id === boardId ? { ...board, liked: true } : board
      )
    );
  } catch (error) {
    console.error(error);
    console.log('게시글 좋아요 실패');
  }
};

const handleUnlikeClick = async (boardId) => {
  try {
    await api.delete(`${API_BASE_URL}/likes/${boardId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    // 좋아요 삭제 성공 시 해당 게시글의 liked를 false로 업데이트
    setBoards((boards) =>
    boards.map((board) =>
        board.id === boardId ? { ...board, liked: false } : board
      )
    );
  } catch (error) {
    console.error(error);
    console.log('게시글 좋아요 취소 실패');
  }
};

  return (
    <div>
      <h1>{classification}</h1>
      <SHr />
      <SEmpty />
      <SCommunityWrapper>
        {filteredBoards.map((board) => (
          <SBoardArticleCol key={board.id}>
            <SBoardArticleRow>
              <h3 onClick={() => handleGoToDetail(board.id)}>{board.title}</h3>
              <p>작성자: {board.writer}</p>
              <p>조회수: {board.views}</p>
              <p>추천수: {board.likesCount}</p>
              <p>{board.liked}</p>
            </SBoardArticleRow>
            <div>
              {board.liked ? (
                <button onClick={() => handleUnlikeClick(board.id)}>좋아요 취소</button>
              ) : (
                <button onClick={() => handleLikeClick(board.id)}>좋아요</button>
              )}
            </div>
          </SBoardArticleCol>
        ))}
        <button onClick={handleCreatePost}>게시글 작성</button>
      </SCommunityWrapper>

      {/* 게시글 작성 모달 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handlePostSubmit}>
              <div>
                <label>제목:</label>
                <input type="text" name="title" value={newBoard.title} onChange={handleInputChange} />
              </div>
              <div>
                <label>내용:</label>
                <textarea name="content" value={newBoard.content} onChange={handleInputChange}></textarea>
              </div>
        
              <button type="submit">작성 완료</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityBoardDetail;
