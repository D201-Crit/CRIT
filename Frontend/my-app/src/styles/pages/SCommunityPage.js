import styled, { css, keyframes } from "styled-components";
import { SWrapper, STitle, SButton } from "../SCommon";
import likeimg from './../likeimg.png'

// 애니메이션
const glowEffect = keyframes`
  0% {
    box-shadow: 0 0 2px rgba(255,255,255,10%)
  }
  50% {
    box-shadow: 0 0 10px rgba(255,255,255,10%), 0 0 20px rgba(255,255,255,30%);
  }
  100% {
    box-shadow: 0 0 2px rgba(255,255,255,10%);
  }
`;

const floatEffect = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glowEffect2 = keyframes`
  0% {
    box-shadow: 0 0 2px rgba(255,255,255,10%)
  }
  50% {
    box-shadow: 0 0 10px rgba(255,255,255,10%), 0 0 20px rgba(255,255,255,30%);
  }
  100% {
    box-shadow: 0 0 2px rgba(255,255,255,10%);
  }
`;

const floatEffect2 = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
  }
`;


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
export const SBoardTitle = styled.div`
  background: #0000c5;
  /* background: linear-gradient(90deg, #002F89 -4.96%, rgba(158, 249, 255, 0) 161.36%); */
  /* background: linear-gradient(90deg, #0000C5 -4.96%, rgba(0, 57, 169, 0) 161.36%); */
  /* background: linear-gradient(90deg, #83C4FF -4.96%, rgba(171, 215, 255, 0) 161.36%); */
  /* background: linear-gradient(90deg, #83C4FF -4.96%, rgba(46, 71, 95, 0) 161.36%); */
  /* background: linear-gradient(90deg, #150F59 -4.96%, rgba(18, 52, 84, 0) 161.36%); */
  /* background: linear-gradient(90deg, #002445 -4.96%, rgba(0, 0, 0, 0) 161.36%); */
  /* background: linear-gradient(90deg, #003642 -4.96%, rgba(39, 49, 53, 0) 161.36%); */
  /* background: linear-gradient(90deg, #103170 -4.96%, rgba(158, 249, 255, 0) 161.36%); */
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;

export const SBoardCardItem= styled.div`
    background: linear-gradient(180deg, #2B2B2B 0%, rgba(0, 0, 0, 0) 100%);
    width: 430px;
    height: 530px;
    position: relative;
    display: flex; 
    border-radius: 10px;
    padding: 20px;
    z-index: 100;
    box-shadow: 0px 5px 10px -5px grey;


`
export const SBoardCard = styled.div`
  cursor : pointer;
  z-index: 400;
  background: dark;
  position: relative;
  width: 400px;
  height: 470px;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 5px 10px -5px grey;
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 

  &:hover {
    box-shadow: 0px 5px 10px -5px grey;
    animation: ${glowEffect} 0.5s infinite alternate,
              ${floatEffect} 1s ease-in-out infinite;
  }

  h1 {
    text-align: center;
    font-size: 50px;
    font-weight: 1500;
    text-shadow: 1px 1px 2px grey, 0 0 1em grey, 0 0 0.2em grey;    
    /* margin: 25px 0px 110px 0px; */
    margin: 25px 0px 50px 0px;
  }
  .board-item {
    display: flex;
    justify-content: space-between;
  }

  .board-item p {
    margin: 0; /* 모든 p 태그의 상하 여백을 없애기 위해 */
    margin-right: 10px; /* 작성자와 조회수 사이의 간격을 조정 */
  }
  img {
    max-width: 80%;
    max-height: 80%
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(0%, -10%);
    object-fit: contain;
  }
  .gotodetail {
    display: flex;
    top : 80%;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
  }
  overflow: hidden;
`;

export const SBoardItemTitle = styled.p`
  flex: 6;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SBoardItemWriter = styled.p`
  flex: 3;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  margin: 0;
`;

export const SBoardItemViews = styled.p`
  flex: 2;
  margin: 0;
`;

export const SHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #2B2B2B 0%, rgba(0, 0, 0, 0) 100%);
  font-weight: bold;
`;
export const SHeaderWrapper2 = styled.div`
  font-weight: bold;
  display: flex;
  width: 1140px;
  height : 50px;
  align-items: center;
  margin-bottom : 10px;
  background-color: black;
  
`;


export const SBoardDetailBoardInfo = styled.p`
  margin: 0 5px;
  font-size: 14px;
  padding: 10px;
  display: inline;
  font-weight :150;

  &:nth-child(1) {
    flex: 8;
    text-align: left;
    overflow: hidden;
    cursor : pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    flex: 1;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:nth-child(3) {
    flex: 1;
    text-align: center;
  }
  &:nth-child(4) {
    flex: 1;
    text-align: center;
  }
  &:nth-child(5) {
    flex: 1;
    text-align: center;
  }
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

export const SBoardDetailButton = styled(SButton)`
  display: flex;
  margin-left: 1080px;
  padding: 10px 15px;
  background-color: #0000C5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3333ff;
  }
`;

export const SBoardDetailViewSelect = styled.select`
  margin-top : 25px;
  padding: 10px 15px; 
  text-align : center;
  color : white;
  width: 130px;
  background-color: #0000c5; 
  border-radius: 5px; 
  border: none; 
  cursor: pointer; 
  -webkit-appearance: none; /* Chrome, Safari, Opera */
  -moz-appearance: none;    /* Firefox */
  appearance: none;
  position: relative;

  &:after {
    content: '▼';
    position: absolute;
    background-color: white; 
    // top: 50%;
    right: 15px;
    // transform: translateY(-50%);
    pointer-events: none;
    
  }
  

  &:hover {
    background-color: #0000c5; 
    color : white;
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);


  }
  `;

export const SBoardArticleDeleteButton = styled.div`
  position: absolute;
  cursor : pointer;
  top: 55px;
  right: 0px;
  width: 15px;
  padding: 2px;
  justify-content: center;
  font-weight : 1500;
  font-size : 20px;
  background: linear-gradient(to right top, #A4001D, #FF0000);
  color: transparent;
  -webkit-background-clip: text;
` 


export const SBoardDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const SBoardDetailBoard = styled.div`
  background-color: #262626;
  border-radius: 10px;
  margin-bottom: 5px;
  &:hover {
    background-color: ${({ isLiked }) => (isLiked ? "#ff005a" : "#3333ff")};
  }
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
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,10%);
    background: #1E1AE2;

  }
`;

export const SPrimaryButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #0000c5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  ${defaultButtonPreset}
`;

export const SSecondaryButton = styled.button`

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #ff007a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,10%);
    background: #ff007a;;

  }
`;

export const STertiaryButton = styled.button`
  background: #ffc107;
  ${defaultButtonPreset}
`;

// 게시글 디테일 댓글 영역
export const SCommentContainer = styled.div`
  width: 95%;
  margin: 20px 0;
  padding: 20px;
  color: white;
  background-color: #181818;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const SCommentContent = styled.span``;

export const SCommentForm = styled.form`
  display: flex;
  align-items: center;
  color : white;
  & input[type="textarea"] {
    flex: 1;
    padding: 5px;
    font-size: 15px;
    background: #101010;
    color : white;

    &:hover {
      box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,10%);
      background: rgba(255,255,255,10%)
  
    }
    margin-right: 10px;
    border: 1px solid black;
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
      box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,10%);
      background: #1E1AE2;
    }

  }
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
  border-radius: 5px;
  & p {
    margin: 0;
  }
`;
export const SCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;

export const SCommentAuthor = styled.span`
  font-weight: 700;
  margin-right: 10px;
`;

export const SCommentDate = styled.span`
  margin-left: auto;
  font-weight: 100;
`;
export const SCommentDelete = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  background: #ff5e5e; // 기존 푸른색 대신에 빨간색 계열로 변경하여 삭제 버튼임을 강조
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; // 글자 크기를 줄여서 버튼의 크기도 작게 조정
  white-space: nowrap;

  &:hover {
    background-color: #ff3c3c; // 호버 상태일 때의 배경색 변경
  }
`;

export const SImprovedCommentItem = styled(SCommentItem)`
  //flex-wrap: nowrap; // 내부 요소들이 2줄로 나눠지지 않게 하는 설정 추가
  padding: 12px; // 안쪽 여백 조절
`;

export const SImprovedCommentAuthor = styled(SCommentAuthor)`
  font-weight: 1000;
  color: #1c5aea; // 글쓴이의 색상 변경
`;

export const SImprovedCommentContent = styled(SCommentContent)`
  font-weight: normal;
  max-width: 80%; // 댓글 내용의 길이를 제한하여 삭제 버튼과 겹치지 않게 함
  word-break: break-word; // 긴 댓글 내용이 레이아웃을 넘어가지 않게 설정
`;


export const SCreateModal = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  width : 900px;
  height : 1000px;
  max-height : 700px;
  
  padding : 30px;
  background: linear-gradient(180deg, #2B2B2B 0%, rgba(0, 0, 0, 100) 100%);
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`
export const SAriticleForm = styled.form`
  position: absolute;
  width : 800px;
  height : 600px;
  max-height : 600px;



  & input[type="text"] {
    flex: 1;
    margin-top : 10px;
    font-size: 1.5rem;
    background: white;
    padding: 20px;
    height : 25px;
    width : 865px;
    border: 0;
    margin-right: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  }

  & textarea {
    margin-top : 10px;
    font-family: "Pretendard";
    background: white;
    width : 865px;
    height : 300px;
    border: 0;
    padding: 20px;
    font-size: 1.2rem;
    resize: none;
    vertical-align: top; // 추가: 콘텐츠 상단에 텍스트 커서 위치 지정
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  }

  & input[type="submit"] {
    background-color: #0000c5;
    font-size : 18px;
    width : 100px;
    height : 50px;
    border: none;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;    
  `
  export const SImageContainer = styled.div`
  display: flex;
  width : 755px;
  height: 100px;
  flex-direction: row;
  align-items: center;
  background: dark;;
  margin-left: 150px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
export const SFileInputLabel = styled.label`
  margin-top: 15px;
  position: absolute;
  background: linear-gradient(180deg, #060DB3 0%, #FF1EB2 100%);
  font-size : 18px;
  width : 85px;
  height : 20px;
  border: none;
  color: #fff;
  padding: 15px;
  border-radius: .25rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background: linear-gradient(180deg, #0000C5 0%, rgba(0, 0, 0, 0) 90%);
  }
`;

export const SFileInput = styled.input`
  display: none;
`;

export const SPreviewImage = styled.img`
    max-width :100px ;
    max-height :100px ;
    margin :5px ;
    border-radius :5px ;
`;

// 커뮤니티 디테일 스타일
export const SCommunityDetailWrapper = styled(SCommunityWrapper)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  img {
    align-items: center;
    padding: 20px;
  }
`;

export const SImageContainer2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`;

export const SArticleTitle = styled.h1`
  width: 1000px;
  background-color: #0000C5;
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SArticleContent = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 16px;
  line-height: 1.4;
  white-space: pre-wrap;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

export const SLikeImgButton = styled.button`
  display: flex;
  margin-left : 450px;
  justify-content: center;
  margin-top: 25px;
  padding: 15px 10px;
  background-image: url(${likeimg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 120px; // 이미지 크기에 맞게 조정해주세요.
  height: 120px; // 이미지 크기에 맞게 조정해주세요.
  &:hover {
    animation: ${glowEffect2} 0.3s infinite alternate,
              ${floatEffect2} 0.7s ease-in-out infinite;
  }
`;

export const SLikesCount = styled.span`
  display: flex;
  position: relative;
  font-size: 25px;
  align-items: center;
  font-weight : 1000;
  color : #ff007a;
  left: 48.7%;
`;

export const SButtonWrapper = styled.div`
    margin-left : 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const SPrimaryButton2 = styled.button`
  transform: translateX(-50%);
  background: #0000c5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);
    background: #0000c5;

  }
  `
export const SSecondaryButton2 = styled.button`
  transform: translateX(-50%);
  background: #ff007a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);
    background: #ff007a;

  }
`;

export const SBackButton = styled.button`
    margin-top: 30px;
    padding: 10px;
    background-color: #0000C5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);
      background: #0000c5;
`;