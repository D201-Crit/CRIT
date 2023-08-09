import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// ChallengPage
export const SCreateChallengeWrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: flex-end;
  margin: 30px auto -40px auto;
`;
export const SCreateChallengeButton = styled.button`
  font-family: "Pretendard";
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
export const SImg = styled.img`
  // position: absolute;
  // bottom: -120px;
  // left: 120px;
  width: 600px;
  height: 600px;
  margin: 100px auto;
`;

export const SSwiper = styled(Swiper)`
  // background-color: rgba(22, 22, 22, 0.599);
  width: 900px;
  height: 300px;
  margin: 100px auto;
  padding: 10px;
  border:none
  // border: 0.5px solid white;
  // border-radius: 10px;
  // box-shadow: 5px 5px 20px #ff007a;

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;
SSwiper.displayName = "SwiperWrapper";

export const SSwiperSlide = styled(SwiperSlide)`
  background-color: rgba(22, 22, 22, 22);

  border-radius: 10px;
  box-shadow: 0px 0px 15px gray;
`;
SSwiperSlide.displayName = "SwiperSlide";
export const STopWrapper = styled.div`
  #name {
    position: absolute;
    font-size: 30px;
    left: 30px;
    top: -5px;
  }
  #date {
    position: absolute;
    top: 5px;
    font-size: 22px;
    right: 20px;
  }

  #dday {
    position: absolute;
    top: 40px;
    font-size: 20px;
    right: 20px;
  }
`;

export const SMidWrapper = styled.div`
  img {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 80px;
    left: 20px;
    bottom: 160px;
  }
  #info {
    position: absolute;
    left: 200px;
    top: 90px;
    font-size: 18px;
    width: 500px;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

export const SBotWrapper = styled.div`
  #people {
    position: absolute;
    font-size: 18px;
    left: 50px;
    bottom: 5px;
  }
  #enter {
    position: absolute;
    left: 550px;
    bottom: 20px;
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
    left: 720px;
    bottom: 20px;
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
//  SearchChallenge
export const SSearchChallengeWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  text-align: center;
`;
export const SInput = styled.input`
  background-color: rgba(22, 22, 22, 0.599);
  color: white;
  width: 1000px;
  border: none;
  border-radius: 10px;

  padding: 13px;
  font-size: 18px;
  font-weight: 500;
  font-family: "Pretendard";

  & + hr {
    width: 1000px;
    border: none;
    height: 0.5px;
    background-color: #ccc;
  }

  &::placeholder {
    font-weight: 800;
    font-size: 20px;
  }
`;
export const SCategoryWrapper = styled.div`
  width: 1000px;
  margin: 0 auto 50px;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }
  a {
    margin: 0 20px 0 0;
    cursor: pointer;
    font-size: 18px;
    font-weight: 800;
    color: gray;

    &:hover {
      color: #ff007a;
    }
  }
`;

export const SSearchSwiper = styled(Swiper)`
  width: 1100px;
  margin: 30px auto 90px;
  height: 600px;
  border: none;
  ${
    "" /* gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr); */
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
  .swiper-slide.sc-fMhgLX.ftUpPP.swiper-slide-active {
    width: 100px;
  }
`;
SSearchSwiper.displayName = "SwiperWrapper";

SSearchSwiper.displayName = "SwiperWrapper";

export const SSearchSwiperSlide = styled(SwiperSlide)`
  ${"" /* width: 200px; */}
  height: calc((100% - 20px) / 2) !important;
  transition: background-color 0.25s ease-in-out, box-shadow 0.3s ease-in-out; // Added 's' to seconds
  margin: 5px;
  border-radius: 10px;
  &:hover {
    background-color: rgba(
      28,
      28,
      28,
      0.28
    ); // Changed last value to 0.28 for transparency
    box-shadow: 0px 0px 15px gray;
  }
  img {
    position: absolute;
    top: 80px;
    left: 80px;
    width: 120px;
    height: 120px;
    ${"" /* margin: 10px 25px 0px 25px; */}
    border-radius: 10px;
  }
  h2 {
    margin: 15px 0 0 0;
    font-size: 18px;
  }
  button {
    position: absolute;
    width: 150px;
    height: 40px;
    top: 230px;
    left: 65px;
    border: 0.2px solid gray;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgba(40, 40, 40, 40);
    color: white;
    font-size: 16px;
    font-weight: 600;
  }
`;
SSearchSwiperSlide.displayName = "SwiperSlide";

// CreateChallengeModal
export const customModalStyles = {
  content: {
    backgroundColor: "rgba(22, 22, 22, 1)",
    border: "0.5px solid rgba(80, 80, 80)",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px gray",
    margin: "auto",
    width: "1000px",
    height: "725px",
    color: "black",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1001",
  },
};

export const SCreateChallengeModalWrapper = styled.div`
  color: white;
  margin: -15px 60px 10px 50px;
`;
export const STitleChallenge = styled.input`
  position: absolute;
  top: 15px;
  color: white;
  width: 80%;
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 0.5px solid gray;
  font-size: 30px;
  padding: 15px;
  font-family: "Pretendard";
  font-weight: 500;

  &::placeholder {
    color: white;
  }
`;

export const SChallengeImage = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 30px;

  div {
    position: absolute;
    width: 180px;
    height: 180px;
    top: 95px;
    background: white;
    border-radius: 50px;
  }
  label {
    position: absolute;
    top: 95px;
    left: 300px;
    font-size: 30px;
    width: 300px;
  }
  img {
    position: absolute;
    width: 180px;
    height: 180px;
    top: px;
  }
  input {
    position: absolute;
    top: 140px;
    left: 300px;
    font-size: 20px;
    font-weight: 500;
    font-family: "Pretendard";
  }
`;

export const SInfoChallenge = styled.div``;

export const STextArea = styled.textarea`
  position: absolute;
  background-color: rgb(40, 40, 40);
  border-radius: 10px;
  border: 0.5px solid gray;
  width: 482px;
  height: 120px;
  font-size: 16px;
  top: 270px;
  color: white;
  margin: 30px 0 20px 0;
  padding: 15px;
  resize: none;
  font-weight: 800;
  font-family: "Pretendard";

  &::placeholder {
    font-weight: 800;
    color: rgb(150, 150, 150);
  }
`;

export const SSelectChallengeWrapper = styled.div`
  position: absolute;
  font-family: "Pretendard";
  width: 210px;
  height: 145px;
  background-color: rgb(40, 40, 40);
  border-radius: 10px;
  border: 0.5px solid gray;
  color: white;
  font-size: 18px;
  padding: 0 20px;
  margin: 0 0 20px 0;
  font-weight: 440;
  top: 460px;
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
  position: absolute;
  width: 210px;
  height: 145px;
  border: 0.5px solid gray;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  padding: 0 20px;
  background-color: rgb(40, 40, 40);
  font-weight: 440;
  font-family: "Pretendard";
  top: 615px;
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
  font-family: "Pretendard";
  position: absolute;
  bottom: 302px;
  left: 332px;
  top: 460px;
  width: 210px;
  height: 145px;
  border: 0.5px solid gray;
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
    margin: 20px 0 22px 0;
  }
  input {
    width: 30px;
    height: 15px;
  }
`;
// 인원수 설정
export const SMemberWrapper = styled.div`
  font-family: "Pretendard";
  position: absolute;
  top: 615px;
  left: 332px;
  width: 210px;
  height: 145px;
  border: 0.5px solid gray;
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
    position: absolute;
    bottom: 50px;
  }
  h4 {
    margin: 10px 0 10px 0;
  }
  select {
    font-family: "Pretendard";
    font-weight: 500;
    position: absolute;
    left: 160px;
    bottom: 10px;
    margin: 8px 0 5px 0;
    font-size: 15px;
    border: none;
    border-radius: 6px;
  }
  h5 {
    position: absolute;
    font-size: 20px;
    bottom: 75px;
    left: 110px;
    margin: 0;
  }
`;

export const SCalendarwrapper = styled.div`
  position: absolute;
  bottom: 233px;
  left: 600px;
  width: 355px;
  height: 255px;
  text-align: center;
  font-size: 10px;
  font-family: "Pretendard";
  z-index: 999;
  border: 0.5px solid gray;
  border-radius: 10px;

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
    ${
      "" /* background: linear-gradient(
      360deg,
      rgba(230, 0, 0, 0.5) -58.38%,
      rgba(230, 0, 0, 0) 206.25%,
      rgba(230, 0, 0, 0.0470272) 206.25%
    ); */
    }
    ${
      "" /* background: linear-gradient(
      360deg,
       rgba(0, 255, 240, 0.3) 1.48%,
        rgba(53, 20, 240, 0) 81.57%); */
    }
    background-color:rgba(60,60,60);
    color: white;
    border-radius: 2px;
  }
  ${"" /* 월 선택 */}
  .react-calendar__tile.react-calendar__decade-view__years__year {
    color: white;
  }
  ${"" /* 연도 선택 */}
  .react-calendar__tile.react-calendar__tile--now.react-calendar__tile--hasActive.react-calendar__century-view__decades__decade {
    color: white;
  }

  ${"" /* 선택불가 날짜 색 */}
  .react-calendar__tile:disabled, .react-calendar__navigation button:disabled {
    background-color: rgb(40, 40, 40);
    border-radius: 10px;
  }
  .react-calendar__tile--now:enabled:hover {
    background-color: rgb(40, 40, 40);
    border-radius: 10px;
  }
  .react-calendar__tile--now:enabled:focus {
    background-color: rgb(40, 40, 40);
    border-radius: 10px;
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
    color: black;
    border: none;
  }
  ${"" /* 다른 일 눌렀을 때 배경색 */}
  .react-calendar__tile.react-calendar__tile--active.react-calendar__tile--range.react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd.react-calendar__tile--rangeBothEnds.react-calendar__month-view__days__day {
    background-color: rgb(30, 30, 30);
    border: none;
  }
  ${"" /* hover or focus 했을때 */}
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: rgb(30, 30, 30);
    border-radius: ;
    color: ;
  }

  ${"" /* 요일  */}
  .react-calendar__month-view__weekdays {
    abbr {
      font-size: 16px;
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
  position: absolute;
  bottom: 85px;
  left: 560px;
  width: 435px;
  text-align: center;
  font-family: "Pretendard";
  h3 {
    font-size: 25px;
    margin: 10px;
  }
  h4 {
    font-size: 20px;
    margin: 10px;
  }
  select {
    width: 200px;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 10px;
    font-weight: 450;
    font-size: 18px;
    font-family: "Pretendard";
    option {
      font-family: "Pretendard";
      font-weight: 450;
      font-size: 18px;
    }
  }
`;
export const SButtonWrapper = styled.div`
  font-family: "Pretendard";
  position: absolute;
  bottom: 28px;
  left: 620px;
  width: 360px;
`;
export const SCompleteButton = styled.button`
  width: 150px;
  margin: 0 8px;
  height: 50px;
  background-color: #0000c5;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 23px;
  font-weight: 700;
  font-family: "Pretendard";
  cursor: pointer;
`;
export const SCloseButton = styled.button`
  width: 150px;
  margin: 0 8px;
  height: 50px;
  background-color: #33ff00;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 23px;
  font-weight: 700;
  cursor: pointer;
  font-family: "Pretendard";
`;

export const ParticipationChallengeButton = styled.button`
  // position: absolute;
  // top: 130px;
  // right: 400px;
  // width: 150px;
  // height: 40px;
  // font-size: 18px;
  // font-weight: 700;
  // border-radius: 10px;
  // border: none;
`;

// WebRTC
export const SWebRTCModal = {
  content: {
    backgroundColor: "rgba(22, 22, 22, 1)",
    border: "0.5px solid rgba(80, 80, 80)",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px gray",
    margin: "auto",
    width: "1200px",
    height: "750px",
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
