import useScrollAnimation from "../../hooks/useScrollAnimation";
import { UserStory } from "../../utils";

type Props = { userStory: UserStory };

export default function UserStoriesCard({ userStory }: Props) {
  const { cardRef, animationStyles } = useScrollAnimation({
    threshold: 0.15,
    direction: "bottom",
    duration: "700",
    delay: "0",
  });

  return (
    <div
      ref={cardRef}
      className={`border border-green-100/10 p-4 shadow-lg shadow-green-500/10 rounded-md hover:bg-green-200/5 hover:big-shadow ${animationStyles}`}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3 w-12 h-12 flex justify-center items-center rounded-full p-0.5 border-2 border-green-500">
          <img
            className="rounded-full w-8 selectDisable"
            src={userStory?.userImage}
            alt={userStory?.userName}
          />
        </div>
        <h2 className="text-lg font-display text-white">
          {userStory?.userName}
        </h2>
      </div>
      <div>
        <p className="text-gray-400">{userStory?.userStory}</p>
      </div>
    </div>
  );
}
