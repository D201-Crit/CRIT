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
  SChallengeTimeWrapper,
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
  // 챌린지 시간
  const [startTime, setStartTime] = useState(""); // 시작 시간 상태
  const [endTime, setEndTime] = useState(""); // 종료 시간 상태

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    // 종료 시간과의 차이 계산
    const start = new Date(`2000-01-01T${newStartTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffInMinutes = Math.abs((end - start) / 1000 / 60);

    // 종료 시간이 시작 시간보다 빠른 경우에만 최대 1시간 조절
    if (end < start || diffInMinutes > 60) {
      const adjustedEndTime = new Date(start.getTime() + 60 * 60 * 1000);
      setEndTime(adjustedEndTime.toTimeString().slice(0, 5));
    }
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);

    // 시작 시간과의 차이 계산
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${newEndTime}`);
    const diffInMinutes = Math.abs((end - start) / 1000 / 60);

    // 종료 시간이 시작 시간보다 빠른 경우에만 최대 1시간 조절
    if (end < start || diffInMinutes > 60) {
      const adjustedStartTime = new Date(end.getTime() - 60 * 60 * 1000);
      setStartTime(adjustedStartTime.toTimeString().slice(0, 5));
    }
  };
  // 달력
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(startDate);
  const handleDateChange = (date) => {
    const currentDate = new Date();
    const sevenDaysAfter = moment(currentDate).add(7, "days").toDate();

    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate) {
      if (date > startDate && date >= sevenDaysAfter) {
        // 현재날짜로부터 7일 이후의 날짜인지 검사
        setEndDate(date);
      } else {
        setEndDate(startDate);
        console.log("놉");
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
  const formatDay = (locale, date) => {
    return moment(date).format("D").replace("일", "");
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
        <SChallengeTimeWrapper>
          <h4>챌린지 시간</h4>
          <li>
            <label>시작시간</label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </li>
          <li>
            <label>종료시간</label>
            <input type="time" value={endTime} onChange={handleEndTimeChange} />
          </li>
        </SChallengeTimeWrapper>
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
            formatDay={formatDay} // 수정된 부분
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
