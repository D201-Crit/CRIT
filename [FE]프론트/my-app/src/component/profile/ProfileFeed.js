import React, { useState } from "react";
import {SFeedButton,Empty, SFeedArea, SFeedBox, SPost} from "../../styles/pages/SProfilePage";
import FeedCreateModal from "./FeedCreateModal";
import FeedModifyModal from "./FeedModifyModal";

const Feed = () => {
  // 초기 게시물 상태 설정
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018",
      content: "첫 번째 게시물입니다.",
    },
    {
      id: 2,
      imageUrl: "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018",
      content: "두 번째 게시입니다.",
    },
  ]);

  // 수정중인 게시물 아이디 상태 설정
  const [editingPostId, setEditingPostId] = useState(null);

  // 작성 모달 상태 설정
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 새 게시물 추가 함수
  const addPost = (content, imageFile) => {
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: imageFile || "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018",
      content,
    };
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
  };

  // 게시물 수정 함수
  const updatePost = (postId, newContent, newImage) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, content: newContent, imageUrl: newImage || post.imageUrl }
        : post
    );
    setPosts(updatedPosts);
  };

  // 게시물 삭제 함수
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

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
          <FeedCreateModal addPost={addPost} setIsCreateModalOpen={setIsCreateModalOpen} />
        )}
  
        {/* 게시물 리스트 */}
        
        <SFeedBox>
        {posts.map((post) => (
          <SPost key={post.id}>
            {/* 일반 게시물 */}
            <img
              src={post.imageUrl}
              alt="피드 이미지"
              className="post-image"
              onClick={() => setEditingPostId(post.id)}
            />
  
            {editingPostId === post.id && (
              // FeedModifyModal
              <div className="modify-modal-container">
                <FeedModifyModal
                  post={post}
                  updatePost={updatePost}
                  deletePost={deletePost}
                  setEditingPostId={setEditingPostId}
                />
              </div>
            )}
          </SPost>
        ))}
        </SFeedBox>
      </div>
    </SFeedArea>
  );
  
};

export default Feed;
