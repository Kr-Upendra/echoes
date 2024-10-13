import SectionHeading from "../components/common/SectionHeading";

export default function Note() {
  return (
    <section className="base-paddings">
      <main>
        <div className="min-h-screen h-full flex justify-center items-center flex-col">
          <SectionHeading
            title="Your Notes page"
            description="The list of your notes page. you can also create, update or delete your note."
          />
        </div>
      </main>
    </section>
  );
}
