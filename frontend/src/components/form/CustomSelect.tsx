type SelectProps = {
  id: string;
  name: string;
  label: string;
  error: string;
  value?: string;
  isDisabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[]; // Array of options for the select
};

export default function CustomSelect({
  id,
  name,
  label,
  error,
  value,
  isDisabled = false,
  onChange,
  options,
}: SelectProps) {
  return (
    <div className="mt-2 mb-3.5 w-full">
      <label
        className="block mb-1 text-sm font-medium text-gray-200 capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        disabled={isDisabled}
        onChange={onChange}
        className={`w-full text-green-500 font-display px-2 py-3 outline-none bg-black border rounded-md ${
          error ? "border-orange-900" : "border-green-500/15"
        } ${isDisabled && "bg-green-800/5"}`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-orange-900">{error}</p>}
    </div>
  );
}
