import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";

const API_BASE_URL = "http://localhost:8080/boards";

const CreateArticleModal = ({ classification, setModal }) => {
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
    let imageUrlList = [];

    for (let i = 0; i < imageList.length; i++) {
      const imageUrl = URL.createObjectURL(imageList[i]);
      imageUrlList.push(imageUrl);
    }

    setImages(imageUrlList);
  };

  const writeArticle = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("writer", article.writer);
    formData.append("classification", classification);
    for (let i = 0; i < images.length; i++) {
      formData.append("multipartFiles", images[i]);
    }

    api
      .post(`${API_BASE_URL}/write`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() => {
        setModal(false);
      });
  };

  const handleArticleChange = (event) => {
    const { name, value } = event.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={writeArticle}>
        <input
          name="title"
          type="text"
          value={article.title}
          onChange={handleArticleChange}
        ></input>
        <input
          name="content"
          type="textarea"
          value={article.content}
          onChange={handleArticleChange}
        ></input>
        <input type="file" multiple onChange={onArticleImage} />
        {/* 선택된 이미지 불러오기 */}
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            style={{ maxWidth: "100px", maxHeight: "100px", margin: "5px" }}
          />
        ))}
        <input type="submit" value={"작성완료"}></input>
      </form>
    </div>
  );
};

export default CreateArticleModal;
