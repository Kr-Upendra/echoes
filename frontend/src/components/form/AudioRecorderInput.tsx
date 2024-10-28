// import { useState, useRef, useEffect } from "react";
// import { FaMicrophone } from "react-icons/fa";
// import { FaCircleStop, FaPause, FaPlay } from "react-icons/fa6";

// export default function AudioRecorder() {
//   const [recording, setRecording] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [audioURL, setAudioURL] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
//     null
//   );
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const recorder = new MediaRecorder(stream);

//     recorder.ondataavailable = (event) => {
//       const url = URL.createObjectURL(event.data);
//       setAudioURL(url);
//     };

//     recorder.start();
//     setMediaRecorder(recorder);
//     setRecording(true);
//     setPaused(false);
//     setElapsedTime(0);
//     startTimer();
//   };

//   const stopRecording = () => {
//     mediaRecorder?.stop();
//     setRecording(false);
//     setPaused(false);
//     stopTimer();
//   };

//   const pauseRecording = () => {
//     if (mediaRecorder) {
//       console.log("Pausing the recording...");
//       mediaRecorder.pause();
//       setPaused(true);
//       stopTimer();
//       console.log("Recording paused:", mediaRecorder.state);
//     }
//   };

//   const resumeRecording = () => {
//     if (mediaRecorder) {
//       console.log("Resuming the recording...");
//       mediaRecorder.resume();
//       setPaused(false);
//       startTimer();
//       console.log("Recording resumed:", mediaRecorder.state);
//     }
//   };

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setElapsedTime((prev) => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopTimer();
//     };
//   }, []);

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   return (
//     <div className="mt-2 mb-3.5 w-full">
//       <label className="block mb-1 text-sm font-medium text-gray-200 capitalize">
//         Record Note
//       </label>
//       <div className="bg-black border rounded-md  border-green-500/15 px-2 py-3">
//         <div className="rounded-md mb-3 flex items-center justify-center h-16">
//           <span className="text-sm font-display text-green-700">
//             {recording
//               ? "Recording..."
//               : "Click the button to start recording..."}
//           </span>
//         </div>
//         <div className="text-center">
//           {recording ? (
//             <div className="text-center flex justify-center gap-x-2 items-center">
//               <button
//                 type="button"
//                 onClick={stopRecording}
//                 className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full flex items-center gap-x-2"
//               >
//                 <FaCircleStop className="text-white text-2xl mx-auto" />
//                 <span className="font-display text-white tracking-wider">
//                   {formatTime(elapsedTime)}
//                 </span>
//               </button>
//               <button
//                 type="button"
//                 onClick={paused ? resumeRecording : pauseRecording}
//                 className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
//               >
//                 {paused ? (
//                   <FaPlay className="text-white text-2xl mx-auto" />
//                 ) : (
//                   <FaPause className="text-white text-2xl mx-auto" />
//                 )}
//               </button>
//             </div>
//           ) : (
//             <button
//               type="button"
//               onClick={startRecording}
//               className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
//             >
//               <FaMicrophone className="text-white text-2xl mx-auto" />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { FaMicrophone } from "react-icons/fa";
// import { FaCircleStop, FaPause, FaPlay } from "react-icons/fa6";

// export default function AudioRecorder() {
//   const [recording, setRecording] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [audioURL, setAudioURL] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
//     null
//   );
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [audioDuration, setAudioDuration] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const recorder = new MediaRecorder(stream);

//     recorder.ondataavailable = (event) => {
//       const url = URL.createObjectURL(event.data);
//       setAudioURL(url);
//     };

//     recorder.start();
//     setMediaRecorder(recorder);
//     setRecording(true);
//     setPaused(false);
//     setElapsedTime(0);
//     startTimer();
//   };

//   const stopRecording = () => {
//     mediaRecorder?.stop();
//     setRecording(false);
//     setPaused(false);
//     stopTimer();
//   };

//   const pauseRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.pause();
//       setPaused(true);
//       stopTimer();
//     }
//   };

//   const resumeRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.resume();
//       setPaused(false);
//       startTimer();
//     }
//   };

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setElapsedTime((prev) => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopTimer();
//     };
//   }, []);

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   const handleNewRecording = () => {
//     setAudioURL(""); // Reset the audio URL for a new recording
//     startRecording(); // Start a new recording
//   };

//   const handlePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying((prev) => !prev);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       setElapsedTime(Math.floor(audioRef.current.currentTime));
//       setAudioDuration(audioRef.current.duration);
//     }
//   };

//   const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const progressBar = e.currentTarget;
//     const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
//     const progressWidth = progressBar.offsetWidth;
//     const newTime = (clickPosition / progressWidth) * audioDuration;

//     if (audioRef.current) {
//       audioRef.current.currentTime = newTime;
//       setElapsedTime(newTime);
//     }
//   };

//   return (
//     <div className="mt-2 mb-3.5 w-full">
//       <label className="block mb-1 text-sm font-medium text-gray-200 capitalize">
//         Record Note
//       </label>
//       <div className="bg-black border rounded-md border-green-500/15 px-2 py-3">
//         <div className="rounded-md mb-3 flex items-center justify-center h-16">
//           <span className="text-sm font-display text-green-700">
//             {recording
//               ? "Recording..."
//               : audioURL
//               ? "Audio recorded. Play below."
//               : "Click the button to start recording..."}
//           </span>
//         </div>
//         <div className="text-center">
//           {recording ? (
//             <div className="text-center flex justify-center gap-x-2 items-center">
//               <button
//                 type="button"
//                 onClick={stopRecording}
//                 className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full flex items-center gap-x-2"
//               >
//                 <FaCircleStop className="text-white text-2xl mx-auto" />
//                 <span className="font-display text-white tracking-wider">
//                   {formatTime(elapsedTime)}
//                 </span>
//               </button>
//               <button
//                 type="button"
//                 onClick={paused ? resumeRecording : pauseRecording}
//                 className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
//               >
//                 {paused ? (
//                   <FaPlay className="text-white text-2xl mx-auto" />
//                 ) : (
//                   <FaPause className="text-white text-2xl mx-auto" />
//                 )}
//               </button>
//             </div>
//           ) : audioURL ? (
//             <div className="flex items-center gap-x-2">
//               <audio
//                 controls
//                 ref={audioRef}
//                 src={audioURL}
//                 className="hidden"
//                 onTimeUpdate={handleTimeUpdate}
//                 onLoadedMetadata={() => {
//                   if (audioRef.current) {
//                     setAudioDuration(audioRef.current.duration);
//                   }
//                 }}
//               />

//               <div className="w-full">
//                 <div
//                   className="bg-gray-600 rounded-md cursor-pointer relative"
//                   onClick={handleProgressClick}
//                   style={{ height: "4px" }}
//                 >
//                   <div
//                     className="bg-green-500 h-full rounded-md"
//                     style={{
//                       width: `${(elapsedTime / audioDuration) * 100}%`,
//                       transition: "width 0.1s",
//                       position: "relative",
//                     }}
//                   />
//                   <div
//                     className="absolute bg-green-500 rounded-full"
//                     style={{
//                       width: "8px",
//                       height: "8px",
//                       left: `${(elapsedTime / audioDuration) * 100}%`,
//                       transform: "translate(-50%, -50%)",
//                       top: "50%",
//                     }}
//                   />
//                   <span className="absolute left-0 font-display text-sm top-1.5">
//                     {formatTime(elapsedTime)} /{" "}
//                     {formatTime(Math.floor(audioDuration))}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={handlePlayPause}
//                 className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
//               >
//                 {isPlaying ? (
//                   <FaPause className="text-white text-2xl mx-auto" />
//                 ) : (
//                   <FaPlay className="text-white text-2xl mx-auto" />
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNewRecording}
//                 className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
//               >
//                 <FaMicrophone className="text-white text-2xl mx-auto" />
//               </button>
//             </div>
//           ) : (
//             <button
//               type="button"
//               onClick={startRecording}
//               className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
//             >
//               <FaMicrophone className="text-white text-2xl mx-auto" />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

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

  //   const formatTime = (seconds: number) => {
  //     const minutes = Math.floor(seconds / 60);
  //     const secs = seconds % 60;
  //     return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
  //       2,
  //       "0"
  //     )}`;
  //   };

  const handleNewRecording = () => {
    setAudioURL(""); // Reset the audio URL for a new recording
    setElapsedTime(0); // Reset elapsed time
    startRecording(); // Start a new recording
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
              {/* <button
                type="button"
                onClick={stopRecording}
                className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full flex items-center gap-x-2"
              >
                <FaCircleStop className="text-white text-2xl mx-auto" />
                <span className="font-display text-white tracking-wider">
                  {formatTime(elapsedTime)}
                </span>
              </button> */}
              {/* <button
                type="button"
                onClick={paused ? resumeRecording : pauseRecording}
                className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
              >
                {paused ? (
                  <FaPlay className="text-white text-2xl mx-auto" />
                ) : (
                  <FaPause className="text-white text-2xl mx-auto" />
                )}
              </button> */}
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
                onLoadedMetadata={handleLoadedMetadata} // Update duration here
              />

              <ProgressBar
                handleProgress={handleProgressClick}
                audioDuration={audioDuration}
                elapsedTime={elapsedTime}
              />

              <button
                type="button"
                onClick={handlePlayPause}
                className="p-2.5 sm:p-2 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
              >
                {isPlaying ? (
                  <FaPause className="text-white text-2xl mx-auto sm:text-xl" />
                ) : (
                  <FaPlay className="text-white text-2xl mx-auto sm:text-xl" />
                )}
              </button>
              <button
                type="button"
                onClick={handleNewRecording}
                className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
              >
                <FaMicrophone className="text-white text-2xl mx-auto" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={startRecording}
              className="p-2.5 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full"
            >
              <FaMicrophone className="text-white text-2xl mx-auto" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
