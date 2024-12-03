type Props = {
  title: string;
  isDisabled: boolean;
  isWorking: boolean;
  workingTitle: string;
};

export default function SubmitButton({
  title,
  isDisabled,
  isWorking,
  workingTitle,
}: Props) {
  return (
    <button
      disabled={isDisabled || isWorking}
      className={`w-full text-center py-2 rounded-full text-white font-display mt-1.5 ${
        isDisabled || isWorking
          ? "bg-green-900 cursor-default"
          : "cursor-pointer bg-gradient-to-tr from-green-700 via-green-800 to-green-700"
      }`}
      type="submit"
    >
      {isWorking ? workingTitle : title}
    </button>
  );
}
