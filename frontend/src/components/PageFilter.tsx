import { useState } from "react";
import DropDown from "./DropDown";
import CustomInput from "./form/CustomInput";

export default function PageFilter() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };
  return (
    <div className="py-4 px-4 sm:px-3 mt-5 flex items-center sm:flex-col sm:items-start shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5 rounded-lg">
      <DropDown
        options={["All", "Work", "Personal"]}
        selectedOption={selectedFilter}
        onOptionSelect={handleFilterChange}
        label="Filter"
      />
      <div className="w-full max-w-96 md:ml-4 sm:max-w-full sm:ml-0">
        <CustomInput
          label=""
          name=""
          id=""
          type="text"
          onchange={() => {}}
          error=""
          placeHolder="Search..."
        />
      </div>
    </div>
  );
}
