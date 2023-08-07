import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/shorts';
// const API_SHORTS_CREATE_URL = "http://localhost:8080/shorts";

const CreateShortsModal = ({setShortsCreateModal}) => {
  const user = useSelector((state) => state.users);
  const [shorts, setShorts] = useState({
    title: "",
    content: "",
    hashTagNames: [],
  });
  const [video, setVideo] = useState(null);

  const onVideoChange = (e) => {
    const videoFile = e.target.files[0];
    setVideo(videoFile);
  };

  const createShorts = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("file", video);
  
    const shortsDto = {
      title: shorts.title,
      content: shorts.content,
      hashTagNames: shorts.hashTagNames,
    };
  
    formData.append(
      "shortsDto", new Blob([JSON.stringify(shortsDto)], { type: "application/json" })
      );

    api.post(`${API_BASE_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    
    .then(() => {
      setShortsCreateModal(false);
    })
    .catch(() => {
      console.log("쇼츠 작성 실패");
    });
  };
  

  const handleShortsChange = (event) => {
    const { name, value } = event.target;
    if (name === "hashTagNames") {
      const tags = value.split(",");
      setShorts({
        ...shorts,
        [name]: tags,
      });
    } else {
      setShorts({
        ...shorts,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <h1>쇼츠 만들기</h1>
      <form onSubmit={createShorts}>
        <input
          name="title"
          type="text"
          value={shorts.title}
          onChange={handleShortsChange}
          placeholder="쇼츠 제목"
        ></input>
        <input
          name="content"
          type="textarea"
          value={shorts.content}
          onChange={handleShortsChange}
          placeholder="쇼츠 내용"
        ></input>
        <input
          name="hashTagNames"
          type="text"
          onChange={handleShortsChange}
          placeholder="해시태그 (예: hashtag1,hashtag2,hashtag3)"
        ></input>
        <input type="file" onChange={onVideoChange} />
        <input type="submit" value="작성완료"></input>
      </form>
    </div>
  );
};

export default CreateShortsModal;
