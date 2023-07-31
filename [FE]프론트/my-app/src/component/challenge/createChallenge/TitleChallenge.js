import { useState } from "react";
import { STitleChallenge } from "../../../styles/pages/SChallengePage";

const TitleChallenge = ({ onChangeTitle }) => {
  const [title, setTitle] = useState("");
  const onTitleChallenge = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onChangeTitle(newTitle);
  };
  return (
    <STitleChallenge
      type="text"
      id="title"
      value={title}
      onChange={onTitleChallenge}
      placeholder="제목을 입력하세요"
    />
  );
};
export default TitleChallenge;
