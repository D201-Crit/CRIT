import {
  SFollowButton,
  SAccessDenied,
  SShortsArea,
  SProfileWrapper,
  SProfileModifyModal,
  SProfileModifyModalArea,
  ModalText,
  ModalButtonContainer,
  ModalButton,
  ShortsGrid,
  Empty,
  Row,
  Col,
  OpacityZero,
  SProfileImg,
  SProfileImgCover,
  FeedGrid,
} from "../styles/pages/SProfilePage";
import { SEmpty, SEmpty2 } from "../styles/SCommon";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AnotherProfileFeed from "../component/profile/AnotherProfileFeed";
import AnotherProfileShorts from "../component/profile/AnotherProfileShorts";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import CheckTime from "./../component/challenge/CheckTime";
const API_BASE_URL = "https://i9d201.p.ssafy.io/api/";

const AnotherProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users);
  const myNickname = user.nickname;
  const { nickname } = useParams();
  const [profileImage, setProfileImage] = useState(null);
  const [profileInfo, setProfileInfo] = useState({});
  const [myFollowings, setMyFollowings] = useState(null);

  const [userId, setUserId] = useState("");
  const followersCount = profileInfo.followers
    ? profileInfo.followers.length
    : 0;
  const followingCount = profileInfo.followings
    ? profileInfo.followings.length
    : 0;

  // 프로필 정보 가져오기
  useEffect(() => {
    if (myNickname === nickname) {
      navigate("/profilepage"); // 본인의 프로필일 경우, '/profilepage'로 이동
    } else {
      getAnotherProfile(nickname);
      getMyProfile();
    }
  }, []); // 빈 의존성 배열을 사용하여 초기 렌더링 시에만 실행

  // 내 프로필 가져오기
  const getMyProfile = async () => {
    api
      .get(`${API_BASE_URL}/myProfile`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const followingsList = res.data.data.followings;
        setMyFollowings(followingsList);
      })
      .catch((error) => {
        console.log("내 프로필 가져오기 에러 (another-profile-page)", error);
      });
  };

  // 남 프로필 가져오기
  const getAnotherProfile = async (nickname) => {
    api
      .get(`${API_BASE_URL}user/profile/${nickname}`, {})
      .then((res) => {
        setProfileInfo(res.data.data);
        setUserId(res.data.data.id);
        setProfileImage({ url: res.data.data.imageUrl, file: null });
      })
      .catch((error) => {
        console.log("남의 프로필 가져오기 에러 (another-profile-page)", error);
      });
  };

  const followUser = async () => {
    api
      .post(
        `${API_BASE_URL}follow`,
        {
          followingId: nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        getAnotherProfile();
      });
  };

  const unfollowUser = async () => {
    api
      .post(
        `${API_BASE_URL}unfollow`,
        {
          followingId: nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        getAnotherProfile();
      });
  };

  // 팔로잉한 유저인가 판단하는 함수
  const isFollowing = () => {
    return (
      myFollowings && myFollowings.some((following) => following === nickname)
    );
  };

  if (myNickname === nickname) {
    return (
      <SAccessDenied>
        <h2>본인의 프로필은 조회할 수 없습니다.</h2>
      </SAccessDenied>
    );
  }

  return (
    <>
      <SProfileWrapper>
        <SEmpty2 />

        {/* <Row>
        <FontAwesomeIcon style={{marginLeft:"600px" }} icon={faCog} />
      </Row> */}
        <Row>
          <SProfileImgCover>
            <SProfileImg>
              <img
                className="profileImage"
                src={(profileImage && profileImage.url) || profileInfo.imageUrl}
                // alt="이미지 수정"
              />
            </SProfileImg>
          </SProfileImgCover>

          <Row>
            <Row>
              <h2
                style={{ margin: "4px", fontWeight: "200", color: "#33FF00" }}
              >
                {profileInfo.grade}
              </h2>
            </Row>
            <Row>
              <h1 style={{ margin: "1px" }}>{profileInfo.nickname}</h1>
            </Row>
          </Row>
        </Row>
        <SEmpty2 />

        <Row>
          <Col />
          <Col />

          <Col>
            <a style={{ color: "grey" }} className="follower">
              팔로워
            </a>
            <a style={{ margin: "10px", fontSize: "24px", fontWeight: "1000" }}>
              {followersCount}
            </a>
          </Col>
          <Col>
            <a style={{ color: "grey" }} className="following">
              팔로잉
            </a>
            <a style={{ margin: "10px", fontSize: "24px", fontWeight: "1000" }}>
              {followingCount}
            </a>
          </Col>
          <Col />
          <Col />
        </Row>
        <Row>
          {isFollowing() ? (
            <SFollowButton onClick={unfollowUser}>언팔로우</SFollowButton>
          ) : (
            <SFollowButton onClick={followUser}>팔로우</SFollowButton>
          )}
        </Row>
        <Empty />
        <SEmpty2 />
        {/* 이후 추가될 쇼츠 영역 */}
        <SEmpty />
        <ShortsGrid>
          <SShortsArea>
            <AnotherProfileShorts />
          </SShortsArea>
        </ShortsGrid>
        {/* 이후 추가될 피드 영역 */}
        <FeedGrid>
          <AnotherProfileFeed userId={userId} />
        </FeedGrid>
      </SProfileWrapper>
      <CheckTime />
    </>
  );
};
export default AnotherProfilePage;
