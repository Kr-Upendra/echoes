import { FaCheck } from "react-icons/fa6";

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
    <div className="mb-3.5 w-full flex items-center mt-6 lg:mt-3">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        className="hidden"
        disabled={isDisabled}
        onChange={onChange}
      />

      <label
        htmlFor={id}
        className={`cursor-pointer flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-sm transition-all duration-200 ease-in-out
          ${isDisabled && "bg-gray-100 cursor-not-allowed"}
          ${
            checked
              ? "bg-green-500 border-green-500"
              : "bg-white border-green-500"
          }`}
      >
        {checked && (
          <FaCheck className=" text-white transition-all duration-700 ease-in-out" />
        )}
      </label>

      <span className="ml-2 mb-1 text-sm font-medium text-gray-200 capitalize">
        {label}
      </span>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// type CheckboxProps = {
//   id: string;
//   name: string;
//   label: string;
//   error: string;
//   checked?: boolean;
//   isDisabled?: boolean;
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
// };

// export default function CustomCheckbox({
//   id,
//   name,
//   label,
//   error,
//   checked = false,
//   isDisabled = false,
//   onChange,
// }: CheckboxProps) {
//   return (
//     <div className="mb-3.5 w-full flex items-center lg:mt-3">
//       <input
//         type="checkbox"
//         id={id}
//         name={name}
//         checked={checked}
//         disabled={isDisabled}
//         onChange={onChange}
//         className={`h-4 w-4 text-green-500 border rounded-md focus:ring-green-500 ${
//           error ? "border-orange-900" : "border-gray-300"
//         } ${isDisabled && "opacity-50 cursor-not-allowed"}`}
//       />
//       <label
//         className="ml-2 text-sm font-medium text-gray-200 capitalize"
//         htmlFor={id}
//       >
//         {label}
//       </label>
//       {error && <p className="mt-1 text-sm text-orange-900">{error}</p>}
//     </div>
//   );
// }
