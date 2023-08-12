import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import Loading from '../Loading';
import {
  
  SBoardDetailWrapper,
  SBoardDetailHr,
  SBoardDetailEmpty,
  SBoardDetailButton,
  SBoardDetailViewSelect,
  SBoardDetailRow,
  SBoardDetailBoard,
  SBoardDetailBoardTitle,
  SBoardDetailBoardInfo,
  SLikeButton,
} from '../../styles/pages/SCommunityPage';

import CreateArticleModal from './CreateArticleModal'
import Paging from './Paging';


const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/boards';
// const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityBoardDetail = ({ classification }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState({ content: [], totalPages: 0 });
  const [showmodal, setModal] = useState(false);
  const [sortMethod, setSortMethod] = useState('전체게시물');

  const handleSortMethodChange = (e,) => {
    setSortMethod(e.target.value);
    sortArticles(e.target.value, page);
  };
  

  useEffect(() => {
    fetchArticles(page);
  }, [page]);


  const fetchArticles = async (pageNo = 0) => {
    setLoading(false); 
    api.get(`${API_BASE_URL}/whole/${classification}?page=${pageNo}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        setArticles({
          content: res.data.data.content.filter(article => article.title !== "")
            .sort((a, b) => new Date(b.id) - new Date(a.id)),
          totalPages: res.data.data.totalPages,
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const sortArticles = async (sort = 'whole', pageNo = 0) => {
    let url;
    console.log(classification)
    switch (sort) {
      case 'desc':
        url = `${API_BASE_URL}/desc?page=${pageNo}`;
        break;
      case 'asc':
        url = `${API_BASE_URL}/asc?page=${pageNo}`;
        break;
      // api 요청 주소 다시 알아내기
      case 'viewsdesc':
        url = `${API_BASE_URL}/boards/whole/${classification}/views-desc?page=${pageNo}`;
        break;
      case 'viewsasc':
        url = `${API_BASE_URL}/boards/whole/${classification}/views-asc?page=${pageNo}`;
        break;
      default:
        url = `${API_BASE_URL}/whole/${classification}?page=${pageNo}`;
    }
    api.get(url, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        setArticles({
          content: res.data.data.content.filter(article => article.title !== "").sort((a, b) => new Date(b.id) - new Date(a.id)),
          totalPages: res.data.data.totalPages
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  // // 페이지네이션
  // const handlePageButtonClick = (newPage) => {
  //   setPage(newPage);
  //   sortArticles(sortMethod, newPage);
  // };
  
  // //페이지 변경 버튼
  // const PageButton = ({ pageNumber, onClick }) => {
  //   return (
  //     <button onClick={() => onClick(pageNumber)}>
  //       {pageNumber + 1}
  //     </button>
  //   );
  // };

  // const Pagination = ({ totalPages, onPageClick }) => {
  //   // totalPages는 서버로부터 받은 총 페이지 수
  //   const pageButtons = [];
  //   for (let i = 0; i < totalPages; i++) {
  //     pageButtons.push(
  //       <PageButton key={i} pageNumber={i} onClick={onPageClick} />
  //     );
  //   }
  
  //   return (
  //     <div>
  //       {pageButtons}
  //     </div>
  //   );
  // };
  
  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
    sortArticles(sortMethod, newPage - 1);
  };

  


  const goToArticleDetail = (id) => {                     // 클릭하면 게시글 디테일로 넘어감
    window.location.href = `/CommunityBoardPage/${classification}/${id}`;
  };

  const openModal = () => {                               // 모달 열기
    setModal(true);
  };



  return (
    <div>
    {loading ? <Loading /> : null}

    <SBoardDetailWrapper>
      <h1>{classification}</h1>
      <SBoardDetailButton onClick={() => openModal()}>
        게시글작성
      </SBoardDetailButton>
      {/* <Pagination totalPages={articles.totalPages} onPageClick={handlePageButtonClick} /> */}
      <SBoardDetailViewSelect
        value={sortMethod}
        onChange={handleSortMethodChange}
      >
        <option value="whole">전체게시물</option>
        <option value="desc">제목순 내림차순</option>
        <option value="asc">제목순 오름차순</option>
        <option value="viewsdesc">조회순 내림차순</option>
        <option value="viewsasc">조회순 오름차순</option>
      </SBoardDetailViewSelect>

      {showmodal && (                                      // 게시글 작성 모달
        <CreateArticleModal
          classification={classification}
          setModal={setModal}
          fetchArticles={fetchArticles}
        />
      )}

      <SBoardDetailHr />
      <SBoardDetailEmpty />

      {Array.isArray(articles.content) ? (                        // 게시글 목록
        articles.content.map((article) => (
          <SBoardDetailBoard key={article.id}>
            <SBoardDetailRow>
              <SBoardDetailBoardInfo onClick={() => goToArticleDetail(article.id)}>
                {article.title}
              </SBoardDetailBoardInfo>
              <div>
                <SBoardDetailBoardInfo>작성자: {article.writer}</SBoardDetailBoardInfo>
                <SBoardDetailBoardInfo>조회수: {article.views}</SBoardDetailBoardInfo>
                <SBoardDetailBoardInfo>추천수: {article.likesCount}</SBoardDetailBoardInfo>
                {/* <SBoardDetailBoardInfo>{article.liked}</SBoardDetailBoardInfo> */}
                
              </div>
              
            </SBoardDetailRow>
            
          </SBoardDetailBoard>
      
      
          
        ))
        
      ) : (
        <p>Loading...</p>
      )}

    <Paging
      activePage={page + 1}
      totalItemsCount={articles.totalPages * 10}
      onChange={handlePageChange}
      />
    </SBoardDetailWrapper>
    </div>
  );
};

export default CommunityBoardDetail;
