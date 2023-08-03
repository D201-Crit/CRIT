import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { api, getNewAccessToken } from '../../api/api';
import BoardCard from './BoardCard.js'
import { SHr, SEmpty } from '../../styles/pages/SCommunityPage';
const API_BASE_URL = 'http://localhost:8080/api/boards';

const CommunityBoard = () => {
  const user = useSelector((state) => state.users);
  const [boards, setBoards] = useState([]);
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []); // 빈 의존성 배열을 사용하여 초기 렌더링 시에만 실행

  const fetchBoards = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const fetchedBoards = response.data.data.content;
      console.log(fetchedBoards);
      
      // fetchedBoards에서 classification 값을 추출하여 중복을 제거하고, topic 상태에 배열 형태로 저장합니다.
      const fetchedTopics = Array.from(new Set(fetchedBoards.map((board) => board.classification)));
      console.log(fetchedTopics);

      if (Array.isArray(fetchedBoards)) {
        setBoards(fetchedBoards);
        setTopic(fetchedTopics);
      } else {
        setBoards([]);
      }
    } catch (error) {
      console.error(error);
      console.log('전체 게시글 조회 실패');
    }
  };

  return (
    <div>
      <div>
        <SHr/>
        <SEmpty/>
       {/* 각 classification에 해당하는 게시글을 분류하여 표시합니다. */}
       {topic.map((classification) => (
          <BoardCard key={classification} classification={classification} boards={boards}/>))}
      </div>
    </div>
  );
};

export default CommunityBoard;
