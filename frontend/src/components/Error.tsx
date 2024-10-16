type Props = { error: any };

export default function Error({ error }: Props) {
  return (
    <div className="w-full px-4 py-8 rounded-lg shadow-2xl shadow-green-500/20 bg-black/80">
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
