import { useState } from "react";
import DropDown from "./DropDown";
import CustomInput from "./form/CustomInput";

type Props = {
  handleQueryChange: React.ChangeEventHandler<HTMLInputElement>;
  options: string[];
  selectedCategory: string;
  handleSelectCategory: (option: string) => void;
};

export default function PageFilter({
  handleQueryChange,
  options,
  selectedCategory,
  handleSelectCategory,
}: Props) {
  // const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // const handleFilterChange = (newFilter: string) => {
  //   setSelectedFilter(newFilter);
  // };
  return (
    <div className="py-4 px-4 sm:px-3 mt-5 flex items-center sm:flex-col sm:items-start shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5 rounded-lg">
      <DropDown
        options={options}
        selectedOption={selectedCategory}
        onOptionSelect={handleSelectCategory}
        label="Filter"
      />
      <div className="w-full max-w-96 md:ml-4 sm:max-w-full sm:ml-0">
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
    </div>
  );
}
