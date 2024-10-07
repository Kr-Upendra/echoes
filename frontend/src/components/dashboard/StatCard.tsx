import CountUp from "react-countup";
import { UserStat } from "../../utils";

type Props = { userStat: UserStat };

export default function StatCard({ userStat }: Props) {
  return (
    <div className="p-4 py-6 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5">
      <div className="text-center">
        <userStat.icon className="text-8xl sm:text-5xl mx-auto text-green-500" />
        <div className="my-2">
          <span className="text-5xl sm:text-3xl text-white font-display tracking-wider">
            <CountUp start={0} end={userStat?.count} duration={2.5} />
          </span>
        </div>
        <h3 className="text-gray-400 sm:text-sm">{userStat?.label}</h3>
      </div>
    </div>
  );
}
