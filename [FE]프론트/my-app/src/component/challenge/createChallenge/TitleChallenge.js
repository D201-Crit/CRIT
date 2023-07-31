import { STitleChallenge } from "../../../styles/pages/SChallengePage";
import useInput from "../../../hooks/useInput";

const TitleChallenge = () => {
  const [title, onChangeTitle] = useInput();
  return <STitleChallenge type="text" placeholder="제목을 입력하세요" />;
};
export default TitleChallenge;
