import { styled } from "styled-components";
// 디테일페이지 전체 div
export const SDetailChallengeWrapper = styled.div`
  margin: 30px auto -40px auto;
`;
// 디테일페이지 챌린지 정보 div
export const SInformationWrapper = styled.div`
  width: 1200px;
  height: 530px;
  background-color: rgba(22, 22, 22, 22);

  border-radius: 10px;
  box-shadow: 0px 0px 15px gray;
  margin: 10px auto;
  display: flex;
`;
// 챌린지 정보 각각 div
export const SImgWrapper = styled.div`
  width: 40%;
  height: 500px;
  text-align: center;
  // background-color: blue;

  #name {
    font-size: 30px;
    padding: 10px 0 0 0;
  }
  #img {
    width: 70%;
    height: 55%;
    border-radius: 100px;
    margin: ;
  }
  #DATE {
    font-size: 25px;
  }
  #date {
    font-size: 20px;
  }
  #TIME {
    font-size: 25px;
  }
  #time {
    font-size: 20px;
  }
`;
export const SInfoWrapper = styled.div`
  width: 60%;
  height: 500px;
  padding: 0 0 0 50px;
  #CATEGORY {
    position: absolute;
    top: 150px;
    font-size: 25px;
  }
  #category {
    position: absolute;
    top: 190px;
    font-size: 20px;
  }
  #CERT {
    position: absolute;
    top: 235px;
    font-size: 25px;
  }
  #cert {
    position: absolute;
    top: 275px;
    font-size: 20px;
  }
  #INFO {
    position: absolute;
    top: 320px;
    font-size: 25px;
  }
  #info {
    position: absolute;
    top: 360px;
    font-size: 20px;
    width: 700px;
    height: 190px;
    white-space: pre-wrap;
    word-break: break-all;
  }
  #USERLIST {
    position: absolute;
    top: 165px;
    font-size: 25px;
    margin: 0 0 0 400px;
  }
  #userList {
    position: absolute;
    top: 205px;
    width: 220px;
    font-size: 20px;
    margin: 0 0 0 400px;
  }
  #MONEY {
    position: absolute;
    top: 335px;
    font-size: 25px;
    margin: 0 0 0 400px;
  }
  #money {
    position: absolute;
    top: 380px;
    width: 200px;
    font-size: 25px;
    margin: 0 0 0 400px;
  }
`;
export const SButtonWrapper = styled.div`
  position: relative;
  top: 440px;
  #participation {
    position: absolute;
    right: 40px;
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    border: none;
    background-color: #33ff00;
    cursor: pointer;
  }
  #enter {
    position: absolute;
    right: 200px;
    color: white;
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    border: none;
    background-color: #0000c5;
    cursor: pointer;
  }
  #detailEnter {
    position: absolute;
    right: 200px;
    color: white;
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    border: none;
    background-color: #0000c5;
    cursor: pointer;
  }

  #join {
    position: absolute;
    right: 30px;
    color: white;
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    border: none;
    background-color: #ff007a;
    cursor: pointer;
  }
  #photo {
    position: absolute;
    right: 200px;
    color: white;
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    border: none;
    background-color: #0000c5;
    cursor: pointer;
  }
  #joinList {
    position: absolute;
    right: 30px;
    // color: white;
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    border: none;
    background-color: #33ff00;

    cursor: pointer;
  }
`;

// 디테일챌린지 글 작성
export const SBoardWriteWrapper = styled.div`
  width: 1100px;
  margin: 30px auto;
  text-align: center;
  #updateImage {
    width: 40px;
    height: 40px;
    position: absolute;
    right: -55px;
  }
  #label {
    width: 100px;
  }
  #update {
    position: relative;
    right: 860px;
    bottom: 15px;
    #content {
      width: 790px;
      height: 60px;
      margin: -5px 0 0 0;
      border: none;
      background-color: rgb(21 21 21);
      border-bottom: solid 3px gray;
    }
  }
`;
export const SBoardInput = styled.input`
  width: 70%;
  height: 70px;
  background: transparent;
  border: none;
  border-bottom: solid 3px gray;
  color: white;
  font-size: 25px;
  margin: 50px 0 20px 0;
  &::placeholder {
    font-weight: 800;
    font-size: 20px;
  }
`;
// export const SBoardSubmit = styled.input`
//   width: 100px;
//   height: 30px;
//   cursor: pointer;
// `;
export const SLabelImage = styled.label`
  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;
export const SBoardImage = styled.input`
  display: none;
`;

// 디테일챌린지 게시판 보기
export const SBoardWrapper = styled.div`
  width: 1200px;
  margin: 30px auto;
  h1 {
    text-align: center;
    font-size: 70px;
  }
`;

export const SBoardLi = styled.li`
  list-style: none;
  width: 960px;
  margin: 20px auto;
  ${"" /* padding: 15px 15px 0 15px; */}
  #writer {
    font-size: 18px;
    color: gray;
    margin: 0;
  }

  div {
    display: flex;
  }
  #content {
    width: 90%;
    font-size: 25px;
    color: white;
    &::placeholder {
      font-weight: 800;
      font-size: 20px;
      color: white;
    }
  }
`;

export const SDeleteBoardButton = styled.button`
  background: transparent;
  color: gray;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
`;
export const SSpan = styled.span`
  ${"" /* position: absolute; */}
  ${"" /* right: 200px; */}
  width: 100px;
  display: flex;
  margin: 0 0 0 500px;
`;
export const SUpdateBoardButton = styled.button`
  position: absolute;
  color: white;
  background-color: #0000c5;
  width: 60px;
  height: 25px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;

export const SLikeBoardButton = styled.button`
  ${"" /* position: absolute; */}
  ${"" /* right: 240px; */}
  color: white;
  background-color: #0000c5;
  width: 60px;
  height: 25px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;
export const SUnLikeBoardButton = styled.button`
  ${"" /* position: absolute; */}
  ${"" /* right: 240px; */}
  color: white;
  background-color: #0000c5;
  width: 95px;
  height: 25px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;
