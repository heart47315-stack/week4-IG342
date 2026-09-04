import { useEffect, useRef, useState } from "react";

function CookingTimer({ initialMinutes }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const previousSeconds = useRef(initialMinutes * 60);

  const playFinishedSound = () => {
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.2);
    gain.gain.setValueAtTime(0.25, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.8);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0 && previousSeconds.current > 0) {
      playFinishedSound();
    }
    previousSeconds.current = seconds;
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const resetTimer = () => {
    setSeconds(initialMinutes * 60);
    previousSeconds.current = initialMinutes * 60;
    setIsRunning(false);
  };

  const progress =
    ((initialMinutes * 60 - seconds) /
      (initialMinutes * 60)) *
    100;

  return (
    <div className="timer">
      <div className="timer-title">
        ⏱️ Cooking Timer
      </div>

      <div className="timer-display">
        {String(minutes).padStart(2, "0")}:
        {String(remainingSeconds).padStart(2, "0")}
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="timer-buttons">
        <button
          className="start-button"
          onClick={() => setIsRunning(!isRunning)}
          disabled={seconds === 0}
        >
          {isRunning ? "⏸ หยุด" : "▶ เริ่ม"}
        </button>

        <button
          className="reset-button"
          onClick={resetTimer}
        >
          ↻ รีเซ็ต
        </button>
      </div>

      {seconds === 0 && (
        <div className="timer-finished">
          🔔 หมดเวลาแล้ว!
        </div>
      )}
    </div>
  );
}

export default CookingTimer;