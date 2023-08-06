import { useSelector } from "react-redux";
import { api } from "../../../api/api";
import { SDeleteBoardButton } from "../../../styles/pages/SDeatilChallengePage";
import Swal from "sweetalert2";

const DeleteBoard = ({ boardId, getBoard }) => {
  const user = useSelector((state) => state.users);
  const deleteBoard = () => {
    api
      .delete(`https://i9d201.p.ssafy.io/api/boards/delete/${boardId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "삭제 완료!",
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
        console.log(err);
      });
  };
  return <SDeleteBoardButton onClick={deleteBoard}>X</SDeleteBoardButton>;
};

export default DeleteBoard;
