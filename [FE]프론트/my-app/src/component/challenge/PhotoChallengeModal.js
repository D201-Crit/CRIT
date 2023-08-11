import { useState } from "react";
import { api } from "../../api/api";
import { SPhotochallengeWrapper } from "../../styles/pages/SChallengePage";
import Swal from "sweetalert2";

const PhotoChallengeModal = ({ challengeData, closePhotoModal }) => {
  const [image, setImage] = useState(null);
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  console.log(challengeData);
  const checkCreate = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      title: "챌린지인증을 하시겠습니까?",
      text: "인증된 챌린지는 취소하실 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      background: "#272727",
      color: "white",
      preConfirm: () => {
        return submitPhoto();
      },
      // width: "500px",
      // 먼지
      // imageUrl: 'https://unsplash.it/400/200',
      // imageWidth: 400,
      // imageHeight: 200,
      // imageAlt: 'Custom image',
    });
  };
  const submitPhoto = () => {
    const formData = new FormData();
    formData.append("file", image); // 이미지 파일 첨부
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(challengeData.challenge.id)], {
        type: "application/json",
      }),
    ); // requestDto를 JSON 형식으로 추가
    api
      .post("https://i9d201.p.ssafy.io/api/cert/img", formData, {
        headers: {
          Authorization: `Bearer ${challengeData.user.accessToken}`,
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "챌린지 인증 완료!",
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
      });
  };

  return (
    <SPhotochallengeWrapper>
      <button onClick={closePhotoModal}>나가기</button>
      <form onSubmit={checkCreate}>
        <input type="file" onChange={onChangeImage} />
        <button type="submit">인증하기</button>
      </form>
    </SPhotochallengeWrapper>
  );
};

export default PhotoChallengeModal;
