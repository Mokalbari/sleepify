import Sun from "@/components/ui/sun"

export default function TracksHeader() {
  return (
    <header className="flex items-center gap-4">
      <div className="w-1/3">
        <Sun sizes="112" />
      </div>
      <div className="">
        <h2 className="text-md font-bold sm:text-lg lg:text-xl">
          Sleepify Top 50
        </h2>
        <p className="text-2xl tracking-tighter sm:text-base">
          Welcome to the Sleepify Top 50. Discover tracks from instant classics
          to tunes you’ll probably forget by tomorrow. Play it loud, or
          don’t—we’re not here to judge.
        </p>
        <div className="mt-4 h-1 w-full max-w-[600px] bg-black" />
      </div>
    </header>
  )
}
