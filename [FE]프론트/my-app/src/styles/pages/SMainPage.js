import { styled, keyframes } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;
export const SShortsWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  justify-content: flex-end;
`;

export const SEntranceButtonWrapper = styled.div`
  width: 100%;
  height: 100px;
  font-family: "Pretendard";
`;
export const SEntranceButton = styled.button`
  position: absolute;
  left: 78%;
  top: 100px;
  background: linear-gradient(180deg, #060DB3 0%, #FF1EB2 100%);
  border: none;
  border-radius: 6px;
  margin: 25px;
  width: 150px;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  cursor: pointer;
  font-family: "Pretendard";
`;

export const SEntranceSwiper = styled(Swiper)`
  position: absolute;
  width: 400px;
  left: 72%;
  top: 200px;
  padding: 0;
  border-radius: 10px;
  font-family: "Pretendard";
  box-shadow: 0px 0px 15px gray;
`;
SEntranceSwiper.displayName = "SwiperWrapper";

export const SEntranceSlide = styled(SwiperSlide)`
  display: flex;
  width: 390px;
  height: 120px;
  list-style: none;
  background-color: rgba(22, 22, 22, 1);
  border-radius: 10px;
  box-shadow: 0px 0px 15px gray;
  font-family: "Pretendard";

  p {
    position: absolute;
    width: 185px;
    height: 60px;
    top: 30px;
    left: 110px;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  h4 {
    position: absolute;
    width: 220px;
    height: 20px;
    top: 5px;
    right: 70px;
    margin: 0;
  }
  img {
    margin: 15px 10px;
    width: 85px;
    height: 85px;
  }
`;
SEntranceSlide.displayName = "SwiperSlide";

export const SEntranceLiButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 130px;
  width: 100px;
  height: 30px;
  background-color: #0000c5;
  border: none;
  border-radius: 6px;
  font-weight: 800;
  font-size: 15px;
  color: white;
  font-family: "Pretendard";
  cursor: pointer;
`;
export const SDetailButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 15px;
  width: 100px;
  height: 30px;
  background-color: #33ff00;
  border: none;
  border-radius: 6px;
  font-weight: 800;
  font-size: 15px;
  font-family: "Pretendard";
  cursor: pointer;
`;
// 챌스 검색
export const SSearchShortsWrapper = styled.div`
  text-align: center;
`;
export const SInput = styled.input`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: 50%;
  border: none;
  border-radius: 6px;
  padding: 15px;
  margin: 0 auto;
  display: block;
  font-size: 18px;
  font-weight: 500;
  font-family: "Pretendard";

  & + hr {
    width: 50%;
    border: none;
    height: 0.5px;
    background-color: #ccc;
    margin: 30px auto;
  }
`;

export const SShortsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  max-width: 500px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  overflow: hidden;
  margin: 20px;
  height: auto;

  img {
    width: 500px;
    height: 200px;

    transform: rotate(270deg);
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
  }

  p {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

export const SShortsContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: 20px;
  overflow: hidden;
  height: 800px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// SShortItem style
export const SShortItem = styled.div`
  position: relative;
  border-radius: 15px;
  width: 22%; // 수정: 아이템의 가로 높이를 변경
  height: 23%; // 수정: 아이템의 세로 높이를 변경
  display: flex;

  box-shadow: 0px 0px 20px 0.1px rgba(255, 255, 255, 15%);

  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 80px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
    opacity: 1;
  }

  h2,
  p {
    opacity: 0;
    transition: opacity 0.3s;
  }

  h2 {
    pointer-events: none;
    font-size: 25px;
    margin-top: -15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    -moz-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }

  p {
    pointer-events: none;
    font-size: 14px;
    margin: auto;
    margin-top: 10px;

    text-align: justify;
    color: #ff007a;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    -moz-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }

  &:hover {
    img {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg) scale(0.8);
    }

    h2,
    p {
      opacity: 1;
    }
  }
`;

export const ShortsSpanWrapper = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column; // 기존에 있는 행으로 유지하면 텍스트가 레이아웃 밖으로 나갈 수 있습니다.
  justify-content: center;
  align-items: flex-start; // 텍스트를 왼쪽 정렬합니다.
  max-width: 100%; // 컴포넌트 영역을 넘지 않도록 너비 제한을 설정합니다.

  // 컴포넌트 이하의 모든 span에 스타일을 적용합니다.
  > span {
    overflow: hidden; // 텍스트 가로 너비를 초과하면 자르는 효과를 적용합니다.
    text-overflow: ellipsis; // 자른 텍스트 끝에 생략 표시 (...)를 넣습니다.
    white-space: nowrap; // 텍스트가 자동으로 줄바꿈 되지 않도록 설정합니다.
  }
`;

export const SVideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  margin-bottom: 16px;
`;

export const SShortDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SDetailModal = styled.div`
  overflow-y: auto;
  position: fixed; // 변경된 부분
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  max-height: 700px;
  background: black;
  border: 0.5px solid rgba(40, 40, 40);
  border-radius: 20px;
  padding: 32px;
  z-index: 1000;
  font-family: "Pretendard";
  color: black;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }

  animation: ${fadeIn} 0.3s ease-in;
  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    /* 애니메이션 코드 추가 */
    animation: ${fadeIn} 0.3s ease-in;
  }
`;

export const SDetailCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  font-family: "Pretendard";
  top: 16px;
  right: 16px;
  z-index: 1000;
`;

export const SPlayerSection = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  transform: translate(45%, -0%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    rgba(69, 72, 77, 1) 0%,
    rgba(0, 0, 0, 0.66) 100%
  );
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 35px;
  background-color: rgba(20, 20, 20);
  color: white;
  margin-top: 16px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

export const SCommentSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(20, 20, 20);
  padding: 35px;
  gap: 16px;
  margin-top: 24px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: white;
  }
  input {
    border: none;
  }
`;

export const SCommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  background-color: black;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  p {
    font-size: 15px;
    margin: 0px;
    flex: auto;
  }

  form {
    display: flex;
    flex-direction: row;
    background-color: black;
    gap: 8px;
  }

  button {
    margin-left: 15px;
  }

  .comment-item {
    display: grid;
    grid-template-columns: 1.5fr 10fr 0.5fr;
    gap: 12px;
    word-break: break-word;
  }
`;

export const SModifyModal = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: linear-gradient(
    to bottom,
    rgba(69, 72, 77, 1) 0%,
    rgba(0, 0, 0, 0.66) 100%
  );
  border: 0.5px solid rgba(50, 50, 50);
  border-radius: 8px;
  padding: 32px;
  font-family: "Pretendard";
  color: black;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
  position: fixed;
  z-index: 1010;
  /* 애니메이션 코드 추가 */
  animation: ${fadeIn} 0.3s ease-in;

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    /* 애니메이션 코드 추가 */
    animation: ${fadeIn} 0.3s ease-in;
  }
`;

export const SCommentInput = styled.input`
  background-color: #000;
  border: 1px solid #ccc;
  font-family: "Pretendard";

  border-radius: 5px;
  margin-right: 10px;
  padding: 8px;
  color: white;
  font-size: 14px;
  flex-grow: 1;
  font-family: "Pretendard";
`;

export const SSubmitButton = styled.input`
  background-color: #0000c5;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  font-family: "Pretendard";
`;

export const SResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 50px;
`;

export const SResultContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: 20px;
  overflow: hidden;
  height: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SResultItem = styled.li`
  position: relative;
  border-radius: 15px;
  width: 12%; // 수정: 아이템의 가로 높이를 변경
  height: 23%; // 수정: 아이템의 세로 높이를 변경
  display: flex;

  box-shadow: 0px 0px 20px 0.1px rgba(255, 255, 255, 15%);

  flex-direction: column;
  justify-content: flex-start;
  // overflow: hidden;
  // cursor : pointer;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
    opacity: 1;
  }

  h2,
  p {
    opacity: 0;
    transition: opacity 0.3s;
  }

  h2 {
    pointer-events: none;
    font-size: 25px;
    margin-top: -15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    -moz-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }

  p {
    pointer-events: none;
    font-size: 14px;
    margin: auto;
    margin-top: 10px;

    text-align: justify;
    color: #ff007a;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    -moz-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }

  &:hover {
    img {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg) scale(0.8);
    }

    h2,
    p {
      opacity: 1;
    }
  }
`;

export const SLikeShorts = styled.p`
  font-size: 40px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  color: #ff007a;
  &:hover {
    color: #ff004a;
  }
`;
export const SDropDownMenu = styled.div`
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  min-width: 160px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 90px;
  margin-top: 110px;

  button {
    background-color: rgba(13, 13, 13, 0.92);
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    width: 100%;
    text-align: left;
    border: none;
    cursor: pointer;
    font-family: "Pretendard";
    outline: none;

    &:hover {
      background-color: rgba(20, 20, 20);
      font-weight: 1000;
    }
  }
`;

export const SDividerLine = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  height: 1px;
  width: 100%;
  margin-top: auto;
`;
export const SDeleteIcon = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;

  &:hover {
    color: #ff0000;
  }
`;

export const SForm2 = styled.form`
  position: relative;
  align-items: center;
  max-height: 800px;
  max-width: 800px;
  font-family: "Pretendard";

  border-radius: 5px;
  margin: 6px 0;
  padding: 8px 15px;
`;

export const SInput2 = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: "Pretendard";
  font-size: 24px;
  margin: 6px 0;
  margin-top: 12px;
  padding: 15px 14px;
  width: 90%;
  font-weight: 1000;
`;

export const SInputContext2 = styled.textarea`
  border: 1px solid #ccc;
  font-weight: 500;
  font-size: 20px;
  border-radius: 5px;
  margin: 6px 0;
  font-family: "Pretendard";
  padding: 15px 14px;
  width: 90%;
  height: 200px;
  max-height: 200px;
  resize: none;
`;

export const SSubmitButton2 = styled.input`
  background-color: #0000c5;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 12px;
  padding: 15px 16px;
  text-align: center;
  width: 20%;

  &:hover {
    background-color: #1877f2;
  }
`;

export const SScrollButtonWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  opacity: 0; // 추가된 속성
  transition: opacity 0.3s; // 추가된 속성
  marginbottom: rem;
  z-index: 1500;

  &:hover {
    opacity: 1;
  }

  .showButtons {
    opacity: 1 !important;
  }

  .btn1,
  .btn2,
  .btn3 {
    background: linear-gradient(
      90deg,
      rgba(21, 21, 21, 0.82) 59.45%,
      rgba(29, 29, 29, 0) 120.65%
    );
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    width: 200px;
    text-align: left;
    border: none;
    cursor: pointer;
    font-family: "Pretendard";
    outline: none;

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(51, 51, 51, 0.82) 59.45%,
        rgba(29, 29, 29, 0) 120.65%
      );
    }

    &.active {
      color: #ff007a;
    }
  }
`;
export const SScrollButtonWrapper2 = styled.div`
  position: absolute;
  // top: -100px;
  // right:-100px;
  background-color: red;
  transition: opacity 0.3s; // 추가된 속성
`;
export const SScrollImage = styled.img`
  width: 50px;
  height: 50px;
  transition: opacity 0.3s;
  opacity: ${(props) => (props.isHovered ? 0 : 1)};
`;

export const SScrollCircle = styled.div`
  padding: 7px 10px;
  position: fixed;
  margin-top: 70px;
  margin-left: 10px;
  background-color: #0000c5;
  border-radius: 50%;
  transition: opacity 0.3s;
  opacity: ${(props) => (props.isHovered ? 0 : 1)};
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 27px;
  color: white;
  box-shadow: 0px 0px 20px 0.1px rgba(255, 255, 255, 15%);
`;
