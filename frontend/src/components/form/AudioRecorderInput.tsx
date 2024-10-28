import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaCircleStop, FaPause, FaPlay } from "react-icons/fa6";
import ProgressBar from "../audio/ProgressBar";
import AudioButton from "../audio/AudioButton";
import { formatTime } from "../../utils";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      const url = URL.createObjectURL(event.data);
      setAudioURL(url);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
    setPaused(false);
    setElapsedTime(0);
    startTimer();
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
    setPaused(false);
    stopTimer();
  };

  const pauseRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.pause();
      setPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.resume();
      setPaused(false);
      startTimer();
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const handleNewRecording = () => {
    setAudioURL("");
    setElapsedTime(0);
    startRecording();
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setElapsedTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setElapsedTime(audioDuration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / progressWidth) * audioDuration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setElapsedTime(newTime);
    }
  };

  return (
    <div className="mt-2 mb-3.5 w-full">
      <label className="block mb-1 text-sm font-medium text-gray-200 capitalize">
        Record Note
      </label>
      <div className="bg-black border rounded-md border-green-500/15 px-2 py-3">
        <div className="rounded-md mb-3 flex items-center justify-center h-16">
          <span className="text-sm font-display text-green-700">
            {recording
              ? "Recording..."
              : audioURL
              ? "Audio recorded. Play below."
              : "Click the button to start recording..."}
          </span>
        </div>
        <div className="text-center">
          {recording ? (
            <div className="text-center flex justify-center gap-x-2 items-center">
              <AudioButton
                handleClick={stopRecording}
                Icon={FaCircleStop}
                hasText={true}
                textValue={formatTime(elapsedTime)}
              />
              <AudioButton
                handleClick={paused ? resumeRecording : pauseRecording}
                Icon={paused ? FaPlay : FaPause}
              />
            </div>
          ) : audioURL ? (
            <div className="flex items-center gap-x-2">
              <audio
                controls
                ref={audioRef}
                src={audioURL}
                className="hidden"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded} // Attach the ended handler here
              />

              <ProgressBar
                handleProgress={handleProgressClick}
                audioDuration={audioDuration}
                elapsedTime={elapsedTime}
              />

              <AudioButton
                handleClick={handlePlayPause}
                Icon={isPlaying ? FaPause : FaPlay}
              />

              <AudioButton
                handleClick={handleNewRecording}
                Icon={FaMicrophone}
              />
            </div>
          ) : (
            <AudioButton handleClick={startRecording} Icon={FaMicrophone} />
          )}
        </div>
      </div>
    </div>
  );
}
