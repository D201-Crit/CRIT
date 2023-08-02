import {
  SSearchChallengeWrapper,
  SInput,
  SSearchSwiper,
  SSearchSwiperSlide,
} from "../../styles/pages/SChallengePage";
import useInput from "../../hooks/useInput";
import { useState } from "react";
// swiper
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const SearchChallenge = (props) => {
  const allChallenge = props.allChallenge;
  // 챌린지 검색
  const [title, onChangeTitle, setTitle] = useInput("");
  const [searchResult, setSearchResult] = useState([]);
  const onSearchChallenge = () => {
    const filterChallenge = allChallenge.filter((challenge) =>
      challenge.name.includes(title)
    );
    setSearchResult(filterChallenge);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearchChallenge(); // Call the onSearchChallenge function here
    }
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
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        // slidesPerColumn={2} // 세로 방향으로 2줄의 슬라이드가 보여짐
        navigation
        scrollbar={{ draggable: true }}
      >
        {searchResult.map((challenge) => {
          // 시작 시간과 종료 시간 사이의 시간 간격을 분으로 계산
          const [endHours, endMinutes] = challenge.endTime.split(":");
          const [startHours, startMinutes] = challenge.startTime.split(":");
          // 두 시간의 차이를 구함
          const differenceInSeconds =
            parseInt(endHours) * 3600 +
            parseInt(endMinutes) * 60 -
            (parseInt(startHours) * 3600 + parseInt(startMinutes) * 60);

          return (
            <SSearchSwiperSlide key={challenge.id}>
              {challenge.name}
              {challenge.userList.length}명{challenge.startDate}~
              {challenge.endDate}
              {differenceInSeconds}분
            </SSearchSwiperSlide>
          );
        })}
      </SSearchSwiper>
    </SSearchChallengeWrapper>
  );
};

export default SearchChallenge;
