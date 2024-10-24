import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import PageFilter from "../../components/PageFilter";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { allNotes } from "../../api";
import Card from "../../components/Card";
import Error from "../../components/Error";
import { INote } from "../../utils";
import NoRecord from "../../components/NoRecord";

export default function Note() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allNotes"],
    queryFn: allNotes,
  });

  const notes = data?.data?.notes;

  const handlePageChange = (page: number) => {
    console.log("Page changed to: ", page);
    setCurrentPage(page);
  };
  return (
    <>
      <PageTitle title="My Notes" buttonTitle="New Note" hrefValue="create" />
      <PageFilter />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          {notes.length > 0 ? (
            <>
              <div className="grid grid-cols-4 gap-4 sm:gap-2.5 xs:gap-x-1.5 mt-5 lg:grid-cols-3 md:grid-cols-2">
                {notes.map((note: INote) => (
                  <Card
                    title={note?.title}
                    content={note?.content}
                    category={note?.category}
                    tags={note?.tags}
                    isFavorite={note?.isFavorite}
                    id={note?._id}
                    key={note?._id}
                  />
                ))}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <NoRecord title="You don't have any notes." />
          )}
        </>
      )}
    </>
  );
}

// <>
//   <div className="grid grid-cols-4 gap-4 sm:gap-2.5 xs:gap-x-1.5 mt-5 lg:grid-cols-3 md:grid-cols-2">
//     {data?.notes?.map((note: INote) => (
//       <Card
//         title={note?.title}
//         content={note?.content}
//         category={note?.category}
//         tags={note?.tags}
//         isFavorite={note?.isFavorite}
//         key={note?.noteId}
//       />
//     ))}
//   </div>
//   <Pagination
//     totalPages={totalPages}
//     currentPage={currentPage}
//     onPageChange={handlePageChange}
//   />
// </>
