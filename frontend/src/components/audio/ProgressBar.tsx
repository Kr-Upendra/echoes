import { formatTime } from "../../utils";

type Props = {
  handleProgress: (e: React.MouseEvent<HTMLDivElement>) => void;
  audioDuration: number;
  elapsedTime: number;
};

export default function ProgressBar({
  handleProgress,
  audioDuration,
  elapsedTime,
}: Props) {
  return (
    <div className="w-full">
      <div
        className="bg-gray-600 rounded-md cursor-pointer relative"
        onClick={handleProgress}
        style={{ height: "4px" }}
      >
        <div
          className="bg-green-500 h-full rounded-md"
          style={{
            width: `${(elapsedTime / audioDuration) * 100}%`,
            transition: "width 0.1s",
            position: "relative",
          }}
        />
        <div
          className="absolute bg-green-500 rounded-full"
          style={{
            width: "8px",
            height: "8px",
            left: `${(elapsedTime / audioDuration) * 100}%`,
            transform: "translate(-50%, -50%)",
            top: "50%",
          }}
        />
        {audioDuration < 0 ? (
          <span className="absolute left-0 font-display text-sm top-1.5">
            {formatTime(elapsedTime)} / {formatTime(Math.floor(audioDuration))}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
