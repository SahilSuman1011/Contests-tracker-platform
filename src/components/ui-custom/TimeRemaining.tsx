
import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimeRemainingProps {
  startTime: string;
  className?: string;
  compact?: boolean;
}

export function TimeRemaining({ startTime, className = "", compact = false }: TimeRemainingProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(startTime));
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (timeLeft.total <= 0) {
      setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      const updated = getTimeRemaining(startTime);
      setTimeLeft(updated);
      if (updated.total <= 0) {
        setIsRunning(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, timeLeft.total]);

  if (!isRunning) {
    return (
      <div className={`inline-flex items-center text-green-500 font-medium ${className}`}>
        <Clock className="w-4 h-4 mr-1" />
        Started
      </div>
    );
  }

  if (compact) {
    if (timeLeft.days > 0) {
      return (
        <div className={`inline-flex items-center text-muted-foreground ${className}`}>
          <Clock className="w-4 h-4 mr-1" />
          {timeLeft.days}d {timeLeft.hours}h
        </div>
      );
    }
    return (
      <div className={`inline-flex items-center ${className} ${timeLeft.hours < 2 ? "text-orange-500" : "text-muted-foreground"}`}>
        <Clock className="w-4 h-4 mr-1" />
        {timeLeft.hours}h {timeLeft.minutes}m
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
      <div className="flex gap-1">
        <span className={`${timeLeft.days > 0 ? "" : "hidden"} ${timeLeft.days < 1 ? "text-orange-500" : ""}`}>
          <span className="font-medium">{timeLeft.days}</span>d
        </span>
        <span className={timeLeft.hours < 5 && timeLeft.days === 0 ? "text-orange-500" : ""}>
          <span className="font-medium">{timeLeft.hours}</span>h
        </span>
        <span className={timeLeft.hours === 0 && timeLeft.minutes < 30 ? "text-orange-500" : ""}>
          <span className="font-medium">{timeLeft.minutes}</span>m
        </span>
        <span className={timeLeft.hours === 0 && timeLeft.minutes < 5 ? "text-orange-500" : ""}>
          <span className="font-medium">{timeLeft.seconds}</span>s
        </span>
      </div>
    </div>
  );
}
