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
SBoardDetailBoardInfo,
SLikeButton,
} from '../../styles/pages/SCommunityPage';
import CreateArticleModal from './CreateArticleModal'
import Paging from './Paging';

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/boards';

const CommunityBoardDetail = ({ classification }) => {
const [loading, setLoading] = useState(false);
const user = useSelector((state) => state.users);
const [page, setPage] = useState(0);
const [articles, setArticles] = useState({ content: [], totalPages: 0 });
const [showmodal, setModal] = useState(false);
const [sortMethod, setSortMethod] = useState('전체게시물');

const handleSortMethodChange = (e) => {
    setSortMethod(e.target.value);
    sortArticles(e.target.value, page);
};

useEffect(() => {
  setLoading(true);
  
  const fetchDataAndSetState = async () => {
      const newArticles =
          sortMethod === "default"
              ? await fetchArticles(page)
              : await sortArticles(sortMethod, page);
      setArticles(newArticles);
      setLoading(false);
  };

   fetchDataAndSetState();
}, [page,sortMethod]);

const fetchArticles = async (pageNo = 0) => {
  const res = await api.get(`${API_BASE_URL}/whole/${classification}?page=${pageNo}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return {
    content: res.data.data.content.reverse(),
    totalPages: res.data.data.totalPages,
  };
};

const sortArticles = async (sort = 'default', pageNo = 0) => {
    let url;
    switch (sort) {
        case 'title-desc':
            url = `${API_BASE_URL}/whole/${classification}?page=${pageNo}&sortted=title-desc`;
            break;
        case 'title-asc':
            url = `${API_BASE_URL}/whole/${classification}?page=${pageNo}&sortted=title-asc`;
            break;
        case 'views-desc':
            url = `${API_BASE_URL}/whole/${classification}?page=${pageNo}&sortted=views-desc`;
            break;
        case 'views-asc':
            url = `${API_BASE_URL}/whole/${classification}?page=${pageNo}&sortted=views-asc`;
            break;
        default:
            url = `${API_BASE_URL}/whole/${classification}?page=${pageNo}`;
    }
    const res = await api.get(url, { headers: { Authorization: `Bearer ${user.accessToken}` } });
    
    return {
        content: res.data.data.content,
        totalPages: res.data.data.totalPages
    };
};

const handlePageChange = (newPage) => {
    setPage(newPage - 1);
    sortArticles(sortMethod, newPage - 1);

};

const goToArticleDetail = (id) => {
    window.location.href = `/CommunityBoardPage/${classification}/${id}`;
};

const openModal = () => {
    setModal(true);
};

const formatTime = (time) => {
    const [year, month, day, hour, minute] = time.split('-').map(Number);
    const modifyTime = new Date(year, month - 1, day, hour, minute);
    const getKoreanTime = (dateObj) => {
        const utc = dateObj.getTime() + (dateObj.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        return new Date(utc + KR_TIME_DIFF);
    };
    const current = getKoreanTime(new Date());
    const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const timeDate = `${year}-${month}-${day}`;
    if (currentDate === timeDate) {
        return `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`;
    } else {
        return `${year.toString().substring(2, 4)}.${('0' + month).slice(-2)}.${('0' + day).slice(-2)}`;
    }
};

return (
    <div>
    {loading ? <Loading /> : null}
    <SBoardDetailWrapper>
        <h1>{classification}</h1>
        <SBoardDetailButton onClick={() => openModal()}> 게시글작성 </SBoardDetailButton>
        <SBoardDetailViewSelect value={sortMethod} onChange={handleSortMethodChange} >
            <option value="default">전체 게시물</option>
            <option value="title-desc">제목 내림차순</option>
            <option value="title-asc">제목 오름차순</option>
            <option value="views-desc">조회수 내림차순</option>
            <option value="views-asc">조회수 오름차순</option>
        </SBoardDetailViewSelect>
        {showmodal && (
            <CreateArticleModal classification={classification} setModal={setModal} fetchArticles={fetchArticles} />
        )}
        <SBoardDetailHr />
        <SBoardDetailEmpty />
        {articles && Array.isArray(articles.content) ? (
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
                    <SBoardDetailBoardInfo>{formatTime(article.modifyTime)}</SBoardDetailBoardInfo>
                </div>
                </SBoardDetailRow>
            </SBoardDetailBoard>
            ))
        ) : (
            <p>Loading...</p>
        )}
    </SBoardDetailWrapper>
    <Paging
        activePage={page + 1}
        totalItemsCount={articles.totalPages * 10}
        onChange={handlePageChange}
    />
    </div>
);
};

export default CommunityBoardDetail;
