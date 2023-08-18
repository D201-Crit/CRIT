import { useState } from "react";
import { STitleChallenge } from "../../../styles/pages/SChallengePage";
import Swal from "sweetalert2";

const TitleChallenge = ({ onChangeTitle }) => {
  const [title, setTitle] = useState("");
  const onTitleChallenge = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 20) {
      setTitle(newTitle);
      onChangeTitle(newTitle);
    } else {
      // 길이가 20를 초과하는 경우
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "최대 20글자까지 가능합니다.",
        text: "다시 작성해주세요 ㅠㅠ.",
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
      });

      setTitle("");
      onChangeTitle("");
    }
  };
  return (
    <STitleChallenge
      type="text"
      id="title"
      value={title}
      onChange={onTitleChallenge}
      placeholder="제목을 입력하세요(최대 15글자)"
    />
  );
};
export default TitleChallenge;
