type Props = { error: any };

export default function Error({ error }: Props) {
  return (
    <div className="mt-10 border border-green-500/10 shadow-2xl shadow-green-500/20 bg-black/80 flex justify-center items-center w-full px-4 py-16 rounded-lg">
      <div className="text-center">
        <h2 className="font-display text-xl text-orange-500 mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="font-display text-orange-800">
          {error?.message ||
            "An unexpected error has occurred. Please try again later."}
        </p>
      </div>
    </div>
  );
}
