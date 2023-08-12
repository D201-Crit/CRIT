// DetailShortModal.js
import React, { useEffect, useState } from "react";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import Loading from '../Loading';

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

import { ModalOverlay } from '../../styles/SCommon';
import { SLikeButton } from "../../styles/pages/SCommunityPage";
import { BiDotsVertical } from "react-icons/bi";
import ModifyShortsModal from "./ModifyShortsModal";
import ReactPlayer from "react-player"; 

const DetailShortModal = ({ shortId, setOpenDetailModal }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const [short, setShort] = useState([]);
  const [comments,setComments] = useState(null);
  const [newComment,setNewComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showModifyModal, setModifyModal] = useState(false);

  useEffect(() => {
    console.log("유저",user)
    getShort();
    getComments();
  }, []);

  // 전체 쇼츠 정보 받아오기
  const getShorts = () => {
    setLoading(true);
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/main", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        // console.log("쇼츠데이터",res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 // 단일 쇼츠 정보 받아오기
  const getShort = () => {
    setLoading(true);
    api
      .get(`https://i9d201.p.ssafy.io/api/shorts/${shortId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
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
    console.log("user.nickname:", user.nickname);
    console.log("writer:", writer);
    return user.nickname === writer;
  };
  

  // 쇼츠 삭제
  const deleteShorts = async (shortId) => {
    if (short.liked && short.liked.includes(user.id)) {
      await deleteLike(shortId);
    }
  
    api
      .delete(`https://i9d201.p.ssafy.io/api/shorts/${shortId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() => {
        console.log("쇼츠 삭제 성공");
        setOpenDetailModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log("쇼츠 삭제 실패");
      });
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

// 모달 영역 밖 클릭시 모달 닫기
const handleOutsideClick = (e) => {
  if (e.target.getAttribute('data-cy') === "modal-overlay") {
    setOpenDetailModal(null);
  }
};

return (
  <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">
  <div>
    {loading ? <Loading /> : null}
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
                  <button onClick={() => {deleteShorts(shortId)}}>삭제</button>
                </div>
              )}
            </>
          )}

          <SInfoRow>
            <p>작성자 : {short.writer}</p>
            <p>조회수 : {short.views}</p>
            <p>좋아요: {short.likesCount}</p>
            {/* <p> 좋아요 한 사람 : {short.liked}</p> 주석처리 이유 : 지금 liked엔 닉네임이 아니라 아이디가 담기고 있다. 백 수정 필요*/} 
          </SInfoRow>
          <p>내용 : {short.content}</p>
          <p>해시태그 : {short.hashTagNames}</p>
          
          {short.id && (
            short.liked && // 해당 부분을 추가합니다.
            short.liked.includes(user.id) ? (
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
  </ModalOverlay>
);
};

export default DetailShortModal;