
import { SFeedButton, SShortsArea, SProfileWrapper, ShortsGrid, Empty, Row, Col, OpacityZero, SProfileImg, SProfileImgCover, FeedGrid } from "../styles/pages/SProfilePage";
import { useState, useRef, useEffect } from "react";
import CreateShortsModal from '../component/shorts/CreateShortsModal';
import ProfileShorts from "../component/profile/ProfileShorts";
import Feed from "../component/profile/ProfileFeed";
import { useSelector } from "react-redux";
import { api } from '../api/api';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/';

const ProfilePage = () => {
  const user = useSelector((state) => state.users);
  const [profileImage, setProfileImage] = useState(null);
  const [profileInfo, setProfileInfo] = useState({});
  const profileImgFileInput = useRef(null);
  const [shortsCreateModal, setShortsCreateModal] = useState(false);
  const followersCount = profileInfo.followers ? profileInfo.followers.length : 0;
  const followingCount = profileInfo.followings ? profileInfo.followings.length : 0;

  // 프로필 정보 가져오기
  useEffect(() => {
    getProfile();
  }, []); // 빈 의존성 배열을 사용하여 초기 렌더링 시에만 실행

  // 프로필 이미지 변경 처리
  const profileChange = (e) => {
    const imageList = e.target.files;
    if (imageList.length > 0) {
      const imageObj = { url: URL.createObjectURL(imageList[0]), file: imageList[0] };
      setProfileImage(imageObj);
    } else {
      setProfileImage(null);
    }
  };

  // 프로필 업로드 취소
  const cancelProfileUpload = () => {
    profileImgFileInput.current.value = "";
  };

  // 프로필 이미지 가져오기
  const getProfile = async () => {
    api.get(`${API_BASE_URL}/myProfile`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        console.log("프로필 정보", res);
        setProfileInfo(res.data.data);
        setProfileImage({ url: res.data.data.imageUrl, file: null });
      })
      .catch((error) => {
        console.log("에러받아오냐?", error);
      });
  };

  // 프로필 이미지 업데이트
  const updateImage = (e) => {
    e.preventDefault();
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
      <SProfileWrapper>
        <Row>
          <SProfileImgCover>
            <SProfileImg>
              <img
                className="profileImage"
                src={(profileImage && profileImage.url) || profileInfo.imageUrl}
                alt="이미지 수정"
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
            <h2>{profileInfo.grade}</h2>
            </Row>
            <Row> 
            <h1>{profileInfo.nickname}</h1>
            </Row>
            <a className="follower">팔로워</a><a>{followersCount}</a>
            <a className="follower">팔로잉</a><a>{followingCount}</a>
          </Row>

          <button onClick={updateImage}>이미지 업로드</button>
        </Row>
        <Empty />
        {/* 이후 추가될 쇼츠 영역 */}
        <ShortsGrid>
        <SFeedButton onClick={() => { setShortsCreateModal(true) }}>쇼츠 만들기</SFeedButton>

        <SShortsArea>
        {shortsCreateModal && (
          <CreateShortsModal setShortsCreateModal={setShortsCreateModal} />
        )}
        <ProfileShorts/>
        </SShortsArea>
        </ShortsGrid>
        {/* 이후 추가될 피드 영역 */}
        <FeedGrid>
          <Feed />
        </FeedGrid>
      </SProfileWrapper>
    </>
  );
};
export default ProfilePage;
