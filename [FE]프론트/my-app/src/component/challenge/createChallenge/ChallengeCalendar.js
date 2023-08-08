import { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import { SCalendarwrapper } from "../../../styles/pages/SChallengePage";

const ChallengeCalendar = ({ onChangeDate }) => {
  const currentDate = new Date();
  const sevenDaysAfter = moment(currentDate).add(0, "days").toDate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date) => {
    if (!startDate) {
      if (date >= sevenDaysAfter) {
        setStartDate(date);
        setEndDate(null);
        const newDate = (moment(date).format("YYYY-MM-DD"), null);
        onChangeDate(newDate);
      }
    } else if (!endDate) {
      if (date > startDate && date >= sevenDaysAfter) {
        setEndDate(date);
        onChangeDate(
          moment(startDate).format("YYYY-MM-DD"),
          moment(date).format("YYYY-MM-DD")
        ); // startDate와 endDate가 모두 설정된 경우
      } else {
        setEndDate(startDate);
        setStartDate(date);
        onChangeDate(
          moment(date).format("YYYY-MM-DD"),
          moment(startDate).format("YYYY-MM-DD")
        ); // startDate와 endDate가 모두 설정된 경우
      }
    } else {
      setStartDate(date);
      setEndDate(null);
      const newDate = (moment(date).format("YYYY-MM-DD"), null);
      onChangeDate(newDate);
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
        value={startDate || endDate || sevenDaysAfter}
        tileClassName={tileClassName}
        formatDay={formatDay}
        minDate={sevenDaysAfter}
      />
      {startDate && endDate ? (
        <div>
          <p id="date">
            {moment(startDate).format("YYYY년 MM월 DD일")}~
            {moment(endDate).format("YYYY년 MM월 DD일")}
          </p>
        </div>
      ) : null}
    </SCalendarwrapper>
  );
};

export default ChallengeCalendar;
