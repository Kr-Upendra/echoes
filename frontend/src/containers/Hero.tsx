import LinkButton from "../components/buttons/LinkButton";

export default function Hero() {
  return (
    <section id="hero" className="py-3 min-h-screen base-paddings hero-bg">
      <div className="flex flex-col items-center">
        <h1 className="mt-56 sm:mt-40 xs:mt-36 text-5xl sm:text-2xl text-center text-green-500 font-display">
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
          <LinkButton hrefValue="/register" title="Get Started" />
        </div>
      </div>
    </section>
  );
}
