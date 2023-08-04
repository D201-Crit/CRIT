import { styled } from "styled-components";
// 디테일페이지 전체 div
export const SDetailChallengeWrapper = styled.div`
  ${"" /* width: 1200px; */}
  ${"" /* margin: 20px 160px; */}
`;
// 디테일페이지 챌린지 정보 div
export const SInformationWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 165px;
  width: 1200px;
  height: 600px;
  background-color: rgba(32, 32, 32, 32);

  #cert {
    position: absolute;
    bottom: 90px;
    left: 360px;
  }
  #info {
    position: absolute;
    width: 480px;
    font-size: 20px;
    bottom: 40px;
    left: 360px;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 0;
  }
  #date {
    position: absolute;
    bottom: 90px;
    left: 360px;
  }
  #category {
    position: absolute;
    bottom: 90px;
    left: 360px;
  }
  #time {
    position: absolute;
    bottom: 90px;
    left: 360px;
  }
  #userList {
    position: absolute;
    bottom: 90px;
    left: 360px;
  }
`;
// 챌린지 정보 각각 div
export const SDiv = styled.div`
  text-align: center;
  width: 350px;
  position: absolute;
  top: 70px;
  #name {
    font-size: 25px;
    font-weight: 700;
  }
`;
// 챌린지 썸네일
export const SImgaeWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  left: 350px;
  img {
    width: 500px;
    height: 350px;
  }
`;
export const SEnreanceButton = styled.button`
  position: absolute;
  bottom: 120px;
  left: 360px;
`;

// 디테일챌린지 게시판 생성
export const SBoardWriteWrapper = styled.div`
  position: absolute;
  top: 720px;
  left: 165px;
  background-color: rgba(52, 52, 52, 52);
  text-align: center;
  width: 1200px;
  height: 100px;
`;
export const SDeleteBoardButton = styled.button`
  background-color: white;
  width: 100px;
  height: 50px;
`;

// 디테일챌린지 게시판
export const SBoardWrapper = styled.div`
  position: absolute;
  top: 760px;
  left: 165px;
`;
export const SBoardUl = styled.ul``;
export const SBoardLi = styled.li``;
