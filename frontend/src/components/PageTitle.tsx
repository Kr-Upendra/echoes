import Button from "./buttons/Button";

type Props = { title: string; buttonTitle: string; buttonFn?: () => void };

export default function PageTitle({ title, buttonTitle, buttonFn }: Props) {
  return (
    <div className="flex items-center justify-between py-6 px-4 sm:px-3 bg-gradient-to-l from-green-950 to-green-600 rounded-lg shadow-2xl shadow-green-500/10">
      <h1 className="text-white font-display text-xl">{title}</h1>
      <Button title={buttonTitle} onclick={buttonFn} />
    </div>
  );
}
