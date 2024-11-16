import Sun from "@/components/ui/sun"

export default function TracksHeader() {
  return (
    <header className="center flex items-center gap-4">
      <Sun sizes="96" className="min-w-20" />
      <div className="max-w-prose sm:ml-10 lg:ml-16">
        <h2 className="text-md font-bold sm:text-lg lg:text-xl">
          Sleepify Top 50
        </h2>
        <p className="text-2xs tracking-tighter sm:text-xs lg:text-base">
          Welcome to the Sleepify Top 50. Discover tracks from instant classics
          to tunes you’ll probably forget by tomorrow. Play it loud, or
          don’t—we’re not here to judge.
        </p>
        <div className="mt-4 h-[2px] w-full max-w-[600px] bg-black sm:h-1" />
      </div>
    </header>
  )
}
