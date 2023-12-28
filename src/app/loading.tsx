import React from "react";

export default function Loading() {
  return (
    <div className="flex w-72 flex-col">
      <div className="animate-pulse">
        <div className="mb-2 h-4 w-3/4 rounded bg-white/10"></div>
        <div className="mb-2 h-4 w-1/2 rounded bg-white/10"></div>
        <div className="h-4 w-1/4 rounded bg-white/10"></div>
      </div>
    </div>
  );
}
