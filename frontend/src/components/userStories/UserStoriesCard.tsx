import { UserStory } from "../../utils";

type Props = { userStory: UserStory };
import { useEffect, useRef, useState } from "react";

export default function UserStoriesCard({ userStory }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`border border-green-100/10 p-4 shadow-xl shadow-green-500/10 rounded-md 
        transition-all duration-500 ease-in-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-48"}
        transform`}
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
