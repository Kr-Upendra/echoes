import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { CalendarView, JournalContainer } from "../../containers";
import { allJournals } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Journal() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data, isLoading, error } = useQuery({
    queryKey: ["journals"],
    queryFn: () => allJournals({ date: selectedDate }),
    enabled: !!selectedDate,
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);

    if (date.toDateString() !== new Date().toDateString()) {
      const formattedDate = date.toISOString().split("T")[0];
      navigate(`/journals?date=${formattedDate}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");

    if (dateParam) {
      setSelectedDate(new Date(dateParam));
    }
  }, []);

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
