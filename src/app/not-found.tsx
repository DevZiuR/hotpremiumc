import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background ambient gradient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-sky-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          404 Error
        </span>

        {/* Large 404 Text */}
        <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 mb-4">
          404
        </h1>

        {/* Title & Description */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-md mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist, was moved, or has an updated URL.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-sky-500/20 text-center"
          >
            Return to Homepage
          </Link>
          <Link
            href="/work/lr-miami"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all duration-200 text-center"
          >
            View Case Study
          </Link>
        </div>
      </div>
    </div>
  );
}
