import React from "react";

interface ToastProps {
  message: string;
  icon: string;
  onDone?: () => void;
}

export function Toast({ message, icon, onDone }: ToastProps) {
  const onDoneRef = React.useRef(onDone);
  onDoneRef.current = onDone;
  React.useEffect(() => {
    const t = setTimeout(() => onDoneRef.current?.(), 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <span style={{ fontSize: 17 }}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
