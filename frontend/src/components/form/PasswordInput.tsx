import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { GoEyeClosed } from "react-icons/go";
import IconButton from "../buttons/IconButton";

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
};

export default function PasswordInput({
  id,
  placeHolder,
  name,
  type = "password",
  label,
  error,
  value,
  isDisabled = false,
  onchange,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="mt-2 mb-3.5 w-full">
      <label
        className="block mb-1 text-sm font-medium text-gray-200 capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={`flex justify-center items-center w-full border focus:border-green-500/50 rounded-md  ${
          error ? "border-orange-900" : "border-green-500/15"
        } ${isDisabled && "bg-green-800/5"}`}
      >
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={id}
          placeholder={placeHolder}
          value={value}
          disabled={isDisabled}
          onChange={onchange}
          className={`w-full text-green-500 font-display px-2 py-3 outline-none placeholder:font-body bg-black rounded-l-lg border border-green-500/15 focus:border-green-500/50`}
        />
        <IconButton
          icon={showPassword ? GoEyeClosed : BsEye}
          onClick={() => setShowPassword(!showPassword)}
          buttonStyle={"px-3 cursor-pointer py-3"}
        />
      </div>
    </div>
  );
}
