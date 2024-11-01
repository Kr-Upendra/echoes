import React, { useEffect, useRef } from "react";

interface WaveformProps {
  audioStream: MediaStream | null;
  recording: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ audioStream, recording }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (audioStream && recording) {
      audioContext.current = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.current.createMediaStreamSource(audioStream);
      analyser.current = audioContext.current.createAnalyser();
      source.connect(analyser.current);
      analyser.current.fftSize = 2048;

      const draw = () => {
        const canvas = canvasRef.current;
        if (canvas && analyser.current) {
          const ctx: any = canvas.getContext("2d");
          const bufferLength = analyser.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          analyser.current.getByteTimeDomainData(dataArray);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          const sliceWidth = (canvas.width * 1.0) / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0; // normalize to [0, 1]
            const y = (v * canvas.height) / 2; // scale to canvas height
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.strokeStyle = "rgba(0, 255, 0, 0.5)"; // green color
          ctx.stroke();
        }
        if (recording) {
          requestAnimationFrame(draw);
        }
      };

      draw();
    }

    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [audioStream, recording]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Waveform;
