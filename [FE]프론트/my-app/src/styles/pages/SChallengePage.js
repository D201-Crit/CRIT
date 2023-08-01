import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// ChallengPage
export const SCreateChallengeWrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-end;
  margin: 30px 0px -40px 0px;
`;
export const SCreateChallengeButton = styled.button`
  background-color: #ff007a;
  border: none;
  border-radius: 10px;
  width: 150px;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

// MyChallenge

export const SSwiper = styled(Swiper)`
  background-color: rgba(22, 22, 22, 0.599);
  width: 780px;
  height: 300px;
  margin: 100px auto;
  padding: 10px;
  border: 0.5px solid white;
  border-radius: 10px;
  box-shadow: 5px 5px 20px #ff007a;

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;

export const SSwiperSlide = styled(SwiperSlide)``;

export const STopWrapper = styled.div`
  #name {
    position: relative;
    font-size: 25px;
    left: 30px;
    top: -15px;
  }
  #date {
    position: relative;
    top: -65px;
    font-size: 18px;
    left: 580px;
  }

  #dday {
    position: relative;
    top: -75px;
    font-size: 18px;
    left: 650px;
  }
`;

export const SMidWrapper = styled.div`
  position: relative;
  top: 80px;

  img {
    position: relative;
    left: 20px;
    bottom: 160px;
  }
  #info {
    position: relative;
    left: 200px;
    bottom: 310px;
    font-size: 18px;
    width: 500px;
  }
`;

export const SBotWrapper = styled.div`
  #people {
    position: relative;
    font-size: 18px;
    left: 45px;
    bottom: -20px;
  }
  #enter {
    position: relative;
    left: 440px;
    bottom: 240px;
    background-color: #0000c5;
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 50px;
    font-weight: bold;
    font-size: 18px;
    color: white;
    cursor: pointer;
  }
  #detail {
    position: relative;
    left: 460px;
    bottom: 240px;
    background-color: #33ff00;
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 50px;
    font-weight: bold;
    font-size: 18px;
    color: black;
    cursor: pointer;
  }
`;
//  ChallengeBoard
export const SChallengeBoardWrapper = styled.div``;
export const SInput = styled.input`
  background-color: rgba(22, 22, 22, 0.599);
  color: white;
  width: 780px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  padding: 13px;
  margin: 0 auto;
  display: block;

  & + hr {
    width: 780px;
    border: none;
    height: 0.5px;
    background-color: #ccc;
    margin: 30px auto;
  }
`;

// CreateChallengeModal
export const SCreateChallengeModalWrapper = styled.div`
  color: white;
  margin: 0 5%;
`;
export const STitleChallenge = styled.input`
  color: white;
  width: 48%;
  height: 50px;
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 1px solid white;
  font-size: 25px;
  padding: 15px;
  font-family: Pretendard;
  font-weight: 500;

  &::placeholder {
    color: white;
  }
`;

export const SChallengeImage = styled.div`
  width: 100px;
  position: relative;

  left: 800px;
  input {
    width: 200px;
  }
`;

export const SInfoChallenge = styled.div`
  height: 450px;
  font-family: Pretendard;
`;

export const STextArea = styled.textarea`
  background-color: rgb(40, 40, 40);
  border: none;
  border-ridus: 10px;
  width: 482px;
  height: 100px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 30px 0 20px 0;
  padding: 15px;
  resize: none;
  font-weight: 800;
  &::placeholder {
    font-weight: 800;
    color: rgb(150, 150, 150);
  }
`;

export const SSelectChallengeWrapper = styled.div`
  width: 200px;
  height: 140px;
  background-color: rgb(40, 40, 40);
  border: none;
  border-ridus: 10px;
  border: 0.5px solid white;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  padding: 0 20px;
  margin: 0 0 20px 0;
  font-weight: 440;
  div {
    margin: 20px 0;
  }
  h4 {
    margin: 10px 0 15px 0;
  }

  input {
    width: 30px;
    height: 15px;
  }
`;
export const SChallengeTimeWrapper = styled.div`
  width: 200px;
  height: 140px;
  border: 0.5px solid white;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  padding: 0 20px;
  background-color: rgb(40, 40, 40);
  font-weight: 440;
  h4 {
    margin: 10px 0 15px 0;
  }
  li {
    list-style: none;
    width: 255px;
  }
  input {
    width: 120px;
    height: 20px;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 6px;
    margin: 10px;
  }
`;

export const SAuthenticationMethodWrapper = styled.div`
  position: relative;
  bottom: 302px;
  left: 270px;
  width: 200px;
  height: 140px;
  border: 0.5px solid white;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  padding: 0 20px;
  background-color: rgb(40, 40, 40);
  font-weight: 440;
  h4 {
    margin: 10px 0 15px 0;
  }
  li {
    list-style: none;
    margin: 20px 0;
  }
  input {
    width: 30px;
    height: 15px;
  }
`;
// 인원수 설정
export const SMemberWrapper = styled.div`
  position: relative;
  bottom: 282px;
  left: 270px;
  width: 200px;
  height: 140px;
  border: 0.5px solid white;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  padding: 0 20px;
  background-color: rgb(40, 40, 40);

  li {
    list-style: none;
  }
  input {
    width: 200px;
    height: 15px;
  }
  h4 {
    margin: 10px 0 10px 0;
  }
  select {
    position: relative;
    left: 135px;
    bottom: -51px;
    margin: 8px 0 5px 0;
    font-size: 15px;
    border: none;
    border-radius: 6px;
  }
  h5 {
    position: relative;
    bottom: 25px;
    left: 70px;
  }
`;

export const SCalendarwrapper = styled.div`
  position: relative;
  bottom: 740px;
  left: 550px;
  width: 435px;
  height: 200px;
  text-align: center;
  font-size: 10px;
  #date {
    font-weight: 500;
    font-size: 20px;
    margin: 10px;
  }
  .react-calendar {
    background-color: rgb(40, 40, 40);
    border: none;
    border-radius: 10px;
    width: 435px;
  }
  ${"" /*  챌린지 범위 */}
  .selected-range {
    background-color: gray;
    color: white;
    border-radius: 2px;
  }
  ${"" /* 연도 월 */}
  .react-calendar__navigation__label__labelText {
    font-size: 20px;
    color: white;
  }
  ${"" /* 연도 월 화살표 */}
  .react-calendar__navigation__arrow {
    color: white;
  }
  ${"" /* 연도 눌렀을때 나타나는 월 */}
  .react-calendar__tile.react-calendar__year-view__months__month {
    color: white;
  }
  ${"" /* 현재일 말고 다른 일 눌렀을 때 현재 일 배경색  */}
  .react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day {
    background-color: #33ff00;
    border: none;
  }
  ${"" /* 다른 일 눌렀을 때 배경색 */}
  .react-calendar__tile.react-calendar__tile--active.react-calendar__tile--range.react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd.react-calendar__tile--rangeBothEnds.react-calendar__month-view__days__day {
    background-color: #0000c5;
    border: none;
  }

  ${"" /* 요일  */}
  .react-calendar__month-view__weekdays {
    abbr {
      font-size: 17px;
      font-weight: 500;
      text-decoration: none;
    }
  }
  ${"" /* 현재월 평일 */}
  .react-calendar__tile.react-calendar__month-view__days__day {
    color: white;
    font-size: 15px;
  }
  ${"" /* 전월 or 다음월 평일 */}
  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth {
    color: gray;
  }
  ${"" /* 현재월 주말 */}
  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend {
    color: red;
  }
  ${"" /* 다음월 주말 */}
  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend.react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(255, 0, 0, 0.596);
  }
`;
export const SMoneyWrapper = styled.div`
  position: relative;
  bottom: 650px;
  left: 550px;
  width: 435px;
  text-align: center;
  h3 {
    font-size: 22px;
    margin: 10px;
  }
  h4 {
    font-size: 18px;
    margin: 10px;
  }
  select {
    width: 200px;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 10px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
  }
`;
export const SButtonWrapper = styled.div`
  position: relative;
  bottom: 10px;
  left: 575px;
  width: 435px;
`;
export const SCompleteButton = styled.button`
  width: 180px;
  margin: 0 8px;
  height: 50px;
  background-color: #0000c5;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 23px;
  font-weight: 700;
`;
export const SCloseButton = styled.button`
  width: 180px;
  margin: 0 8px;
  height: 50px;
  background-color: #33ff00;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 23px;
  font-weight: 700;
  cursor: pointer;
`;
