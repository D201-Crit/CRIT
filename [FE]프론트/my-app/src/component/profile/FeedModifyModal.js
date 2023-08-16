import React, { useState, useEffect } from "react";
import { SButtonWrapper2, SSecondaryButton3, SPrimaryButton3, SPost, SDetailFeedModal, SDetailFeedModalArea } from "../../styles/pages/SProfilePage";
import { SInput2, SForm2 } from "../../styles/pages/SMainPage";
import { SDividerLine } from "../../styles/pages/SMainPage";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import Loading from "../Loading";

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const FeedModifyModal = ({getFeed,setModifyModal,prevfeed,feedId}) => {
  // const [showModifyModal, setModifyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.users);
  const [editingContent, setEditingContent] = useState(prevfeed);
  

    // 단일 피드 불러오기

    useEffect(() => {
    }, []);

    const modifyShorts = (e) => {
      e.preventDefault();
        api.put(`${API_BASE_URL}/update/${feedId}`,
        {
          content: editingContent.content,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then(() => {
          setModifyModal(false);
          getFeed();
        })
        .catch((err)=>{
          console.log(err)
        });
    };


  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setModifyModal(null);
    }
  };

  const handleFeedChange = (event) => {
    const { name, value } = event.target;
    setEditingContent({
      ...editingContent,
      [name]: value,
    });
  };


return (
  <div>
  {loading ? <Loading /> : null}
  
  <SDetailFeedModal>
    <div onClick={handleOutsideClick} className="modal-overlay">

    <SDetailFeedModalArea>
    <div className="FeedDetailModal">
      <h1>피드수정</h1>
      <img src={prevfeed.imageFiles} alt="피드 이미지"></img>
      <br/><br/>
      <SInput2
        name="content"
        type="text"
        value={editingContent.content}
        onChange={handleFeedChange}>
      </SInput2>
   
      <SButtonWrapper2>
      <SSecondaryButton3 onClick={(e) => modifyShorts(e)}>수정 완료</SSecondaryButton3>
      </SButtonWrapper2>

    </div>

    
    </SDetailFeedModalArea>
    </div>
    
  </SDetailFeedModal>
  </div>
  );
}

export default FeedModifyModal;

