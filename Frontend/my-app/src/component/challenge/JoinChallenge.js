import { useSelector } from "react-redux";
import { api } from "../../api/api";
import Swal from "sweetalert2";

const JoinChallenge = ({ challenge, setCheckUser }) => {
  const user = useSelector((state) => state.users);
  const checkEntrance = () => {
    return Swal.fire({
      position: "center",
      html: `<div>
      <h1>챌린지에<br> 참여하시겠습니까?</h1>
      <h3>참여한 챌린지는 취소하실 수 없습니다.</h3>
      <h3>참여비 : ${challenge.money}포인트</h3>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: "#0000c5",
      cancelButtonColor: "#ff007a",
      background: "#272727",
      color: "white",
      borderRadius: "30px",
      preConfirm: () => {
        return entranceChallenge();
      },
    });
  };
  const entranceChallenge = () => {
    api
      .post(
        `https://i9d201.p.ssafy.io/api/challenge/join/${challenge.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "챌린지 참여 완료!",
          text: "CRIT",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
        });
        setCheckUser(true);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.errorMessage ===
          "기존에 참여중인 챌린지와 중복되는 스케줄입니다."
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.response.data.errorMessage,
            text: "CRIT",
            showConfirmButton: false,
            timer: 1500,
            background: "#272727",
            color: "white",
          });
        }
        if (err.response.data.errorMessage === "포인트가 부족합니다.") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.response.data.errorMessage,
            text: "CRIT",
            showConfirmButton: false,
            timer: 1500,
            background: "#272727",
            color: "white",
          });
        }
      });
  };

  return (
    <button id="join" onClick={() => checkEntrance()}>
      참여하기
    </button>
  );
};

export default JoinChallenge;
