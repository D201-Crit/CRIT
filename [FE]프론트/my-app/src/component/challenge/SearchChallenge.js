import {
  SSearchChallengeWrapper,
  SInput,
  SSearchSwiper,
  SSearchSwiperSlide,
} from "../../styles/pages/SChallengePage";
import useInput from "../../hooks/useInput";
import { useState } from "react";
// swiper
import { Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const SearchChallenge = (props) => {
  const allChallenge = props.allChallenge;
  const navigate = useNavigate();
  // 챌린지 검색
  const [title, onChangeTitle, setTitle] = useInput("");
  const [searchResult, setSearchResult] = useState([]);
  const onSearchChallenge = () => {
    const filterChallenge = allChallenge.filter((challenge) =>
      challenge.name.includes(title),
    );
    setSearchResult(filterChallenge);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearchChallenge(); // Call the onSearchChallenge function here
    }
  };
  // 검색하기전에는 모든 챌린지를 보여줌
  const renderChallenges =
    searchResult.length > 0 ? searchResult : allChallenge;

  // 상세보기 이동
  const detailClick = (challenge) => {
    navigate(`/ChallengePage/${challenge.id}`, {
      state: { challenge },
    });
  };

  return (
    <SSearchChallengeWrapper>
      <SInput
        value={title}
        onChange={onChangeTitle}
        onKeyDown={handleKeyPress}
        placeholder="검색어를 입력하세요."
      />
      <hr />

      <SSearchSwiper
        slidesPerView={4}
        grid={{
          rows: 2,
        }}
        // spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        // modules={[Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={20}
        // slidesPerView={3}
        // slidesPerColumn={2} // 세로 방향으로 2줄의 슬라이드가 보여짐
        // navigation
        // scrollbar={{ draggable: true }}
      >
        {renderChallenges.map((challenge) => {
          return (
            <SSearchSwiperSlide key={challenge.id}>
              {/* <h2>{challenge.}</h2> */}
              <h2>{challenge.name}</h2>
              <img src={challenge.imgPath} alt="챌린지 이미지" />
              <button onClick={() => detailClick(challenge)}>상세보기</button>
            </SSearchSwiperSlide>
          );
        })}
      </SSearchSwiper>
    </SSearchChallengeWrapper>
  );
};

export default SearchChallenge;

// // 시작 시간과 종료 시간 사이의 시간 간격을 분으로 계산
// const [endHours, endMinutes] = challenge.endTime.split(":");
// const [startHours, startMinutes] = challenge.startTime.split(":");
// // 두 시간의 차이를 구함
// const differenceInSeconds =
//   parseInt(endHours) * 3600 +
//   parseInt(endMinutes) * 60 -
//   (parseInt(startHours) * 3600 + parseInt(startMinutes) * 60);
