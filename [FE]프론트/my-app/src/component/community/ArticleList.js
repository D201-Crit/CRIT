import React, { useEffect, useState } from "react"; // 필요한 React hooks를 가져옵니다.
import axios from "axios"; // axios를 가져옵니다.
import { Link } from "react-router-dom"; // react-router-dom의 Link 컴포넌트를 가져옵니다.

// topicId prop을 사용하여 주제별 게시글 목록을 보여주는 컴포넌트입니다.
const ArticleList = ({ topicId }) => {
  const [articleList, setArticleList] = useState([]); // articleList 상태변수를 초기화합니다.

  useEffect(() => {
    const getArticleList = async () => { // 게시글 목록을 반환하는 비동기 함수를 정의합니다.
      try {
        // 선택된 주제에 해당하는 게시글 목록을 API로 요청하고 응답을 받습니다.
        const response = await axios.get(`/api/board?topicId=${topicId}`);
        setArticleList(response.data); // 받은 데이터를 articleList 상태변수에 저장합니다.
      } catch (error) {
        // 에러가 발생할 경우 에러 메시지를 출력합니다.
        console.error("Error fetching articles list for topic:", error);
      }
    };

    getArticleList(); // 컴포넌트가 마운트될 때 게시글 목록을 조회합니다.
  }, [topicId]); // topicId가 변경될 때마다 새로운 게시글 목록을 가져옵니다.

  return (
    <div>
      {/* 게시글 목록을 리스트로 표시합니다. */}
      <ul>
        {articleList.map((article) => (
          // 게시글의 개수만큼 li 요소를 반복하여 생성합니다.
          <li key={article.idx}>
            {/* 게시글 제목을 출력하고, 상세 페이지로 이동할 수 있는 링크를 제공합니다. */}
            <Link to={`/board/${article.idx}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList; // ArticleList 컴포넌트를 export합니다.
