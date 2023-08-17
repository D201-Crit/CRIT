import Loading from "../component/Loading";
import {
  SEntranceButton,
  SEntranceButtonWrapper,
  SShortsWrapper,
  SScrollButtonWrapper,
  SScrollCircle,
} from "../styles/pages/SMainPage";

import { SEmpty } from "../styles/SCommon";
import SearchShorts from "../component/shorts/SearchShorts";
import MostLikeShorts from "../component/shorts/list/MostLikeShorts";
import CreateShortsModal from "../component/shorts/CreateShortsModal";
import RecentShorts from "../component/shorts/list/RecentShorts";
import MostViewShorts from "../component/shorts/list/MostViewShorts";
import { useEffect, useState, useRef } from "react";
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
import GetOnGoingMyChallenge from "../component/challenge/GetOnGoingMyChallenge";
import GetAllMyChallenge from "../component/challenge/GetAllMyChallenge";
import GetPlannedMyChallenge from "../component/challenge/GetPlannedMyChallenge";
import InfiniteScroll from "react-infinite-scroll-component";
import CheckTime from "./../component/challenge/CheckTime";
const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state) => state.users);
  const [shorts, setShorts] = useState([]);
  const ongoingChallenges = useSelector((state) => state.onGoingMyChallenges);
  const [visitedLastIndex, setVisitedLastIndex] = useState(false);

  // 인피니트 스크롤 바로 이동
  const recentShortsRef = useRef();
  const mostLikeShortsRef = useRef();
  const mostViewShortsRef = useRef();

  // 쇼츠 데이터 최신, 조회수, 좋아요 순
  const [shortsByDate, setShortsByDate] = useState([]);
  const [shortsByView, setShortsByView] = useState([]);
  const [shortsByLike, setShortsByLike] = useState([]);
  const [shortsByAll, setShortsByAll] = useState([]);

  // 바로입장 클릭 시
  const openChallenge = () => {
    if (ongoingChallenges.length === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "진행중인 챌린지가 없습니다.",
        text: "CRIT",
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
      });
    } else {
      setIsOpen(!isOpen);
    }
  };
  // 인피니트 스크롤
  const [pageIndex, setPageIndex] = useState(0);
  const shortsArr = [
    <>
      <h4 ref={recentShortsRef}></h4>
      <RecentShorts shortsByDate={shortsByDate} />
    </>,
    <>
      <h4 ref={mostLikeShortsRef}></h4>
      <MostLikeShorts shortsByLike={shortsByLike} />
    </>,
    <>
      <h4 ref={mostViewShortsRef}></h4>
      <MostViewShorts shortsByView={shortsByView} />
    </>,
  ];

  const fetchMoreData = () => {
    setPageIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex;
    });
  };

  // 쇼츠

  const getAllShorts = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/whole", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setShortsByAll(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getShorts = () => {
    setLoading(false);
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/main", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
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
    getAllShorts();
  }, []);

  // 필요한 부분에 스크롤 이동 기능을 추가하세요.
  const scrollToTargetRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPage = (index) => {
    const targetIndex = Math.min(index, shortsArr.length - 1);
    setPageIndex(targetIndex);
    fetchMoreData(); // 배열의 요소들을 추가적으로 로드함.

    switch (index) {
      case 0:
        if (recentShortsRef.current) {
          scrollToTargetRef(recentShortsRef);
        }
        break;
      case 1:
        if (mostLikeShortsRef.current) {
          scrollToTargetRef(mostLikeShortsRef);
        }
        break;
      case 2:
        if (mostViewShortsRef.current) {
          scrollToTargetRef(mostViewShortsRef);
        }
        break;
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  // 마우스를 올릴 때와 내릴 때 상태를 변경하는 함수를 추가
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <>
      <SEntranceButtonWrapper>
        {loading ? <Loading /> : null}
        <SEntranceButton onClick={openChallenge}>바로입장</SEntranceButton>
        {isOpen ? null : <Entrance />}
      </SEntranceButtonWrapper>
      <SEmpty />

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        <SScrollButtonWrapper className={isHovered ? "showButtons" : ""}>
          <span
            className="btn1"
            onClick={() => scrollToPage(0)}
            style={{ marginRight: "1rem" }}
          >
            최신순
          </span>

          <span
            className="btn2"
            onClick={() => scrollToPage(1)}
            style={{ marginRight: "1rem" }}
          >
            HOT
          </span>

          <span className="btn3" onClick={() => scrollToPage(2)}>
            많이 본
          </span>
        </SScrollButtonWrapper>
        <SScrollCircle isHovered={isHovered}>→</SScrollCircle>
      </div>

      {/* 검색 */}
      <SearchShorts shortsByAll={shortsByAll} />

      {/* 쇼츠 영역 */}
      <SShortsWrapper>
        <InfiniteScroll
          style={{ flexDirection: "column" }}
          pageStart={0}
          dataLength={pageIndex + 1} // 이 부분이 무한 스크롤이 가지고 있는 아이템의 길이
          next={fetchMoreData} // 바닥에 도달하면 실행되는 콜백 함수
          hasMore={pageIndex < shortsArr.length - 1} // 아래로 더 스크롤할 내용이 있는지 여부를 판단
          loader={<h4>Loading...</h4>} // 로딩 중일 때 렌더링되는 컴포넌트
        >
          {shortsArr.slice(0, pageIndex + 1)}
        </InfiniteScroll>
      </SShortsWrapper>
      <CheckTime />

      <GetAllMyChallenge />
      <GetCompleteMyChallenge />
      <GetOnGoingMyChallenge />
      <GetPlannedMyChallenge />
    </>
  );
};
export default MainPage;
