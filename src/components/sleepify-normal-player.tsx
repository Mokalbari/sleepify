import PlayerControl from "./ui/player-control"
import PlayerTrack from "./ui/player-track"

export default function SleepifyNormalPlayer() {
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between bg-white px-4 py-3">
      <PlayerTrack />
      <PlayerControl />
    </div>
  )
}
