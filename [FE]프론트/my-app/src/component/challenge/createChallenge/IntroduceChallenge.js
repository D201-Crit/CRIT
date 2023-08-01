import { useState } from "react";
import { STextArea } from "../../../styles/pages/SChallengePage";
import Swal from "sweetalert2";

const IntroduceChallenge = ({ onChangeIntroduce }) => {
  const [introduce, setIntroduce] = useState("");
  const onIntroduceChallenge = (e) => {
    const newIntroduce = e.target.value;
    if (newIntroduce.length < 255) {
      setIntroduce(newIntroduce);
      onChangeIntroduce(newIntroduce);
    } else {
      // 길이가 255를 초과하는 경우
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "최대 255글자까지 가능합니다.",
        text: "다시 작성해주세요 ㅠㅠ.",
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

      setIntroduce("");
      onChangeIntroduce("");
    }
  };
  return (
    <STextArea
      id="introduce"
      value={introduce}
      onChange={onIntroduceChallenge}
      placeholder="소개글을 작성하세요"
    />
  );
};

export default IntroduceChallenge;
