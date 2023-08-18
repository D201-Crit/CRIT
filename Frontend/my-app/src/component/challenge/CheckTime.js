import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const CheckTime = () => {
  const challenges = useSelector((state) => state.myChallenges);
  const navigate = useNavigate();
  const [hasAlertShown, setHasAlertShown] = useState(false);
  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };
  // 날짜 형식
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}${day}`;
  };
  useEffect(() => {
    const checkChallengeEndTimeInterval = setInterval(() => {
      const now = new Date();
      const currentTime = `${formatNumber(now.getHours())}:${formatNumber(
        now.getMinutes()
      )}`;

      challenges.forEach((challenge) => {
        if (
          !hasAlertShown &&
          challenge.startTime === currentTime &&
          formatDate(challenge.startDate) <= formatDate(now) &&
          formatDate(now) <= formatDate(challenge.endDate)
        ) {
          setHasAlertShown(true);
          showChallengeStartModal(challenge);
        }
      });
    }, 1000); // 1초마다 체크

    return () => {
      clearInterval(checkChallengeEndTimeInterval);
    };
  }, [challenges, hasAlertShown]);

  const showChallengeStartModal = (challenge) => {
    const detail = () => {
      navigate(`/ChallengePage/${challenge.id}`, {
        state: { challenge },
      });
    };
    Swal.fire({
      position: "center",
      icon: "warning",
      html: `
        <h1>${challenge.name} 챌린지</h1>
        <h1>챌린지 시작시간이에요!</h1>
      `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: "#0000c5",
      cancelButtonColor: "#ff007a",
      background: "#272727",
      color: "white",
      preConfirm: () => {
        return detail();
      },
      color: "white",
      width: "500px",
    });
  };

  return null;
};

export default CheckTime;
