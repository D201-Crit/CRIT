import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from './../../src/api/api.js'

import axios from 'axios';
import { useSelector } from "react-redux";

const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityArticleDetailPage = () => {
  const user = useSelector((state) => state.users);
  const { classification, articleid } = useParams();
  const [ articles, setArticles] = useState(null); // 게시글 목록 State
  const [newComment, setNewComment] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false); // 수정 폼 표시 여부

  useEffect(() => {
    // fetchBoard와 fetchComments를 순차적으로 실행하기 위해 async 함수를 사용
    const fetchData = async () => {
      await fetchArticles();
      await fetchComments();
    };

    fetchData();
  }, []);

  const fetchArticles = async () => {
    api.get(`${API_BASE_URL}/${articleid}`, {
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


  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments/${articleid}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setArticles((prevBoard) => ({ ...prevBoard, comments: response.data.data || [] }));
    } catch (error) {
      console.error(error);
      console.log('댓글 조회 실패');
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/comments/${articleid}`,
        {
          content: newComment,
          writer: user.nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (response.data.success) {
        setNewComment('');
        await fetchArticles();
        await fetchComments();
      } else {
        console.log('댓글 작성 실패');
      }
    } catch (error) {
      console.error(error);
      console.log('댓글 작성 실패');
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/comments/${articleid}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      await fetchArticles();
      await fetchComments();
    } catch (error) {
      console.error(error);
      console.log('댓글 삭제 실패');
    }
  };

  const isMyComment = (comment) => {
    return user.nickname === comment.writer;
  };

  const isMyBoard = () => {
    return user.nickname === articles.writer;
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${articleid}`,
        {
          title: articles.title,
          content: articles.content,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setArticles({ ...articles, title: response.data.data.title, content: response.data.data.content });
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      console.log('게시글 수정 실패');
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${articleid}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      // 삭제 후 이전 페이지로 이동 또는 처리할 로직 추가
    } catch (error) {
      console.error(error);
      console.log('게시글 삭제 실패');
    }
  };

  return (
    <div>
        
          
    </div>
  );
};

export default CommunityArticleDetailPage;
