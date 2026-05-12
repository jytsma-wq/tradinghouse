export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="animate-pulse space-y-10">
        <div className="space-y-4">
          <div className="h-4 w-32 rounded bg-mist" />
          <div className="h-12 w-full max-w-xl rounded bg-mist" />
          <div className="h-5 w-full max-w-2xl rounded bg-mist" />
        </div>

        <div className="h-72 rounded-xl bg-mist" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="h-40 rounded-xl bg-mist" />
          <div className="h-40 rounded-xl bg-mist" />
          <div className="h-40 rounded-xl bg-mist" />
        </div>
      </div>
    </section>
  );
}
