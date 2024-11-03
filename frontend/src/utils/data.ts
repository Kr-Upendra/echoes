import taking_notes from "../assets/icons/taking_notes.svg";
import organise_notes from "../assets/icons/organise_notes.svg";
import reminders from "../assets/icons/reminders.svg";
import store_memories from "../assets/icons/store_memories.svg";
import user_01 from "../assets/users/user_01.jpg";
import user_02 from "../assets/users/user_02.jpg";
import user_03 from "../assets/users/user_03.jpg";
import user_04 from "../assets/users/user_04.jpg";
import user_05 from "../assets/users/user_05.jpg";
import user_06 from "../assets/users/user_06.jpg";
import { Feature, HowItWork, UserStory } from "./model";

export const features: Feature[] = [
  {
    id: "feature001",
    index: "01",
    title: "Take Notes Quickly",
    image: taking_notes,
    shortDescription:
      "Jot down thoughts and ideas instantly with a user-friendly note-taking interface.",
  },
  {
    id: "feature002",
    index: "02",
    title: "Organize Your Thoughts",
    image: organise_notes,
    shortDescription:
      "Easily categorize notes into folders or tags for better organization.",
  },
  {
    id: "feature003",
    index: "03",
    title: "Set Reminders",
    image: reminders,
    shortDescription:
      "Never miss important tasks by setting reminders for your notes.",
  },
  {
    id: "feature004",
    index: "04",
    title: "Store Memories",
    image: store_memories,
    shortDescription:
      "Keep photos and audio files alongside your notes to capture full memories.",
  },
];

export const howItWorks: HowItWork[] = [
  {
    id: "howItWork001",
    index: "01",
    title: "Signup",
    description: "Create your account in seconds.",
  },
  {
    id: "howItWork002",
    index: "02",
    title: "Take Notes",
    description: "Capture your thoughts or memories.",
  },
  {
    id: "howItWork003",
    index: "03",
    title: "Set Reminders",
    description: "Never miss an important task.",
  },
  {
    id: "howItWork004",
    index: "04",
    title: "Access Anytime",
    description: "Retrieve your memories across devices.",
  },
];

export const userStories: UserStory[] = [
  {
    id: "userStories001",
    userName: "Sarah Thompson",
    userStory:
      "Using this platform has made it incredibly easy to organize my thoughts and keep track of important moments in my life. Highly recommended for personal use!",
    userImage: user_01,
  },
  {
    id: "userStories002",
    userName: "John Doe",
    userStory:
      "I love how the app allows me to quickly jot down notes and keep everything organized in categories. It’s perfect for staying on top of all my projects.",
    userImage: user_02,
  },
  {
    id: "userStories003",
    userName: "Michael Carter",
    userStory:
      "This app has been a game-changer for me! I can now easily set reminders, take quick notes, and store everything in one place with no hassle at all.",
    userImage: user_03,
  },
  {
    id: "userStories004",
    userName: "Emily Davis",
    userStory:
      "The ability to attach photos and audio to my notes has been super helpful. It’s like keeping a diary, but much more efficient and fun to use.",
    userImage: user_04,
  },
  {
    id: "userStories005",
    userName: "Nancy Clock",
    userStory:
      "With this platform, I can organize my memories and thoughts seamlessly. The categories and reminders are especially useful for keeping everything sorted and easy to find.",
    userImage: user_05,
  },
  {
    id: "userStories006",
    userName: "Sophia Martinez",
    userStory:
      "I'm amazed at how easy it is to capture my ideas, notes, and reminders. This app is the best for staying organized and productive every single day.",
    userImage: user_06,
  },
];
