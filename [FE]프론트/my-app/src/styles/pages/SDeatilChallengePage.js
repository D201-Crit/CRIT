import { styled } from "styled-components";
// 디테일페이지 전체 div
export const SDetailChallengeWrapper = styled.div`
  margin: 30px auto -40px auto;
  h1 {
    text-align: center;
    font-size: 60px;
  }
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
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: 1000;
    border-radius: 10px;
    border: none;
    background-color: #33ff00;
    cursor: pointer;
  }
`;

// 디테일챌린지 글 작성
export const SBoardWriteWrapper = styled.div`
  width: 1200px;
  margin: 30px auto;
  text-align: center;
  // #updateImage {
  //   width: 40px;
  //   height: 40px;
  //   position: absolute;
  //   right: -55px;
  // }
  #label {
    width: 100px;
  }
  form {
    // background-color: red;
  }
`;
export const SUpdateForm = styled.form`
  #content {
    width: 600px;
    height: 60px;
    border: none;
    background: none;
    border-bottom: solid 3px gray;
  }
`;
export const SBoardInput = styled.input`
  width: 930px;
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

export const SSumbitButton = styled.button`
  background-color: #0000c5;
  padding: 5px 10px;
  width: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 20px;
  font-weight: 600;
  position: relative;
  top: 20px;
`;

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
export const SBoardsWrapper = styled.div`
  width: 1200px;
  margin: 30px auto;
  h1 {
    text-align: center;
    font-size: 60px;
  }
`;

export const SDiv = styled.div`
  text-align: center;
  margin: 10px 0;
  h2 {
    margin: 50px 0;
  }
`;

export const SBoardWrapper = styled.div`
  list-style: none;
  display: flex;
  width: 1000px;
  margin: 20px auto;
  background-color: #181818;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  #writer {
    font-size: 18px;
    color: #1c5aea;
    font-weight: 1000;
    width: 150px;
  }
  #content {
    font-size: 25px;
    color: white;
    width: 700px;
    &::placeholder {
      font-weight: 800;
      font-size: 20px;
      color: white;
    }
  }
`;

export const SDeleteBoardButton = styled.button`
  background-color: #ff5e5e;
  padding: 5px 10px;
  width: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 70px;
`;

export const SUpdateBoardButton = styled.button`
  background-color: #0000c5;
  padding: 5px 10px;
  width: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 15px;
`;

export const SLikeBoardButton = styled.button`
  background-color: #0000c5;
  padding: 5px 10px;
  width: 65px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 5px;
  margin-left: 70px;
`;
export const SUnLikeBoardButton = styled.button`
  background-color: #0000c5;
  padding: 5px 10px;
  width: 105px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 65px;
`;

// 참여내역
export const SJoinListModal = {
  content: {
    backgroundColor: "#131313",
    border: "0.5px solid rgba(80, 80, 80)",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px gray",
    width: "350px",
    height: "650px",
    margin: "70px auto",
    padding: "0",
    color: "black",
  },

  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "999",
  },
};

export const SJoinListWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow: hidden;
  color: white;

  hr {
    border: 1px solid #838383;
    transform: scaleY(0.5);
    margin-left: 30px;
    width: 290px;
  }
  h1 {
    font-weight: 200;
    font-size: 24px;
    margin: 80px 70px;
  }
`;

export const SJoinTitle = styled.div`
  background-image: url("https://github.com/Jinga02/ChallengePJT/assets/110621233/0a141bad-4414-439b-ae15-e015a5f4f5c7");
  background-size: 100% 700px;
  height: 340px;
  margin: -20px;
`;
export const SJoinWrapper = styled.div`
  display: flex;
  height: 50px;
  margin: 10px;
  #time {
    font-size: 20px;
    font-weight: 800;
    color: #838383;
  }
  #success {
    font-size: 18px;
    font-weight: 800;
    color: white;
    margin-left: 30px;
    margin-right: 70px;
  }
  #fail {
    font-size: 18px;
    font-weight: 800;
    color: #33ff00;
    margin-left: 30px;
    margin-right: 70px;
  }
`;
export const SJoinListExit = styled.button`
  position: absolute;
  top: 1px;
  right: 5px;
  border: none;
  background: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;
