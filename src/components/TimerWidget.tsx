import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, Play, RotateCcw } from 'lucide-react';

export const TimerWidget: React.FC = () => {
  // Initialized to 20:10 (1210 seconds) matching screenshot
  const [secondsLeft, setSecondsLeft] = useState(1210);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(1210);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <div className="widget-gradient-timer rounded-3xl p-5 text-gray-900 dark:text-white flex flex-col justify-between h-[155px] shadow-sm relative overflow-hidden group">
      {/* Background glow circle */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/20 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-black/10 dark:bg-white/10 rounded-xl backdrop-blur-xs">
            <TimerIcon className="w-4 h-4 text-gray-900 dark:text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">Timer</span>
        </div>

        <button
          onClick={resetTimer}
          title="Reset timer to 20:10"
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Clock & Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="text-3xl font-extrabold tracking-tight font-mono">
          {formattedTime}
        </div>

        <button
          onClick={toggleTimer}
          title={isActive ? 'Pause timer' : 'Start timer'}
          className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 active:scale-95 text-white flex items-center justify-center shadow-md shadow-rose-500/30 transition-all cursor-pointer"
        >
          {isActive ? (
            <div className="w-3.5 h-3.5 bg-white rounded-xs" />
          ) : (
            <Play className="w-4 h-4 fill-white translate-x-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};
