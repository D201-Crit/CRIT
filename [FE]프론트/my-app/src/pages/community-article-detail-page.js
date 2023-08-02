// CommunityBoardDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";

const API_BASE_URL = 'http://localhost:8080/api/boards';

const CommunityArticleDetailPage = () => {
  const user = useSelector((state) => state.users); // useSelector를 통해 userSlice의 상태를 가져옴
  const { classification, articleid } = useParams();
  const [board, setBoard] = useState({});
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // fetchBoard와 fetchComments를 순차적으로 실행하기 위해 async 함수를 사용
    const fetchData = async () => {
      await fetchBoard();
      await fetchComments();
    };

    fetchData();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${articleid}`,{
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(user.accessToken)
      console.log(articleid)
      const data = response.data.data;
      setBoard({ ...data, comments: data.comments || [] }); // comments가 없을 경우 빈 배열로 초기화
    } catch (error) {
      console.error(error);
      console.log('게시글 조회 실패');
    }
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments/${articleid}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setBoard((prevBoard) => ({ ...prevBoard, comments: response.data.data || [] }));
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
        await fetchBoard();
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
      await axios.delete(`${API_BASE_URL}/comments/${articleid}/${commentId}`,{
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      await fetchBoard();
      await fetchComments();
    } catch (error) {
      console.error(error);
      console.log('댓글 삭제 실패');
    }
  };

  return (
    // 만약 댓글이 하나라도 있다면 출력
    <div>
      {Object.keys(board).length > 0 ? (
        <div>
          <h3>{board.title}</h3>
          <p>{board.content}</p>
          <p>작성자: {board.writer}</p>
          <p>조회수: {board.views}</p>
          {user.nickname === board.writer && (
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          )}
          <hr />
          <h4>댓글 작성</h4>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="댓글을 입력하세요"
            />
            <button type="submit">작성</button>
          </form>
          <hr />
          <div>
            <h4>댓글 목록</h4>
            {board.comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p>작성자: {comment.writer}</p>
                {user.nickname === comment.writer && (
                  <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                )}
              </div>
            ))}
          </div>
        </div>
         ) : (
          // 만약 댓글이 하나도 없다면..
          <div>작성된 댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default CommunityArticleDetailPage;
