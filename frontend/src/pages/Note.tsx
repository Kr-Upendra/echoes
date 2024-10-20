import PageTitle from "../components/PageTitle";
import PageFilter from "../components/PageFilter";
import Grid from "../containers/Grid";

export default function Note() {
  return (
    <section className="base-paddings">
      <main className="pt-20 pb-10">
        <PageTitle title="My Notes" buttonTitle="New Note" />
        <PageFilter />
        <Grid />
      </main>
    </section>
  );
}
