import { SAuthenticationMethodWrapper } from "../../../styles/pages/SChallengePage";

const ChallengeAuthentication = () => {
  return (
    <SAuthenticationMethodWrapper>
      <h4>인증수단 설정</h4>
      <li>
        <input type="radio" name="AuthenticationType" />
        <label>실시간 인증</label>
      </li>
      <li>
        <input type="radio" name="AuthenticationType" />
        <label>사진 인증</label>
      </li>
    </SAuthenticationMethodWrapper>
  );
};

export default ChallengeAuthentication;
