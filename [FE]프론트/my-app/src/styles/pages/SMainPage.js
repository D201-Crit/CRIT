import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

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
  font-family: "Pretendard";
`;
export const SEntranceSlide = styled(SwiperSlide)`
  display: flex;
  width: 400px;
  height: 120px;
  list-style: none;
  border-radius: 8px;
  font-family: "Pretendard";
  background-color: rgba(22, 22, 22, 22);
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
    width: 200px;
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
export const SEntranceLiButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 80px;
  height: 30px;
  background-color: #33ff00;
  border: none;
  border-radius: 6px;
  font-weight: 800;
  cursor: pointer;
  font-family: "Pretendard";
`;
// 챌스 검색
export const SSearchShortsWrapper = styled.div`
  text-align: center;
`;
export const SInput = styled.input`
  background-color: rgba(22, 22, 22, 0.599);
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
