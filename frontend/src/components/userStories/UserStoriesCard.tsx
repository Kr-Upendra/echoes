import { UserStory } from "../../utils";

type Props = { userStory: UserStory };

export default function UserStoriesCard({ userStory }: Props) {
  return (
    <div className="border p-4 border-accent-alpha rounded-md">
      <div className="flex items-center mb-3">
        <div className="mr-3 w-12 rounded-full p-0.5 border-2 border-accent-mid">
          <img
            className="rounded-full "
            src={userStory?.userImage}
            alt={userStory?.userName}
          />
        </div>
        <h2 className="text-lg font-semibold text-text-real">
          {userStory?.userName}
        </h2>
      </div>
      <div>
        <p className="text-secondary-light">{userStory?.userStory}</p>
      </div>
    </div>
  );
}
