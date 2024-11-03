import { useSelector } from "react-redux";
import { RootState } from "../state";
import Banner from "../components/dashboard/Banner";
import StatCard from "../components/dashboard/StatCard";
import { userStats as UserStatApi } from "../api";
import { UserStat } from "../utils";
import { useLoaderData } from "react-router-dom";
import { MdNoteAlt } from "react-icons/md";
import { FaBook, FaCalendar, FaHeart, FaTags } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { IoToday } from "react-icons/io5";

export const statLoader = async () => {
  const data = await UserStatApi();
  return data?.data;
};

export default function Dashboard() {
  const currentUserInfo = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  const { userStats: userStatsData }: any = useLoaderData();
  const userStats: UserStat[] = [
    {
      id: "01",
      icon: MdNoteAlt,
      count: userStatsData?.totalMemories,
      label: "Total Memories",
    },
    {
      id: "02",
      icon: FaHeart,
      count: userStatsData?.favoriteMemories,
      label: "Favorite Memories",
    },
    {
      id: "03",
      icon: BiCategory,
      count: userStatsData?.totalCategories,
      label: "Total Categories",
    },
    {
      id: "04",
      icon: FaCalendar,
      count: userStatsData?.monthlyCount,
      label: "Memories This Month",
    },
    {
      id: "05",
      icon: FaBook,
      count: userStatsData?.weeklyCount,
      label: "Memories This Week",
    },
    {
      id: "06",
      icon: IoToday,
      count: userStatsData?.dailyCount,
      label: "Memories Today",
    },
    {
      id: "07",
      icon: FaTags,
      count: userStatsData?.totalUniqueTags,
      label: "Unique Tags",
    },
  ];

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
