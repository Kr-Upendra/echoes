type Props = { title: string; message?: string };

export default function NoRecord({ title, message }: Props) {
  return (
    <div className="mt-5 py-32 rounded-lg">
      <div className="flex justify-center items-center">
        <h1 className="font-display text-lg">{title || "No records found."}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
