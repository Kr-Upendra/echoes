import { useSelector } from "react-redux";
import LinkButton from "../components/buttons/LinkButton";
import { RootState } from "../state";

export default function Hero() {
  const currentUserInfo = useSelector(
    (state: RootState) => state.currentUser.currentUserInfo
  );

  return (
    <section id="hero" className="min-h-screen base-paddings hero-bg">
      <div className="flex items-center justify-center flex-col min-h-screen">
        <h1 className="text-5xl sm:text-2xl text-center text-green-500 font-display">
          <span>Capture Your Moments,</span> <br />
          <span>Keep Your Memories Safe</span>
        </h1>
        <p className="max-w-[700px] my-4 text-center sm:w-full text-gray-200">
          From quick reminders to detailed project notes, Memories provides a
          simple and effective solution for all your note-taking needs. Enjoy a
          clutter-free workspace with features designed to streamline your
          productivity.
        </p>
        <div className="mt-3">
          <LinkButton
            hrefValue={currentUserInfo ? "/dashboard" : "/login"}
            title="Get Started"
          />
        </div>
      </div>
    </section>
  );
}
