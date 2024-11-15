import Image from "next/image"
import HeartButton from "./ui/heart-button"

interface Props {
  trackName: string
  artistName: string
  trackImage: string
}
export default function TrackCard({
  trackName,
  artistName,
  trackImage,
}: Props) {
  return (
    <li className="brutal flex items-center justify-between rounded-md bg-white px-6 py-3 sm:py-3">
      <div className="flex items-center">
        <div className="relative w-12 sm:w-16">
          <Image
            src={trackImage}
            alt={`Album cover of ${trackName}`}
            width={640}
            height={640}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="ml-4">
          <h3 className="text-xs font-bold sm:text-base">{trackName}</h3>
          <div className="text-2xs sm:text-xs">{artistName}</div>
        </div>
      </div>
      <HeartButton isFavorite={false} className="sm:mr-12" />
    </li>
  )
}
