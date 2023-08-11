import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";

const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/boards';
// const API_BASE_URL = 'http://localhost:8080/boards';


const ModifyArticleModal = ({ classification, setIsEditOpen, prevArticles, fetchArticles }) => {
  const initialImages = prevArticles.imageFiles.map((image, index) => ({
    url: image,
    file: null,
    fileId: prevArticles.fileId[index]
  }));
  const user = useSelector((state) => state.users);
  const [images, setImages] = useState(initialImages);
  const [article, setArticle] = useState(prevArticles);


  const onArticleImage = (e) => {
    const imageList = e.target.files;
    let imageObjList = [...images];
    
    for (let i = 0; i < imageList.length; i++) {
      const imageUrl = URL.createObjectURL(imageList[i]);
      imageObjList.push({ url: imageUrl, file: imageList[i] });
    }
  
    setImages(imageObjList);
  };

  const removeImage = (fileId, e) => {
    console.log("파일아이디 테스트", fileId);
    api
      .post(`${API_BASE_URL}/deleteImageOne/${article.id}/${fileId}`, {
        headers: {
          Authorization: `Bearer ${user .accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(fileId);
        setImages(images.filter((image) => image.fileId !== fileId));
      })
      .catch((err)=>{
        console.log(err);
      });
  };
  

  const writeArticle = (e) => {
    e.preventDefault();
    if (article.title.trim() === "" || article.content.trim() === "") {
      alert("제목과 내용을 모두 작성해주세요.");
      return;
      }
    const formData = new FormData();

    images.forEach((imageObj) => {
      if (imageObj.file) {
        formData.append("file", imageObj.file);
        console.log(imageObj.file)
      } else {
        formData.append("file", imageObj.url);
      }
    });

    formData.append('boardDto', new Blob([JSON.stringify(article)], { type: 'application/json' }))
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
        <input type="file" multiple onChange={onArticleImage}/>
        {/* 선택된 이미지 불러오기 */}
        {images.map((imageObj, index) => (
          <div key={index} style={{ display: "inline-block", position: "relative" }}>
            <img
              src={imageObj.url}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: "100px", maxHeight: "px", margin: "5px" }}
            />
            <button
              type="button"
              onClick={() => removeImage(imageObj.fileId)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                textAlign: "center",
                lineHeight: "18px",
                color: "white",
                fontSize: "12px",
              }}
            >
            
            </button>
          </div>
        ))}
        <input type="submit" value={"작성완료"}></input>
      </form>
    </div>
  );
};
export default ModifyArticleModal;

