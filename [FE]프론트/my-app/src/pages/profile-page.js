import { SProfileWrapper, Empty, Row, Col, OpacityZero, SProfileImg, SProfileImgCover, FeedGrid } from "../styles/pages/SProfilePage";
import { useState, useRef, useEffect } from "react";
import CreateShortsModal from '../component/shorts/CreateShortsModal';
import Feed from "../component/profile/ProfileFeed";
import { useSelector } from "react-redux";
import { api } from '../api/api';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/auth';
const ProfilePage = () => {
  // const user_image = {
  //   profile_image: "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018",
  //   profileImg: "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018",
  // };

  const user = useSelector((state) => state.users);
  console.log(user)
  const [profileImage, setProfileImage] = useState(user.profile_image);
  const [profileFiles, setProfileFiles] = useState(null);
  const profileImgFileInput = useRef(null);
  const [shortsCreateModal,setShortsCreateModal] = useState(false);

  useEffect(() => {
    getProfile();
  }, []); // 빈 의존성 배열을 사용하여 초기 렌더링 시에만 실행

  
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


  const getProfile = async () => {
    api.get(`${API_BASE_URL}/user/profile/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      // setProfileImage(res.data.data.content);
      console.log("받아오냐?",res);

    })
    .catch((error) => {
      console.log("에러받아오냐?",error)
    })
  };


  const updateImage = (e) => { // async 키워드를 추가하여 함수를 비동기로 변경합니다.
    e.preventDefault();
  
    const formData = new FormData();
    // 여기에서 이미지 객체가 단일 파일이기 때문에 수정이 필요합니다.
    // if (profileImage.length === 0) {
    //   formData.append("file", new Blob([], { type: "application/json" }));
    // } else {
    //   profileImage.forEach((imageObj) => {
    //     formData.append("file", imageObj.file);
    //   });
    // }

    // 수정된 이미지 파일 처리를 추가합니다.
    if (profileFiles) {
      formData.append("file", profileFiles);
    } else {
      formData.append("file", new Blob([], { type: "application/json"}));
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
          {/* 기존 onClick이벤트 추가하실 때 잊지마세요 */}
          <button onClick={updateImage}>이미지 업로드</button>
        </Row>
        <Empty/>
        
        {/* 이후 추가될 쇼츠 영역 */}
        <button onClick={()=>{setShortsCreateModal(true)}}>쇼츠 만들기</button>
        {shortsCreateModal && (
        <CreateShortsModal setShortsCreateModal={setShortsCreateModal}/>)}

        {/* 이후 추가될 피드 영역 */}
        <FeedGrid>
          <Feed />
        </FeedGrid>
      </SProfileWrapper>
    </>
  );
};

export default ProfilePage;
