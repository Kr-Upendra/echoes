type Props = {
  id: string;
  placeHolder?: string;
  name: string;
  label: string;
  error: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function CustomTextArea({
  id,
  placeHolder,
  name,
  label,
  error,
  onChange,
}: Props) {
  return (
    <div className="mt-2 mb-3.5 w-full">
      <label
        className="block mb-1 text-sm font-medium text-gray-200 capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        name={name}
        rows={5}
        placeholder={placeHolder}
        id={id}
        onChange={onChange}
        className={`w-full text-green-500 font-display px-2 py-3 outline-none placeholder:font-body bg-black border rounded-md ${
          error ? "border-orange-900" : "border-green-500/15"
        }`}
      ></textarea>
    </div>
  );
}
