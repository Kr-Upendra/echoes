import CustomInput from "../../components/form/CustomInput";
import CustomTagInput from "../../components/form/CustomTagInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import PageTitle from "../../components/PageTitle";

export default function AddJournal() {
  return (
    <>
      <PageTitle title="Add new journal" buttonTitle="" hrefValue="" />
      <section className="mt-8 card-diff py-8 px-4 rounded-md pb-12">
        <form>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="journal-title"
              label="Title"
              name="title"
              placeHolder="I have attend meeting."
              value={""}
              onchange={() => {}}
              error={""}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomTextArea
              id="journal-content"
              label="Content"
              name="content"
              placeHolder="There is a meeting in my office that I need to attend at any cost."
              value={""}
              onChange={() => {}}
              error={""}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomTagInput
              onTagsChange={() => {}}
              initialTags={[]} // This will pre-populate tags for editing
            />
          </div>
          <div className="mt-6">
            <button
              disabled={false}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
            >
              Adding
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
