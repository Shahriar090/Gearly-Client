import { useEffect, useState } from "react";
import { formatTime } from "./TimeFormat";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="text-sm font-medium text-white p-2 rounded-sm bg-gradient-to-r from-green-400 to-green-600">
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
