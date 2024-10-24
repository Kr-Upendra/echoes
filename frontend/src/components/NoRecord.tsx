type Props = { title: string; message?: string };

export default function NoRecord({ title, message }: Props) {
  return (
    <div className="mt-10 border border-green-500/10 shadow-2xl shadow-green-500/20 bg-black/80 flex justify-center items-center w-full px-4 py-16 rounded-lg">
      <div className="flex justify-center items-center">
        <h1 className="font-display text-lg">{title || "No records found."}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
