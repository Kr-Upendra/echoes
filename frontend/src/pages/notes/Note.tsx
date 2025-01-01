import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearchQuery = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 800);

  useEffect(() => {
    setCurrentPage(initialPage);
    setSearchQuery(initialSearchQuery);
  }, [searchParams]);

  useEffect(() => {
    const newParams: { [key: string]: string } = {};

    if (debouncedSearchQuery.length >= 3) {
      newParams.search = debouncedSearchQuery;
    }

    if (currentPage > 1) {
      newParams.page = `${currentPage}`;
    }

    setSearchParams(newParams);
  }, [debouncedSearchQuery, currentPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["allNotes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      allNotes({
        page: currentPage,
        search: debouncedSearchQuery,
      }),
    enabled:
      debouncedSearchQuery.length >= 3 || debouncedSearchQuery.length === 0,
  });

  const notes = data?.data?.notes || [];
  const pagination = data?.data?.pagination;

  return (
    <>
      <PageTitle
        title="My Memories"
        buttonTitle="New Momory"
        hrefValue="create"
      />
      <PageFilter handleQueryChange={handleChange} />
      <div className="mt-8">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            {notes.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-4 sm:gap-2.5 xs:gap-x-1.5 mt-5 lg:grid-cols-2 md:grid-cols-2 subsm:grid-cols-1">
                  {notes.map((note: INote) => (
                    <Card note={note} key={note?._id} />
                  ))}
                </div>
                {pagination && pagination?.totalPages > 1 && (
                  <Pagination
                    totalPages={pagination?.totalPages}
                    currentPage={currentPage || 1}
                    onPageChange={handlePageChange}
                    hasNextPage={pagination?.hasNextPage}
                  />
                )}
              </>
            ) : (
              <NoRecord title="No result found." />
            )}
          </>
        )}
      </div>
    </>
  );
}
