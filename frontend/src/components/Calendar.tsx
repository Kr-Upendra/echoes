import React, { useState } from "react";
import IconButton from "./buttons/IconButton";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type Props = { onDateChange: (date: Date) => void };

const Calendar: React.FC<Props> = ({ onDateChange }: Props) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getMonthDays = (date: Date): (number | null)[] => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const numberOfDaysInMonth = endOfMonth.getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= numberOfDaysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const changeMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number | null): void => {
    if (day) {
      const newSelectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(newSelectedDate);
      onDateChange(newSelectedDate);
    }
  };

  const monthDays = getMonthDays(currentDate);

  const isCurrentDate = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div className="w-full rounded-lg shadow-lg">
      <header className="flex justify-between items-center mb-5">
        <IconButton icon={FaArrowLeftLong} onClick={() => changeMonth(-1)} />
        <span className="font-display tracking-wide">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <IconButton icon={FaArrowRightLong} onClick={() => changeMonth(1)} />
      </header>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="text-gray-500">
            {day}
          </div>
        ))}

        {monthDays.map((day, idx) => (
          <div
            key={idx}
            className={`cursor-pointer p-2 rounded-lg  ${
              day ? "hover:bg-green-500/40" : ""
            } ${
              day === selectedDate?.getDate() || isCurrentDate(day)
                ? "bg-green-500/70 font-display text-white"
                : ""
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
