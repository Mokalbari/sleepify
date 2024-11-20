import { useAudio } from "@/context/audio-context"
import "@/styles/globals.css"

export default function ProgressBarFS() {
  const { currentTime, duration, seekTo } = useAudio()

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    seekTo(newTime)
  }

  const progressPercent = (currentTime / duration) * 100 || 0

  const formatTime = (time: number) =>
    new Date(time * 1000).toISOString().slice(14, 19)

  return (
    <div className="z-10 flex w-full flex-col items-center space-x-4">
      <div className="flex w-full justify-between">
        <span className="text-2xs text-gray-500">
          {formatTime(currentTime)}
        </span>
        <span className="text-2xs text-gray-500">{formatTime(duration)}</span>
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
      />
    </div>
  )
}
