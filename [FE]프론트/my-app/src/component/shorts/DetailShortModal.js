// DetailShortModal.js
import React, { useEffect, useState } from "react";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import {
  SDetailModal,
  SDetailCloseButton,
  SPlayerSection,
  SInfoSection,
  SInfoRow,
  SCommentSection,
  SCommentList,
  SCommentInput, 
  SSubmitButton,
} from "./../../styles/pages/SMainPage";
import ReactPlayer from "react-player"; 

const DetailShortModal = ({ shortId, setOpenDetailModal }) => {
  const user = useSelector((state) => state.users);
  const [short, setShort] = useState([]);
  const [comments,setComments] = useState(null);
  const [newComment,setNewComment] = useState('');
  
  useEffect(() => {
    getShort();
    getComments();
  }, []);

  const getShort = () => {
    api
      .get(`https://i9d201.p.ssafy.io/api/shorts/${shortId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setShort(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = () => {
    api
      .get(`https://i9d201.p.ssafy.io/api/shorts/comments/${shortId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log("댓글 불러오기 성공")
        setComments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 댓글 작성 변화 감지
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

// 댓글 작성하기
  const writeComment = async (event) => {
    event.preventDefault();
    api.post(`https://i9d201.p.ssafy.io/api/shorts/comments/${shortId}`, 
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
      return getShort();
    })
    .then(() => {
      console.log('댓글 작성 성공');
      return getComments(); // fetchComments() 실행 후 Promise 반환
    })
    .catch((error) => {
      console.log(error)
      console.log('댓글 작성 실패');
    })
  };


// 댓글 삭제
const deleteComment = async (commentId) => {
  api.delete(`https://i9d201.p.ssafy.io/api/shorts/comments/${shortId}/${commentId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  })
  .then(() => {
    setNewComment('');
    return getShort();
  })
  .then(() => {
    console.log('댓글 삭제 성공');
    return getComments(); // fetchComments() 실행 후 Promise 반환
  })
  .catch((error) => {
    console.log(error)
    console.log('댓글 삭제 실패');
  })
};

const isMyComment = (comment) => {
  return user.id === comment.writer;
};

  return (
    <SDetailModal>
      <SPlayerSection>
        {/* 비디오 영역 */}
        <ReactPlayer
          url={short.shortsUrl}
          controls={true}
          width="100%"
          height="100%"
          style={{ borderRadius: '4px' }}
          playing={true}
        />
      </SPlayerSection>
      
      {/* 쇼츠 정보 */}
      <SInfoSection>
        <SDetailCloseButton onClick={() => setOpenDetailModal(false)}>
          &times;
        </SDetailCloseButton>
        <h2>{short.title}</h2>
        <SInfoRow>
          <p>작성자 : {short.writer}</p>
          <p>조회수 : {short.views}</p>
          <p>좋아요: {short.likesCount}</p>
          <p>좋아요 한 사람 : {short.liked}</p>
        </SInfoRow>
        <p>내용 : {short.content}</p>
        <p>해시태그 : {short.hashTagNames}</p>
          {/* 댓글 영역 */}
      <SCommentSection>
      <h2>댓글</h2>
      <form onSubmit={writeComment}>
          <SCommentInput type='text' value={newComment} onChange={handleCommentChange} />
          <SSubmitButton type='submit' value="댓글 작성" />
        </form>

      {comments && (
          <SCommentList>
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item" style={{ display: 'flex', alignItems: 'center' }}>
              <p>{comment.content}</p>
              <div>
                
                <p>작성자: {comment.writer} 
                {isMyComment(comment) && (
                  <button onClick={() => deleteComment(comment.id)}>삭제</button>
                )}</p>
              </div>
            </div>
          ))}
        </SCommentList>
        
      )}
      </SCommentSection>
      </SInfoSection> 
    </SDetailModal>
  );
};

export default DetailShortModal;
