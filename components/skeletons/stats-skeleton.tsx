export function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-lg border bg-card p-6 shadow-sm animate-pulse"
        >
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-8 bg-muted rounded w-20" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
            <div className="h-10 w-10 bg-muted rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
