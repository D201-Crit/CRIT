import { useState } from "react";
import { SChallengeImage } from "../../../styles/pages/SChallengePage";

const ChallengeImage = ({ onChangeImage }) => {
  const onChallengeImage = (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 이미지 파일
    onChangeImage(file); // 부모 컴포넌트로 선택한 이미지 파일 전달
  };
  return (
    <SChallengeImage>
      <label htmlFor="image">챌린지 사진</label>
      <input type="file" accept="image/*" onChange={onChallengeImage} />{" "}
    </SChallengeImage>
  );
};

export default ChallengeImage;
