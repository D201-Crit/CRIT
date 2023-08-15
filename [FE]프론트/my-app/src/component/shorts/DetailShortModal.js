// DetailShortModal.js
import React, { useEffect, useState, forwardRef } from "react";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import Loading from '../Loading';
import { SDeleteIcon } from '../../styles/pages/SMessage';
import {
  SDividerLine,
  SDetailModal,
  SDetailCloseButton,
  SPlayerSection,
  SInfoSection,
  SInfoRow,
  SDropDownMenu,
  SLikeShorts,
  SCommentSection,
  SCommentList,
  SCommentInput,
  SSubmitButton,
} from "./../../styles/pages/SMainPage";

import { ModalOverlay, SEmpty2 } from '../../styles/SCommon';
import { BiDotsVertical } from "react-icons/bi";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import ModifyShortsModal from "./ModifyShortsModal";
import ReactPlayer from "react-player";

const DetailShortModal = ({ shortId, setOpenDetailModal, ref}) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const [short, setShort] = useState([]);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showModifyModal, setModifyModal] = useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  useEffect(() => {
    console.log("유저", user)
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
        return getComments();
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
        return getComments();
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

  const handleDropDownClick = () => {
    setIsDropDownVisible(!isDropDownVisible);
  }

  return (
    <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">
    <div ref={ref}>

      {loading ? <Loading /> : null}
      {showModifyModal ? (
        <ModifyShortsModal getShort={getShort} setModifyModal={setModifyModal} prevshotrs={short} shortId={shortId} />
      ) : (
        <SDetailModal>
          <SEmpty2 />
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

            <SInfoRow>
              <h2>{short.title}</h2>

              {/* 케밥 메뉴 아이콘 */}
              {isMyShorts(short.writer) && (
                <>
                  <BiDotsVertical
                    className="material-icons"
                    onClick={handleDropDownClick}
                    style={{ fontSize: "24px", cursor: "pointer" }}
                  />
                  <SDropDownMenu show={isDropDownVisible}>
                    <div>
                      {/* 쇼츠수정 */}
                      <button onClick={() => { setModifyModal(true); }}>수정</button>
                      {/* 쇼츠삭제 */}
                      <button onClick={() => { deleteShorts(shortId) }}>삭제</button>
                    </div>
                  </SDropDownMenu>
                </>
              )}
            </SInfoRow>

            <SDividerLine />

            <SInfoRow>
              <p style={{ color: "#1877f2" }}>{short.writer}</p>
              <p >조회수&nbsp;&nbsp; :&nbsp;&nbsp; {short.views}</p>
              <p>좋아요&nbsp;&nbsp;:&nbsp;&nbsp;{short.likesCount}</p>
            </SInfoRow>
            <SDividerLine />

            <SEmpty2 />

            <SInfoRow>
              <p>{short.content}</p>
            </SInfoRow>
            <SEmpty2 />
            <SDividerLine />

            <SInfoRow>
              <p style={{ color: "#1877f2" }}>#{short.hashTagNames}</p>
            </SInfoRow>
          </SInfoSection>
          {short.id && (
            short.liked && 
            short.liked.includes(user.id) ? (
              <SLikeShorts onClick={() => deleteLike(short.id)}>
                <HiHeart />
              </SLikeShorts>
            ) : (
              <SLikeShorts onClick={() => shortsLike(short.id)}>
                <HiOutlineHeart />
              </SLikeShorts>
            )
          )}
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
                  <div key={comment.id} className="comment-item">
                    <p style={{ color: "#1877f2" }}>{comment.writer}</p>
                    <p>{comment.content}</p>
                    <div>
                      {isMyComment(comment) && (
                        <SDeleteIcon onClick={() => deleteComment(comment.id)} style={{ cursor: "pointer"
                        }}>
                          <RiDeleteBin5Fill />
                        </SDeleteIcon>
                      )}
                    </div>
                  </div>
                ))
                }
              </SCommentList>
            )}
          </SCommentSection>
          <SEmpty2 />
        </SDetailModal>
      )}
    </div>
    </ModalOverlay>
  );
};

export default forwardRef(DetailShortModal);
