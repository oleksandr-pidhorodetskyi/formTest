import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import arrowRight from "../../assets/icons/arrowRight.svg";
import { TIMES } from "../../constants";
import { NinjasApi } from "../../api/ninjas.api";
import { formatDate } from "../../utils/formatDate";

interface Holiday {
  date: string;
  name: string;
  type: string;
}

const CalendarComponent: React.FC = () => {
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

    return Boolean(
      holidays.find((disabledDate: Holiday) => {
        return (
          disabledDate.type === "NATIONAL_HOLIDAY" &&
          formattedDate === disabledDate.date
        );
      })
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
    setTimeSlot("");
    if (value && !Array.isArray(value)) {
      setSelectedDate(value);
      const observanceName = isObservance(value);
      setObservance(observanceName);
    } else {
      setSelectedDate(null);
      setObservance(null);
    }
  };

  const handleTimeSlot = (time: string) => {
    setTimeSlot(time);
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
    <div>
      <div className="w-full flex justify-between gap-x-6" ref={calendarRef}>
        <Calendar
          className="bg-white shadow-md rounded-lg p-6 w-[70%] "
          onChange={onDateChange}
          value={selectedDate}
          tileDisabled={({ date }) => isDateDisabled(date)}
          next2Label={null}
          prev2Label={null}
          nextLabel={<img src={arrowRight} alt="arrowRight" />}
          prevLabel={<img src={arrowLeft} alt="arrowLeft" />}
        />
        <div className="w-[20%]">
          {selectedDate ? (
            <div className="flex flex-col gap-y-2 ">
              {TIMES.map((time, index) => (
                <div
                  key={time + index}
                  onClick={() => handleTimeSlot(time)}
                  className={`p-4 bg-white text-center text-darkBlue rounded-lg border border-pink ${timeSlot === time ? "border-purple border-[2px]" : ""}`}>
                  {time}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {observance && (
        <div className="mt-4 p-2 bg-white rounded-lg border border-pink">
          {`Observance: ${observance}`}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
