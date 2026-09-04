import { useEffect, useState } from "react";

function CookingTimer({ initialMinutes }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

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
    setSeconds(initialMinutes * 60);
    setIsRunning(false);
  }, [initialMinutes]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const resetTimer = () => {
    setSeconds(initialMinutes * 60);
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