import { useEffect, useState } from "react";

type TCountdownTimerProps = {
  endTime: string | Date;
};

const Timer = ({ endTime }: TCountdownTimerProps) => {
  const calculateTimeLeft = () => {
    const end = new Date(endTime).getTime(); // ensure it's a number
    const now = new Date().getTime();
    const difference = end - now;

    const timeLeft = {
      days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
    };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-3">
      {/* days */}
      <div className="days flex flex-col items-center">
        <h2 className="text-xs font-medium text-[var(--color-black)]">Days</h2>
        <p className="text-xl font-bold text-[var(--color-black)]">
          {" "}
          {timeLeft.days}
        </p>
      </div>
      {/* divider div */}
      <div className="h-8 w-0.5 bg-[var(--color-blue)]"></div>
      <div className="hours flex flex-col items-center">
        {/* hours */}
        <h2 className="text-xs font-medium text-[var(--color-black)]">Hours</h2>
        <p className="text-xl font-bold text-[var(--color-black)]">
          {" "}
          {timeLeft.hours}
        </p>
      </div>
      {/* divider div */}
      <div className="h-8 w-0.5 bg-[var(--color-blue)]"></div>
      <div className="minutes flex flex-col items-center">
        {/* minutes */}
        <h2 className="text-xs font-medium text-[var(--color-black)]">
          Minutes
        </h2>
        <p className="text-xl font-bold text-[var(--color-black)]">
          {" "}
          {timeLeft.minutes}
        </p>
      </div>
      {/* divider div */}
      <div className="h-8 w-0.5 bg-[var(--color-blue)]"></div>
      <div className="seconds flex flex-col items-center">
        {/* seconds */}
        <h2 className="text-xs font-medium text-[var(--color-black)]">
          Seconds
        </h2>
        <p className="text-xl font-bold text-[var(--color-black)]">
          {" "}
          {timeLeft.seconds}
        </p>
      </div>
    </div>
  );
};

export default Timer;
