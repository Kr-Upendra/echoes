type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  error: string;
  checked?: boolean;
  isDisabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function CustomCheckbox({
  id,
  name,
  label,
  error,
  checked = false,
  isDisabled = false,
  onChange,
}: CheckboxProps) {
  return (
    <div className="mb-3.5 w-full flex items-center mt-7 lg:mt-3">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={isDisabled}
        onChange={onChange}
        className={`h-4 w-4 text-green-500 border rounded-md focus:ring-green-500 ${
          error ? "border-orange-900" : "border-gray-300"
        } ${isDisabled && "opacity-50 cursor-not-allowed"}`}
      />
      <label
        className="ml-2 text-sm font-medium text-gray-200 capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-sm text-orange-900">{error}</p>}
    </div>
  );
}
