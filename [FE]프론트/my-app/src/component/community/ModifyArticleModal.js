import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";

const API_BASE_URL = "http://localhost:8080/boards";

const ModifyArticleModal = ({ classification, setIsEditOpen, prevArticles, fetchArticles }) => {
  const initialImages = prevArticles.imageFiles.map((image) => ({ url: image, file: null }));
  const user = useSelector((state) => state.users);
  const [images, setImages] = useState(initialImages);
  const [article, setArticle] = useState(prevArticles);

  const onArticleImage = (e) => {
    const imageList = e.target.files;
    let imageObjList = [];
  
    for (let i = 0; i < imageList.length; i++) {
      const imageUrl = URL.createObjectURL(imageList[i]);
      imageObjList.push({ url: imageUrl, file: imageList[i]});
    }
  
    setImages(imageObjList);
  };
  

  const writeArticle = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // 이미지가 없을 경우 빈 배열을 전달하려면 다음과 같이 작성하십시오.
    if (images.length === 0) {
      formData.append("file", new Blob([], { type: "application/json" }));
    } else {
      images.forEach((imageObj) => {
        formData.append("file", imageObj.file);
      });
    }

    formData.append('boardDto', new Blob([JSON.stringify(article)], { type: 'application/json' }))
    console.log(formData)
    api
      .patch(`${API_BASE_URL}/update/${article.id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setIsEditOpen(false);
        fetchArticles();
        
      })
      .catch((err)=>{
        console.log(err)
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
        {images.map((imageObj, index) => (
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
  );
};

export default ModifyArticleModal;
