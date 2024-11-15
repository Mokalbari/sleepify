import Image from "next/image"
import cover from "../../public/cover-album_placeholder.webp"
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
    <li className="brutal flex items-center justify-between rounded-md bg-white px-6 py-3 sm:py-4">
      <div className="flex items-center">
        <div className="relative w-12 sm:w-16">
          <Image
            src={trackImage || cover}
            alt="album cover"
            width={777}
            height={777}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="ml-4">
          <h3 className="font-bold sm:text-sm">{trackName}</h3>
          <div className="text-xs sm:text-sm">{artistName}</div>
        </div>
      </div>
      <HeartButton isFavorite={false} className="sm:mr-12" />
    </li>
  )
}
