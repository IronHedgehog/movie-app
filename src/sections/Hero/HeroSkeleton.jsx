export default function HeroSkeleton() {
  return (
    <section
      className="h-[85vh] w-full bg-neutral-900 animate-pulse
             motion-reduce:animate-none"
      aria-hidden
    >
      <div className="h-full flex items-center px-6 md:px-16">
        <div className="space-y-4 max-w-xl">
          <div className="h-12 w-3/4 bg-neutral-700 rounded" />
          <div className="h-4 w-full bg-neutral-700 rounded" />
          <div className="h-4 w-5/6 bg-neutral-700 rounded" />
          <div className="flex gap-4 pt-6">
            <div className="h-10 w-32 bg-neutral-700 rounded" />
            <div className="h-10 w-32 bg-neutral-700 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
