import {
  SEntranceButton,
  SEntranceButtonWrapper,
  SEntranceSlide,
  SEntranceLiButton,
  SEntranceSwiper,
  SDetailButton,
} from "../styles/pages/SMainPage";
import SearchShorts from "../component/shorts/SearchShorts";
import MostLikeShorts from "../component/shorts/list/MostLikeShorts";
import CreateShortsModal from "../component/shorts/CreateShortsModal";
import RecentShorts from "../component/shorts/list/RecentShorts";
import MostViewtShorts from "../component/shorts/list/MostViewtShorts";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const openChallenge = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector((state) => state.users);
  const location = useLocation();
  const navigate = useNavigate();
  const [myChallenges, setMyChallenges] = useState([]);
  const [shorts, setShorts] = useState([]);

  // 쇼츠 데이터 최신, 조회수, 좋아요 순
  const [shortsByDate, setShortsByDate] = useState([]);
  const [shortsByView, setShortsByView] = useState([]);
  const [shortsByLike, setShortsByLike] = useState([]);

  const getMyChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/mine", {
        // .get("http://localhost:8080/challenge/list/ongoing", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setMyChallenges(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 상세보기 클릭
  const detailClick = (challenge) => {
    navigate(`/ChallengePage/${challenge.id}`, {
      state: { challenge },
    });
  };
  useEffect(() => {
    getMyChallenge();
    getShorts();
  }, []);
  // console.log(myChallenges);

  // 쇼츠
  const getShorts = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/main", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        // console.log("쇼츠데이터",res.data.data);
        setShortsByDate(res.data.data.thumbnailsByDate);
        setShortsByView(res.data.data.thumbnailsByView);
        setShortsByLike(res.data.data.thumbnailsByLike);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SEntranceButtonWrapper>
        <SEntranceButton onClick={openChallenge}>바로입장</SEntranceButton>
        {isOpen ? null : (
          <SEntranceSwiper
            grabCursor={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            modules={[EffectCreative]}
            // effect={"cards"}
            // grabCursor={true}
            // modules={[EffectCards]}
            className="mySwiper"
          >
            {myChallenges.map((challenge) => (
              <SEntranceSlide key={challenge.id}>
                <img src={challenge.imgPath} alt="챌린지 이미지" />
                <h4>{challenge.name}</h4>
                <p>
                  {challenge.info.length > 30
                    ? challenge.info.slice(0, 30) + "..."
                    : challenge.info}
                </p>
                <SDetailButton onClick={detailClick}>상세보기</SDetailButton>
                <SEntranceLiButton>입장하기</SEntranceLiButton>
              </SEntranceSlide>
            ))}
          </SEntranceSwiper>
        )}
      </SEntranceButtonWrapper>
      <SearchShorts />

      {/* 쇼츠 영역 */}
      <RecentShorts shortsByDate={shortsByDate} />
      <MostLikeShorts shortsByLike={shortsByLike} />
      <MostViewtShorts shortsByView={shortsByView} />
    </>
  );
};

export default MainPage;
