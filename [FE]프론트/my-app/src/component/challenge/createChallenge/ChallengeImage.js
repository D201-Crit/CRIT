import { SChallengeImage } from "../../../styles/pages/SChallengePage";

const ChallengeImage = () => {
  return (
    <SChallengeImage>
      <label htmlFor="image">챌린지 사진</label>
      <input type="file" id="image" />
    </SChallengeImage>
  );
};
export default ChallengeImage;
