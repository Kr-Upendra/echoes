import EditableAccount from "./EditableAccount";
import ProfileCard from "./ProfileCard";

export default function MyAccount() {
  return (
    <div className="-mt-10 w-full flex gap-6 px-8 md:flex-col-reverse sm:px-4">
      <EditableAccount />
      <ProfileCard />
    </div>
  );
}
