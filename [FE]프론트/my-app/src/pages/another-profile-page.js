import { SFeedButton, SShortsArea, SProfileWrapper, SProfileModifyModal, SProfileModifyModalArea, ModalText, ModalButtonContainer, ModalButton, ShortsGrid, Empty, Row, Col, OpacityZero, SProfileImg, SProfileImgCover, FeedGrid } from "../styles/pages/SProfilePage";
import { SEmpty, SEmpty2 } from '../styles/SCommon';
import { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';
import AnotherProfileFeed from '../component/profile/AnotherProfileFeed';
import AnotherProfileShorts from "../component/profile/AnotherProfileShorts";
import { useSelector } from "react-redux";
import { api } from '../api/api';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/';

const AnotherProfilePage = () => {
  const user = useSelector((state) => state.users);
  const { nickname } = useParams();
  const [profileImage, setProfileImage] = useState(null);
  const [profileInfo, setProfileInfo] = useState({});
  const [userId, setUserId] = useState("")
  const followersCount = profileInfo.followers ? profileInfo.followers.length : 0;
  const followingCount = profileInfo.followings ? profileInfo.followings.length : 0;

  // 프로필 정보 가져오기
  useEffect(() => {
    getAnotherProfile(nickname);
  }, []); // 빈 의존성 배열을 사용하여 초기 렌더링 시에만 실행

  // 남 프로필 가져오기
  const getAnotherProfile = async (nickname) => {
    api.get(`${API_BASE_URL}user/profile/${nickname}`, {
    })
      .then((res) => {
        console.log("프로필 정보", res);
        setProfileInfo(res.data.data);
        setUserId(res.data.data.id);
        setProfileImage({ url: res.data.data.imageUrl, file: null });
        console.log("ddd",userId)

      })
      .catch((error) => {
        console.log("에러받아오냐?", error);
      });
  };

  
  return (
    <>
      <SProfileWrapper>
      <SEmpty2/>

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
            <h2 style={{margin:"4px", fontWeight:"200", color:"#33FF00"}}>{profileInfo.grade}</h2>
            </Row>
            <Row> 
            <h1 style={{margin:"1px"}}>{profileInfo.nickname}</h1>
            </Row>
          </Row>

        </Row>
        <SEmpty2/>

        <Row>
        <Col/>
        <Col/>

        
        <Col>
        <a style={{color:"grey"}} className="follower">팔로워</a><a style={{margin:"10px" ,fontSize: "24px", fontWeight: "1000"}}>{followersCount}</a>

        </Col>
        <Col>
        <a style={{color:"grey"}} className="following">팔로잉</a><a style={{margin:"10px" ,fontSize: "24px", fontWeight: "1000"}}>{followingCount}</a>
        </Col>
        <Col/>
        <Col/>

        </Row>

        <Empty />
        <SEmpty2/>
        {/* 이후 추가될 쇼츠 영역 */}
        <SEmpty/>
        <ShortsGrid>
        <SShortsArea>
  
        <AnotherProfileShorts/>
        </SShortsArea>
        </ShortsGrid>
        {/* 이후 추가될 피드 영역 */}
        <FeedGrid>
          <AnotherProfileFeed userId={userId} />
        </FeedGrid>
      </SProfileWrapper>
    </>
  );
};
export default AnotherProfilePage;
