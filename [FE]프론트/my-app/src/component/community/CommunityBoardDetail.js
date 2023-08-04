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
  const [sortMethod, setSortMethod] = useState('전체게시물');

const handleSortMethodChange = (e) => {
  setSortMethod(e.target.value);
  sortArticles(e.target.value);
};
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

  const sortArticles = async (sort = 'whole') => {
    let url;
  
    switch (sort) {
      case 'desc':
        url = `${API_BASE_URL}/desc`;
        break;
      case 'asc':
        url = `${API_BASE_URL}/asc`;
        break;
      case 'viewsdesc':
        url = `${API_BASE_URL}/viewsdesc`;
        break;
      case 'viewsasc':
        url = `${API_BASE_URL}/viewsasc`;
        break;
      default:
        url = `${API_BASE_URL}/whole/${classification}`;
    }
  
    api.get(url, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        setArticles(res.data.data.content);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  // 좋아요 기능
  const articleLike = async (articleid) =>{
    api.post(`${API_BASE_URL}/likes/${articleid}`, null,{
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      fetchArticles();
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const deleteLike = async (articleid) =>{
    api.delete(`${API_BASE_URL}/likes/${articleid}`,{
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      console.log('Delete Like Response:',res);
      return fetchArticles();
      
    })
    .catch((error) => {
      console.log(error)
    })
  };
  


  const goToArticleDetail = (id) => {
    // 클릭하면 게시글 디테일로 넘어감
    window.location.href = `/CommunityBoardPage/${classification}/${id}`;
  };

  // 모달 열기
  const openModal = () => {
    setModal(true);
  }

  return (
    <div>
      {/* 게시판 제목 */}
      <h1>{classification}</h1> 
      <button onClick={()=>{openModal()}}>게시글작성</button>

      {/* 게시판 정렬 */}
      <select value={sortMethod} onChange={handleSortMethodChange}>
      <option value="whole">전체게시물</option>
      <option value="desc">제목순 내림차순</option>
      <option value="asc">제목순 오름차순</option>
      <option value="viewsdesc">조회순 내림차순</option>
      <option value="viewsasc">조회순 오름차순</option>
       </select>

      {/* 게시글 작성 모달 */}
      {showmodal && (
          <CreateArticleModal classification={classification} setModal={setModal} fetchArticles={fetchArticles}/>)}

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


            
              <div>
              {article.liked.includes(user.id)? (
                <button onClick={() => deleteLike(article.id)}>
                  좋아요 취소
                </button>
              ) : (
                <button onClick={() => articleLike(article.id)}>
                  좋아요
                </button>
              )}
            </div>

            </SBoardArticleRow>
          </SBoardArticleCol>
        ))) : (
          <p>Loading...</p>
        )}
      </SCommunityWrapper>
    </div>  
  );
};    

export default CommunityBoardDetail;


