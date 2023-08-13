import React, { useState, useRef } from "react";
import { api } from "../../api/api";
import { SPhotochallengeWrapper } from "../../styles/pages/SChallengePage";
import Swal from "sweetalert2";

const PhotoChallengeModal = ({ challengeData, closePhotoModal }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 사진 미리보기를 위한 상태 추가

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
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
  const getCertList = () => {
    api
      .get(
        `https://i9d201.p.ssafy.io/api/cert/list/${challengeData.challenge.id}`,
      )
      .then((res) => {
        const certList = res.data.data[res.data.data.length - 1]; // 마지막 요소 선택
        console.log(certList);

        Swal.fire({
          position: "center",
          icon: "success",
          html: `
            <div>
            <h1>${certList.certTime}</h1>
            <h1>${certList.userId}님</h1>
            <h1>챌린지 성공!</h1>                               
            </div>
          `,
          showConfirmButton: false,
          // timer: 1500,
          background: "#272727",
          color: "white",
          // width: "500px",
          // 먼지
          // imageUrl: 'https://unsplash.it/400/200',
          // imageWidth: 400,
          // imageHeight: 200,
          // imageAlt: 'Custom image',
        });
        closePhotoModal();
      })
      .catch((err) => console.log(err));
  };

  const submitPhoto = () => {
    if (image === null) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "챌린지 인증 실패",
        text: "챌린지 이미지가 없습니다.",
        showConfirmButton: true,
        background: "#272727",
        color: "white",
      });
    }
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
        getCertList();
        setImage(null); // 이미지 상태 초기화
        // closePhotoModal();
      })
      .catch((err) => {
        console.log(err);
        // 에러 발생 시 모달을 열어둠
        Swal.fire({
          position: "center",
          icon: "error",
          title: "챌린지 인증 실패",
          text: "챌린지 인증에 실패하였습니다.",
          showConfirmButton: true,
          background: "#272727",
          color: "white",
        });
        setImage(null); // 이미지 상태 초기화
      });
  };
  const fileInputRef = useRef(null); // input 태그에 ref 추가

  // 레이블 클릭 시 input 태그 클릭 이벤트 발생
  const handleLabelClick = () => {
    fileInputRef.current.click();
  };
  return (
    <SPhotochallengeWrapper>
      <h1 id="title">챌린지 사진 인증</h1>
      <form id="form" onSubmit={checkCreate}>
        <label id="fileLabel" onClick={handleLabelClick}>
          {imagePreview ? (
            <img id="image" src={imagePreview} alt="이미지 선택" />
          ) : (
            <img
              id="image"
              src="https://github.com/Jinga02/ChallengePJT/assets/110621233/6eae105c-1d90-4136-93c3-1df5f1c74ac8"
              alt="이미지 선택"
            />
          )}
        </label>
        <input
          id="file"
          type="file"
          ref={fileInputRef}
          onChange={onChangeImage}
        />
        <button id="submit" type="submit">
          인증하기
        </button>
      </form>
      <button id="close" onClick={closePhotoModal}>
        나가기
      </button>
    </SPhotochallengeWrapper>
  );
};

export default PhotoChallengeModal;
