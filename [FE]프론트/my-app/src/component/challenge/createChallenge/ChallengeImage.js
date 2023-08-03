import { useState } from "react";
import { SChallengeImage } from "../../../styles/pages/SChallengePage";

const ChallengeImage = ({ onChangeImage }) => {
  const [image, setImage] = useState();
  const onChallengeImage = (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 이미지 파일
    setImage(file);
    onChangeImage(file); // 부모 컴포넌트로 선택한 이미지 파일 전달
  };
  return (
    <SChallengeImage>
      <div>{image}</div>
      <label htmlFor="image">대표 이미지 설정</label>
      <input type="file" accept="image/*" onChange={onChallengeImage} />{" "}
    </SChallengeImage>
  );
};

export default ChallengeImage;
