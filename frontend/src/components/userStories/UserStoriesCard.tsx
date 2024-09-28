import { UserStory } from "../../utils";

type Props = { userStory: UserStory };

export default function UserStoriesCard({ userStory }: Props) {
  return (
    <div className="border p-4 border-gray-900 shadow-xl shadow-green-500/10 rounded-md">
      <div className="flex items-center mb-3">
        <div className="mr-3 w-12 rounded-full p-0.5 border-2 border-green-500">
          <img
            className="rounded-full selectDisable"
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
