import { useSelector } from "react-redux";
import { api } from "../../api/api";
import Swal from "sweetalert2";

const JoinChallenge = ({ challenge }) => {
  const user = useSelector((state) => state.users);
  console.log(challenge);
  console.log(user);
  const checkEntrance = () => {
    return Swal.fire({
      position: "center",
      html: `<div>
      <h1>챌린지에 참여하시겠습니까?</h1>
      <h3>참여한 챌린지는 취소하실 수 없습니다.</h3>
      <h3>참여비 : ${challenge.money}포인트</h3>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      background: "#272727",
      color: "white",
      preConfirm: () => {
        return entranceChallenge();
      },
      // width: "500px",
      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
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
        },
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
          // width: "500px",
          // 먼지
          // imageUrl: 'https://unsplash.it/400/200',
          // imageWidth: 400,
          // imageHeight: 200,
          // imageAlt: 'Custom image',
        });
      })
      .catch((err) => {
        console.log(err);
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
            // width: "500px",
            // 먼지
            // imageUrl: 'https://unsplash.it/400/200',
            // imageWidth: 400,
            // imageHeight: 200,
            // imageAlt: 'Custom image',
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
