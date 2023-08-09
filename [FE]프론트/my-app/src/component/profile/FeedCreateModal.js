import React, { useState } from "react";
import "./FeedCreateModal.css";
import { api } from '../../api/api';
import { useSelector } from "react-redux";

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const FeedCreateModal = ({ setIsCreateModalOpen }) => {
  const user = useSelector((state) => state.users);
  const [feedContent, setFeedContent] = useState({
    content: "",
    userName: user.nickname,
    classification: "Feeds",     
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
  

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsCreateModalOpen(false);
    }
  };


  const feedCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // 이미지가 없을 경우 빈 배열을 전달하려면 다음과 같이 작성하십시오.
    if (feedImage.length === 0) {
      formData.append("file", new Blob([], { type: "application/json" }));
    } else {
      feedImage.forEach((imageObj) => {
        formData.append("file", imageObj.file);
      });
    }
  
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



    return (
      <div onClick={handleOutsideClick} className="modal-overlay">
        <div className="FeedCreateModal">
        <form onSubmit={feedCreate}>
          <input
            name="content"
            type="textarea"
            value={feedImage.content}
            onChange={handleFeedChange}
          ></input>
          <input type="file" multiple onChange={onFeedImage} />
          {/* 선택된 이미지 불러오기 */}
          {feedImage.map((imageObj, index) => (
            <img
              key={index}
              src={imageObj.url}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: "100px", maxHeight: "px", margin: "5px" }}
            />
          ))}
          <input type="submit" value={"작성완료"}></input>
        </form>
        </div>
      </div>   
    );
  };




  


export default FeedCreateModal;
