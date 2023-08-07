import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import {
  SBoardWriteWrapper,
  SUpdateBoardButton,
} from "../../../styles/pages/SDeatilChallengePage";
const UpdateBoard = ({ boardId, classification }) => {
  const user = useSelector((state) => state.users);
  const [image, setImage] = useState(null);
  const [updateCheck, setUpdateCheck] = useState(false);
  const [board, setBoard] = useState({
    title: "",
    content: "",
    writer: user.id,
    classification: classification,
  });
  const onClickUpdate = () => {
    setUpdateCheck(!updateCheck);
  };
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onChangeContent = (e) => {
    const newContent = e.target.value;
    setBoard((prevBoard) => ({ ...prevBoard, content: newContent }));
  };
  const updateBoard = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "file",
      image ||
        formData.append("file", new Blob([], { type: "application/json" }))
    );
    formData.append(
      "boardSaveRequestDto",
      new Blob([JSON.stringify(board)], { type: "application/json" })
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
        }
      )
      .then((res) => {
        setBoard({
          title: "",
          content: "",
          writer: user.id,
          classification: classification,
        });
      })
      .catch((err) => {
        console.log("게시글 작성실패", err);
      });
  };

  return (
    <SBoardWriteWrapper>
      <SUpdateBoardButton></SUpdateBoardButton>
      <SUpdateBoardButton onClick={onClickUpdate}>수정</SUpdateBoardButton>
      {updateCheck === true ? (
        <form onSubmit={updateBoard}>
          <input
            name="content"
            type="textarea"
            value={board.content}
            onChange={onChangeContent}
          ></input>
          <input type="file" onChange={onChangeImage} />
          <input type="submit" value={"작성완료"}></input>
        </form>
      ) : null}
    </SBoardWriteWrapper>
  );
};

export default UpdateBoard;
