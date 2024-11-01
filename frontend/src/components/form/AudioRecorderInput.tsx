import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaCircleStop, FaPause, FaPlay } from "react-icons/fa6";
import ProgressBar from "../audio/ProgressBar";
import AudioButton from "../audio/AudioButton";
import { formatTime, warnAlert } from "../../utils";
import Waveform from "../WaveForm";

type Props = { error?: string; audioUrl: string; setAudioUrl: any };

export default function AudioRecorder({ error, audioUrl, setAudioUrl }: Props) {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        const url = URL.createObjectURL(event.data);
        setAudioUrl(url);
      };
      setAudioStream(stream);
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
      setPaused(false);
      setElapsedTime(0);
      startTimer();
    } catch (error) {
      warnAlert("Error accessing microphone.");
      console.error("Error accessing microphone:", error);
    }
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
    setAudioUrl("");
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

  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  // useEffect(() => {
  //   return () => {
  //     stopTimer();
  //     mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
  //   };
  // }, [mediaRecorder]);

  return (
    <div className="mt-2 mb-3.5 w-full">
      <label className="block mb-1 text-sm font-medium text-gray-200 capitalize">
        Record Note
      </label>
      <div
        className={`bg-black border rounded-md px-3 py-3 ${
          error ? "border-orange-900" : "border-green-500/15"
        }`}
      >
        <div className="rounded-md mb-3 flex items-center justify-center h-16">
          {recording ? (
            <Waveform audioStream={audioStream} recording={recording} />
          ) : audioUrl ? (
            <span className="text-sm font-display text-green-700">
              Audio recorded. Play below.
            </span>
          ) : (
            <span className="text-sm font-display text-green-700">
              Audio recorded. Play below.
            </span>
          )}
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
          ) : audioUrl ? (
            <div className="flex items-center gap-x-2">
              <audio
                controls
                ref={audioRef}
                src={audioUrl}
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
