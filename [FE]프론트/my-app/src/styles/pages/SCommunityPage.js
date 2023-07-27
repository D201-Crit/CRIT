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
