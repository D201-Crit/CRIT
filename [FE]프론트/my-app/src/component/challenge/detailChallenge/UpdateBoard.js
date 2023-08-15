import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import {
  SUpdateForm,
  SUpdateBoardButton,
} from "../../../styles/pages/SDeatilChallengePage";
import Swal from "sweetalert2";
const UpdateBoard = ({ boardId, classification, getBoard }) => {
  const user = useSelector((state) => state.users);
  const [image, setImage] = useState(null);
  const [updateCheck, setUpdateCheck] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [board, setBoard] = useState({
    title: " ",
    content: " ",
    writer: user.id,
    classification: classification,
  });
  const onClickUpdate = () => {
    setUpdateCheck(!updateCheck);
  };
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
    setBoard((prevBoard) => ({ content: newContent }));
  };

  const updateBoard = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "file",
      image ||
        formData.append("file", new Blob([], { type: "application/json" })),
    );
    formData.append(
      "boardDto",
      new Blob([JSON.stringify(board)], { type: "application/json" }),
    );
    api
      .patch(
        `https://i9d201.p.ssafy.io/api/boards/update/${boardId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => {
        setBoard({
          title: "",
          content: "",
          writer: user.id,
          classification: classification,
        });
        setUpdateCheck(!updateCheck);
        getBoard();
      })
      .catch((err) => {
        console.log("게시글 업데이트 작성실패", err);
      });
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      title: "게시글을 수정하시겠습니까?",
      text: "수정된 게시글은 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      background: "#272727",
      color: "white",
      preConfirm: () => {
        return new Promise((resolve) => {
          resolve(); // 확인을 누르면 Promise를 해결합니다.
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateBoard(e); // 이벤트 객체를 전달합니다.
      }
    });
  };

  const fileInputRef = useRef(null); // input 태그에 ref 추가

  const handleLabelClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      {updateCheck ? (
        <SUpdateBoardButton onClick={onClickUpdate}>취소</SUpdateBoardButton>
      ) : (
        <SUpdateBoardButton onClick={onClickUpdate}>수정</SUpdateBoardButton>
      )}

      {updateCheck === true ? (
        <SUpdateForm id="update" onSubmit={onSubmitUpdate}>
          <input
            id="content"
            type="textarea"
            value={board.content}
            onChange={onChangeContent}
          />
          {/* <img
            id="updateImage"
            onClick={handleLabelClick}
            src="https://github.com/Jinga02/ChallengePJT/assets/110621233/6eae105c-1d90-4136-93c3-1df5f1c74ac8"
            alt="이미지 선택"
          />

          <SBoardImage
            id="img"
            type="file"
            ref={fileInputRef}
            onChange={onChangeImage}
          /> */}
        </SUpdateForm>
      ) : null}
    </>
  );
};

export default UpdateBoard;
