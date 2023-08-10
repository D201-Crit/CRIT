import styled, { css } from "styled-components";
import { SWrapper, STitle, SButton } from "../SCommon";

// 커뮤니티 페이지
export const SCommunityWrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  padding: 30px;
  margin: 0 auto;
  overflow-x: hidden;
`;

export const SHr = styled.hr`
  margin: 30px 0px -40px 0px;
`;

export const SHr2 = styled.hr`
  background: white;
  opacity: 30%;
  height: 1px;
  border: 0;
`;

export const SEmpty = styled.div`
  margin: 120px 0px 0px 0px;
`;

export const SEmpty2 = styled.div`
  margin: 60px 0px 0px 0px;
`;

// 광고 배너 영역
export const SAdArea = styled.div`
  color: #ffffff;
  width: 3859px;
  background: ${({ backgroundColor }) => backgroundColor || "#0000C5"};
  padding: 60px;
  transition: background-color 0.3s;

  p {
    font-weight: 10;
  }

  span {
    font-size: 20px;
  }
`;

export const SAdWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const SADtextArea = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 10px;
  opacity: 1;
  position: relative;
  transition: transform 0.5s;

  transform: ${({ transformValue }) => `translateX(${transformValue}%)`};
`;

// 게시판 영역
export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.div`
  background: #ffffff;
  padding: 10px 20px;
  margin: 5px;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #efefef;
  }
`;

export const SBoardCard = styled.div`
  position: relative;
  background-color: #dark;
  width: 400px;
  height: 470px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 5px 10px -5px grey;
  h1 {
    text-align: center;
    margin: 25px 0px 110px 0px;
  }
  .board-item {
    display: flex;
    justify-content: space-between;
  }

  .board-item p {
    margin: 0; /* 모든 p 태그의 상하 여백을 없애기 위해 */
    margin-right: 10px; /* 작성자와 조회수 사이의 간격을 조정 */
  }

  .gotodetail {
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    margin-top: 38px;
  }
  overflow: hidden;
`;

export const SBoardTitle = styled.div`
  background: #0000c5;
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  top: -450px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;

export const SBoardDetailBoardInfo = styled.p`
  margin: 0 5px;
  font-size: 14px;
  display: inline;
`;

export const SLikeButton = styled.button`
  margin-top: 5px;
  padding: 5px 10px;
  background: ${({ isLiked }) => (isLiked ? "#ff007a" : "#0000C5")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ isLiked }) => (isLiked ? "#ff005a" : "#3333ff")};
  }
`;

export const SBoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  top: 50%;
  left: 50%;
  justify-content: space-between;

`;

export const SBoardArticleRow = styled.div`
  display: flex;
  display: block;
  justify-content: space-between;
`;

export const SBoardArticleCol = styled.div`
  display: block;
  flex: 0 0 33.3%;
  padding: 10px;
`;

export const SBoardDetailWrapper = styled(SWrapper)``;

export const SBoardDetailHr = styled(SHr)``;

export const SBoardDetailEmpty = styled(SEmpty)``;

export const SBoardDetailTitle = styled(STitle)``;

export const SBoardDetailButton = styled(SButton)``;

export const SBoardDetailViewSelect = styled.select`
  margin-left: 20px;
`;

export const SBoardDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const SBoardDetailBoard = styled.div`
  background-color: #262626;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
`;

// 폰트 크기 조절하기
export const SBoardDetailBoardTitle = styled.h3`
  font-size: 25px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #3333ff;
  }
`;

const defaultButtonPreset = css`
  margin-top: 20px;
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3333ff;
  }
`;

export const SPrimaryButton = styled.button`
  background: #28a745;
  ${defaultButtonPreset}
`;

export const SSecondaryButton = styled.button`
  background: #6c757d;
  ${defaultButtonPreset}
`;

export const STertiaryButton = styled.button`
  background: #ffc107;
  ${defaultButtonPreset}
`;

// 게시글 디테일 댓글 영역
export const SCommentContainer = styled.div`
  width: 50%;
  margin: 20px 0;
  padding: 20px;
  color: black;
  background-color: #404040;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const SCommentList = styled.div`
  margin-bottom: 20px;
`;

export const SCommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;

  & p {
    margin: 0;
  }
`;

export const SCommentAuthor = styled.span`
  font-weight: 700;
  margin-right: 10px;
`;

export const SCommentContent = styled.span``;

export const SCommentForm = styled.form`
  display: flex;
  align-items: center;

  & input[type="textarea"] {
    flex: 1;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  & input[type="submit"] {
    background-color: #0000c5;
    border: none;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #3333ff;
    }
  }
`;
