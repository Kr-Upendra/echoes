import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { allVoiceNotes } from "../../api";
import PageTitle from "../../components/PageTitle";
import PageFilter from "../../components/PageFilter";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import NoRecord from "../../components/NoRecord";
import VoiceNoteCard from "../../components/cards/VoiceNoteCard";

export default function VoiceNotePage() {
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
    queryKey: ["allVoiceNotes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      allVoiceNotes({
        page: currentPage,
        search: debouncedSearchQuery,
      }),
    enabled:
      debouncedSearchQuery.length >= 3 || debouncedSearchQuery.length === 0, // Only run when search is valid
  });

  const voiceNotes = data?.data?.voiceNotes || [];
  const pagination = data?.data?.pagination;

  return (
    <>
      <PageTitle
        title="My Voice Notes"
        buttonTitle="Add New"
        hrefValue="create"
      />
      <PageFilter handleQueryChange={handleChange} hasCategoryFilter={false} />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          {voiceNotes.length > 0 ? (
            <>
              <div className="grid grid-cols-4 gap-5 sm:gap-2.5 xs:gap-x-1.5 mt-5 lg:grid-cols-3 md:grid-cols-2">
                {voiceNotes.map((voiceNote: any, index: number) => (
                  <VoiceNoteCard
                    key={index}
                    title={voiceNote?.title}
                    voiceNoteUrl={voiceNote?.voiceNote}
                    voiceNoteId={voiceNote?._id}
                    isFavorite={voiceNote?.isFavorite}
                  />
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
            <NoRecord title="You don't have any voice notes." />
          )}
        </>
      )}
    </>
  );
}
