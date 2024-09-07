import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero" className="py-2 min-h-[90vh]">
      <div className="flex flex-col items-center">
        <h1 className="mt-44 sm:mt-40 xs:mt-36 text-5xl sm:text-2xl text-center font-bold text-white">
          <span>Capture Your Moments,</span> <br />{" "}
          <span>Keep Your Memories Safe</span>
        </h1>
        <p className="max-w-[700px] my-4 text-center sm:w-full text-gray-400">
          From quick reminders to detailed project notes, Memories provides a
          simple and effective solution for all your note-taking needs. Enjoy a
          clutter-free workspace with features designed to streamline your
          productivity.
        </p>
        <Link
          to="/register"
          className="border mt-3 py-2 px-6 border-gray-700 text-white font-semibold rounded-full"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
