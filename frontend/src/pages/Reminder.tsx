import SectionHeading from "../components/common/SectionHeading";

export default function Reminder() {
  return (
    <section className="base-paddings">
      <main>
        <div className="min-h-screen h-full flex justify-center items-center flex-col">
          <SectionHeading
            title="Your Reminders page"
            description="The list of your Reminders page. you can also create, update or delete your Reminder."
          />
        </div>
      </main>
    </section>
  );
}
