import {SFeedButton,Empty, SFeedArea, SFeedBox, SPost} from "../../styles/pages/SProfilePage";
import FeedCreateModal from "./FeedCreateModal";
import FeedDetailModal from "./FeedDetailModal";
import { useSelector } from "react-redux";
import React, { useState, useEffect  } from "react";
import { api } from '../../api/api';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const Feed = () => {
  const user = useSelector((state) => state.users);
  
  // 초기 게시물 상태 설정
  const [feeds, setFeeds] = useState([]);

  
  // 작성 모달 상태 설정
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // 작성 모달 상태 설정
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 피드 불러오기
  const getFeeds = () => { 
      api.get(`${API_BASE_URL}/whole`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      setFeeds(res.data.data.content);
      console.log("피드받아오냐?",res);

    })
    .catch((error) => {
      console.log("피드에러받아오냐?",error)
    })
  };

  useEffect(() => {
    getFeeds();
  }, []); 

  return (
    <SFeedArea>
      <div className="feed-container">
        {/* 작성 모달 버튼 */}
        <SFeedButton onClick={() => setIsCreateModalOpen(true)}>
        게시글 작성
        </SFeedButton>
        <Empty/>
  
        {/* FeedCreateModal */}
        {isCreateModalOpen && (
          <FeedCreateModal setIsCreateModalOpen={setIsCreateModalOpen} getFeeds={getFeeds} />
        )}
  
        {/* 게시물 리스트 */}
        
        <SFeedBox>
        {feeds.map((feed) => (
          <SPost key={feed.id}>
            {/* 일반 게시물 */}
            <img
              src={feed.imageFiles}
              alt="피드 이미지"
              className="post-image"
              onClick={() => setIsDetailModalOpen(true)}
            />
  
            
          </SPost>
        ))}
        </SFeedBox>

         {/* FeedDetailModal */}
          {isDetailModalOpen && (
          <FeedDetailModal setIsDetailModalOpen={setIsDetailModalOpen} getFeeds={getFeeds} />
        )}
  
      </div>
    </SFeedArea>
  );
  
};

export default Feed;
