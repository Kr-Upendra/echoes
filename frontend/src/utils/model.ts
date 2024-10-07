import { IconType } from "react-icons";

export interface Feature {
  id: string;
  index: string;
  title: string;
  image: string;
  shortDescription: string;
}

export interface HowItWork {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface UserStory {
  id: string;
  userName: string;
  userStory: string;
  userImage: string;
}

export interface UserStat {
  id: string;
  icon: IconType;
  count: number;
  label: string;
}
