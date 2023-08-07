import {
  SSearchChallengeWrapper,
  SInput,
  SSearchSwiper,
  SSearchSwiperSlide,
  SCategoryWrapper,
} from "../../styles/pages/SChallengePage";
import useInput from "../../hooks/useInput";
import { useState, useEffect } from "react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SearchChallenge = ({ allChallenge }) => {
  const navigate = useNavigate();
  // 챌린지 검색
  const [title, onChangeTitle, setTitle] = useInput("");
  const [searchResult, setSearchResult] = useState([]);
  const [sport, setSport] = useState([]);
  const [study, setStudy] = useState([]);
  const [book, setBook] = useState([]);
  const [stretching, setStretching] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // 선택된 카테고리 상태

  const onSearchChallenge = () => {
    const filterChallenge = allChallenge.filter((challenge) =>
      challenge.name.includes(title)
    );
    if (filterChallenge.length === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "일치하는 챌린지가 없습니다.",
        text: "CRIT",
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
      });
    } else {
      setSearchResult(filterChallenge);
    }
  };

  const categorizeChallenges = () => {
    const studyChallenges = allChallenge.filter(
      (challenge) => challenge.category === "공부"
    );
    const sportChallenges = allChallenge.filter(
      (challenge) => challenge.category === "운동"
    );
    const bookChallenges = allChallenge.filter(
      (challenge) => challenge.category === "독서"
    );
    const stretchingChallenges = allChallenge.filter(
      (challenge) => challenge.category === "스트레칭"
    );

    setStudy(studyChallenges);
    setSport(sportChallenges);
    setBook(bookChallenges);
    setStretching(stretchingChallenges);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearchChallenge();
    }
  };

  useEffect(() => {
    categorizeChallenges();
  }, [allChallenge]);

  // 선택된 카테고리에 따라 보여줄 챌린지 데이터 선택
  let categoryChallenges = allChallenge;
  if (selectedCategory === "전체") {
    categoryChallenges = allChallenge;
  } else if (selectedCategory === "운동") {
    categoryChallenges = sport;
  } else if (selectedCategory === "스트레칭") {
    categoryChallenges = stretching;
  } else if (selectedCategory === "공부") {
    categoryChallenges = study;
  } else if (selectedCategory === "독서") {
    categoryChallenges = book;
  }

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
      <SCategoryWrapper>
        <ul>
          <a onClick={() => handleCategoryClick("전체")}>전체</a>
          <a onClick={() => handleCategoryClick("운동")}>운동</a>
          <a onClick={() => handleCategoryClick("스트레칭")}>스트레칭</a>
          <a onClick={() => handleCategoryClick("공부")}>공부</a>
          <a onClick={() => handleCategoryClick("독서")}>독서</a>
        </ul>
      </SCategoryWrapper>

      <SSearchSwiper
        slidesPerView={4}
        grid={{
          rows: 2,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
      >
        {categoryChallenges.map((challenge) => {
          return (
            <SSearchSwiperSlide key={challenge.id}>
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
