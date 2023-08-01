import {
  SButtonWrapper,
  SCloseButton,
  SCompleteButton,
  SCreateChallengeModalWrapper,
  SInfoChallenge,
} from "../../styles/pages/SChallengePage";
import { api } from "../../api/api";
import "react-calendar/dist/Calendar.css"; // css import
import ChallengeAuthentication from "./createChallenge/ChallengeAuthentication";
import ChallengeCalendar from "./createChallenge/ChallengeCalendar";
import ChallengeMember from "./createChallenge/ChallengeMember";
import ChallengeTime from "./createChallenge/ChallengeTime";
import SelectChallenge from "./createChallenge/SelectChallenge";
import IntroduceChallenge from "./createChallenge/IntroduceChallenge";
import TitleChallenge from "./createChallenge/TitleChallenge";
import { useState } from "react";
import ChallengeMoney from "./createChallenge/ChallengeMoney";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ChallengeImage from "./createChallenge/ChallengeImage";

const CreateChallengeModal = ({ closeModal }) => {
  const user = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    title: "",
    introduce: "",
    select: "",
    authentication: "",
    member: "",
    money: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });

  const onChangeTitle = (title) => {
    setFormData((prevData) => ({ ...prevData, title }));
  };
  const onChangeIntroduce = (introduce) => {
    setFormData((prevData) => ({ ...prevData, introduce }));
  };
  const onChangeSelectChallenge = (select) => {
    setFormData((prevData) => ({ ...prevData, select }));
  };
  const onChangeAuthentication = (authentication) => {
    setFormData((prevData) => ({ ...prevData, authentication }));
  };
  const onChangeMember = (member) => {
    setFormData((prevData) => ({ ...prevData, member }));
  };
  const onChangeTime = (startTime, endTime) => {
    setFormData((prevData) => ({ ...prevData, startTime, endTime }));
  };
  const onChangeDate = (startDate, endDate) => {
    setFormData((prevData) => ({ ...prevData, startDate, endDate }));
  };
  const onChangeMoney = (money) => {
    setFormData((prevData) => ({ ...prevData, money }));
  };

  const createChallenge = () => {
    // 참여비(money)가 3000, 5000, 7000, 10000이 아닌 경우 챌린지 생성하지 않음
    if (![3000, 5000, 7000, 10000].includes(formData.money)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "참여비를 설정해주세요.",
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
      });
      return;
    }
    api
      .post("http://localhost:8080/challenge/create", formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        closeModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "챌린지 생성 완료!",
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
      .catch((error) => {
        console.error("챌린지 생성 에러:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "챌린지 생성 실패..!",
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
    <SCreateChallengeModalWrapper>
      <TitleChallenge onChangeTitle={onChangeTitle} />
      {/* <ChallengeImage /> */}
      <SInfoChallenge>
        <IntroduceChallenge onChangeIntroduce={onChangeIntroduce} />
        <SelectChallenge onChangeSelectChallenge={onChangeSelectChallenge} />
        <ChallengeTime onChangeTime={onChangeTime} />
        <ChallengeAuthentication
          onChangeAuthentication={onChangeAuthentication}
        />
        <ChallengeMember onChangeMember={onChangeMember} />
        <ChallengeCalendar onChangeDate={onChangeDate} />
        <ChallengeMoney onChangeMoney={onChangeMoney} />
      </SInfoChallenge>
      <SButtonWrapper>
        <SCompleteButton onClick={createChallenge}>생성완료</SCompleteButton>
        <SCloseButton onClick={closeModal}>나가기</SCloseButton>
      </SButtonWrapper>
    </SCreateChallengeModalWrapper>
  );
};

export default CreateChallengeModal;
