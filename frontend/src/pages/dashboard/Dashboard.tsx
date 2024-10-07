import Banner from "../../components/dashboard/Banner";
import StatCard from "../../components/dashboard/StatCard";
import { UserStat, userStats } from "../../utils";

export default function Dashboard() {
  return (
    <section className="base-paddings">
      <main className="pt-16 pb-10">
        <Banner />
        <div className="my-12">
          <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {userStats.map((userStat: UserStat) => (
              <StatCard userStat={userStat} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
