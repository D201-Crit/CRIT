import { useState } from "react";
import { SAuthenticationMethodWrapper } from "../../../styles/pages/SChallengePage";

const ChallengeAuthentication = ({ onChangeAuthentication }) => {
  const [authentication, setAuthentication] = useState("");
  const onChallengeAuthentication = (e) => {
    const newAuthentication = e.target.value;
    setAuthentication(newAuthentication);
    onChangeAuthentication(newAuthentication);
  };
  return (
    <SAuthenticationMethodWrapper>
      <h4>인증수단 설정</h4>
      <li>
        <input
          id="webRTC"
          type="radio"
          value="WEBRTC"
          onChange={onChallengeAuthentication}
          name="AuthenticationType"
        />
        <label htmlFor="webRTC">실시간 인증</label>
      </li>
      <li>
        <input
          id="photo"
          type="radio"
          value="PHOTO"
          onChange={onChallengeAuthentication}
          name="AuthenticationType"
        />
        <label htmlFor="photo">사진 인증</label>
      </li>
    </SAuthenticationMethodWrapper>
  );
};

export default ChallengeAuthentication;
