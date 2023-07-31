import { useState } from "react";
import moment from "moment"; // moment 임포트

import Calendar from "react-calendar";

import { SCalendarwrapper } from "../../../styles/pages/SChallengePage";

const ChallengeCalendar = () => {
  // 달력
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  return (
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
  );
};

export default ChallengeCalendar;
