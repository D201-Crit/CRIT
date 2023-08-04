import { useState } from "react";
import { SChallengeImage } from "../../../styles/pages/SChallengePage";

const ChallengeImage = ({ onChangeImage }) => {
  const [image, setImage] = useState(null);
  const onChallengeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onChangeImage(file);
  };

  // 이미지 프리뷰 URL 생성
  const imageURL = image ? URL.createObjectURL(image) : null;

  return (
    <SChallengeImage>
      <div>{imageURL && <img src={imageURL} alt="챌린지 썸네일" />}</div>
      <label htmlFor="image">대표 이미지 설정</label>
      <input type="file" accept="image/*" onChange={onChallengeImage} />
    </SChallengeImage>
  );
};

export default ChallengeImage;
