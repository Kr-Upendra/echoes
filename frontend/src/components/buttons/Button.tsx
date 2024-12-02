type Props = {
  title: string;
  isDisabled?: boolean;
  onclick?: () => void;
  extraStyle?: string;
};

export default function Button({
  title,
  isDisabled = false,
  onclick,
  extraStyle,
}: Props) {
  return (
    <button
      disabled={isDisabled}
      onClick={onclick}
      className={`border py-2 px-6 border-green-500 text-green-500 font-display tracking-wider rounded-full hover:bg-green-600 hover:text-white transition-color duration-300 ${extraStyle}`}
    >
      {title}
    </button>
  );
}
