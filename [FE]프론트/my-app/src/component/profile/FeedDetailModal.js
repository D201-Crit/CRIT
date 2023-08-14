import React, { useState, useEffect } from "react";
import "./FeedDetailModal.css";
import { SPost } from "../../styles/pages/SProfilePage";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const FeedDetailModal = ({
  feedId,
  setIsDetailModalOpen,
}) => {
  const user = useSelector((state) => state.users);
  const [editingContent, setEditingContent] = useState('');
  const [editingImage, setEditingImage] = useState('');
  const [feed, setFeed] = useState([]);

  // 단일 피드 불러오기
  const getFeed = () => {
    api.get(`${API_BASE_URL}/${feedId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        setFeed(res.data.data);
        setEditingContent(res.data.data.content);
        setEditingImage(res.data.data.imageUrl);
        console.log("피드받아오냐?", res);
      })
      .catch((error) => {
        console.log("피드에러받아오냐?", error)
      })
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsDetailModalOpen(null);
    }
  };

  return (
    <div onClick={handleOutsideClick} className="modal-overlay">
      <div className="FeedDetailModal">
        <h1>{feed.content}</h1>
        <SPost><img src={feed.imageFiles}></img></SPost>
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
