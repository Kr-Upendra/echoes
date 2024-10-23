export default function Loading() {
  return (
    <div className="mt-10 border border-green-500/10 shadow-2xl shadow-green-500/20 bg-black/80 flex justify-center items-center w-full px-4 py-16 rounded-lg">
      <div className="text-center">
        <svg className="loading-svg" viewBox="25 25 50 50">
          <circle className="loading-circle" r="20" cy="50" cx="50"></circle>
        </svg>
        <p className="font-display text-green-600">
          Please wait we are loading things...
        </p>
      </div>
    </div>
  );
}
