type Props = {
  id: string;
  placeHolder: string;
  name: string;
  type: string;
  label: string;
  error: string;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function CustomInput({
  id,
  placeHolder,
  name,
  type,
  label,
  error,
}: Props) {
  return (
    <div className="mt-2 mb-3.5">
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
        className={`w-full text-green-500 font-display px-2 py-3 outline-none placeholder:font-body bg-black border rounded-md ${
          error ? "border-orange-900" : "border-gray-900"
        }`}
      />
    </div>
  );
}
