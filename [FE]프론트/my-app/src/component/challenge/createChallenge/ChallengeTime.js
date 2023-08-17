import { SChallengeTimeWrapper } from "../../../styles/pages/SChallengePage";
import { useState } from "react";

const ChallengeTime = ({ onChangeTime }) => {
  // 챌린지 시간
  const [startTime, setStartTime] = useState(""); // 시작 시간 상태
  const [endTime, setEndTime] = useState(""); // 종료 시간 상태

  const onStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    // 종료 시간과의 차이 계산
    const start = new Date(`2000-01-01T${newStartTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffInMinutes = Math.abs((end - start) / 1000 / 60);

    // 최소 30분 차이 보장
    if (diffInMinutes < 30) {
      const adjustedEndTime = new Date(start.getTime() + 30 * 60 * 1000);
      setEndTime(adjustedEndTime.toTimeString().slice(0, 5));
      onChangeTime(newStartTime, adjustedEndTime.toTimeString().slice(0, 5));
    } else if (end < start) {
      // 종료 시간이 시작 시간보다 빠른 경우에만 최대 2시간 조절
      const adjustedEndTime = new Date(start.getTime() + 120 * 60 * 1000);
      setEndTime(adjustedEndTime.toTimeString().slice(0, 5));
      onChangeTime(newStartTime, adjustedEndTime.toTimeString().slice(0, 5));
    } else {
      onChangeTime(newStartTime, endTime);
    }
  };

  const onEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);

    // 시작 시간과의 차이 계산
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${newEndTime}`);
    const diffInMinutes = Math.abs((end - start) / 1000 / 60);

    // 최소 30분 차이 보장
    if (diffInMinutes < 30) {
      const adjustedStartTime = new Date(end.getTime() - 30 * 60 * 1000);
      setStartTime(adjustedStartTime.toTimeString().slice(0, 5));
      onChangeTime(adjustedStartTime.toTimeString().slice(0, 5), newEndTime);
    } else if (end < start) {
      // 종료 시간이 시작 시간보다 빠른 경우에만 최대 3시간 조절
      const adjustedStartTime = new Date(end.getTime() - 120 * 60 * 1000);
      setStartTime(adjustedStartTime.toTimeString().slice(0, 5));
      onChangeTime(adjustedStartTime.toTimeString().slice(0, 5), newEndTime);
    } else {
      onChangeTime(startTime, newEndTime);
    }
  };

  return (
    <SChallengeTimeWrapper>
      <h4>챌린지 시간</h4>
      <li>
        <label>시작시간</label>
        <input type="time" value={startTime} onChange={onStartTimeChange} />
      </li>
      <li>
        <label>종료시간</label>
        <input type="time" value={endTime} onChange={onEndTimeChange} />
      </li>
    </SChallengeTimeWrapper>
  );
};

export default ChallengeTime;
