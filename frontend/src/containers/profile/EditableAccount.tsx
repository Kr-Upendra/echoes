import ProfileUpdateForm from "../../components/profile/ProfileUpdateForm";
import UpdatePasswordForm from "../../components/profile/UpdatePasswordForm";

export default function EditableAccount() {
  return (
    <div className="w-full px-4 py-8 pb-16 rounded-lg shadow-2xl shadow-green-500/20 bg-black/80">
      <h3 className="font-display px-5 text-white mb-3">My Account</h3>
      <ProfileUpdateForm />
      <UpdatePasswordForm />
    </div>
  );
}
