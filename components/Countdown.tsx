import React, { useEffect, useState } from "react";
import { UserData, TimeBreakdown } from "../types";
import {
  calculateTimeLeft,
  formatNumber,
  formatLargeNumber,
} from "../utils/timeUtils";

interface CountdownProps {
  userData: UserData;
}

export const Countdown: React.FC<CountdownProps> = ({ userData }) => {
  const [timeLeft, setTimeLeft] = useState<TimeBreakdown>(
    calculateTimeLeft(userData)
  );
  const [tick, setTick] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(userData));
      setTick((t) => !t); // Toggle for colon blinking effect
    }, 1000);

    return () => clearInterval(timer);
  }, [userData]);

  // Determine alert levels based on percentage of life lived (approximate)
  // This is purely visual feedback
  const isTimeUp = timeLeft.totalSeconds <= 0;

  if (isTimeUp) {
    return (
      <div className="text-center animate-pulse">
        <h1 className="font-digital text-6xl md:text-9xl text-red-600 text-glow-red tracking-widest">
          00:00:00
        </h1>
        <p className="mt-8 text-red-800 font-digital uppercase tracking-[0.5em]">
          Time Expired
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Primary Display: Total Seconds */}
      <div className="mb-12 text-center group">
        <h2 className="text-red-900 text-xs md:text-sm uppercase tracking-[0.5em] font-digital font-medium mb-2">
          Total Seconds Remaining
        </h2>
        <div className="relative">
          <div className="font-digital text-[10vw] leading-none text-red-500 text-glow-red transition-all duration-1000 tabular-nums">
            {formatLargeNumber(timeLeft.totalSeconds)}
          </div>
        </div>
      </div>

      {/* Secondary Display: Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 w-full max-w-3xl">
        <Segment label="Years" value={timeLeft.years} />
        <Segment label="Days" value={timeLeft.days} />
        <Segment label="Hours" value={timeLeft.hours} />
        <Segment label="Minutes" value={timeLeft.minutes} />
      </div>

      {/* Seconds running standalone at bottom */}
      <div className="mt-6 sm:mt-8 w-full flex flex-col items-center">
        <div className="font-digital text-xl sm:text-2xl md:text-4xl text-red-500/80 text-glow-dim tabular-nums">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-red-900/50 text-[8px] sm:text-[10px] uppercase tracking-widest font-digital mt-1">
          Seconds
        </span>
      </div>
    </div>
  );
};

const Segment: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col items-center p-4 border border-red-900/20 bg-red-950/5 rounded-sm backdrop-blur-sm">
    <span className="font-digital text-3xl md:text-4xl text-red-500 text-glow-dim tabular-nums">
      {formatNumber(value)}
    </span>
    <span className="text-red-900 text-[10px] uppercase tracking-widest font-digital mt-2">
      {label}
    </span>
  </div>
);
