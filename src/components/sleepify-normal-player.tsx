import BottomNav from "./bottom-nav"
import PlayerControl from "./ui/player-control"
import PlayerTrack from "./ui/player-track"
import ProgressBar from "./ui/progress-bar"

export default function SleepifyNormalPlayer() {
  return (
    <div className="sticky bottom-0 left-0 max-sm:mt-12">
      <div className="sm:hidden">
        <BottomNav />
      </div>
      <ProgressBar />
      <div className="flex w-full items-center justify-between bg-white px-4 py-3">
        <PlayerTrack />
        <button className="font-bold text-deepBlue hover:cursor-pointer hover:underline max-sm:hidden">
          <span className="max-lg:hidden">View</span> Lyrics
        </button>
        <PlayerControl />
      </div>
    </div>
  )
}
