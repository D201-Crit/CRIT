import React, { useState } from "react";
import "./FeedCreateModal.css";

const FeedCreateModal = ({ addPost, setIsCreateModalOpen }) => {
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent === "") return;
    addPost(postContent, postImage);
    setPostContent("");
    setPostImage(null);
  };

  const handleFileChange = (e) => {
    setPostImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsCreateModalOpen(false);
    }
  };

  return (
    <div onClick={handleOutsideClick} className="modal-overlay">
      <div className="FeedCreateModal">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="글 작성..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">게시물 작성</button>
          <button type="button" onClick={() => setIsCreateModalOpen(false)}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedCreateModal;
