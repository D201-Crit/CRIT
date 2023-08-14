import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import {
  SBoardInput,
  SBoardWriteWrapper,
  SBoardImage,
  SLabelImage,
  SBoardSubmit,
} from "../../../styles/pages/SDeatilChallengePage";
import Swal from "sweetalert2";

const CreateBoard = ({ classification, getBoard }) => {
  const user = useSelector((state) => state.users);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [board, setBoard] = useState({
    // title: "",
    content: "",
    writer: user.id,
    classification: classification,
  });

  const fileInputRef = useRef(null); // input 태그에 ref 추가

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onChangeContent = (e) => {
    const newContent = e.target.value;
    setBoard((prevBoard) => ({ ...prevBoard, content: newContent }));
  };

  const writeBoard = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image || formData.append("file", ""));
    formData.append(
      "boardSaveRequestDto",
      new Blob([JSON.stringify(board)], { type: "application/json" })
    );

    api
      .post(`https://i9d201.p.ssafy.io/api/boards/write`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setBoard({
          title: "",
          content: "",
          writer: user.id,
          classification: classification,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "작성 완료!",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          // width: "500px",
          // 먼지
          // imageUrl: 'https://unsplash.it/400/200',
          // imageWidth: 400,
          // imageHeight: 200,
          // imageAlt: 'Custom image',
        });
        getBoard();
      })
      .catch((err) => {
        console.log("게시글 작성실패", err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "작성 실패...!",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          // width: "500px",
          // 먼지
          // imageUrl: 'https://unsplash.it/400/200',
          // imageWidth: 400,
          // imageHeight: 200,
          // imageAlt: 'Custom image',
        });
      });
  };

  // 레이블 클릭 시 input 태그 클릭 이벤트 발생
  const handleLabelClick = () => {
    fileInputRef.current.click();
  };

  return (
    <SBoardWriteWrapper>
      <form onSubmit={writeBoard}>
        <SBoardInput
          name="content"
          type="textarea"
          placeholder="오늘의 한마디를 남겨주세요"
          value={board.content}
          onChange={onChangeContent}
        ></SBoardInput>
        {/* {previewImage && <img src={previewImage} alt="미리보기" />} */}
        <SLabelImage onClick={handleLabelClick}>
          <img
            src="https://github.com/Jinga02/ChallengePJT/assets/110621233/6eae105c-1d90-4136-93c3-1df5f1c74ac8"
            alt="이미지 선택"
          />
        </SLabelImage>
        <SBoardImage
          id="img"
          type="file"
          ref={fileInputRef}
          onChange={onChangeImage}
        />
        {/* <SBoardSubmit
          id="submit"
          type="submit"
          value={"작성완료"}
        ></SBoardSubmit> */}
      </form>
    </SBoardWriteWrapper>
  );
};

export default CreateBoard;
