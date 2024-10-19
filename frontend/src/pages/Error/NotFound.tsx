import LinkButton from "../../components/buttons/LinkButton";
import SectionHeading from "../../components/common/SectionHeading";

export default function NotFound() {
  return (
    <section className="base-paddings">
      <main>
        <div className="min-h-screen h-full flex justify-center items-center flex-col">
          <SectionHeading
            title="404 Not Found"
            description="May be you are looking for something else."
          />
          <div className="mt-4">
            <LinkButton hrefValue="/" title="Return Home" />
          </div>
        </div>
      </main>
    </section>
  );
}
