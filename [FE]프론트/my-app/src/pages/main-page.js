import {
  SEntranceButton,
  SEntranceButtonWrapper,
  SEntranceSlide,
  SEntranceLiButton,
  SEntranceSwiper,
  SDetailButton,
} from "../styles/pages/SMainPage";
import SearchShorts from "../component/shorts/SearchShorts";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { EffectCards } from "swiper/modules";
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
  const getMyChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/mine", {
        // .get("http://localhost:8080/challenge/list/mine", {
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
  }, []);
  console.log(myChallenges);
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
    </>
  );
};

export default MainPage;
