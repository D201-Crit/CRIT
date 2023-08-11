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
import { SLikeButton } from "../../styles/pages/SCommunityPage";
import { BiDotsVertical } from "react-icons/bi";
import ModifyShortsModal from "./ModifyShortsModal";
import ReactPlayer from "react-player"; 

const DetailShortModal = ({ shortId, setOpenDetailModal }) => {
  const user = useSelector((state) => state.users);
  const [short, setShort] = useState([]);
  const [comments,setComments] = useState(null);
  const [newComment,setNewComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showModifyModal, setModifyModal] = useState(false);

  useEffect(() => {
    getShort();
    getComments();
  }, []);

  // 전체 쇼츠 정보 받아오기
  const getShorts = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/main", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        // console.log("쇼츠데이터",res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 // 단일 쇼츠 정보 받아오기
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

 // 좋아요 기능
  const shortsLike = async (shortId) => {             
    api.post(`https://i9d201.p.ssafy.io/api/shorts/likes/${shortId}`, null, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        getShort();
      })
      .catch((error) => {
        console.log(error);
      });
  };

// 좋아요 취소 기능
  const deleteLike = async (shortId) => {
    api.delete(`https://i9d201.p.ssafy.io/api/shorts/likes/${shortId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        console.log('Delete Like Response:', res);
        return getShort();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Shorts 작성자 일치 여부 판단 함수
  const isMyShorts = (writer) => {
    return user.nickname === writer;
  };

  // 쇼츠 삭제
  const deleteShorts = async (shortId) => {
    api.delete(`https://i9d201.p.ssafy.io/api/shorts/${shortId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then(() => {
      console.log('쇼츠 삭제 성공');
      getShorts();
      setOpenDetailModal(false);
    })
    .catch((error) => {
      console.log(error)
      console.log('쇼츠 삭제 실패');
    })
  };



  // 댓글 정보 불러오기
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
// 댓글 작성자 일치 여부 판단 함수
const isMyComment = (comment) => {
  return user.nickname === comment.writer;
};


return (
  <div>
    {showModifyModal ? (
      <ModifyShortsModal getShort={getShort} setModifyModal={setModifyModal} prevshotrs={short} shortId={shortId} />
    ) : (
      <SDetailModal>
        <SPlayerSection>
          {/* 비디오 영역 */}
          <ReactPlayer
            url={short.shortsUrl}
            controls={true}
            width="100%"
            height="100%"
            style={{ borderRadius: "4px" }}
            playing={true}
          />
        </SPlayerSection>
        {/* 쇼츠 정보 */}
        <SInfoSection>
          <SDetailCloseButton onClick={() => setOpenDetailModal(false)}>
            &times;
          </SDetailCloseButton>
          <h2>{short.title}</h2>
          {/* 케밥 메뉴 아이콘 */}
          {isMyShorts(short.writer) && (
            <>
              <BiDotsVertical
                className="material-icons"
                onClick={() => setShowMenu(!showMenu)}
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
              {showMenu && (
                <div>
                  {/* 쇼츠수정 */}
                  <button onClick={() => { setModifyModal(true); }}>수정</button>
                  {/* 쇼츠삭제 */}
                  <button onClick={() => deleteShorts(shortId)}>삭제</button>
                </div>
              )}
            </>
          )}
          <SInfoRow>
            <p>작성자 : {short.writer}</p>
            <p>조회수 : {short.views}</p>
            <p>좋아요: {short.likesCount}</p>
            <p>좋아요 한 사람 : {short.liked}</p>
          </SInfoRow>
          <p>내용 : {short.content}</p>
          <p>해시태그 : {short.hashTagNames}</p>
          
          {short.id && (
            short.liked.includes(user.nickname) ? (
              <SLikeButton onClick={() => deleteLike(short.id)}>
                좋아요 취소
              </SLikeButton>
            ) : (
              <SLikeButton onClick={() => shortsLike(short.id)}>
                좋아요
              </SLikeButton>
            )
          )}
        </SInfoSection>
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
                    <p>작성자: {comment.writer}</p>
                    {isMyComment(comment) && (
                      <button onClick={() => deleteComment(comment.id)}>삭제</button>
                    )}
                  </div>
                </div>
              ))}
            </SCommentList>
          )}
        </SCommentSection>
      </SDetailModal>
    )}
  </div>
);
};

export default DetailShortModal;