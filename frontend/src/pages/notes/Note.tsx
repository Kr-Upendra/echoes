import PageTitle from "../../components/PageTitle";
import PageFilter from "../../components/PageFilter";
import Card from "../../components/Card";
import { useState } from "react";
import Pagination from "../../components/Pagination";

export default function Note() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    console.log("Page changed to: ", page);
    setCurrentPage(page);
  };
  return (
    <section className="base-paddings">
      <main className="pt-20 pb-10">
        <PageTitle title="My Notes" buttonTitle="New Note" hrefValue="create" />
        <PageFilter />
        <>
          <div className="grid grid-cols-4 gap-4 sm:gap-2.5 xs:gap-x-1.5 mt-5 lg:grid-cols-3 md:grid-cols-2">
            {Array.from({ length: 12 }).map((_, index: number) => (
              <Card
                title=""
                content=""
                category=""
                tags={["Fun", "Enjoy", "Life"]}
                isFavorite={false}
                key={index}
              />
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
        {/* <NoRecord title="" /> */}
      </main>
    </section>
  );
}
