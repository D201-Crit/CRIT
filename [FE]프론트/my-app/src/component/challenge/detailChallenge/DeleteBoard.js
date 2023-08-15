import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { SDeleteBoardButton } from "../../../styles/pages/SDeatilChallengePage";
import Swal from "sweetalert2";

const DeleteBoard = ({ boardId, getBoard }) => {
  const user = useSelector((state) => state.users);
  const onClickDelete = () => {
    Swal.fire({
      position: "center",
      title: "게시글을 삭제하시겠습니까?",
      text: "삭제된 게시글은 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      background: "#272727",
      color: "white",
      preConfirm: () => {
        return deleteBoard();
      },
      // width: "500px",
      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
    });
  };
  const deleteBoard = () => {
    api
      .delete(`https://i9d201.p.ssafy.io/api/boards/delete/${boardId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        getBoard();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <SDeleteBoardButton onClick={onClickDelete}>삭제</SDeleteBoardButton>;
};

export default DeleteBoard;
