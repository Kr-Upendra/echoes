import SectionHeading from "../../components/common/SectionHeading";

export default function Profile() {
  return (
    <section className="base-paddings">
      <main>
        <div className="min-h-screen h-full flex justify-center items-center flex-col">
          <SectionHeading
            title="User Profile page"
            description="Here you can view or update your details"
          />
        </div>
      </main>
    </section>
  );
}
