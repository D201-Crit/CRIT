import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityBoard = () => {
  const user = useSelector((state) => state.users);
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [newBoard, setNewBoard] = useState({
    title: '',
    content: '',
    classification: '', // 선택한 게시판 종류를 이 상태에 저장합니다
    writer: user.nickname,
  });
  const [editBoard, setEditBoard] = useState(null);

  useEffect(() => {
    fetchBoards();
  }, [page]);

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}?page=${page}`);
      const fetchedBoards = response.data.data.content;
      if (Array.isArray(fetchedBoards)) {
        setBoards(fetchedBoards);
      } else {
        setBoards([]);
      }
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error(error);
      console.log('전체 게시글 조회 실패');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBoard({
      ...newBoard,
      [name]: value,
    });
  };

  const handleBoardSubmit = async (event) => {
    event.preventDefault();
    try {

      if (editBoard) {
        // editBoard가 존재한다면, 기존 게시물을 수정하는 것이므로 PUT 요청
        const response = await axios.put(`${API_BASE_URL}/update/${editBoard.id}`, newBoard);
        setBoards((prevBoards) =>
          prevBoards.map((board) => (board.id === response.data.data.id ? response.data.data : board))
        );
        setEditBoard(null); // 수정 완료 후 editBoard 상태 초기화
      } else {
        // editBoard가 없다면 새로운 게시물을 작성하는 것이므로 POST 요청
        const response = await axios.post(`${API_BASE_URL}/write`, newBoard);
        setBoards([...boards, response.data.data]);
      }
      setNewBoard({
        title: '',
        content: '',
        classification: '', // 폼 제출 후 게시판 종류를 초기화합니다
        writer: user.nickname,
      });
    } catch (error) {
      console.log(newBoard);
      console.error(error);
      console.log('게시글 작성 실패');
    }
  };

  const handleEditClick = (board) => {
    // 수정 버튼을 클릭한 게시물의 정보를 editBoard 상태로 설정하여 수정할 수 있도록 함
    setEditBoard(board);
    setNewBoard({
      title: board.title,
      content: board.content,
      classification: "ddd",
      writer: board.writer,
    });
  };

  const handleDeleteClick = async (boardId) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${boardId}`);
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    } catch (error) {
      console.error(error);
      console.log('게시글 삭제 실패');
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  return (
    <div>
      <h1>게시판</h1>
      <form onSubmit={handleBoardSubmit}>
        <div>
          <label>제목:</label>
          <input type="text" name="title" value={newBoard.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>내용:</label>
          <textarea name="content" value={newBoard.content} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>게시판 종류:</label>
          <select name="classification" value={newBoard.classification} onChange={handleInputChange}>
            <option value="">선택하세요</option>
            <option value="StudyPost">스터디</option>
            <option value="Challenge">챌린지</option>
            <option value="DietPost">다이어트</option>
            <option value="FreePost">자유게시판</option>

          </select>
        </div>
        <button type="submit">{editBoard ? '글 수정' : '글 작성'}</button>
      </form>
      <div>
        <h2>전체 게시물</h2>
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <h3>{board.title}</h3>
              <p>{board.content}</p>
              <p>작성자: {board.writer}</p>
              <p>조회수: {board.views}</p>
              <button onClick={() => handleEditClick(board)}>수정</button>
              <button onClick={() => handleDeleteClick(board.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
      {/* 페이지네이션 UI */}
      <div>
        <button onClick={handlePrevPage} disabled={page === 0}>
          이전 페이지
        </button>
        <span>현재 페이지: {page + 1}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default CommunityBoard;