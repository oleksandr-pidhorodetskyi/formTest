import React, { useEffect, useRef, useState } from "react";
import "./CustomCalendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import arrowRight from "../../../assets/icons/arrowRight.svg";
import { TIMES } from "../../../constants";
import { NinjasApi } from "../../../api/ninjas.api";
import { formatDate } from "../../../utils/formatDate";
import WarnIcon from "../../icons/WarnIcon";

interface Holiday {
  date: string;
  name: string;
  type: string;
}

interface CalendarComponentProps {
  timeSlot: string;
  setTimeSlot: (name: string, value: string) => void;
  selectedDate: Date | null;
  setSelectedDate: (name: string, value: Date | null) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  timeSlot,
  setTimeSlot,
  setSelectedDate,
  selectedDate,
}) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [observance, setObservance] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const fetchHolidays = async () => {
    try {
      const response = await NinjasApi.getHolidays();
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const isDateDisabled = (date: Date) => {
    const formattedDate = formatDate(date);

    return (
      date.getDay() === 0 ||
      Boolean(
        holidays.find((disabledDate: Holiday) => {
          return (
            disabledDate.type === "NATIONAL_HOLIDAY" &&
            formattedDate === disabledDate.date
          );
        })
      )
    );
  };

  const isObservance = (date: Date): string | null => {
    const formattedDate = formatDate(date);

    const observanceHoliday = holidays.find(
      (holiday) =>
        holiday.date === formattedDate && holiday.type === "OBSERVANCE"
    );
    return observanceHoliday ? observanceHoliday.name : null;
  };

  const onDateChange = (value: any) => {
    setTimeSlot("timeSlot", "");
    if (value && !Array.isArray(value)) {
      setSelectedDate("date", value);
      const observanceName = isObservance(value);
      setObservance(observanceName);
    } else {
      setSelectedDate("date", null);
      setObservance(null);
    }
  };

  const handleTimeSlot = (time: string) => {
    setTimeSlot("timeSlot", time);
  };

  useEffect(() => {
    fetchHolidays();

    if (calendarRef.current) {
      const navLabelButton = calendarRef.current.querySelector(
        ".react-calendar__navigation__label"
      ) as HTMLButtonElement;
      if (navLabelButton) {
        navLabelButton.disabled = true;
      }
    }
  }, []);

  return (
    <div
      className="w-full flex flex-col gap-y-6 md:flex-row md:justify-between md:gap-x-2"
      ref={calendarRef}>
      <div className="w-full md:w-[70%]">
        <h5 className="text-base text-darkBlue mb-2">Date</h5>
        <Calendar
          className="bg-white rounded-lg p-6 w-full"
          onChange={onDateChange}
          value={selectedDate}
          tileDisabled={({ date }) => isDateDisabled(date)}
          next2Label={null}
          prev2Label={null}
          nextLabel={<img src={arrowRight} alt="arrowRight" />}
          prevLabel={<img src={arrowLeft} alt="arrowLeft" />}
          locale="en-US"
        />
        {observance && (
          <div className="mt-3 flex gap-x-2 text-sm text-darkBlue">
            <WarnIcon className="fill-pink" />
            {`It is Polish ${observance}.`}
          </div>
        )}
      </div>
      <div className="w-full md:w-[20%]">
        {selectedDate ? (
          <div>
            <h5 className="text-base text-darkBlue mb-2">Time</h5>
            <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 md:flex-col  ">
              {TIMES.map((time, index) => (
                <div
                  key={time + index}
                  onClick={() => handleTimeSlot(time)}
                  className={`p-4 bg-white text-center text-darkBlue rounded-lg border border-pink ${timeSlot === time ? "border-purple border-[2px]" : ""}`}>
                  {time}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CalendarComponent;
