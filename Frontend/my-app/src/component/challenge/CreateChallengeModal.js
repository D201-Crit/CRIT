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
    member: 3,
    money: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });
  const [image, setImage] = useState(null);

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
    setImage(imageFile); // 이미지 상태 업데이트
  };
  const showValidationError = (icon, title, text) => {
    Swal.fire({
      position: "center",
      icon,
      title,
      text,
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
    });
  };
  // 챌린지 생성
  const checkCreate = () => {
    Swal.fire({
      position: "center",
      title: "챌린지를 생성하시겠습니까?",
      text: "생성된 챌린지는 취소하실 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: "#0000c5",
      cancelButtonColor: "#ff007a",
      background: "#272727",
      color: "white",
      preConfirm: () => {
        return createChallenge();
      },
    });
  };
  const createChallenge = () => {
    const validationData = [
      {
        icon: "error",
        condition: !requestDto.title,
        message: "제목을 입력해주세요.",
      },
      {
        icon: "error",
        condition: !requestDto.introduce,
        message: "소개글을 입력해주세요.",
      },
      {
        icon: "error",
        condition: !requestDto.select,
        message: "챌린지 종류를 선택해주세요.",
      },
      {
        icon: "error",
        condition: !requestDto.authentication,
        message: "인증수단을 선택해주세요.",
      },
      {
        icon: "error",
        condition: !requestDto.startTime || !requestDto.endTime,
        message: "챌린지 시간을 선택해주세요.",
      },
      {
        icon: "error",
        condition: !requestDto.member,
        message: "인원수를 설정해주세요.",
      },
      {
        icon: "error",
        condition: !image,
        message: "챌린지 썸네일을 업로드해주세요.",
      },
      {
        icon: "error",
        condition: !requestDto.startDate || !requestDto.endDate,
        message: "챌린지 기간을 설정해주세요.",
      },
      {
        icon: "error",
        condition: ![3000, 5000, 7000, 10000].includes(requestDto.money),
        message: "참여비를 설정해주세요.",
      },
    ];
    for (const { icon, condition, message } of validationData) {
      if (condition) {
        showValidationError(icon, message, "CRIT");
        return;
      }
    }
    const formData = new FormData();
    formData.append("file", image); // 이미지 파일 첨부
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(requestDto)], { type: "application/json" }),
    ); // requestDto를 JSON 형식으로 추가

    api
      .post("https://i9d201.p.ssafy.io/api/challenge/create", formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": `multipart/form-data`,
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
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("챌린지 생성 에러:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          html: `
            <h1>기존 챌린지 시간과 중복되는 시간입니다.
            }</h1>
          `,
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
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
        <SCompleteButton onClick={checkCreate}>생성하기</SCompleteButton>
        <SCloseButton onClick={closeModal}>나가기</SCloseButton>
      </SButtonWrapper>
    </SCreateChallengeModalWrapper>
  );
};

export default CreateChallengeModal;
