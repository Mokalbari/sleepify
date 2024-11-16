import { Pause, Play, SkipBack, SkipForward } from "lucide-react"
import HeartButton from "./heart-button"
interface Props {
  isPlaying: boolean
  togglePlayPause: () => void
}

export default function PlayerControl({ isPlaying, togglePlayPause }: Props) {
  return (
    <>
      {/* Tablet + Desktop version */}
      <div className="flex gap-4 max-sm:hidden">
        <SkipBack />
        {isPlaying ? (
          <Pause onClick={togglePlayPause} />
        ) : (
          <Play onClick={togglePlayPause} />
        )}
        <SkipForward />
      </div>

      {/* Mobile version */}
      <div className="flex gap-4 sm:hidden">
        <HeartButton isFavorite={false} />
        <Play />
      </div>
    </>
  )
}
