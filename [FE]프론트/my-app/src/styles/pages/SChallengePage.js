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
  width: 50%;
  height: 300px;
  margin: 100px auto;
  padding: 20px;
  border: 0.5px solid white;
  border-radius: 10px;
  box-shadow: 5px 5px 20px #ff007a;

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;

export const SSwiperSlide = styled(SwiperSlide)`
  h1 {
    position: absolute;
    top: -10px;
  }
`;

export const STopWrapper = styled.div`
  h2 {
    position: absolute;
    left: 220px;
  }

  h3 {
    position: absolute;
    right: 30px;
  }
`;

export const SMidWrapper = styled.div`
  position: relative;
  top: 80px;

  img {
    position: absolute;
  }
  p {
    position: absolute;
    left: 220px;
    width: 70%;
  }
`;

export const SBotWrapper = styled.div`
  position: relative;
  top: 220px;

  h2 {
    position: absolute;
    left: 40px;
  }
  #enter {
    position: absolute;
    right: 200px;
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
    position: absolute;
    right: 30px;
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
  width: 50%;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  padding: 13px;
  margin: 0 auto;
  display: block;

  & + hr {
    width: 50%;
    border: none;
    height: 0.5px;
    background-color: #ccc;
    margin: 30px auto;
  }
`;

// CreateChallengeModal
export const SCreateChallengeModalWrapper = styled.div`
  color: white;
  margin: 10px 5%;
`;
export const STitleInput = styled.input`
  color: white;
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 1px solid white;
  font-size: 35px;
  &::placeholder {
    color: white;
  }
`;
export const SInfoChallenge = styled.div`
  height: 450px;
`;

export const STextArea = styled.textarea`
  background-color: rgb(40, 40, 40);
  border: none;
  border-ridus: 10px;
  width: 620px;
  height: 150px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 30px 0 30px 0;

  &::placeholder {
    padding: 15px 10px;
    color: rgb(150, 150, 150);
  }
`;

export const SSelectChallengeWrapper = styled.div`
  width: 260px;
  height: 320px;
  background-color: rgb(40, 40, 40);
  border: none;
  border-ridus: 10px;
  border: 0.5px solid white;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  padding: 0 20px;
  li {
    list-style: none;
  }
  input {
    width: 30px;
    height: 15px;
  }
`;

export const SAuthenticationMethodWrapper = styled.div`
  position: relative;
  bottom: 322px;
  left: 320px;
  width: 260px;
  height: 152px;
  border: 0.5px solid white;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  padding: 0 20px;

  li {
    list-style: none;
  }
  input {
    width: 30px;
    height: 15px;
  }
`;
// 인원수 설정
export const SMemberWrapper = styled.div`
  position: relative;
  bottom: 309px;
  left: 320px;
  width: 260px;
  height: 152px;
  border: 0.5px solid white;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  padding: 0 20px;

  li {
    list-style: none;
  }
  input {
    width: 250px;
    height: 15px;
  }
  h4 {
    margin: 20px 0 10px 0;
  }
  select {
    position: relative;
    left: 180px;
    margin: 8px 0 5px 0;
    border: none;
    background-color: rgb(120, 120, 120);
  }
  h5 {
    margin: 0 110px;
  }
`;

export const SCalendarwrapper = styled.div`
  position: relative;
  bottom: 816px;
  left: 650px;
  width: 435px;
  text-align: center;

  .react-calendar {
    background-color: rgb(40, 40, 40);
    border: none;
    border-radius: 10px;
    width: 435px;
  }
  .selected-range {
    background-color: red; /* 원하는 하이라이트 색상으로 변경 가능 */
    color: white;
    border-radius: 2px;
  }
  ${"" /* 연도 월 */}
  .react-calendar__navigation__label__labelText {
    font-size: 22px;
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
    border-radius: 30px;
  }
  ${"" /* 다른 일 눌렀을 때 배경색 */}
  .react-calendar__tile.react-calendar__tile--active.react-calendar__tile--range.react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd.react-calendar__tile--rangeBothEnds.react-calendar__month-view__days__day {
    background-color: #0000c5;
    border: none;
    border-radius: 30px;
  }

  ${"" /* 요일  */}
  .react-calendar__month-view__weekdays {
    abbr {
      color: ;
      font-size: 18px;
      font-weight: 500;
    }
  }
  ${"" /* 현재월 평일 */}
  .react-calendar__tile.react-calendar__month-view__days__day {
    color: white;
  }
  ${"" /* 전월 or 다음월 평일 */}
  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth {
    color: gray;
  }
  ${"" /* 현재월 주말 */}
  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend {
    ${"" /* color: red; */}
  }
  ${"" /* 다음월 주말 */}
  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend.react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(255, 0, 0, 0.596);
  }
`;
export const SButtonWrapper = styled.div`
  position: relative;
  bottom: 30px;
  left: 650px;
  width: 435px;
`;
export const SCompleteButton = styled.button`
  width: 200px;
  margin: 0 8px;
  height: 60px;
  background-color: #0000c5;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 23px;
  font-weight: 700;
`;
export const SCloseButton = styled.button`
  width: 200px;
  margin: 0 8px;
  height: 60px;
  background-color: #33ff00;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 23px;
  font-weight: 700;
  cursor: pointer;
`;
