import React from "react";
import { useParams } from "react-router-dom"; // useParams 훅을 임포트합니다.
import ArticleList from "./ArticleList"; // ArticleList 컴포넌트를 임포트합니다.
import { useState, useEffect } from "react"; // useState와 useEffect를 임포트합니다.
import axios from "axios"; // axios를 임포트합니다.

const useTopics = () => {
  const [topics, setTopics] = useState([]); // 주제 목록을 저장할 상태 변수입니다.

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // axios를 사용하여 주제 데이터를 가져와 topics 상태에 저장합니다.
        const response = await axios.get("/api/topics");
        setTopics(response.data);
      } catch (error) {
        // 에러 발생시 콘솔에 에러를 출력합니다.
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics(); // 주제 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return topics; // 주제 데이터를 반환합니다.
};

const CommunityBoard = () => {
  const { topicId } = useParams(); // 주제별로 구분하기 위해 주제 ID를 가져옵니다.
  const topics = useTopics(); // 주제 목록을 가져옵니다.
  // 선택된 주제를 topics에서 찾습니다.
  const selectedTopic = topics.find((topic) => topic.id === topicId);

  // 선택된 주제에 해당하는 게시글 목록을 렌더링합니다.
  return (
    <div>
      {/* 선택된 주제의 이름을 출력하거나 로딩 중임을 나타냅니다. */}
      <h1>{selectedTopic ? selectedTopic.name : "Loading..."}</h1>
      {/* 선택된 주제의 ArticleList를 출력합니다. */}
      <ArticleList topicId={topicId} />
    </div>
  );
};

export default CommunityBoard; // CommunityBoard 컴포넌트를 export합니다.
