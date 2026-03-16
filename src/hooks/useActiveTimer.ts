import { useState, useEffect, useRef } from "react";
import { SafeStorage } from "@/utils/SafeStorage";

export function useActiveTimer(problemId: string): number {
  const [elapsed, setElapsed] = useState(0);
  const activeRef = useRef(true),
    intervalRef = useRef<ReturnType<typeof setInterval> | null>(null),
    startRef = useRef(Date.now()),
    accRef = useRef(0);

  useEffect(() => {
    accRef.current = SafeStorage.get<number>(`dsa-timer-${problemId}`, 0) ?? 0;
    setElapsed(accRef.current);
    startRef.current = Date.now();
    activeRef.current = true;
    intervalRef.current = setInterval(() => {
      if (activeRef.current)
        setElapsed(
          accRef.current + Math.floor((Date.now() - startRef.current) / 1000)
        );
    }, 1000);
    const vis = () => {
      if (document.hidden) {
        accRef.current += Math.floor((Date.now() - startRef.current) / 1000);
        activeRef.current = false;
      } else {
        startRef.current = Date.now();
        activeRef.current = true;
      }
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", vis);
      SafeStorage.set(
        `dsa-timer-${problemId}`,
        accRef.current +
          (activeRef.current
            ? Math.floor((Date.now() - startRef.current) / 1000)
            : 0)
      );
    };
  }, [problemId]);

  return elapsed;
}
