const LoadingSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, idx) => (
      <div key={idx} className="glass animate-pulse rounded-2xl p-5">
        <div className="mb-3 h-5 w-2/3 rounded bg-white/10" />
        <div className="mb-6 h-4 w-1/2 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
