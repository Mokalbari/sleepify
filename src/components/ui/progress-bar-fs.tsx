import { useSleepify } from "@/context/sleepify/use-sleepify"
import "@/styles/globals.css"
import { formatTime } from "@/utils/functions/formatTime"

export default function ProgressBarFS() {
  const { currentTime, duration, seekTo } = useSleepify()

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    seekTo(newTime)
  }

  const progressPercent = (currentTime / duration) * 100 || 0
  const currentTimeFormatted = formatTime(currentTime)
  const durationFormatted = formatTime(duration)

  return (
    <div className="z-10 flex w-full flex-col items-center space-x-4">
      <div className="flex w-full justify-between">
        <span
          aria-label={`Current time: ${currentTimeFormatted}`}
          className="text-2xs text-gray-500"
        >
          {currentTimeFormatted}
        </span>
        <span
          aria-label={`Duration: ${durationFormatted}`}
          className="text-2xs text-gray-500"
        >
          {durationFormatted}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max={duration.toFixed(2)}
        step="0.1"
        value={currentTime.toFixed(2)}
        onChange={handleSliderChange}
        className="slider mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/50"
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
