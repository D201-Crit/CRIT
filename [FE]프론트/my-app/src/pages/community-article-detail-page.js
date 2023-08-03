import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from './../../src/api/api.js'
import { useSelector } from "react-redux";

const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityArticleDetailPage = () => {
  const user = useSelector((state) => state.users);
  const { classification, articleid } = useParams();
  const [ articles, setArticles] = useState(null); // 게시글 목록 State
  const [comments, setComments] = useState(null); // 댓글 목록 State
  const [newComment,setNewComment] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false); // 수정 폼 표시 여부

  useEffect(() => {
    // fetchBoard와 fetchComments를 순차적으로 실행하기 위해 async 함수를 사용
    const fetchData = async () => {
      await fetchArticles();
      await fetchComments();
    };
    fetchData();
  }, []);


// 단일 게시글 불러오기
  const fetchArticles = async () => {
    api.get(`${API_BASE_URL}/${articleid}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      setArticles(res.data.data);
      console.log(res);

    })
    .catch((error) => {
      console.log(error)
    })
  };

// 댓글 불러오기
  const fetchComments = async () => {
    api.get(`${API_BASE_URL}/comments/${articleid}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      setNewComment('');
      console.log(res);
      setComments(res.data.data);

    })
    .catch((error) => {
      console.log(error)
    })
  };

// 댓글 작성 변화 감지
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

// 댓글 작성하기
  const writeComment = async (event) => {
    event.preventDefault();
    api.post(`${API_BASE_URL}/comments/${articleid}`, 
    {
      content: newComment,
      writer: user.nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then(() => {
      setNewComment('');
      return fetchArticles();
    })
    .then(() => {
      return fetchComments(); // fetchComments() 실행 후 Promise 반환
    })
    .catch((error) => {
      console.log(error)
      console.log('댓글 작성 실패');
    })
  };


// 댓글 삭제
  const deleteComment = async (commentId) => {
      api.delete(`${API_BASE_URL}/comments/${articleid}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      
      .then((res) => {
        setComments(res.data.data.content);
        return fetchArticles();
      })
      .then(() => {
        return fetchComments(); // fetchComments() 실행 후 Promise 반환
      })
      .catch((error) => {
        console.log(error)
        console.log('댓글 삭제 실패');

      })
    };

// 게시글 수정
  // const editArticle = async (event) => {
  //   api.put(`${API_BASE_URL}/update/${articleid}`, {
  //   headers: {
  //     Authorization: `Bearer ${user.accessToken}`,
  //   },
  // })
    
  //게시글 삭제
  const deleteArticle = async (articleid) => {
    api.delete(`${API_BASE_URL}/delete/${articleid}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      console.log('게시글 삭제 성공');
      return fetchArticles();

    })
    .then((res) => {
      window.location.href = `/CommunityBoardPage/${classification}`;
    })
    .catch ((error) => {
      console.error(error);
      console.log('게시글 삭제 실패');
    })
  };

  const isMyComment = (comment) => {
    return user.id === comment.writer;
  };
  
  const isMyArticle = (article) => {
    return user.id === article.writer;
  };
  
  const backtothePage = () => {
    window.location.href = `/CommunityBoardPage/${classification}`;
  }

  return (
    <div>
      {articles && (
        <div>
          <h1>{articles.title}</h1>
          <h3>{articles.content}</h3>
          <h3>{articles.liked}</h3>
          <div>
          {isMyArticle(articles) && (
          <div>
          <button onClick={()=>deleteArticle(articles.id)}>게시글 삭제</button>
          <button>게시글 수정</button>
          </div>
          )}
          </div>
        </div>
      )}

      

      <div>댓글 작성하기</div>
      <form onSubmit={writeComment}>
        <input type='textarea' value={newComment} onChange={handleCommentChange}></input>
        <input type='submit'></input>
      </form>
    
      {comments && (
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>작성자: {comment.writer}</p>
              {isMyComment(comment) && (
                <button onClick={() => deleteComment(comment.id)}>삭제</button>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={()=>{backtothePage()}}>돌아가기</button>
    </div>
  );
};

export default CommunityArticleDetailPage;
