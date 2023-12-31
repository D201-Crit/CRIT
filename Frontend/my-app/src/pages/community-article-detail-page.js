import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "./../../src/api/api.js";
import { useSelector } from "react-redux";
import ModifyArticleModal from "../component/community/ModifyArticleModal.js";
import { SEmpty2 } from "../styles/SCommon.js";
import CheckTime from "./../component/challenge/CheckTime";
import { Link } from "react-router-dom";
import {
  SCommentContainer,
  SImageContainer2,
  SImprovedCommentItem,
  SImprovedCommentAuthor,
  SCommentWrapper,
  SButtonWrapper,
  SCommentList,
  SImprovedCommentContent,
  SCommentForm,
  SCommentDate,
  SCommentDelete,
  SBackButton,
  SLikeImgButton,
  SLikesCount,
  SPrimaryButton2,
  SSecondaryButton2,
  SCommunityDetailWrapper,
  SArticleTitle,
  SArticleContent,
} from "../styles/pages/SCommunityPage.js";
const API_BASE_URL = "https://i9d201.p.ssafy.io/api/boards";
// const API_BASE_URL = 'http://localhost:8080/boards';

const CommunityArticleDetailPage = () => {
  const user = useSelector((state) => state.users);
  const { classification, articleid } = useParams();
  const [articles, setArticles] = useState(null); // 게시글 목록 State
  const [comments, setComments] = useState(null); // 댓글 목록 State
  const [newComment, setNewComment] = useState("");
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
    api
      .get(`${API_BASE_URL}/${articleid}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setArticles(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 댓글 불러오기
  const fetchComments = async () => {
    api
      .get(`${API_BASE_URL}/comments/${articleid}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setNewComment("");
        setComments(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 댓글 작성 변화 감지
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // 댓글 작성하기
  const writeComment = async (event) => {
    event.preventDefault();
    api
      .post(
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
      )
      .then(() => {
        setNewComment("");
        return fetchArticles();
      })
      .then(() => {
        return fetchComments(); // fetchComments() 실행 후 Promise 반환
      })
      .catch((error) => {
        console.log(error);
        console.log("댓글 작성 실패");
      });
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    api
      .delete(`${API_BASE_URL}/comments/${articleid}/${commentId}`, {
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
        console.log(error);
        console.log("댓글 삭제 실패");
      });
  };

  //게시글 삭제
  const deleteArticle = async (articleid) => {
    api
      .delete(`${API_BASE_URL}/delete/${articleid}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        return fetchArticles();
      })
      .then((res) => {
        window.location.href = `/CommunityBoardPage/${classification}`;
      })
      .catch((error) => {
        console.error(error);
        console.log("게시글 삭제 실패");
      });
  };

  const articleLike = async (articleid) => {
    // 좋아요 기능
    api
      .post(`${API_BASE_URL}/likes/${articleid}`, null, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        fetchArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLike = async (articleid) => {
    api
      .delete(`${API_BASE_URL}/likes/${articleid}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        return fetchArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isMyComment = (comment) => {
    return user.nickname === comment.writer;
  };

  const isMyArticle = (article) => {
    return user.nickname === article.writer;
  };

  const backtothePage = () => {
    window.location.href = `/CommunityBoardPage/${classification}`;
  };
  // 댓글 형식 변환
  const formatDate = (timeString) => {
    const timeParts = timeString.split("-").map(Number);
    if (timeParts.length !== 6) return "Invalid";

    const [year, month, day, hour, minute, second] = timeParts;
    const date = new Date(year, month - 1, day, hour, minute, second);

    if (isNaN(date.getTime())) return "Invalid";

    const currentYear = new Date().getFullYear();
    const formattedMonth = "0" + (date.getMonth() + 1);
    const formattedDay = "0" + date.getDate();
    const formattedHour = "0" + date.getHours();
    const formattedMinute = "0" + date.getMinutes();
    const formattedSecond = "0" + date.getSeconds();

    if (year === currentYear) {
      return `${formattedMonth.slice(-2)}.${formattedDay.slice(
        -2
      )} ${formattedHour.slice(-2)}:${formattedMinute.slice(
        -2
      )}:${formattedSecond.slice(-2)}`;
    } else {
      const shortYear = year.toString().slice(-2);
      return `${shortYear}.${formattedMonth.slice(-2)}.${formattedDay.slice(
        -2
      )} ${formattedHour.slice(-2)}:${formattedMinute.slice(
        -2
      )}:${formattedSecond.slice(-2)}`;
    }
  };

  return (
    <SCommunityDetailWrapper>
      <div>
        {articles && (
          <div>
            <SArticleTitle>{articles.title}</SArticleTitle>
            <Link
              to={`/ProfilePage/${articles.writer}`}
              style={{
                color: "#1877f2",
                textDecoration: "none",
                display: "flex",
                justifyContent: "flex-end", // 추가된 코드
              }}
            >
              <p>작성자 : {articles.writer}</p>
            </Link>
            <SImageContainer2>
              {" "}
              {/* ImageContainer 추가 */}
              {articles.imageFiles.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Article image ${index}`}
                  style={{ maxWidth: "500px", maxHeight: "px", margin: "5px" }}
                />
              ))}
            </SImageContainer2>{" "}
            {/* ImageContainer 닫기 */}
            <SArticleContent>{articles.content}</SArticleContent>
            <br />
            <SLikesCount>{articles.likesCount}</SLikesCount>
            {articles.liked.includes(user.nickname) ? (
              <SLikeImgButton
                onClick={() => deleteLike(articles.id)}
              ></SLikeImgButton>
            ) : (
              <SLikeImgButton
                onClick={() => articleLike(articles.id)}
              ></SLikeImgButton>
            )}
            <div>
              {isMyArticle(articles) && (
                <SButtonWrapper>
                  <SSecondaryButton2 onClick={() => deleteArticle(articles.id)}>
                    게시글 삭제
                  </SSecondaryButton2>
                  <SPrimaryButton2 onClick={() => setIsEditOpen(true)}>
                    게시글 수정
                  </SPrimaryButton2>
                </SButtonWrapper>
              )}
            </div>
            {isEditOpen && (
              <ModifyArticleModal
                classification={classification}
                setIsEditOpen={setIsEditOpen}
                prevArticles={articles}
                fetchArticles={fetchArticles}
              />
            )}
          </div>
        )}
        <SEmpty2 />
        <h2>댓글</h2>
        <hr />
        <SCommentContainer>
          <SCommentList>
            {comments && (
              <div>
                {comments.map((comment) => (
                  <SImprovedCommentItem key={comment.id}>
                    <SCommentWrapper>
                      <SImprovedCommentAuthor>
                        {comment.writer}
                      </SImprovedCommentAuthor>
                      <SImprovedCommentContent>
                        {comment.content}
                      </SImprovedCommentContent>
                      <SCommentDate>
                        {formatDate(comment.createTime)}
                      </SCommentDate>
                    </SCommentWrapper>
                    {isMyComment(comment) && (
                      <SCommentDelete onClick={() => deleteComment(comment.id)}>
                        삭제
                      </SCommentDelete>
                    )}
                  </SImprovedCommentItem>
                ))}
              </div>
            )}
          </SCommentList>

          <SCommentForm onSubmit={writeComment}>
            <input
              type="textarea"
              value={newComment}
              onChange={handleCommentChange}
            />
            <input type="submit" value="댓글 작성" />
          </SCommentForm>
        </SCommentContainer>
        <SBackButton
          onClick={() => {
            backtothePage();
          }}
        >
          돌아가기
        </SBackButton>
      </div>
      <CheckTime />
    </SCommunityDetailWrapper>
  );
};

export default CommunityArticleDetailPage;
