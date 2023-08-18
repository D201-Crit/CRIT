import {
  Empty,
  SisNotExist,
  SDetailFeedModal,
  SFeedArea,
  SFeedBox,
  SPost,
} from "../../styles/pages/SProfilePage";
import FeedDetailModal from "./FeedDetailModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
const API_BASE_URL = "https://i9d201.p.ssafy.io/api/feeds";

const AnotherProfileFeed = ({ userId }) => {
  const { nickname } = useParams();

  const user = useSelector((state) => state.users);
  // 피드 아이디 설정
  const [feedId, setFeedId] = useState(null);

  // 초기 게시물 상태 설정
  const [feeds, setFeeds] = useState([]);

  // 작성 모달 상태 설정
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      getFeeds();
    }
  }, [userId]); // 의존성 배열에 userId를 추가합니다.

  // 피드 불러오기

  const getFeeds = async () => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/whole?Nickname=${nickname}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const allFeeds = response.data.data.content;
      // console.log("전체 피드: ", allFeeds);
      // console.log("현재 사용자 ID: ", userId);

      const filteredFeeds = allFeeds.filter((feed) => feed.userName === userId);

      setFeeds(filteredFeeds);
      // console.log("필터링된 피드: ", feeds.length);
    } catch (error) {
      console.error("피드 에러: ", error);
    }
  };

  return (
    <div>
      {feeds.length === 0 ? (
        <SisNotExist>등록된 피드가 없습니다</SisNotExist>
      ) : (
        <SFeedArea>
          <div className="feed-container">
            <Empty />

            {/* 게시물 리스트 */}

            <SFeedBox>
              {feeds.map((feed) => (
                <SPost key={feed.id}>
                  {/* 일반 게시물 */}
                  <img
                    src={feed.imageFiles}
                    className="post-image"
                    onClick={() => {
                      setIsDetailModalOpen(true);
                      setFeedId(feed.id);
                    }}
                  />
                </SPost>
              ))}
            </SFeedBox>
          </div>
        </SFeedArea>
      )}

      <div>
        {/* FeedDetailModal */}
        {isDetailModalOpen && (
          <SDetailFeedModal>
            <FeedDetailModal
              getFeeds={getFeeds}
              setIsDetailModalOpen={setIsDetailModalOpen}
              feedId={feedId}
            />
          </SDetailFeedModal>
        )}
      </div>
    </div>
  );
};
export default AnotherProfileFeed;
