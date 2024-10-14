import SectionHeading from "../components/common/SectionHeading";

export default function Setting() {
  return (
    <section className="base-paddings">
      <main>
        <div className="min-h-screen h-full flex justify-center items-center flex-col">
          <SectionHeading
            title="Setting page"
            description="Here you can update you settings"
          />
        </div>
      </main>
    </section>
  );
}
