import { useSelector } from "react-redux";
import { RootState } from "../state";
import Banner from "../components/dashboard/Banner";
import { UserStat, userStats } from "../utils";
import StatCard from "../components/dashboard/StatCard";

export default function Dashboard() {
  const currentUserInfo = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  return (
    <section className="base-paddings">
      <main className="pt-16 pb-10">
        <Banner username={currentUserInfo?.firstName || "User"} />
        <div className="my-12">
          <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {userStats.map((userStat: UserStat) => (
              <StatCard key={userStat?.id} userStat={userStat} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
