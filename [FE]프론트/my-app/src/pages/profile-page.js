import { SProfileWrapper, Empty, Row, Col, OpacityZero, SProfileImg, SProfileImgCover, FeedGrid } from "../styles/pages/SProfilePage";
import { useState, useRef } from "react";
import Feed from "../component/profile/ProfileFeed";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  // 더미 user 데이터
  const user_image = {
    profile_image: "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018",
    profileImg: "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018",
  };
  const user = useSelector((state) => state.users); // useSelector를 통해 userSlice의 상태를 가져옴
  // 프로필 이미지 상태 관리
  const [profileImage, setProfileImage] = useState(user_image.profile_image);
  // 프로필 이미지 파일 상태 관리
  const [profileFiles, setProfileFiles] = useState(null);
  // 프로필 이미지 input 참조
  const profileImgFileInput = useRef(null);
  
  // 프로필 이미지 변경 이벤트 핸들러
  const profileChange = (e) => {
    if (e.target.files[0]) {
      setProfileFiles(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const cancelProfileUpload = () => {
    profileImgFileInput.current.value = "";
  };

  return (
    <>
      <SProfileWrapper>
        {/* 프로필 사진 영역 */}
        <Row>
          <SProfileImgCover>
            <SProfileImg>
            <img
                className="profileImage"
                src={profileImage}
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
        </Row>
        {/* 이름 및 랭크 영역 */}
        <Row rawSpan={3}>
          <Col>
            <h2>그랜드 챌린저</h2>
            <h1>{user.nickname}</h1>
          </Col>
        </Row>
        <Empty/>
        {/* 챌린지, 팔로워, 팔로잉 영역 */}
        <Row>
          <Col>
            <h4>챌린지</h4>
            <h3 style={{marginTop: "-10px"}}>5</h3>
          </Col>
          <Col>
            <h4>팔로워</h4>
            <h3 style={{marginTop: "-10px"}}>16</h3>
          </Col>
          <Col>
            <h4>팔로잉</h4>
            <h3 style={{marginTop: "-10px"}}>9</h3>
          </Col>
        </Row>
        <Empty/>
        {/* 이후 추가될 쇼츠 영역 */}
        {/* 이후 추가될 피드 영역 */}
        <FeedGrid>
          <Feed />
        </FeedGrid>
      </SProfileWrapper>
    </>
  );
};

export default ProfilePage;
