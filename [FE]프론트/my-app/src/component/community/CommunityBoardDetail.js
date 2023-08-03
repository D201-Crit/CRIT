import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import {
  SHr,
  SCommunityWrapper,
  SEmpty,
  SBoardArticleCol,
  SBoardArticleRow,
} from '../../styles/pages/SCommunityPage';
import CreateArticleModal from './CreateArticleModal'


const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityBoardDetail = ({classification}) => {
  const user = useSelector((state) => state.users);
  
  const [articles, setArticles] = useState(null); // 게시글 목록 State
  const [showmodal,setModal] = useState(false);

  // 초기 렌더링 시 실행
  useEffect(() => {
    fetchArticles();
  }, []); 


  // 현재 게시판에 해당하는 게시글 불러오기
  const fetchArticles = async () => {
    api.get(`${API_BASE_URL}/whole/${classification}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      setArticles(res.data.data.content);
      
      console.log(res);

    })
    .catch((error) => {
      console.log(error)
    })
  };

  const goToArticleDetail = (id) => {
    // 클릭하면 게시글 디테일로 넘어감
    window.location.href = `/CommunityBoardPage/${classification}/${id}`;
  };

  const openModal = () => {
    setModal(true);
  }

  return (
    <div>
      {/* 게시판 제목 */}
      <h1>{classification}</h1> 
      <button onClick={()=>{openModal()}}>게시글작성</button>

      {/* 게시글 작성 모달 */}
      {showmodal && (
          <CreateArticleModal classification={classification} setModal={setModal}/>)}

      <SHr />
      <SEmpty />
      <SCommunityWrapper>
      {Array.isArray(articles) ? ( 
        articles.map((article) => (
          <SBoardArticleCol key={article.id}>
            <SBoardArticleRow>
              <h3 onClick={() => goToArticleDetail(article.id)}>{article.title}</h3>
              <p>작성자: {article.writer}</p>
              <p>조회수: {article.views}</p>
              <p>추천수: {article.likesCount}</p>
              <p>{article.liked}</p>
            </SBoardArticleRow>
       
          </SBoardArticleCol>
        ))) : (
          <p>Loading...</p>
        )}
        {/* <button onClick={handleCreatePost}>게시글 작성</button> */}
      </SCommunityWrapper>

    </div>
  );
};

export default CommunityBoardDetail;


// <div>
// {article.liked ? (
//   <button onClick={() => handleUnlikeClick(article.id)}>좋아요 취소</button>
// ) : (
//   <button onClick={() => handleLikeClick(article.id)}>좋아요</button>
// )}
// </div>