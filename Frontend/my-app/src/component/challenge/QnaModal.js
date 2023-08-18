import { useState } from "react";
import {
  SQnAButton,
  SQnaWrapper,
  SQnajWrapper,
  SQnAButton2,
  SQnajWrapper2,
  SScrollCircle,
  SQnaButtonWrapper,
} from "../../styles/pages/SChallengePage";
import { SScrollButtonWrapper } from "../../styles/pages/SMainPage";
const QnaModal = () => {
  const [isQnaOpen, setIsQnaOpen] = useState(false);
  const openQna = () => {
    setIsQnaOpen(!isQnaOpen);
    setIsQna2Open(false);
  };

  const [isQna2Open, setIsQna2Open] = useState(false);
  const openQna2 = () => {
    setIsQna2Open(!isQna2Open);
    setIsQnaOpen(false);
  };

  const [isHovered, setIsHovered] = useState(false);
  // 마우스를 올릴 때와 내릴 때 상태를 변경하는 함수를 추가
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsQna2Open(false);
    setIsQnaOpen(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsQna2Open(false);
    setIsQnaOpen(false);
  };
  return (
    <SQnaWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isHovered={isHovered}
    >
      <SScrollCircle>→</SScrollCircle>
      {isHovered ? (
        <SQnaButtonWrapper>
          <SQnAButton onClick={openQna}>인증 설명서</SQnAButton>
          <SQnAButton2 onClick={openQna2}>생성 설명서</SQnAButton2>
        </SQnaButtonWrapper>
      ) : null}
      {isQnaOpen ? (
        <SQnajWrapper>
          <h2>실시간 인증 설명서</h2>
          <p>1. 챌린지 시간의 85% 이상 참여하면 인증 성공입니다.</p>
          <p>2. 화면에서 이탈되는 즉시 이탈 시간이 측정됩니다.</p>
          <h2>사진 인증 설명서</h2>
          <p>1. 챌린지 시간 내에 사진을 인증하면 인증 성공입니다.</p>
          <h2 id="warning">공통 주의 사항</h2>
          <p>
            1. 챌린지 기간 동안 100% 인증 참여 시 보너스가 지급됩니다.
            <br />
            <b>(인증 실패자가 없을 시 보너스가 지급되지 않습니다.)</b>
          </p>
          <p>
            2. 챌린지 실패 횟수/챌린지 총 횟수(기간)
            <br />
            <b>15% 초과 시 참여비를 환급 받을 수 없습니다.</b>
          </p>
        </SQnajWrapper>
      ) : null}
      {isQna2Open ? (
        <SQnajWrapper2>
          <h2>생성 설명서</h2>
          <p>1. "챌린지 만들기" 버튼을 눌러 챌린지 생성 창을 엽니다.</p>
          <p>2. 제목과 챌린지 썸네일, 소개글 등을 작성합니다.</p>
          <h2 id="warning">주의 사항</h2>
          <p>1. 챌린지를 생성할 때 설정한 참여비가 차감됩니다.</p>
          <p>2. 생성일로부터 일주일 후부터 챌린지 기간을 설정할 수 있습니다.</p>
          <p>3. 챌린지 시간은 최소 30분부터 최대 2시간까지 설정 가능합니다.</p>
        </SQnajWrapper2>
      ) : null}
    </SQnaWrapper>
  );
};

export default QnaModal;
