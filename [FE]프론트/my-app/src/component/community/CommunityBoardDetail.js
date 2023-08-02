import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SHr, SCommunityWrapper, SEmpty, SBoardArticleCol,SBoardArticleRow } from '../../styles/pages/SCommunityPage';
import axios from 'axios';
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
    classification: '',
    writer: user.nickname,
  }); // 새로운 게시글 입력 폼 상태
  const [editBoard, setEditBoard] = useState(null); // 수정할 게시글 상태
  const [filteredBoards, setFilteredBoards] = useState([]); // classification에 따라 필터링된 게시글 배열 추가

  useEffect(() => {
    fetchBoards();
  }, [classification, page]); // classification과 page를 useEffect의 의존성(dependency)으로 추가합니다.


  const handleGoToDetail = (id) => {
    // 자세히 보기 버튼을 누를 때 해당 경로로 이동합니다.
    // classification에 맞는 경로로 이동하도록 수정해주세요.
    // 예를 들어, /CommunityBoardPage/:classification 경로로 이동하도록 합니다.
    window.location.href = `/CommunityBoardPage/${classification}/${id}`;
  };


  // 서버에서 모든 게시글을 가져오는 함수
  const fetchBoards = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}?page=${page}&classification=${classification}`, // classification을 API 요청에 포함시킵니다.
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const fetchedBoards = response.data.data.content; // 서버에서 받아온 모든 게시글 배열
      if (Array.isArray(fetchedBoards)) {
        setBoards(fetchedBoards); // 모든 게시글을 상태로 업데이트
        // classification에 따라 게시글을 필터링하여 filteredBoards 상태에 저장합니다.
        const filteredBoards = fetchedBoards.filter((board) => board.classification === classification);
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
        const response = await axios.put(`${API_BASE_URL}/update/${editBoard.id}`, newBoard, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setBoards((prevBoards) =>
          prevBoards.map((board) => (board.id === response.data.data.id ? response.data.data : board))
        );
        setEditBoard(null);
      } else {
        const response = await axios.post(`${API_BASE_URL}/write`, newBoard, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setBoards([...boards, response.data.data]);
      }
      setNewBoard({
        title: '',
        content: '',
        classification: '',
        writer: user.nickname,
      });
    } catch (error) {
      console.log(newBoard);
      console.error(error);
      console.log('게시글 작성 실패');
    }
  };

  const handleEditClick = (board) => {
    setEditBoard(board);
    setNewBoard({
      title: board.title,
      content: board.content,
      classification: board.classification,
      writer: board.writer,
    });
  };

  const handleDeleteClick = async (boardId) => {
    try {
      await api.delete(`${API_BASE_URL}/delete/${boardId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
      setFilteredBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
      console.log('삭제 성공');
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
      <h1>{classification}</h1>
      <SHr />
      <SEmpty />
      <SCommunityWrapper >
       
          {filteredBoards.map((board) => (
            <SBoardArticleCol key={board.id}>
              <SBoardArticleRow >
              <h3 onClick={()=> handleGoToDetail(board.id)} >{board.title}</h3>
              <p>작성자: {board.writer}</p>
              <p>조회수: {board.views}</p>
              </SBoardArticleRow>
              <div>
                <button onClick={() => handleEditClick(board)}>수정</button>
                <button onClick={() => handleDeleteClick(board.id)}>삭제</button>
              </div>
            </SBoardArticleCol>
          ))}
      </SCommunityWrapper>
    </div>
  );
};

export default CommunityBoardDetail;
