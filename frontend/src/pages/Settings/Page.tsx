import { useMutation } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import UpdatePasswordForm from "../../components/profile/UpdatePasswordForm";
import { logoutUser } from "../../api";
import { clearUserData, removeTokens, successAlert } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../../state";

export default function SettingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      successAlert("You logged out successfully.");
      setTimeout(() => {
        clearUserData();
        dispatch(clearCurrentUser());
        removeTokens();
        navigate("/login");
      }, 1000);
    },
    onError: (error) => {
      console.error("Logout failed:", error.message);
    },
  });

  function handleClick() {
    mutation.mutate();
  }

  return (
    <section className="base-paddings">
      <main className="pt-16 pb-10">
        <div className="mt-4">
          <PageTitle
            title="Your Settings"
            buttonTitle="Logout"
            isButton={true}
            buttonHandler={handleClick}
          />
          <UpdatePasswordForm />
        </div>
      </main>
    </section>
  );
}
