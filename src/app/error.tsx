"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
        <p className="text-sm text-slate-600 mb-4">{error?.message || "An error occurred while loading this page."}</p>
        <button
          onClick={() => reset()}
          className="px-5 py-2 bg-slate-900 text-white font-medium text-sm rounded-lg hover:bg-slate-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
