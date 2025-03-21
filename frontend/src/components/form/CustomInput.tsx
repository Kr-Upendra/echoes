type Props = {
  id: string;
  placeHolder?: string;
  name: string;
  type?: string;
  label: string;
  error: string | null;
  value?: string;
  isDisabled?: boolean;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
  max?: string;
};

export default function CustomInput({
  id,
  placeHolder,
  name,
  type = "text",
  label,
  error,
  value,
  isDisabled = false,
  onchange,
  max,
}: Props) {
  return (
    <div className="mt-2 mb-3.5 w-full">
      <label
        className="block mb-1 text-sm font-medium text-gray-200 capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeHolder}
        value={value}
        disabled={isDisabled}
        onChange={onchange}
        className={`w-full text-green-500 font-display px-2 py-3 outline-none placeholder:font-body bg-black border rounded-md focus:border-green-500/50 ${
          error ? "border-orange-900" : "border-green-500/15"
        } ${isDisabled && "bg-green-800/5"}`}
        max={max}
      />
    </div>
  );
}
