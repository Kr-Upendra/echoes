import ProfileBanner from "../components/profile/ProfileBanner";
import { MyAccount } from "./profile";

export default function ProfileContainer() {
  return (
    <div className="relative">
      <ProfileBanner />
      <MyAccount />
    </div>
  );
}
