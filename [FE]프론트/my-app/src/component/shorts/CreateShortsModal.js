import { ModalOverlay } from "../../styles/SCommon";
import {
  SCreateModal,
  SAriticleForm,
  SFileInputLabel,
  SFileInput,
} from "../../styles/pages/SCommunityPage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import ShortsLoading from "../ShortsLoading";
const API_BASE_URL = "https://i9d201.p.ssafy.io/api/shorts";

const CreateShortsModal = ({ setShortsCreateModal }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    // 수정된 조건문
    if (
      shorts.content.trim() === "" ||
      shorts.title.trim() === "" ||
      video === null
    ) {
      alert("제목과 내용, 비디오를 모두 작성해주세요.");
      setLoading(false);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", video);

    const shortsDto = {
      title: shorts.title,
      content: shorts.content,
      hashTagNames: shorts.hashTagNames,
    };

    formData.append(
      "shortsDto",
      new Blob([JSON.stringify(shortsDto)], { type: "application/json" })
    );

    api
      .post(`${API_BASE_URL}`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },

        onUploadProgress: (progressEvent) => {
          // 진행 상황 계산 및 상태 업데이트
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      })
      .then(() => {
        setLoading(false);
        // console.log("쇼츠 작성 성공");
        setShortsCreateModal(false);
        window.location.reload();
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

  const handleOutsideClick = (e) => {
    if (e.target.getAttribute("data-cy") === "modal-overlay") {
      setShortsCreateModal(false);
    }
  };

  return (
    <div>
      {loading ? <ShortsLoading progress={progress} /> : null}
      <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">
        <SCreateModal>
          <h1>쇼츠 만들기</h1>
          <SAriticleForm onSubmit={createShorts}>
            <input
              name="title"
              type="text"
              value={shorts.title}
              onChange={handleShortsChange}
              placeholder="쇼츠 제목"
            ></input>
            <textarea
              name="content"
              value={shorts.content}
              onChange={handleShortsChange}
              placeholder="쇼츠 내용"
            ></textarea>
            <input
              name="hashTagNames"
              type="text"
              onChange={handleShortsChange}
              placeholder="해시태그 (예: hashtag1,hashtag2,hashtag3)"
            ></input>
            <SFileInputLabel htmlFor="fileInput">
              동영상 첨부
              <SFileInput
                id="fileInput"
                type="file"
                multiple
                onChange={onVideoChange}
              />
            </SFileInputLabel>

            <input
              style={{ marginLeft: "130px", marginTop: "15px" }}
              type="submit"
              value="작성완료"
            ></input>
          </SAriticleForm>
        </SCreateModal>
      </ModalOverlay>
    </div>
  );
};

export default CreateShortsModal;
