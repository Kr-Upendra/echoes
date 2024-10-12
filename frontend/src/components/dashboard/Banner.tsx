type Props = { username: string };

export default function Banner({ username }: Props) {
  return (
    <div className="h-48 sm:h-28 p-4 rounded-xl flex justify-center items-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mb-6 bg-gradient-to-r from-green-800 via-green-600 to-green-800">
      <h1 className="text-6xl lg:text-4xl sm:text-3xl xs:text-2xl text-white font-display">
        Welcome back, {username}
      </h1>
    </div>
  );
}
