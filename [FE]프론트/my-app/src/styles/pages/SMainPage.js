import { styled, keyframes} from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;
export const SShortsWrapper = styled.div`
  width: 1200px;
  justify-content: flex-end;
  margin: 30px auto -40px auto;
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
  background-color: #0000c5;
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
  // border: 0.5px solid rgba(80, 80, 80);
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
  background-color: rgba(50, 50, 50, 0.599);
  color: white;
  width: 50%;
  border: none;
  border-radius: 5px;

  padding: 13px;
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
  width: 100%;
  max-width: 320px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;

  img {
    width: 100%;
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
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 300px;
  overflow-x: auto;
  gap: 10px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// SShortItem style
export const SShortItem = styled.div`
  position: relative;
  background-color: black;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: flex-start;
  overflow: hidden;

  img {
    width: 100%;
    height: 60%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s;
    -webkit-transform: translate(-50%, -50%) rotate(90deg);
    -moz-transform: translate(-50%, -50%) rotate(90deg);
    transform: translate(-50%, -50%) rotate(90deg);
  }

  h2,
  p {
    opacity: 0;
    transition: opacity 0.3s;
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
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
    font-size: 14px;
    margin: 0;
    text-align: justify;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  max-height: 700px;
  background: linear-gradient(
    to bottom,
    rgba(69, 72, 77, 1) 0%,
    rgba(0, 0, 0, 0.66) 100%
  );
  border: 0.5px solid rgba(50, 50, 50);
  border-radius: 8px;
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
  background-color: #ffffff;
  margin-top: 16px;
  border-radius: 4px;
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
  gap: 16px;
  margin-top: 24px;
`;

export const SCommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f9f9f9;
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
    gap: 8px;
  }

  button {
    margin-left: 15px;
  }

  .comment-item:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 10px;
    margin-bottom: 10px;
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
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
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
