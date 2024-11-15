import { Play, SkipBack, SkipForward } from "lucide-react"
import HeartButton from "./heart-button"

export default function PlayerControl() {
  return (
    <>
      {/* Tablet + Desktop version */}
      <div className="flex gap-4 max-sm:hidden">
        <SkipBack />
        <Play />
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
