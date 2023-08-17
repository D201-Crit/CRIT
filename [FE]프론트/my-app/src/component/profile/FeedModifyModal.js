import React, { useState, useEffect } from "react";
import { SButtonWrapper2, SSecondaryButton3, SPrimaryButton3, SPost, SDetailFeedModal, SDetailFeedModalArea } from "../../styles/pages/SProfilePage";
import { SInput2, SForm2 } from "../../styles/pages/SMainPage";
import { SDividerLine } from "../../styles/pages/SMainPage";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import { ModalOverlay } from '../../styles/SCommon';
import Loading from "../Loading";

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const FeedModifyModal = ({getFeed,setModifyModal,prevfeed,feedId}) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.users);
  const [editingContent, setEditingContent] = useState(prevfeed);
  

    // 단일 피드 불러오기

    useEffect(() => {
    }, []);

    const modifyShorts = (e) => {
      e.preventDefault();
      if(editingContent.content.trim() === ""){
        alert("내용을 작성해주세요.");
        return
      }
        setLoading(true);
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
      if (e.target.getAttribute('data-cy') === "modal-overlay") {
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
    <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">
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
    </ModalOverlay>
    
  </SDetailFeedModal>
  </div>
  );
}

export default FeedModifyModal;

