import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import BoardCard from './BoardCard.js'
import Loading from '../Loading';
import { 
  SHr, 
  SEmpty, 
  SBoardArticleCol,
  SBoardContainer
} from '../../styles/pages/SCommunityPage';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/boards';
// const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityBoard = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const [boards, setBoards] = useState([]);
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
    api.get(`${API_BASE_URL}/whole/`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        setLoading(false); 
        const fetchedBoards = res.data.data.content.filter(article => ["자유게시판", "자랑게시판", "운동게시판", "반려동물 게시판"].includes(article.classification)).sort((a, b) => new Date(b.id) - new Date(a.id));
        const fetchedTopics = Array.from(new Set(fetchedBoards.map((board) => board.classification)));
        if (Array.isArray(fetchedBoards)) {
          setBoards(fetchedBoards);
          setTopic(fetchedTopics);
        } else {
          setBoards([]);
          setTopic(fetchedTopics);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('전체 게시글 조회 실패');
      });
  };

  return (
    <div>
      {loading ? <Loading /> : null}
      <SHr />
      <SEmpty />
      <SBoardContainer>
        {/* 각 classification에 해당하는 게시글을 분류하여 표시. */}
        {topic.map((classification, index) => (
          <SBoardArticleCol key={index}>
            <BoardCard key={classification} classification={classification} boards={boards} />
          </SBoardArticleCol>
        ))}
      </SBoardContainer>
    </div>
  );
};

export default CommunityBoard;
