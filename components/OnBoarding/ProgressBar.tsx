"use client";

interface ProgressBarProps {
  progress: number; // Value from 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="relative w-90 h-[0.4rem] overflow-hidden rounded-[0.625rem]">
      <div className="absolute w-90 h-full bg-[#3f3055]" />
      <div
        className="absolute h-full bg-white rounded-r-[0.625rem]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
