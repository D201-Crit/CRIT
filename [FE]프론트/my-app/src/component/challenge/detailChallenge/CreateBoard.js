import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import {
  SBoardInput,
  SBoardWriteWrapper,
  SSumbitButton,
} from "../../../styles/pages/SDeatilChallengePage";
import Swal from "sweetalert2";

const CreateBoard = ({ boards, classification, getBoard }) => {
  const user = useSelector((state) => state.users);
  const checkBoards = boards?.filter((board) => board.writer == user.nickname);
  console.log(checkBoards);
  const [board, setBoard] = useState({
    content: "",
    writer: user.id,
    classification: classification,
  });

  const onChangeContent = (e) => {
    const newContent = e.target.value;
    setBoard((prevBoard) => ({ ...prevBoard, content: newContent }));
  };
  const writeBoard = (e) => {
    e.preventDefault();
    if (checkBoards) {
      if (checkBoards.length > 0) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "이미 작성하셨습니다.!",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      } else {
        const formData = new FormData();
        formData.append(
          "boardSaveRequestDto",
          new Blob([JSON.stringify(board)], { type: "application/json" })
        );
        if (board.content === "") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "오늘의 한마디를 입력해주세요!",
            text: "CRIT",
            showConfirmButton: false,
            timer: 1500,
            background: "#272727",
            color: "white",
          });
        } else {
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
              });
            });
        }
      }
    } else {
      const formData = new FormData();
      formData.append(
        "boardSaveRequestDto",
        new Blob([JSON.stringify(board)], { type: "application/json" })
      );
      if (board.content === "") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "오늘의 한마디를 입력해주세요!",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
      } else {
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
            });
          });
      }
    }
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
        <SSumbitButton>작성</SSumbitButton>
      </form>
    </SBoardWriteWrapper>
  );
};

export default CreateBoard;
