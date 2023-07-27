import { useState } from "react";
import {
  SCreateChallengeModalWrapper,
  STitleInput,
  STextArea,
  SInfoChallenge,
  SSelectChallengeWrapper,
  SAuthenticationMethodWrapper,
  SMemberWrapper,
  SCalendarwrapper,
  SCompleteButton,
  SCloseButton,
  SButtonWrapper,
} from "../../styles/pages/SChallengePage";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment"; // moment 임포트

const CreateChallengeModal = () => {
  // 챌린지 생성 모달
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  // 달력
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleDateChange = (date) => {
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate) {
      if (date > startDate) {
        setEndDate(date);
      } else {
        setEndDate(startDate);
        setStartDate(date);
      }
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };
  const tileClassName = ({ date }) => {
    if (startDate && endDate) {
      if (date >= startDate && date <= endDate) {
        return "selected-range";
      }
    } else if (startDate) {
      if (date === startDate) {
        return "selected-range";
      }
    }
    return null;
  };
  // 챌린지 모집인원
  const [members, setMembers] = useState(3);

  const handleMembersChange = (e) => {
    setMembers(parseInt(e.target.value));
  };
  const handleSelectChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setMembers(selectedValue);
  };
  return (
    <SCreateChallengeModalWrapper>
      <STitleInput type="text" placeholder="제목을 입력하세요" />
      <SInfoChallenge>
        <STextArea placeholder="소개글을 작성하세요"></STextArea>
        <SSelectChallengeWrapper>
          <h4>챌린지 종류</h4>
          <li>
            <input type="radio" name="challengeType" />
            <label>챌린지</label>
          </li>
          <li>
            <input type="radio" name="challengeType" />
            <label>챌린지</label>
          </li>
        </SSelectChallengeWrapper>
        <SAuthenticationMethodWrapper>
          <h4>인증수단 설정</h4>
          <li>
            <input type="radio" />
            <label>실시간 인증</label>
          </li>
          <li>
            <input type="radio" />
            <label>사진 인증</label>
          </li>
        </SAuthenticationMethodWrapper>
        <SMemberWrapper>
          <h4>인원수 설정</h4>
          <select value={members} onChange={handleSelectChange}>
            <option value="">인원수</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <input
            type="range"
            min="3"
            max="10"
            value={members}
            onChange={handleMembersChange}
          />
          <h5>{members}명</h5>
        </SMemberWrapper>
        <SCalendarwrapper>
          <Calendar
            onChange={handleDateChange}
            value={startDate || endDate || new Date()}
            tileClassName={tileClassName}
          />
          {startDate & endDate ? (
            <div>
              <h3>
                {moment(startDate).format("YYYY년 MM월 DD일")}~
                {moment(endDate).format("YYYY년 MM월 DD일")}
              </h3>
            </div>
          ) : null}
        </SCalendarwrapper>
      </SInfoChallenge>
      <SButtonWrapper>
        <SCompleteButton>생성완료</SCompleteButton>
        <SCloseButton onClick={closeModal}>나가기</SCloseButton>
      </SButtonWrapper>
    </SCreateChallengeModalWrapper>
  );
};

export default CreateChallengeModal;
