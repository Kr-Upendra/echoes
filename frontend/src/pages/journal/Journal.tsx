import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { CalendarView, JournalContainer } from "../../containers";
import { allJournals } from "../../api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCurrentDate } from "../../utils";

export default function Journal() {
  const todayDate = getCurrentDate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDate = searchParams.get("date") || todayDate;
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [searchParams]);

  useEffect(() => {
    const newParams: { [key: string]: string } = {};

    newParams.date = selectedDate;

    setSearchParams(newParams);
  }, [selectedDate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["journals", selectedDate],
    queryFn: () => allJournals({ date: selectedDate }),
    enabled: !!selectedDate,
  });

  const handleDateChange = (date: Date) => {
    const dateStr = date.toLocaleDateString("en-CA");
    setSelectedDate(dateStr);
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
