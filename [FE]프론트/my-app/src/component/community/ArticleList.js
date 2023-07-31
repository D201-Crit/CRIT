// ArticleList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticleList = ({ topicId }) => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const getArticleList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/boards?topicId=${topicId}`);
        // 서버로부터 받은 데이터가 배열인지 확인
        if (Array.isArray(response.data)) {
          setArticleList(response.data);
        } else {
          console.error("서버로부터 게시글 목록이 배열 형태로 오지 않았습니다.");
        }
      } catch (error) {
        console.error("주제별 게시글 목록을 불러오는 중 에러 발생:", error);
      }
    };

    getArticleList();
  }, [topicId]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/boards/delete/${id}`);
      setArticleList(articleList.filter((article) => article.idx !== id));
    } catch (error) {
      console.error("게시글 삭제 중 에러 발생:", error);
    }
  };

  return Array.isArray(articleList) ? (
    <div>
      <ul>
        {articleList.map((article) => (
          <li key={article.idx}>
            <Link to={`/board/${article.idx}`}>{article.title}</Link>
            <button onClick={() => handleDelete(article.idx)}>삭제</button>
            <Link to={`/board/${article.idx}/edit`}>수정</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    // articleList가 배열이 아닌 경우, 에러 메시지 또는 로딩 중 메시지를 표시
    <div>
      <p>게시글 목록을 불러오는 중 에러가 발생하거나 데이터 형식이 올바르지 않습니다.</p>
    </div>
  );
};

export default ArticleList;