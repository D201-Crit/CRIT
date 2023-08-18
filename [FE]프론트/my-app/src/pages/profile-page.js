import {
  SFeedButton,
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
import MyFollowingList from "../component/profile/MyFollowingList";
import MyFollowerList from "../component/profile/MyFollowerList";
import CreateShortsModal from "../component/shorts/CreateShortsModal";
import ProfileShorts from "../component/profile/ProfileShorts";
import Feed from "../component/profile/ProfileFeed";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import CheckTime from "./../component/challenge/CheckTime";

const API_BASE_URL = "https://i9d201.p.ssafy.io/api/";
const ProfilePage = () => {
  const user = useSelector((state) => state.users);
  const [profileImage, setProfileImage] = useState(null);
  const [profileInfo, setProfileInfo] = useState({});
  const profileImgFileInput = useRef(null);
  const [myFollowingList, setMyFollowingList] = useState(null);
  const [myFollowerList, setMyFollowerList] = useState(null);
  const [shortsCreateModal, setShortsCreateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [followingListModal, setFollowingListModal] = useState(false);
  const [followerListModal, setFollowerListModal] = useState(false);

  const followersCount = profileInfo.followers
    ? profileInfo.followers.length
    : 0;
  const followingCount = profileInfo.followings
    ? profileInfo.followings.length
    : 0;
  const point = profileInfo.cashPoint ? profileInfo.cashPoint : 0;
  const exp = profileInfo.exp ? profileInfo.exp : 0;

  // 프로필 정보 가져오기
  useEffect(() => {
    getProfile();
  }, []); // 빈 의존성 배열을 사용하여 초기 렌더링 시에만 실행

  useEffect(() => {
    getMyFollowingList();
    getMyFollowerList();
  }, []);

  useEffect(() => {
    if (myFollowingList !== null) {
      // console.log("내 팔로잉 리스트", myFollowingList);
    }
  }, [myFollowingList]);

  useEffect(() => {
    if (myFollowerList !== null) {
      // console.log("내 팔로워 리스트", myFollowerList);
    }
  }, [myFollowerList]);

  // 프로필 이미지 변경 처리
  const profileChange = (e) => {
    const imageList = e.target.files;

    if (imageList.length > 0) {
      const imageObj = {
        url: URL.createObjectURL(imageList[0]),
        file: imageList[0],
      };
      setProfileImage(imageObj);
      setShowConfirmModal(true); // 여기에 이 코드를 추가해주세요.
    } else {
      setProfileImage(null);
      setShowConfirmModal(false);
    }
  };

  // 내 팔로잉 목록 불러오기
  const getMyFollowingList = async () => {
    api
      .get(
        `${API_BASE_URL}/myfollowing/user
    `,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        const followingsList = res.data.data;
        setMyFollowingList(followingsList);
      })
      .catch((error) => {
        console.log("getMyFollowingList 에러 (profile-page)", error);
      });
  };

  // 내 팔로워 목록 불러오기
  const getMyFollowerList = async () => {
    api
      .get(
        `${API_BASE_URL}/myfollower/user
    `,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        const followerList = res.data.data;
        setMyFollowerList(followerList);
      })
      .catch((error) => {
        console.log("getMyFollowerList 에러 (profile-page)", error);
      });
  };

  const handleConfirm = () => {
    updateImage();
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    cancelProfileUpload();
    setShowConfirmModal(false);
    window.location.reload();
  };

  // 프로필 업로드 취소
  const cancelProfileUpload = () => {
    profileImgFileInput.current.value = "";
  };

  // 프로필 이미지 가져오기
  const getProfile = async () => {
    api
      .get(`${API_BASE_URL}/myProfile`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setProfileInfo(res.data.data);
        setProfileImage({ url: res.data.data.imageUrl, file: null });
      })
      .catch((error) => {
        console.log("에러받아오냐?", error);
      });
  };

  // 프로필 이미지 업데이트
  const updateImage = () => {
    // e.preventDefault();
    const formData = new FormData();
    if (!profileImage) {
      formData.append("file", new Blob([], { type: "application/json" }));
    } else {
      formData.append("file", profileImage.file);
    }
    api
      .put(`${API_BASE_URL}/image`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        getProfile();
      })
      .catch(() => {
        console.log("프로필 업데이트 실패");
      });
  };

  return (
    <>
      <SProfileModifyModal show={showConfirmModal}>
        <SProfileModifyModalArea>
          <ModalText>프로필 변경 하시겠습니까?</ModalText>
          <ModalButtonContainer>
            <ModalButton variant="confirm" onClick={handleConfirm}>
              예
            </ModalButton>
            <ModalButton variant="cancel" onClick={handleCancel}>
              아니오
            </ModalButton>
          </ModalButtonContainer>
        </SProfileModifyModalArea>
      </SProfileModifyModal>

      {followingListModal && (
        <MyFollowingList
          setFollowingListModal={setFollowingListModal}
          myFollowingList={myFollowingList}
        />
      )}

      {followerListModal && (
        <MyFollowerList
          setFollowerListModal={setFollowerListModal}
          myFollowerList={myFollowerList}
        />
      )}
      <SProfileWrapper>
        <SEmpty2 />
        <Row>
          <SProfileImgCover>
            <SProfileImg>
              <img
                className="profileImage"
                src={(profileImage && profileImage.url) || profileInfo.imageUrl}
                // alt="이미지 수정"
                onClick={() => {
                  profileImgFileInput.current.click();
                }}
              />
            </SProfileImg>
          </SProfileImgCover>
          <OpacityZero>
            <input
              className="fileUploader2"
              type="file"
              accept="image/*"
              onChange={profileChange}
              onClick={cancelProfileUpload}
              ref={profileImgFileInput}
              name="profile_img"
            />
          </OpacityZero>

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
              포인트
            </a>
            <a style={{ margin: "10px", fontSize: "24px", fontWeight: "1000" }}>
              {point}
            </a>
          </Col>
          <Col>
            <a style={{ color: "grey" }} className="follower">
              경험치
            </a>
            <a style={{ margin: "10px", fontSize: "24px", fontWeight: "1000" }}>
              {exp}
            </a>
          </Col>
          <Col>
            <a style={{ color: "grey" }} className="follower">
              팔로워
            </a>
            <a
              style={{ margin: "10px", fontSize: "24px", fontWeight: "1000" }}
              onClick={() => {
                setFollowerListModal(true);
              }}
            >
              {followersCount}
            </a>
          </Col>
          <Col style={{ cursor: "pointer" }}>
            <a style={{ color: "grey" }} className="following">
              팔로잉
            </a>
            <a
              style={{ margin: "10px", fontSize: "24px", fontWeight: "1000" }}
              onClick={() => {
                setFollowingListModal(true);
              }}
            >
              {followingCount}
            </a>
          </Col>
          <Col />
          <Col />
        </Row>

        <Empty />
        <SEmpty2 />
        {/* 이후 추가될 쇼츠 영역 */}
        <SFeedButton
          onClick={() => {
            setShortsCreateModal(true);
          }}
        >
          숏챌 만들기
        </SFeedButton>
        <SEmpty />
        <ShortsGrid>
          <SShortsArea>
            {shortsCreateModal && (
              <CreateShortsModal setShortsCreateModal={setShortsCreateModal} />
            )}
            <ProfileShorts />
          </SShortsArea>
        </ShortsGrid>

        {/* 이후 추가될 피드 영역 */}
        <FeedGrid>
          <Feed />
        </FeedGrid>
      </SProfileWrapper>
      <CheckTime />
    </>
  );
};
export default ProfilePage;
