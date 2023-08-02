import styled from "styled-components";

// Community Page
export const SCommunityWrapper = styled.div`
  max-width: 1200px;
  height = 100%;
  padding : 30px;
  margin: 0 auto;
  overflow-x: hidden;
`;


export const SHr = styled.hr`
  margin: 30px 0px -40px 0px;
`;

export const SHr2 = styled.hr`
background: white;
opacity : 30%;
height:1px;
border:0;
`;
export const SEmpty = styled.div`
margin : 120px 0px 0px 0px;

`;
//
export const SEmpty2 = styled.div`
  margin : 60px 0px 0px 0px;
`;

//광고 배너 영역
export const SAdArea = styled.div`
  color: #FFFFFF;
  width = 3859px;
  height = 500px;
  background: #0000C5;
  padding : 60px
  
`;

export const SADtextArea = styled.div`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 10px;
`;


// 여기서부터 게시판 영역

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
  position: relative; /* 자식 요소에 대한 쌓임 맥락을 만들기 위해 추가합니다. */
  background-color: #dark;
  width: 400px;
  height: 470px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 5px 10px -5px grey;

  

  h1{

    text-align : center;
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


  .gotodetail{
    text-align : center;
    font-weight : 500;
    font-size : 20px;
    margin-top : 38px

  }
  overflow: hidden


`;

export const SBoardTitle = styled.div`
  background: #0000C5;
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  top: -450px;
  left: 50%;
  transform: translateX(-50%);
  z-index : -1;

`;


export const SBoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SBoardArticleRow = styled.div`
  display: flex;
  display: block;
  justify-content: space-between;
`;

export const SBoardArticleCol = styled.div`
  display: block;
  flex: 0 0 25%; /* 한 줄에 4개의 게시글이 보이도록 설정합니다. */
  padding: 10px; /* 각 게시글 사이의 간격을 조정합니다. */
`;

