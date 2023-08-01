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

  const [requestDto, setRequestDto] = useState({
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
  const [image, setImage] = useState([]);

  const onChangeTitle = (title) => {
    setRequestDto((prevData) => ({ ...prevData, title }));
  };
  const onChangeIntroduce = (introduce) => {
    setRequestDto((prevData) => ({ ...prevData, introduce }));
  };
  const onChangeSelectChallenge = (select) => {
    setRequestDto((prevData) => ({ ...prevData, select }));
  };
  const onChangeAuthentication = (authentication) => {
    setRequestDto((prevData) => ({ ...prevData, authentication }));
  };
  const onChangeMember = (member) => {
    setRequestDto((prevData) => ({ ...prevData, member }));
  };
  const onChangeTime = (startTime, endTime) => {
    setRequestDto((prevData) => ({ ...prevData, startTime, endTime }));
  };
  const onChangeDate = (startDate, endDate) => {
    setRequestDto((prevData) => ({ ...prevData, startDate, endDate }));
  };
  const onChangeMoney = (money) => {
    setRequestDto((prevData) => ({ ...prevData, money }));
  };
  const onChangeImage = (imageFile) => {
    setRequestDto((prevData) => ({ ...prevData, image: imageFile }));
  };
  const createChallenge = () => {
    console.log(requestDto.image);
    // 참여비(money)가 3000, 5000, 7000, 10000이 아닌 경우 챌린지 생성하지 않음
    if (![3000, 5000, 7000, 10000].includes(requestDto.money)) {
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
    const formData = new FormData();
    formData.append("file", image[0]); // 이미지 파일 첨부
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(requestDto)], { type: "application/json" })
    ); // 나머지 데이터를 JSON 형태로 첨부

    api
      .post("http://localhost:8080/challenge/create", formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": `multipart/form-data`,
          // Note: Content-Type will be set automatically to multipart/form-data by the browser
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
      <ChallengeImage onChangeImage={onChangeImage} />
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
