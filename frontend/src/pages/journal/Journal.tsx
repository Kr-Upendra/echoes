import PageTitle from "../../components/PageTitle";
import Pagination from "../../components/Pagination";

export default function Journal() {
  return (
    <>
      <PageTitle
        title="My Journals"
        buttonTitle="New Journal"
        hrefValue="create"
      />
      <div className="grid grid-cols-4 gap-4 sm:gap-2.5 xs:gap-x-1.5 mt-5 lg:grid-cols-3 md:grid-cols-2">
        <h1>Jounal LIst goes here...</h1>
      </div>
      <Pagination
        totalPages={3}
        currentPage={1}
        onPageChange={() => {}}
        hasNextPage={false}
      />
    </>
  );
}
