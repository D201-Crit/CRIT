import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from "../../api/api";
import {
  SHr,
  SCommunityWrapper,
  SEmpty,
  SBoardArticleCol,
  SBoardArticleRow,
  SBoardDetailWrapper,
  SBoardDetailHr,
  SBoardDetailEmpty,
  SBoardDetailTitle,
  SBoardDetailButton,
  SBoardDetailViewSelect,
  SBoardDetailRow,
  SBoardDetailBoard,
  SBoardDetailBoardTitle,
  SBoardDetailBoardInfo,
  SLikeButton,
} from '../../styles/pages/SCommunityPage';
import CreateArticleModal from './CreateArticleModal'

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/boards';
// const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityBoardDetail = ({ classification }) => {
  const user = useSelector((state) => state.users);

  const [
    articles,
    setArticles,
  ] = useState(null);                                     // 게시글 목록 State
  const [showmodal, setModal] = useState(false);
  const [sortMethod, setSortMethod] = useState('전체게시물');

  const handleSortMethodChange = (e) => {
    setSortMethod(e.target.value);
    sortArticles(e.target.value);
  };

  useEffect(() => {                                        // 초기 렌더링 시 실행
    fetchArticles();
  }, []);

  const fetchArticles = async () => {                      // 현재 게시판에 해당하는 게시글 불러오기
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
        console.log(error);
      });
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

  const articleLike = async (articleid) => {              // 좋아요 기능
    api.post(`${API_BASE_URL}/likes/${articleid}`, null, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        fetchArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLike = async (articleid) => {
    api.delete(`${API_BASE_URL}/likes/${articleid}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        console.log('Delete Like Response:', res);
        return fetchArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goToArticleDetail = (id) => {                     // 클릭하면 게시글 디테일로 넘어감
    window.location.href = `/CommunityBoardPage/${classification}/${id}`;
  };

  const openModal = () => {                               // 모달 열기
    setModal(true);
  };

  return (
    <SBoardDetailWrapper>
      <h1>{classification}</h1>
      <SBoardDetailButton onClick={() => openModal()}>
        게시글작성
      </SBoardDetailButton>

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

      {Array.isArray(articles) ? (                        // 게시글 목록
        articles.map((article) => (
          <SBoardDetailBoard key={article.id}>
            <SBoardDetailRow>
              <SBoardDetailBoardInfo onClick={() => goToArticleDetail(article.id)}>
                {article.title}
              </SBoardDetailBoardInfo>
              <div>
                <SBoardDetailBoardInfo>작성자: {article.writer}</SBoardDetailBoardInfo>
                <SBoardDetailBoardInfo>조회수: {article.views}</SBoardDetailBoardInfo>
                <SBoardDetailBoardInfo>추천수: {article.likesCount}</SBoardDetailBoardInfo>
                <SBoardDetailBoardInfo>{article.liked}</SBoardDetailBoardInfo>
                {article.liked.includes(user.nickname) ? (
                  <SLikeButton onClick={() => deleteLike(article.id)}>
                    좋아요 취소
                  </SLikeButton>
                ) : (
                  <SLikeButton onClick={() => articleLike(article.id)}>
                    좋아요
                  </SLikeButton>
                )}
              </div>
            </SBoardDetailRow>
          </SBoardDetailBoard>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </SBoardDetailWrapper>
  );
};

export default CommunityBoardDetail;
