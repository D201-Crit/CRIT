import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { SBoardWriteWrapper } from "../../../styles/pages/SDeatilChallengePage";
const UpdateBoard = ({ classification }) => {
  const user = useSelector((state) => state.users);
  const [image, setImage] = useState(null);
  const [board, setBoard] = useState({
    title: "",
    content: "",
    writer: user.id,
    classification: classification,
  });

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const onChangeTitle = (e) => {
    const newTitle = e.target.value;
    setBoard((prevBoard) => ({ ...prevBoard, title: newTitle }));
  };

  const onChangeContent = (e) => {
    const newContent = e.target.value;
    setBoard((prevBoard) => ({ ...prevBoard, content: newContent }));
  };
  // console.log(board);
  const writeBoard = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image.length === 0) {
      formData.append("file", new Blob([], { type: "application/json" }));
    } else {
      formData.append("file", image);
    }

    formData.append("file", image);

    formData.append(
      "boardSaveRequestDto",
      new Blob([JSON.stringify(board)], { type: "application/json" }),
    );
    api
      .post(`http://i9d201.p.ssafy.io/api/boards/write`, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setBoard({
          title: "",
          content: "",
          writer: user.id,
          classification: classification,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log("게시글 작성실패", err);
      });
  };

  return (
    <SBoardWriteWrapper>
      <button>수정</button>
      <form onSubmit={writeBoard}>
        <input
          name="title"
          type="text"
          value={board.title}
          onChange={onChangeTitle}
        ></input>
        <input
          name="content"
          type="textarea"
          value={board.content}
          onChange={onChangeContent}
        ></input>
        <input type="file" onChange={onChangeImage} />
        <input type="submit" value={"작성완료"}></input>
      </form>
    </SBoardWriteWrapper>
  );
};

export default UpdateBoard;
