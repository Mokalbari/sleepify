import PlayerControl from "./ui/player-control"
import PlayerTrack from "./ui/player-track"
import ProgressBar from "./ui/progress-bar"

export default function SleepifyNormalPlayer() {
  return (
    <>
      <ProgressBar />
      <div className="flex w-full items-center justify-between bg-white px-4 py-3">
        <PlayerTrack />
        <button className="font-bold text-deepBlue hover:cursor-pointer hover:underline max-sm:hidden">
          View lyrics
        </button>
        <PlayerControl />
      </div>
    </>
  )
}
