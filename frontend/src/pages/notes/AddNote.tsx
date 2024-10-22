import PageTitle from "../../components/PageTitle";
import NoteForm from "../../containers/notes/NoteForm";

export default function AddNote() {
  return (
    <section className="base-paddings">
      <main className="pt-20 pb-10">
        <PageTitle title="Add new note" buttonTitle="" hrefValue="" />
        <NoteForm />
      </main>
    </section>
  );
}
