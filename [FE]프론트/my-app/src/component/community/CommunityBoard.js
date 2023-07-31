// CommunityBoard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArticleList from './ArticleList';

const useTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:8080/boards");
        if (Array.isArray(response.data)) { // 데이터가 배열인지 확인
          setTopics(response.data);
        } else {
          console.error("서버로부터 주제 데이터가 배열 형태로 오지 않았습니다.");
        }
      } catch (error) {
        console.error("주제를 불러오는 중 에러 발생:", error);
      }
    };

    fetchTopics();
  }, []);

  return topics;
};

const CommunityBoard = () => {
  const { topicId } = useParams();
  const topics = useTopics();
  const selectedTopic = topics.find((topic) => topic.id === topicId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/boards/write", {
        title,
        content,
        topicId,
      });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("게시글 작성 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h1>{selectedTopic ? selectedTopic.name : "로딩 중..."}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">작성</button>
      </form>
      <ArticleList topicId={topicId} />
    </div>
  );
};

export default CommunityBoard;
