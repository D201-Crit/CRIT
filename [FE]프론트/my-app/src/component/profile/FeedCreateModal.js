import React, { useState } from "react";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import { SCreateModal,SAriticleForm, SImageContainer, SFileInput, SPreviewImage, SFileInputLabel  } from '../../styles/pages/SCommunityPage';
import { Divider } from '@material-ui/core';
import { ModalOverlay } from '../../styles/SCommon';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const FeedCreateModal = ({ setIsCreateModalOpen, getFeeds }) => {
  const user = useSelector((state) => state.users);
  const [feedContent, setFeedContent] = useState({
    content: "",
    classification: "Feeds",     
    userName: user.id, 
  });

  const [feedImage, setFeedImage] = useState([]);

  // 이미지 첨부 처리
  const onFeedImage = (e) => {
    const imageList = e.target.files;
    let imageObjList = [];
  
    for (let i = 0; i < imageList.length; i++) {
      const imageUrl = URL.createObjectURL(imageList[i]);
      imageObjList.push({ url: imageUrl, file: imageList[i] });
    }
  
    setFeedImage(imageObjList);
  };
  



  const feedCreate = (e) => {
    e.preventDefault();

    if (feedContent.content.trim() === "" || feedImage.length === 0) {
      alert("제목과 내용을 모두 작성해주세요.");}
    const formData = new FormData();
  
    // // 이미지가 없을 경우 빈 배열을 전달하려면 다음과 같이 작성하십시오.
    // if (feedImage.length === 0) {
    //   formData.append("file", new Blob([], { type: "application/json" }));
    // } else {
      feedImage.forEach((imageObj) => {
        formData.append("file", imageObj.file);
      });
    
  
    formData.append(
      "fileResponseDto",
      new Blob([JSON.stringify(feedContent)], { type: "application/json" })
    );
    
    api
      .post(`${API_BASE_URL}/create`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("게시글 작성성공");

        getFeeds();
        console.log("겟피드");

        setIsCreateModalOpen(false);
        setFeedContent("");
        setFeedImage(null);
        
      })
      .catch(() => {
        console.log("게시글 작성실패");
      });
  };

  const handleFeedChange = (event) => {
    const { name, value } = event.target;
    setFeedContent({
      ...feedContent,
      [name]: value,
    });
  };

  const handleOutsideClick = (e) => {
    if (e.target.getAttribute('data-cy') === "modal-overlay") {
      setIsCreateModalOpen(false);
    }
  };


    return (
      <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">
        <SCreateModal>
        <h1>피드 작성</h1>
        <hr/>

        <div className="FeedCreateModal">
        <SAriticleForm onSubmit={feedCreate}>
        <input
          name="title"
          placeholder="제목을 입력하세요."
          type="text"
          value=""
          onChange={handleFeedChange}
        ></input>
        <textarea
            name="content"
            value=""
            onChange={handleFeedChange}
          ></textarea>


          <SFileInputLabel htmlFor="fileInput">
            이미지 첨부
          <SFileInput id="fileInput" type="file" multiple onChange={onFeedImage} />
          </SFileInputLabel>


          <div>
          <SImageContainer>
          {feedImage.map((imageObj, index) => (
            <SPreviewImage
              key={index}
              src={imageObj.url}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: "100px", maxHeight: "px", margin: "5px" }}
            />
          ))}
          </SImageContainer>

          </div>

          <input type="submit" value={"작성완료"}></input>
        </SAriticleForm>
        </div>
        </SCreateModal>
          </ModalOverlay>

    );
  };


export default FeedCreateModal;
