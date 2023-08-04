import { useSelector } from "react-redux";
import { api } from "../../api/api";
import Swal from "sweetalert2";
import { SEnreanceButton } from "../../styles/pages/SDeatilChallengePage";

const JoinChallenge = ({ challenge }) => {
  const user = useSelector((state) => state.users);
  const entranceChallenge = () => {
    api
      .post(
        `http://i9d201.p.ssafy.io/api/challenge/join/${challenge.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
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
        Swal.fire({
          position: "center",
          icon: "error",
          title: "챌린지 참여 실패...",
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

  return (
    <SEnreanceButton id="enter" onClick={entranceChallenge}>
      참여하기
    </SEnreanceButton>
  );
};

export default JoinChallenge;
