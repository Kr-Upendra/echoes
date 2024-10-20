type Props = { title: string; isDisabled?: boolean };

export default function Button({ title, isDisabled = false }: Props) {
  return (
    <button
      disabled={isDisabled}
      className="border py-2 px-6 border-green-500 text-green-500 font-display tracking-wider rounded-full hover:bg-green-600 hover:text-white transition-color duration-300"
    >
      {title}
    </button>
  );
}
