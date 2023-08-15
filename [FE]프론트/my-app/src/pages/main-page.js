import Loading from "../component/Loading";
import {
  SEntranceButton,
  SEntranceButtonWrapper,
  SShortsWrapper,
} from "../styles/pages/SMainPage";
import { SEmpty } from "../styles/SCommon";
import SearchShorts from "../component/shorts/SearchShorts";
import MostLikeShorts from "../component/shorts/list/MostLikeShorts";
import CreateShortsModal from "../component/shorts/CreateShortsModal";
import RecentShorts from "../component/shorts/list/RecentShorts";
import MostViewShorts from "../component/shorts/list/MostViewShorts";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
import Swal from "sweetalert2";
import Entrance from "../component/challenge/Entrance";
import { useSelector } from "react-redux";
import GetCompleteMyChallenge from "../component/challenge/GetCompleteMyChallenge";
import GetOnGoingMyChallenge from "./../component/challenge/GetOnGoingMyChallenge";
import GetAllMyChallenge from "../component/challenge/GetAllMyChallenge";
import GetPlannedMyChallenge from "../component/challenge/GetPlannedMyChallenge";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state) => state.users);
  const [shorts, setShorts] = useState([]);
  const onGoingChallenge = useSelector((state) => state.onGoingChallenges);
  // 쇼츠 데이터 최신, 조회수, 좋아요 순
  const [shortsByDate, setShortsByDate] = useState([]);
  const [shortsByView, setShortsByView] = useState([]);
  const [shortsByLike, setShortsByLike] = useState([]);
  // 바로입장 클릭 시
  const openChallenge = () => {
    if (onGoingChallenge === undefined) {
      Swal.fire({
        position: "center",
        icon: "error",
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

  // 쇼츠
  const getShorts = () => {
    setLoading(false);
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
  useEffect(() => {
    getShorts();
  }, []);
  return (
    <>
      <SEntranceButtonWrapper>
        {loading ? <Loading /> : null}
        <SEntranceButton onClick={openChallenge}>바로입장</SEntranceButton>
        {isOpen ? null : <Entrance />}
      </SEntranceButtonWrapper>
      <SEmpty />
      <SearchShorts />
      {/* 쇼츠 영역 */}
      <SShortsWrapper>
        <RecentShorts shortsByDate={shortsByDate} />
        <MostLikeShorts shortsByLike={shortsByLike} />
        <MostViewShorts shortsByView={shortsByView} />
      </SShortsWrapper>
      <GetAllMyChallenge />
      <GetCompleteMyChallenge />
      <GetOnGoingMyChallenge />
      <GetPlannedMyChallenge />
    </>
  );
};

export default MainPage;
