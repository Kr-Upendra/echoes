import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero" className="py-2 min-h-[92vh] base-paddings">
      <div className="flex flex-col items-center">
        <h1 className="mt-44 sm:mt-40 xs:mt-36 text-5xl sm:text-2xl text-center font-bold text-primary-mid">
          <span>Capture Your Moments,</span> <br />{" "}
          <span>Keep Your Memories Safe</span>
        </h1>
        <p className="max-w-[700px] my-4 text-center sm:w-full text-secondary-light">
          From quick reminders to detailed project notes, Memories provides a
          simple and effective solution for all your note-taking needs. Enjoy a
          clutter-free workspace with features designed to streamline your
          productivity.
        </p>
        <Link
          to="/register"
          className="border mt-3 py-2 px-6 border-accent-alpha text-accent-real font-semibold rounded-full hover:border-accent-real transition-color"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
