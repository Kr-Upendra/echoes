import React, { useState } from "react";
import IconButton from "./buttons/IconButton";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // Stores the current date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Stores the selected date

  // Get the start and end of the month
  const getMonthDays = (date: Date): (number | null)[] => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay(); // Get the starting day of the month
    const numberOfDaysInMonth = endOfMonth.getDate(); // Number of days in the month

    // Create an array of days to display (fill empty days at the start of the month)
    const days: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null); // Empty cells for the beginning of the month
    }
    for (let day = 1; day <= numberOfDaysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const changeMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction); // Navigate to previous/next month
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number | null): void => {
    if (day) {
      setSelectedDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
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
