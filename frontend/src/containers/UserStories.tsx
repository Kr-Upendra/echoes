import SectionHeading from "../components/common/SectionHeading";
import UserStoriesCard from "../components/userStories/UserStoriesCard";
import { userStories, UserStory } from "../utils";

export default function UserStories() {
  return (
    <section id="user-stories" className="py-12 base-paddings">
      <div className="container">
        <SectionHeading
          title="User Stories"
          description="See how others are using our platform to capture and organize their memories."
        />
        <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1 sm:gap-4">
          {userStories.map((userStory: UserStory) => (
            <UserStoriesCard key={userStory?.id} userStory={userStory} />
          ))}
        </div>
      </div>
    </section>
  );
}
