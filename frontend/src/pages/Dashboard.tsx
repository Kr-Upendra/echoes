import { RootState } from "../state";
import Banner from "../components/dashboard/Banner";
import StatCard from "../components/dashboard/StatCard";
import { UserStat } from "../utils";
import { useLoaderData } from "react-router-dom";
import { MdNoteAlt } from "react-icons/md";
import { FaCalendar, FaFire, FaHeart, FaImage, FaTag } from "react-icons/fa6";
import { FaJournalWhills } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const currentUserInfo = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  const { journalStats, memoryStats }: any = useLoaderData();

  const userStats: UserStat[] = [
    {
      id: "01",
      icon: MdNoteAlt,
      count: memoryStats.totalMemories,
      label: "Total Memories",
    },
    {
      id: "02",
      icon: FaHeart,
      count: memoryStats?.favoriteMemories,
      label: "Favorite Memories",
    },
    {
      id: "03",
      icon: FaTag,
      count: memoryStats?.uniqueTags,
      label: "Unique Tags",
    },
    {
      id: "04",
      icon: FaCalendar,
      count: memoryStats?.memoriesCreatedInCurrentMonth,
      label: "Memories This Month",
    },
    {
      id: "05",
      icon: FaJournalWhills,
      count: journalStats?.totalJournals,
      label: "Total Journals",
    },
    {
      id: "06",
      icon: FaImage,
      count: journalStats?.totalImages,
      label: "Total Images",
    },
    {
      id: "07",
      icon: FaFire,
      count: journalStats?.currentStreak,
      label: "Current Streak",
    },
    {
      id: "08",
      icon: FaCalendar,
      count: journalStats?.journalsCreatedInCurrentMonth,
      label: "Journals this month",
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
