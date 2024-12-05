import CustomInput from "./form/CustomInput";
type Props = {
  handleQueryChange: React.ChangeEventHandler<HTMLInputElement>;
  handleDateChange?: React.ChangeEventHandler<HTMLInputElement>;
  currentDateValue?: string;
};

export default function PageFilter({ handleQueryChange }: Props) {
  return (
    <div className="py-4 px-4 sm:px-3 mt-5 flex items-center gap-5 sm:gap-0 sm:flex-col sm:items-start shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5 rounded-lg">
      <div className="w-full">
        <CustomInput
          label=""
          name="search"
          id="searchQuery"
          type="text"
          onchange={handleQueryChange}
          error=""
          placeHolder="Search..."
        />
      </div>
      {/* <div className="min-w-60 sm:w-full">
        <CustomInput
          name="date"
          id="search-date"
          type="date"
          onchange={handleDateChange}
          error=""
          label=""
          value={currentDateValue}
          max={todayDate}
        />
      </div> */}
    </div>
  );
}
