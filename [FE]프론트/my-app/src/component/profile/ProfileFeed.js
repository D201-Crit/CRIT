import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  SFeedButton2,
  Empty,
  SFeedButtonWrapper,
  SButtonWrapper2,
  SDetailFeedModal,
  SFeedArea,
  SFeedBox,
  SPost,
} from "../../styles/pages/SProfilePage";
import FeedCreateModal from "./FeedCreateModal";
import FeedDetailModal from "./FeedDetailModal";
import { api } from "../../api/api";
const API_BASE_URL = "https://i9d201.p.ssafy.io/api/feeds";

const Feed = () => {
  const user = useSelector((state) => state.users);

  // 피드 아이디 설정
  const [feedId, setFeedId] = useState(null);

  // 초기 게시물 상태 설정
  const [feeds, setFeeds] = useState([]);

  // 작성 모달 상태 설정
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 작성 모달 상태 설정
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 피드 불러오기
  const getFeeds = () => {
    api
      .get(`${API_BASE_URL}/whole`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setFeeds(res.data.data.content);
        // console.log("피드받아오냐?", res);
      })
      .catch((error) => {
        console.log("피드에러받아오냐?", error);
      });
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <div>
      <SFeedArea>
        <div className="feed-container">
          {/* 작성 모달 버튼 */}
          <SFeedButtonWrapper>
            <SFeedButton2 onClick={() => setIsCreateModalOpen(true)}>
              피드 작성
            </SFeedButton2>
          </SFeedButtonWrapper>
          <Empty />

          {/* FeedCreateModal */}
          {isCreateModalOpen && (
            <FeedCreateModal
              setIsCreateModalOpen={setIsCreateModalOpen}
              feeds={feeds}
              getFeeds={getFeeds}
            />
          )}

          {/* 게시물 리스트 */}
          <div>
            {feeds.length === 0 ? (
              <h2 style={{ fontSize: "30px", color: "#343CF4" }}>
                등록된 피드가 없습니다
              </h2>
            ) : (
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
            )}
          </div>
        </div>
      </SFeedArea>

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

export default Feed;
