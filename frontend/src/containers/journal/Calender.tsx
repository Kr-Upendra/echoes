import { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/calender.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calender() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="p-4 xs:px-2 py-6 w-1/3 sm:w-full md:w-1/2 h-full rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5">
      <Calendar
        className="w-full"
        onChange={onChange}
        value={value}
        tileClassName={
          "font-display sm:text-sm xs:text-xs border-green-500/20 rounded-full"
        }
        view="month"
      />
    </div>
  );
}
