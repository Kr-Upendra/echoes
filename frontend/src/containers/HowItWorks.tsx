export default function HowItWorks() {
  return (
    <section id="how-it-works" className="base-paddings mb-14">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary-real">
          How It Works
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 sm:gap-y-8 flex-wrap">
          <div className="border sm:w-full border-accent-alpha rounded-md p-5">
            <div className="flex gap-x-3 mb-3 items-center">
              <span className="border px-2 py-1 rounded-full border-accent-alpha">
                01
              </span>
              <h2 className="font-semibold text-text-real">Signup</h2>
            </div>
            <p className="text-secondary-light">
              Create your account in seconds.
            </p>
          </div>
          <div className="border sm:w-full border-accent-alpha rounded-md p-5">
            <div className="flex gap-x-3 mb-3 items-center">
              <span className="border px-2 py-1 rounded-full border-accent-alpha">
                02
              </span>
              <h2 className="font-semibold text-text-real">Take Notes</h2>
            </div>
            <p className="text-secondary-light">
              Capture your thoughts or memories.
            </p>
          </div>
          <div className="border sm:w-full border-accent-alpha rounded-md p-5">
            <div className="flex gap-x-3 mb-3 items-center">
              <span className="border px-2 py-1 rounded-full border-accent-alpha">
                03
              </span>
              <h2 className="font-semibold text-text-real">Set Reminders</h2>
            </div>
            <p className="text-secondary-light">
              Never miss an important task.
            </p>
          </div>
          <div className="border sm:w-full border-accent-alpha rounded-md p-5">
            <div className="flex gap-x-3 mb-3 items-center">
              <span className="border px-2 py-1 rounded-full border-accent-alpha">
                04
              </span>
              <h2 className="font-semibold text-text-real">Access Anytime</h2>
            </div>
            <p className="text-secondary-light">
              Retrieve your memories across devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
