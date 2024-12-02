import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { CalendarView, JournalContainer } from "../../containers";
import { allJournals } from "../../api";
import { useState } from "react";

export default function Journal() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateString = selectedDate.toLocaleDateString("en-CA");
  const { data, isLoading, error } = useQuery({
    queryKey: ["journals", dateString],
    queryFn: () => allJournals({ date: dateString }),
    enabled: !!selectedDate,
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <PageTitle
        title="My Journals"
        buttonTitle="New Journal"
        hrefValue="create"
        isDisabled={data?.data?.total === 5}
      />
      <div className="mt-8 flex sm:flex-col gap-6">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            <JournalContainer journals={data?.data?.journals} />
            <CalendarView onDateChange={handleDateChange} />
          </>
        )}
      </div>
    </>
  );
}
