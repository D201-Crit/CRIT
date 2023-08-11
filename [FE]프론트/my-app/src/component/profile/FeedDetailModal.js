import React, { useState } from "react";
import "./FeedDetailModal.css";

const FeedDetailModal = ({
  
  setIsDetailModalOpen,
  getFeeds
}) => {
  const [editingContent, setEditingContent] = useState(getFeeds.content);
  const [editingImage, setEditingImage] = useState(getFeeds.imageUrl);

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsDetailModalOpen(null);
    }
  };

  return (
    <div onClick={handleOutsideClick} className="modal-overlay">
      <div className="FeedDetailModal">
        <input
          type="text"
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
        />
  
      </div>
    </div>
  );
};

export default FeedDetailModal;
