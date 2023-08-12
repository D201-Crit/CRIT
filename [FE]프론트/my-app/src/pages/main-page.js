import Loading from "../component/Loading";
import {
  SEntranceButton,
  SEntranceButtonWrapper,
  SEntranceSlide,
  SEntranceLiButton,
  SEntranceSwiper,
  SDetailButton,
  SShortsWrapper,
} from "../styles/pages/SMainPage";
import SearchShorts from "../component/shorts/SearchShorts";
import MostLikeShorts from "../component/shorts/list/MostLikeShorts";
import CreateShortsModal from "../component/shorts/CreateShortsModal";
import RecentShorts from "../component/shorts/list/RecentShorts";
import MostViewShorts from "../component/shorts/list/MostViewShorts";
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
import Swal from "sweetalert2";
import Modal from "react-modal";

import { SWebRTCModal } from "../styles/pages/SChallengePage";
import VideoRoomComponent from "../component/VideoRoomComponent";
import PhotoChallengeModal from "../component/challenge/PhotoChallengeModal";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state) => state.users);
  const location = useLocation();
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [challengeData, setChallengeData] = useState(null); // 모달에 전달할 데이터 state 추가
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [onGoingChallenges, setOnGoingChallenges] = useState([]);
  const [shorts, setShorts] = useState([]);

  // 쇼츠 데이터 최신, 조회수, 좋아요 순
  const [shortsByDate, setShortsByDate] = useState([]);
  const [shortsByView, setShortsByView] = useState([]);
  const [shortsByLike, setShortsByLike] = useState([]);

  const openChallenge = () => {
    if (onGoingChallenges.length === 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "진행중인 챌린지가 없습니다.",
        text: "CRIT",
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
        // width: "500px",
        // 먼지
        // imageUrl: 'https://unsplash.it/400/200',
        // imageWidth: 400,
        // imageHeight: 200,
        // imageAlt: 'Custom image',
      });
    } else {
      setIsOpen(!isOpen);
    }
  };
  const getMyChallenge = () => {
    setLoading(true);
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/ongoing", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data.data);
        setOnGoingChallenges(res.data.data);
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
  const checkEnterTime = () => {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "챌린지 시간이 아닙니다!.",
      text: "CRIT",
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
      width: "500px",

      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
    });
  };
  const openVideoModal = (challenge) => {
    setChallengeData({ challenge, user }); // 모달에 전달할 데이터를 state에 저장
    setSelectedSessionId(challenge.id); // 선택한 챌린지의 세션 ID 저장
    setIsVideoOpen(true);
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "챌린지 입장 중!",
      text: "CRIT",
      showConfirmButton: false,
      timer: 2000,
      background: "#272727",
      color: "white",
      width: "500px",

      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
    });
  };
  const openPhotoModal = (challenge) => {
    setChallengeData({ challenge, user }); // 모달에 전달할 데이터를 state에 저장
    setSelectedSessionId(challenge.id); // 선택한 챌린지의 세션 ID 저장
    setIsPhotoOpen(true);
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "챌린지 입장 중!",
      text: "CRIT",
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
      width: "500px",

      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
    });
  };

  const getDaysInProgress = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 연, 월, 일만 비교
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (today < start) {
      // 아직 시작되지 않은 챌린지인 경우
      const timeDiff = start.getTime() - today.getTime() - 1;
      const daysToStart = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if (daysToStart - 1 === 0) {
        return `D-day`;
      }
      if (daysToStart - 1 > 0) {
        return `D-${daysToStart - 1}일`;
      }
    }
    if (today > end) {
      // 이미 종료된 챌린지인 경우
      return `종료됨`;
    }
    if (today.getTime() >= start.getTime()) {
      // 진행 중인 챌린지인 경우
      const timeDiff = today.getTime() - start.getTime();
      const daysInProgress = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return `현재 ${daysInProgress + 1}일째 참여 중`;
    }
  };
  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };
  const closePhotoModal = () => {
    setIsPhotoOpen(false);
  };

  // 쇼츠
  const getShorts = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/main", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log("쇼츠데이터", res.data.data);
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
        {loading ? <Loading /> : null}

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
            {onGoingChallenges.map((challenge) => (
              <SEntranceSlide key={challenge.id}>
                <img src={challenge.imgPath} alt="챌린지 이미지" />
                <h4>{challenge.name}</h4>
                <p>
                  {challenge.info.length > 30
                    ? challenge.info.slice(0, 30) + "..."
                    : challenge.info}
                </p>
                {getDaysInProgress(
                  challenge.startDate,
                  challenge.endDate,
                )?.includes("현재") ? (
                  new Date(challenge.startTime) <= new Date() &&
                  new Date() <= new Date(challenge.endTime) ? (
                    challenge.cert === "실시간" ? (
                      <SEntranceLiButton
                        onClick={() => openVideoModal(challenge)}
                      >
                        입장하기
                      </SEntranceLiButton>
                    ) : (
                      <SEntranceLiButton
                        onClick={() => openPhotoModal(challenge)}
                      >
                        사진인증
                      </SEntranceLiButton>
                    )
                  ) : challenge.cert === "실시간" ? (
                    <SEntranceLiButton
                      // onClick={() => checkEnterTime()}
                      onClick={() => openVideoModal(challenge)}
                    >
                      입장하기
                    </SEntranceLiButton>
                  ) : (
                    <SEntranceLiButton
                      // onClick={() => checkEnterTime()}
                      onClick={() => openPhotoModal(challenge)}
                    >
                      사진인증
                    </SEntranceLiButton>
                  )
                ) : null}
                <SDetailButton onClick={() => detailClick(challenge)}>
                  상세보기
                </SDetailButton>
              </SEntranceSlide>
            ))}
          </SEntranceSwiper>
        )}
      </SEntranceButtonWrapper>

      <SearchShorts />

      {/* 쇼츠 영역 */}
      <SShortsWrapper>
        <RecentShorts shortsByDate={shortsByDate} />
        <MostLikeShorts shortsByLike={shortsByLike} />
        <MostViewShorts shortsByView={shortsByView} />
      </SShortsWrapper>
      {/* 챌린지 바로입장 모달 */}
      <Modal style={SWebRTCModal} isOpen={isVideoOpen}>
        {/* 모달 내부에서 VideoRoomComponent 사용 */}
        <VideoRoomComponent
          closeVideoModal={closeVideoModal}
          challengeData={challengeData}
        />
        {/* <VideoRoomComponent /> */}
      </Modal>
      <Modal style={SWebRTCModal} isOpen={isPhotoOpen}>
        <PhotoChallengeModal
          challengeData={challengeData}
          closePhotoModal={closePhotoModal}
        ></PhotoChallengeModal>
      </Modal>
    </>
  );
};

export default MainPage;
