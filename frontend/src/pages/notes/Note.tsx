import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import PageTitle from "../../components/PageTitle";
import PageFilter from "../../components/PageFilter";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import { allNotes, categories } from "../../api";
import Card from "../../components/Card";
import Error from "../../components/Error";
import { INote } from "../../utils";
import NoRecord from "../../components/NoRecord";

export default function Note() {
  const { data: categoryData } = useQuery({
    queryKey: ["allCategories"],
    queryFn: categories,
  });

  let options = [];
  if (categoryData) {
    const categoriesList = categoryData?.data?.categories;
    options = categoriesList.map((item: any) => item.title);
    options.unshift("All");
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearchQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 800);
  const [category, setCategory] = useState<string>(initialCategory);

  useEffect(() => {
    setCurrentPage(initialPage);
    setSearchQuery(initialSearchQuery);
    setCategory(initialCategory);
  }, [searchParams]);

  useEffect(() => {
    const newParams: { [key: string]: string } = {};

    if (debouncedSearchQuery.length >= 3) {
      newParams.search = debouncedSearchQuery;
    }

    if (category && category !== "All") {
      newParams.category = category.toLowerCase();
    }

    if (currentPage > 1) {
      newParams.page = `${currentPage}`;
    }

    setSearchParams(newParams);
  }, [debouncedSearchQuery, currentPage, category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSelectedCategory = (newFilter: string) => {
    setCategory(newFilter);
    setCurrentPage(1);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["allNotes", currentPage, debouncedSearchQuery, category],
    queryFn: () =>
      allNotes({
        page: currentPage,
        search: debouncedSearchQuery,
        category: category !== "All" ? category : undefined,
      }),
    enabled:
      debouncedSearchQuery.length >= 3 || debouncedSearchQuery.length === 0, // Only run when search is valid
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
      <PageFilter
        handleQueryChange={handleChange}
        hasCategoryFilter={true}
        options={options}
        selectedCategory={category}
        handleSelectCategory={handleSelectedCategory}
      />
      <div className="mt-8">
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
              <NoRecord title="You have not added any memories yet." />
            )}
          </>
        )}
      </div>
    </>
  );
}
