import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { ModalOverlay } from "../../styles/SCommon";
import {
  SCreateModal,
  SAriticleForm,
  SImageContainer,
  SFileInput,
  SPreviewImage,
  SFileInputLabel,
} from "../../styles/pages/SCommunityPage";
import Loading from "../Loading";

const API_BASE_URL = "https://i9d201.p.ssafy.io/api/boards";
// const API_BASE_URL = "http://localhost:8080/boards";

const CreateArticleModal = ({
  classification,
  setModal,
  fetchArticles,
  page,
}) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.users);
  const [images, setImages] = useState([]);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    writer: user.id,
    classification: classification,
  });

  const onArticleImage = (e) => {
    const imageList = e.target.files;
    let imageObjList = [...images]; // 기존 이미지 객체의 배열을 이어서 사용합니다.

    for (let i = 0; i < imageList.length; i++) {
      const imageUrl = URL.createObjectURL(imageList[i]);
      imageObjList.push({ url: imageUrl, file: imageList[i] });
    }

    setImages(imageObjList);
  };

  const writeArticle = (e) => {
    e.preventDefault();
    // 제목 및 내용의 유효성 검사
    if (article.title.trim() === "" || article.content.trim() === "") {
      alert("제목과 내용을 모두 작성해주세요.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    // 이미지가 없을 경우 빈 배열을 전달하려면 다음과 같이 작성하십시오.
    if (images.length === 0) {
      formData.append("file", "");
    } else {
      images.forEach((imageObj) => {
        formData.append("file", imageObj.file);
      });
    }

    formData.append(
      "boardSaveRequestDto",
      new Blob([JSON.stringify(article)], { type: "application/json" })
    );
    api
      .post(`${API_BASE_URL}/write`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setLoading(false);
        setModal(false);
        fetchArticles(page);
      })
      .catch(() => {
        setLoading(false);
        console.log("게시글 작성실패");
      });
  };

  const handleArticleChange = (event) => {
    const { name, value } = event.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };
  const handleOutsideClick = (e) => {
    if (e.target.getAttribute("data-cy") === "modal-overlay") {
      setModal(false);
    }
  };
  return (
    <div>
      {loading ? <Loading /> : null}

      <ModalOverlay onClick={handleOutsideClick} data-cy="modal-overlay">
        <SCreateModal>
          <h1>게시글 작성</h1>
          <hr></hr>
          <div>
            <SAriticleForm onSubmit={writeArticle}>
              <input
                name="title"
                placeholder="제목을 입력하세요."
                type="text"
                value={article.title}
                onChange={handleArticleChange}
              ></input>
              <textarea
                name="content"
                value={article.content}
                onChange={handleArticleChange}
              ></textarea>
              {/* 선택된 이미지 불러오기 */}
              <SFileInputLabel htmlFor="fileInput">
                이미지 첨부
                <SFileInput
                  id="fileInput"
                  type="file"
                  multiple
                  onChange={onArticleImage}
                />
              </SFileInputLabel>
              <div>
                <SImageContainer>
                  {images.map((imageObj, index) => (
                    <SPreviewImage
                      key={index}
                      src={imageObj.url}
                      alt={`Image ${index + 1}`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "px",
                        margin: "5px",
                      }}
                    />
                  ))}
                </SImageContainer>
              </div>

              <input type="submit" value={"작성완료"}></input>
            </SAriticleForm>
          </div>
        </SCreateModal>
      </ModalOverlay>
    </div>
  );
};

export default CreateArticleModal;
