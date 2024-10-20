import { useState } from "react";

type DropDownProps = {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  label?: string;
};

export default function DropDown({
  options,
  selectedOption,
  onOptionSelect,
  label = "Select",
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onOptionSelect(option); // Call the parent's handler to update selected option
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="flex items-center gap-x-2 mr-auto">
      {/* Optional label */}
      <span className="font-display text-white">{label}:</span>

      <div className="relative">
        {/* Dropdown Button */}
        <div
          className="font-display border py-1 px-4 rounded-full border-green-500 text-green-500 hover:text-white hover:bg-green-500 cursor-pointer duration-300 transition-colors flex items-center justify-between w-36"
          onClick={toggleDropdown}
        >
          <span>{selectedOption}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full bg-black rounded-lg border border-green-500/20 p-1">
            {options.map((option) => (
              <div
                key={option}
                className={`px-4 py-2 cursor-pointer my-0.5 rounded-lg hover:bg-green-700 hover:text-white text-green-500 transition-colors ${
                  option === selectedOption
                    ? "bg-green-700 text-white"
                    : "bg-black"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
