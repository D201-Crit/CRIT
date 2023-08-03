import React, { useState } from "react";
import "./FeedModifyModal.css";

const FeedModifyModal = ({
  post,
  updatePost,
  deletePost,
  setEditingPostId,
}) => {
  const [editingContent, setEditingContent] = useState(post.content);
  const [editingImage, setEditingImage] = useState(post.imageUrl);

  const handleImageChange = (e) => {
    setEditingImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditSubmit = (postId) => {
    updatePost(postId, editingContent, editingImage);
    setEditingPostId(null);
  };

  const handleDeleteSubmit = (postId) => {
    deletePost(postId);
    setEditingPostId(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setEditingPostId(null);
    }
  };

  return (
    <div onClick={handleOutsideClick} className="modal-overlay">
      <div className="FeedModifyModal">
        <input
          type="text"
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={() => handleEditSubmit(post.id)}>완료</button>
        <button onClick={() => handleDeleteSubmit(post.id)}>삭제</button>
        <button onClick={() => setEditingPostId(null)}>취소</button>
      </div>
    </div>
  );
};

export default FeedModifyModal;
