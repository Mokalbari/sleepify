import { useSleepify } from "@/context/sleepify/use-sleepify"
import "@/styles/globals.css"
import { formatTime } from "@/utils/functions/formatTime"

export default function ProgressBar() {
  const { currentTime, duration, seekTo } = useSleepify()

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    seekTo(newTime)
  }

  const progressPercent = (currentTime / duration) * 100 || 0

  return (
    <div className="z-10 flex w-full items-center space-x-4">
      <input
        type="range"
        min="0"
        max={duration.toFixed(2)}
        step="0.1"
        value={currentTime.toFixed(2)}
        onChange={handleSliderChange}
        className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/50"
        style={{
          background: `linear-gradient(to right, #88AAEE ${progressPercent}%, #ddd ${progressPercent}%)`,
        }}
        aria-label={`Seek slider, current time: ${formatTime(
          currentTime,
        )}, duration: ${formatTime(duration)}`}
      />
    </div>
  )
}
