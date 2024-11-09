import { useState } from "react";
import Calendar from "react-calendar";
import CountUp from "react-countup";
import "../../styles/calender.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calender() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <>
      <div className="w-1/3 sm:w-full md:w-1/2 h-full ">
        <div className="mb-6 p-4 xs:px-2 py-6 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5">
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

        <div className="mt-4 p-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5">
          <h1 className="text-green-500 font-display line-clamp-1 sm:text-sm mb-2">
            Your Streaks (In days)
          </h1>
          <div className="flex justify-between gap-4">
            <div className="rounded-md py-3 w-full flex justify-center items-center flex-col gap-y-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-300/5">
              <span className="text-5xl sm:text-3xl text-green-500 font-display tracking-wider">
                <CountUp start={0} end={5} duration={2.5} />
              </span>
              <span className="text-sm text-center">Current Streak</span>
            </div>
            <div className="rounded-md p-1.5 flex w-full justify-center items-center flex-col gap-y-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-300/5">
              <span className="text-5xl sm:text-3xl text-green-500 font-display tracking-wider">
                <CountUp start={0} end={20} duration={2.5} />
              </span>
              <span className="text-sm text-center">Longest Streak</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
