import React, { useState, useEffect } from "react";
import { ModalOverlay } from '../../styles/SCommon';
import { SButtonWrapper2, SSecondaryButton3, SPrimaryButton3,  SPost, SDetailFeedModal, SDetailFeedModalArea } from "../../styles/pages/SProfilePage";
import { SDividerLine } from "../../styles/pages/SMainPage";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import FeedModifyModal from "./FeedModifyModal";
import Loading from "../Loading";

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const FeedDetailModal = ({
  feedId,
  setIsDetailModalOpen,
  getFeeds
}) => {
  const [showModifyModal, setModifyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.users);
  const [editingContent, setEditingContent] = useState('');
  const [editingImage, setEditingImage] = useState('');
  const [feed, setFeed] = useState([]);
  const { nickname } = useParams();

// 단일 피드 불러오기
const getFeed = () => {
  setLoading(true);
  api.get(`${API_BASE_URL}/${feedId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then((res) => {
      setLoading(false);
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



//게시글 삭제
const deleteFeed = async (feedId) => {
  api.delete(`${API_BASE_URL}/delete/${feedId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  })
  .then((res) => {
    console.log('피드 삭제 성공');
    getFeeds();
    setIsDetailModalOpen(null);
  })

  .catch ((error) => {
    console.log('피드 삭제 실패');
  })
};

  const handleOutsideClick = (e) => {
    if (e.target.getAttribute('data-cy') === "modal-overlay") {
      setIsDetailModalOpen(null);
    }
  };


  
return (
  <div>
  {loading ? <Loading /> : null}
  {showModifyModal ? (
        <FeedModifyModal getFeed={getFeed} setModifyModal={setModifyModal} prevfeed={feed} feedId={feedId} />
      ) : (
  <SDetailFeedModal>
      <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">

    <SDetailFeedModalArea>
    <div className="FeedDetailModal">
      <h1>피드</h1>
      <img src={feed.imageFiles} alt="피드 이미지"></img>
      
      <p style={{color:"#1877f2" , fontSize:"15px", display:"flex" ,justifyContent:"center"}}>{feed.createTime}</p>
      <SDividerLine/>
      <p>{feed.content}</p>
      <SButtonWrapper2>
      {!nickname && (
        <>
          <SSecondaryButton3 onClick={() => { setModifyModal(true) }}>피드 수정</SSecondaryButton3>
          <SPrimaryButton3 onClick={() => { deleteFeed(feed.id) }}>피드 삭제</SPrimaryButton3>
        </>
      )}
    </SButtonWrapper2>


    </div>

    
    </SDetailFeedModalArea>
    </ModalOverlay>
    
  </SDetailFeedModal>
      )}
  </div>
  );
}
export default FeedDetailModal;



// <input
// type="text"
// value={editingContent}
// onChange={(e) => setEditingContent(e.target.value)}
// />





