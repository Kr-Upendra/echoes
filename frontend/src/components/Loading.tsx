export default function Loading() {
  return (
    <div className="w-full px-4 py-8 rounded-lg shadow-2xl bg-black/80 text-center">
      <h2 className="font-display text-xl text-green-500 mb-2">Loading...</h2>
      <p className="font-display text-green-800">
        Please wait while we fetch your data.
      </p>
    </div>
  );
}
