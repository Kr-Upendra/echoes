import { useSearchParams } from "react-router-dom";
import NoRecord from "../../components/NoRecord";
import { getCurrentDate, IJournalData } from "../../utils";
import { JournalCard } from "./JournalCard";

type Props = { journals: IJournalData[] };

export default function JournalContainer({ journals }: Props) {
  const todayDate = getCurrentDate();
  const [searchParams, _] = useSearchParams();
  const date = searchParams.get("date");

  return (
    <>
      <div className="h-full w-2/3 sm:w-full md:w-1/2 rounded-md">
        {journals && journals.length <= 0 ? (
          <NoRecord
            containerStyle="mt-0 h-full"
            title={`No journal found for ${date}`}
            hasUrl={todayDate === date}
            buttonTitle="Add New Journal"
            hrefValue="/journals/create"
          />
        ) : (
          <JournalCard journals={journals} />
        )}
      </div>
    </>
  );
}
